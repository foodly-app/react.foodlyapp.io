import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface PermissionModalProps {
    onEnableNotifications: () => Promise<void>;
}

const PermissionModal = ({ onEnableNotifications }: PermissionModalProps) => {
    const [show, setShow] = useState(false);
    const [notifEnabled, setNotifEnabled] = useState(Notification.permission === 'granted');
    const [locationEnabled, setLocationEnabled] = useState(false);

    useEffect(() => {
        const hasShown = localStorage.getItem('permissions_prompt_shown');
        if (!hasShown) {
            const timer = setTimeout(() => setShow(true), 2000); // Show after 2 seconds
            return () => clearTimeout(timer);
        }
    }, []);

    const handleNotificationToggle = async () => {
        if (Notification.permission === 'granted') {
            setNotifEnabled(true);
            return;
        }

        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            setNotifEnabled(true);
            await onEnableNotifications();
            toast.success('Notifications enabled!');
        } else {
            toast.error('Notification permission denied');
        }
    };

    const handleLocationToggle = () => {
        if (!navigator.geolocation) {
            toast.error('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            () => {
                setLocationEnabled(true);
                toast.success('Location access granted!');
            },
            (error) => {
                console.error(error);
                toast.error('Location access denied');
            }
        );
    };

    const handleClose = () => {
        localStorage.setItem('permissions_prompt_shown', 'true');
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="modal-overlay d-flex align-items-center justify-content-center p-20" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(5px)',
            zIndex: 9999
        }}>
            <div className="modal-content radius-24 p-24 bg-white shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="text-center mb-24">
                    <h3 className="fw-700 mb-8">Permissions Request</h3>
                    <p className="color-secondary fs-14">To provide the best experience, please enable the following features.</p>
                </div>

                <div className="d-flex flex-column gap-16 mb-32">
                    {/* Notifications */}
                    <div className="permission-item d-flex align-items-center justify-content-between p-16 radius-16 bg-light" style={{ background: '#f8f8f8' }}>
                        <div className="d-flex align-items-center gap-12">
                            <div className="icon-box d-flex align-items-center justify-content-center radius-12" style={{ width: '40px', height: '40px', background: 'rgba(255, 75, 0, 0.1)' }}>
                                <img src="/assets/svg/bell-black.svg" alt="bell" style={{ width: '20px', filter: 'invert(31%) sepia(98%) saturate(3547%) hue-rotate(3deg) brightness(101%) contrast(105%)' }} />
                            </div>
                            <div>
                                <h4 className="fs-16 fw-600 mb-2">Notifications</h4>
                                <p className="fs-12 color-secondary mb-0">Stay updated with alerts</p>
                            </div>
                        </div>
                        <button
                            onClick={handleNotificationToggle}
                            className={`btn-toggle ${notifEnabled ? 'active' : ''}`}
                            style={{
                                width: '44px',
                                height: '24px',
                                borderRadius: '12px',
                                background: notifEnabled ? '#ff4b00' : '#ccc',
                                position: 'relative',
                                border: 'none',
                                transition: 'all 0.3s'
                            }}
                        >
                            <span style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                background: 'white',
                                position: 'absolute',
                                top: '3px',
                                left: notifEnabled ? '23px' : '3px',
                                transition: 'all 0.3s'
                            }} />
                        </button>
                    </div>

                    {/* Location */}
                    <div className="permission-item d-flex align-items-center justify-content-between p-16 radius-16 bg-light" style={{ background: '#f8f8f8' }}>
                        <div className="d-flex align-items-center gap-12">
                            <div className="icon-box d-flex align-items-center justify-content-center radius-12" style={{ width: '40px', height: '40px', background: 'rgba(255, 75, 0, 0.1)' }}>
                                <img src="/assets/svg/map-marker.svg" alt="map" style={{ width: '20px', filter: 'invert(31%) sepia(98%) saturate(3547%) hue-rotate(3deg) brightness(101%) contrast(105%)' }} />
                            </div>
                            <div>
                                <h4 className="fs-16 fw-600 mb-2">Location</h4>
                                <p className="fs-12 color-secondary mb-0">Access local features</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLocationToggle}
                            className={`btn-toggle ${locationEnabled ? 'active' : ''}`}
                            style={{
                                width: '44px',
                                height: '24px',
                                borderRadius: '12px',
                                background: locationEnabled ? '#ff4b00' : '#ccc',
                                position: 'relative',
                                border: 'none',
                                transition: 'all 0.3s'
                            }}
                        >
                            <span style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                background: 'white',
                                position: 'absolute',
                                top: '3px',
                                left: locationEnabled ? '23px' : '3px',
                                transition: 'all 0.3s'
                            }} />
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleClose}
                    className="btn-primary w-100 radius-16 fw-600"
                    style={{ background: '#ff4b00', border: 'none', padding: '14px', color: 'white' }}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default PermissionModal;
