import { useEffect } from 'react';
import { getApps, initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { authService } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import toast from 'react-hot-toast';

export const useFcm = () => {
    const { isAuthenticated } = useAuth();
    const { incrementUnreadCount } = useNotifications();

    const initializeFcm = async () => {
        if (!isAuthenticated) return;
        try {
            console.log('Initializing FCM...');

            // 1. Fetch VAPID key from API (even if we hardcode config)
            const response = await authService.getNotificationSettings();
            const configData = response.data || response;
            const vapid_public_key = configData.vapid_public_key;

            // 2. Verified config from screenshot
            const firebase_config = {
                apiKey: "AIzaSyAyUbGaUvo2DzhC2WDLGNr5FliKw1r0wwg",
                authDomain: "foodly-api-899d1.firebaseapp.com",
                projectId: "foodly-api-899d1",
                storageBucket: "foodly-api-899d1.firebasestorage.app",
                messagingSenderId: "290878469832",
                appId: "1:290878469832:web:3e58a59d44586921dc97fd",
                measurementId: "G-0797R63VYD"
            };

            // Initialize app (one instance)
            const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebase_config);
            const messaging = getMessaging(app);

            // 3. Register Service Worker (proxied)
            let swRegistration: ServiceWorkerRegistration | undefined;
            if ('serviceWorker' in navigator) {
                try {
                    swRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
                    console.log('FCM Service Worker registered:', swRegistration.scope);
                } catch (swError) {
                    console.error('FCM Service Worker registration failed:', swError);
                }
            }

            // 4. Check Permission and Get Token
            console.log('Current notification permission:', Notification.permission);
            if (Notification.permission === 'granted') {
                try {
                    const currentToken = await getToken(messaging, {
                        vapidKey: vapid_public_key,
                        serviceWorkerRegistration: swRegistration
                    });

                    if (currentToken) {
                        await authService.saveFcmToken({
                            token: currentToken,
                            platform: 'web',
                            device_name: navigator.userAgent
                        });
                        console.log('FCM Token synced successfully:', currentToken);
                    } else {
                        console.warn('No FCM token received. Check VAPID key and network.');
                    }
                } catch (tokenError) {
                    console.error('Error getting FCM token:', tokenError);
                }
            }

            // 6. Handle Foreground Messages
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

    useEffect(() => {
        if (isAuthenticated) {
            initializeFcm();
        }
    }, [isAuthenticated]);

    return { initializeFcm };
};
