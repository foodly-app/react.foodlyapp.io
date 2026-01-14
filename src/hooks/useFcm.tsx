import { useEffect, useState } from 'react';
import { getApps, initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { authService } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import toast from 'react-hot-toast';

export const useFcm = () => {
    const { isAuthenticated } = useAuth();
    const { incrementUnreadCount } = useNotifications();
    const [hasPermission, setHasPermission] = useState(Notification.permission === 'granted');

    const initializeFcm = async () => {
        if (!isAuthenticated) return;
        try {
            console.log('Initializing FCM...');

            // 1. Fetch Firebase configuration from API with platform parameter
            const response = await authService.getNotificationSettings();
            const configData = response.data || response;

            if (!configData.firebase_config || !configData.vapid_public_key) {
                console.error('Missing firebase_config or vapid_public_key from API');
                return;
            }

            const { firebase_config, vapid_public_key } = configData;
            console.log('Firebase config loaded from API');

            // 2. Initialize Firebase with config from API
            const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebase_config);
            const messaging = getMessaging(app);

            // 3. Register Service Worker with platform parameter
            let swRegistration: ServiceWorkerRegistration | undefined;
            if ('serviceWorker' in navigator) {
                try {
                    // IMPORTANT: Service Worker MUST be served from the same origin
                    // In production, the SW file should be in the build output
                    swRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js?platform=react-web', {
                        scope: '/'
                    });
                    console.log('FCM Service Worker registered with scope:', swRegistration.scope);

                    // Wait for the service worker to be ready
                    await navigator.serviceWorker.ready;

                    // Send Firebase config to Service Worker
                    if (navigator.serviceWorker.controller) {
                        navigator.serviceWorker.controller.postMessage({
                            type: 'FIREBASE_CONFIG',
                            config: firebase_config
                        });
                        console.log('Firebase config sent to Service Worker');
                    }
                } catch (swError) {
                    console.error('FCM Service Worker registration failed:', swError);
                }
            }

            // 4. Check Permission and Get Token
            console.log('Current notification permission:', Notification.permission);
            if (Notification.permission === 'granted') {
                setHasPermission(true);
                try {
                    // Ensure service worker is fully active before getting token
                    if (swRegistration?.active) {
                        const currentToken = await getToken(messaging, {
                            vapidKey: vapid_public_key,
                            serviceWorkerRegistration: swRegistration
                        });

                        if (currentToken) {
                            // Send token to backend
                            await authService.saveFcmToken({
                                token: currentToken,
                                platform: 'web',
                                device_name: navigator.userAgent
                            });
                            console.log('FCM Token synced successfully:', currentToken);
                        } else {
                            console.warn('No FCM token received. Check VAPID key and network.');
                        }
                    } else {
                        console.warn('Service Worker not active yet, will retry on next page load');
                    }
                } catch (tokenError) {
                    console.error('Error getting FCM token:', tokenError);
                }
            } else {
                setHasPermission(false);
            }

            // 5. Handle Foreground Messages
            onMessage(messaging, (payload) => {
                console.log('Message received in foreground: ', payload);
                const { title, body } = payload.notification || {};

                try {
                    const audio = new Audio('/assets/sounds/notification.mp3');
                    audio.play().catch(e => console.log('Sound play blocked by browser:', e));
                } catch (e) {
                    console.error('Error playing sound:', e);
                }

                incrementUnreadCount();

                if (title || body) {
                    toast((t) => (
                        <div onClick={() => toast.dismiss(t.id)} style={{ cursor: 'pointer' }}>
                            <strong>{title}</strong>
                            <p style={{ margin: 0, fontSize: '14px' }}>{body}</p>
                        </div>
                    ), {
                        icon: '🔔',
                        duration: 5000,
                    });
                }
            });

        } catch (error) {
            console.error('FCM Initialization failed:', error);
        }
    };

    const requestPermission = async () => {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                console.log('Notification permission granted');
                setHasPermission(true);
                await initializeFcm();
                return true;
            } else {
                console.log('Notification permission denied');
                setHasPermission(false);
                return false;
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            setHasPermission(false);
            return false;
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            initializeFcm();
        }
    }, [isAuthenticated]);

    return { initializeFcm, requestPermission, hasPermission };
};

