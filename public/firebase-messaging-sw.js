// Firebase Cloud Messaging Service Worker for React Web
// This service worker handles background push notifications

// Extract platform from query parameter
const urlParams = new URLSearchParams(self.location.search);
const platform = urlParams.get('platform') || 'react-web';

console.log('[FCM SW] Service Worker initialized for platform:', platform);

// Dynamically import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Fetch Firebase configuration from backend
let firebaseApp = null;
let messaging = null;

// Initialize Firebase when service worker is installed
self.addEventListener('install', (event) => {
    console.log('[FCM SW] Service Worker installing...');
    event.waitUntil(
        // Fetch from production API directly (not using proxy)
        fetch(`https://api.foodly.pro/api/website/settings/notifications?platform=${platform}`)
            .then(response => response.json())
            .then(data => {
                if (data.firebase_config) {
                    console.log('[FCM SW] Firebase config fetched successfully');
                    firebaseApp = firebase.initializeApp(data.firebase_config);
                    messaging = firebase.messaging();
                    console.log('[FCM SW] Firebase initialized');
                } else {
                    console.error('[FCM SW] No firebase_config in response');
                }
            })
            .catch(error => {
                console.error('[FCM SW] Failed to fetch Firebase config:', error);
            })
    );
});

self.addEventListener('activate', (event) => {
    console.log('[FCM SW] Service Worker activated');
    event.waitUntil(self.clients.claim());
});

// Handle background messages
self.addEventListener('push', (event) => {
    console.log('[FCM SW] Push event received:', event);

    if (!event.data) {
        console.log('[FCM SW] No data in push event');
        return;
    }

    try {
        const payload = event.data.json();
        console.log('[FCM SW] Push payload:', payload);

        const notificationTitle = payload.notification?.title || 'New Notification';
        const notificationOptions = {
            body: payload.notification?.body || '',
            icon: payload.notification?.icon || '/assets/images/logo.png',
            badge: payload.notification?.badge || '/assets/images/badge.png',
            tag: payload.notification?.tag || 'default',
            data: payload.data || {},
            requireInteraction: false,
            vibrate: [200, 100, 200]
        };

        event.waitUntil(
            self.registration.showNotification(notificationTitle, notificationOptions)
        );
    } catch (error) {
        console.error('[FCM SW] Error handling push event:', error);
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    console.log('[FCM SW] Notification clicked:', event.notification);
    event.notification.close();

    const urlToOpen = event.notification.data?.click_action || '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // Check if there's already a window open
                for (const client of clientList) {
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }
                // If no window is open, open a new one
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});

// Handle messages from the main thread
self.addEventListener('message', (event) => {
    console.log('[FCM SW] Message received from main thread:', event.data);

    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
