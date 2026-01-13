import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useNotifications } from "../../../context/NotificationContext";

const InfoArea = () => {
	const { user, isAuthenticated } = useAuth();
	const { unreadCount } = useNotifications();

	console.log('InfoArea unreadCount:', unreadCount);

	return (
		<>
			<section className="info d-flex align-items-start justify-content-between pb-12">
				<div className="d-flex align-items-center justify-content-between gap-14">
					<div className="image shrink-0 rounded-full overflow-hidden">
						<img
							src={user?.avatar || "/assets/images/home/avatar.png"}
							alt="avatar"
							className="w-100 h-100 object-fit-cover"
						/>
					</div>
					<div>
						<h3>Hi, {isAuthenticated && user ? user.name : "Guest"}</h3>
						<p className="d-flex align-items-center gap-04">
							<img src="/assets/svg/map-marker.svg" alt="icon" />
							{user?.country_code || "Georgia"}
						</p>
					</div>
				</div>

				<ul className="d-flex align-items-center gap-16">
					<li>
						<Link
							to="/notification"
							className="icon-btn position-relative"
						>
							<img src="/assets/svg/bell-black.svg" alt="icon" />
							{unreadCount > 0 ? (
								<span className="notification-badge">
									{unreadCount > 99 ? '99+' : unreadCount}
								</span>
							) : null}
						</Link>
					</li>
					<li>
						<Link
							to="/message"
							className="icon-btn position-relative"
						>
							<img src="/assets/svg/message-square-dots.svg" alt="icon" />
						</Link>
					</li>
				</ul>
			</section>

			<style>{`
                .icon-btn {
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background: #f8f8f8;
                    transition: all 0.2s ease;
                }
                .icon-btn:active {
                    transform: scale(0.92);
                    background: #f0f0f0;
                }
                .notification-badge {
                    position: absolute;
                    top: 2px;
                    right: 2px;
                    background: #ff4b00;
                    color: white;
                    border-radius: 50%;
                    width: 18px;
                    height: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 9px;
                    font-weight: 700;
                    border: 2px solid #ffffff;
                    box-shadow: 0 2px 5px rgba(255, 75, 0, 0.2);
                    z-index: 1;
                    line-height: 0;
                    padding: 0;
                }
            `}</style>
		</>
	);
};

export default InfoArea;
