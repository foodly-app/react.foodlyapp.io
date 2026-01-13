import { useState } from 'react';
import { useFcm } from '../../hooks/useFcm';
import { useNotifications } from '../../context/NotificationContext';
import toast from 'react-hot-toast';

/**
 * FCM Test Page Component
 * This component provides a UI for testing Firebase Cloud Messaging functionality
 * including permission requests, token retrieval, and notification display.
 */
const FcmTestPage = () => {
    const { requestPermission } = useFcm();
    const { unreadCount, refreshUnreadCount } = useNotifications();
    const [loading, setLoading] = useState(false);

    const handleRequestPermission = async () => {
        setLoading(true);
        try {
            const granted = await requestPermission();
            if (granted) {
                toast.success('Notification permission granted! FCM token retrieved.');
            } else {
                toast.error('Notification permission denied.');
            }
        } catch (error) {
            toast.error('Error requesting permission');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefreshCount = async () => {
        setLoading(true);
        try {
            await refreshUnreadCount();
            toast.success('Notification count refreshed');
        } catch (error) {
            toast.error('Error refreshing count');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const checkServiceWorker = () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                const fcmSW = registrations.find(reg =>
                    reg.active?.scriptURL.includes('firebase-messaging-sw.js')
                );

                if (fcmSW) {
                    toast.success(`Service Worker Active: ${fcmSW.active?.state}`);
                    console.log('FCM Service Worker:', fcmSW);
                } else {
                    toast.error('FCM Service Worker not found');
                }
            });
        } else {
            toast.error('Service Workers not supported');
        }
    };

    const testNotification = () => {
        if (Notification.permission === 'granted') {
            new Notification('Test Notification', {
                body: 'This is a test notification from FCM Test Page',
                icon: '/assets/images/logo.png',
                badge: '/assets/images/badge.png',
                tag: 'test-notification'
            });
            toast.success('Test notification sent');
        } else {
            toast.error('Notification permission not granted');
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg border-0 radius-24">
                        <div className="card-header bg-primary text-white p-4 radius-24-top">
                            <h2 className="mb-0 fw-bold">🔔 FCM Test Page</h2>
                            <p className="mb-0 mt-2 opacity-75">Test Firebase Cloud Messaging functionality</p>
                        </div>

                        <div className="card-body p-4">
                            {/* Status Section */}
                            <div className="mb-4 p-3 bg-light radius-16">
                                <h5 className="fw-bold mb-3">📊 Current Status</h5>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="fw-semibold">Permission:</span>
                                            <span className={`badge ${Notification.permission === 'granted' ? 'bg-success' :
                                                    Notification.permission === 'denied' ? 'bg-danger' : 'bg-warning'
                                                }`}>
                                                {Notification.permission}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="fw-semibold">Unread Count:</span>
                                            <span className="badge bg-primary">{unreadCount}</span>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="fw-semibold">Service Worker:</span>
                                            <span className="badge bg-info">
                                                {'serviceWorker' in navigator ? 'Supported' : 'Not Supported'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="d-grid gap-3">
                                <button
                                    onClick={handleRequestPermission}
                                    disabled={loading || Notification.permission === 'granted'}
                                    className="btn btn-primary btn-lg radius-16 fw-semibold"
                                >
                                    {loading ? '⏳ Processing...' : '🔔 Request Notification Permission'}
                                </button>

                                <button
                                    onClick={checkServiceWorker}
                                    disabled={loading}
                                    className="btn btn-info btn-lg radius-16 fw-semibold text-white"
                                >
                                    🔍 Check Service Worker Status
                                </button>

                                <button
                                    onClick={testNotification}
                                    disabled={loading || Notification.permission !== 'granted'}
                                    className="btn btn-success btn-lg radius-16 fw-semibold"
                                >
                                    🧪 Send Test Notification
                                </button>

                                <button
                                    onClick={handleRefreshCount}
                                    disabled={loading}
                                    className="btn btn-warning btn-lg radius-16 fw-semibold"
                                >
                                    🔄 Refresh Notification Count
                                </button>
                            </div>

                            {/* Instructions */}
                            <div className="mt-4 p-3 bg-light radius-16">
                                <h5 className="fw-bold mb-3">📝 Instructions</h5>
                                <ol className="mb-0">
                                    <li className="mb-2">
                                        <strong>Request Permission:</strong> Click to request notification permission from the browser
                                    </li>
                                    <li className="mb-2">
                                        <strong>Check Service Worker:</strong> Verify that the FCM service worker is registered and active
                                    </li>
                                    <li className="mb-2">
                                        <strong>Test Notification:</strong> Send a local test notification to verify browser notifications work
                                    </li>
                                    <li className="mb-2">
                                        <strong>Refresh Count:</strong> Fetch the latest unread notification count from the server
                                    </li>
                                </ol>
                            </div>

                            {/* Console Tip */}
                            <div className="alert alert-info mt-3 radius-16">
                                <strong>💡 Tip:</strong> Open the browser console (F12) to see detailed FCM logs including token retrieval and message handling.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FcmTestPage;
