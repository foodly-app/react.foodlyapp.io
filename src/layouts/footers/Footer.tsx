import { Link } from "react-router-dom";

 

const Footer = () => {
	return (
		<>
			<footer className="bottom-nav">
				<ul className="d-flex align-items-center justify-content-around w-100 h-100">
					<li>
						<Link to="/home">
							<img src="/assets/svg/bottom-nav/home.svg" alt="home" />
						</Link>
					</li>
					<li>
						<Link to="/explore">
							<img src="/assets/svg/bottom-nav/category.svg" alt="category" />
						</Link>
					</li>
					<li>
						<Link to="/ticket-booked">
							<img src="/assets/svg/bottom-nav/ticket.svg" alt="ticket" />
						</Link>
					</li>
					<li>
						<Link to="/wishlist">
							<img src="/assets/svg/bottom-nav/heart.svg" alt="heart" />
						</Link>
					</li>
					<li>
						<Link to="/user-profile">
							<img
								src="/assets/svg/bottom-nav/profile-active.svg"
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
