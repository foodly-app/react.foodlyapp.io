import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
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
            // 1. Fetch Config
            const settings = await authService.getNotificationSettings();
            const { firebase_config, vapid_public_key } = settings;

            // 2. Initialize Firebase
            const app = initializeApp(firebase_config);
            const messaging = getMessaging(app);

            // 3. Register Service Worker (Dynamic from API)
            if ('serviceWorker' in navigator) {
                try {
                    const registration = await navigator.serviceWorker.register('https://api.foodly.pro/api/website/firebase-messaging-sw.js', {
                        scope: '/'
                    });
                    console.log('SW registered:', registration);
                } catch (swError) {
                    console.error('Service Worker registration failed:', swError);
                }
            }

            // 4. Check Permission and Get Token
            // We only call getToken if permission is granted to avoid jumping the gun if using a modal
            if (Notification.permission === 'granted') {
                const currentToken = await getToken(messaging, {
                    vapidKey: vapid_public_key
                });

                if (currentToken) {
                    await authService.saveFcmToken({
                        token: currentToken,
                        platform: 'web',
                        device_name: navigator.userAgent
                    });
                    console.log('FCM Token synced');
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
