import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../api/auth";
import { useNotifications } from "../../context/NotificationContext";
import { format } from "timeago.js";
import toast from "react-hot-toast";
import Footer from "../../layouts/footers/Footer";

interface NotificationItem {
	id: string;
	title: string;
	message: string;
	read_at: string | null;
	created_at: string;
	payload?: {
		image_url?: string;
	};
}

const Notification = () => {
	const navigate = useNavigate();
	const { decrementUnreadCount, resetUnreadCount, refreshUnreadCount } = useNotifications();
	const [notifications, setNotifications] = useState<NotificationItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchNotifications();
		refreshUnreadCount();
	}, []);

	const fetchNotifications = async () => {
		try {
			const response = await authService.getNotifications();
			setNotifications(response.data);
		} catch (error) {
			toast.error("Failed to fetch notifications");
		} finally {
			setLoading(false);
		}
	};

	const handleMarkAsRead = async (id: string, isRead: boolean) => {
		if (isRead) return;
		try {
			await authService.markNotificationRead(id);
			setNotifications(notifications.map(n => n.id === id ? { ...n, read_at: new Date().toISOString() } : n));
			decrementUnreadCount();
		} catch (error) {
			console.error("Failed to mark notification as read", error);
		}
	};

	const handleMarkAllRead = async () => {
		try {
			await authService.markAllNotificationsRead();
			setNotifications(notifications.map(n => ({ ...n, read_at: new Date().toISOString() })));
			resetUnreadCount();
			toast.success("All notifications marked as read");
		} catch (error) {
			toast.error("Failed to mark all as read");
		}
	};

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<>
			<main>
				<div className="page-title d-flex align-items-center justify-content-between px-20">
					<div className="d-flex align-items-center gap-12">
						<button
							type="button"
							onClick={handleBack}
							className="back-btn back-page-btn d-flex align-items-center justify-content-center rounded-full"
						>
							<img src="/assets/svg/arrow-left-black.svg" alt="arrow" />
						</button>
						<h3 className="main-title">Notification</h3>
					</div>
					{notifications.length > 0 && (
						<button onClick={handleMarkAllRead} className="fs-14 fw-600 color-primary bg-transparent border-0">
							Mark all read
						</button>
					)}
				</div>

				<section className="notification">
					{loading ? (
						<div className="text-center py-50">
							<div className="spinner-border text-primary" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
					) : notifications.length === 0 ? (
						<div className="text-center py-50">
							<img src="/assets/svg/bell-black.svg" alt="No notifications" style={{ width: '64px', opacity: 0.2, marginBottom: '16px' }} />
							<p>No notifications yet</p>
						</div>
					) : (
						<div>
							<ul>
								{notifications.map((item) => (
									<li
										key={item.id}
										className={`d-flex gap-12 p-16 mb-8 radius-12 ${!item.read_at ? 'bg-light-primary' : ''}`}
										onClick={() => handleMarkAsRead(item.id, !!item.read_at)}
										style={{ cursor: 'pointer', transition: 'background 0.3s' }}
									>
										<div className="image d-flex align-items-center justify-content-center rounded-full overflow-hidden shrink-0" style={{ width: '48px', height: '48px', background: '#f5f5f5' }}>
											<img
												src={item.payload?.image_url || "/assets/svg/bell-black.svg"}
												alt="notification"
												className="img-fluid h-100 w-100 object-fit-cover"
												onError={(e) => {
													(e.target as HTMLImageElement).src = "/assets/svg/bell-black.svg";
												}}
											/>
										</div>
										<div className="flex-grow-1">
											<div className="d-flex justify-content-between align-items-start">
												<p className={`pb-4 ${!item.read_at ? 'fw-bold' : ''}`}>
													{item.title}
												</p>
												{!item.read_at && <span className="dot" style={{ width: '8px', height: '8px', background: '#ff4b00', borderRadius: '50%' }}></span>}
											</div>
											<p className="fs-14 color-secondary pb-8">{item.message}</p>
											<small className="d-block color-gray">{format(item.created_at)}</small>
										</div>
									</li>
								))}
							</ul>
						</div>
					)}
				</section>
			</main>
			<Footer />
		</>
	);
};

export default Notification;
