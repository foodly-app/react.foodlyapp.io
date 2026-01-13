import { Link, useLocation } from "react-router-dom";

const Footer = () => {
	const location = useLocation();
	const path = location.pathname;

	return (
		<>
			<footer className="bottom-nav">
				<ul className="d-flex align-items-center justify-content-around w-100 h-100">
					<li>
						<Link to="/">
							<img
								src={path === "/" || path === "/home" ? "/assets/svg/bottom-nav/home-active.svg" : "/assets/svg/bottom-nav/home.svg"}
								alt="home"
							/>
						</Link>
					</li>
					<li>
						<Link to="/explore">
							<img
								src={path === "/explore" ? "/assets/svg/bottom-nav/category-active.svg" : "/assets/svg/bottom-nav/category.svg"}
								alt="category"
							/>
						</Link>
					</li>
					<li>
						<Link to="/reservations">
							<img
								src={path === "/reservations" || path === "/booking" || path === "/ticket-booked" ? "/assets/svg/bottom-nav/ticket-active.svg" : "/assets/svg/bottom-nav/ticket.svg"}
								alt="ticket"
							/>
						</Link>
					</li>
					<li>
						<Link to="/wishlist">
							<img
								src={path === "/wishlist" ? "/assets/svg/bottom-nav/heart-active.svg" : "/assets/svg/bottom-nav/heart.svg"}
								alt="heart"
							/>
						</Link>
					</li>
					<li>
						<Link to="/user-profile">
							<img
								src={path === "/user-profile" ? "/assets/svg/bottom-nav/profile-active.svg" : "/assets/svg/bottom-nav/profile.svg"}
								alt="profile"
							/>
						</Link>
					</li>
				</ul>
			</footer>
		</>
	);
};

export default Footer;
