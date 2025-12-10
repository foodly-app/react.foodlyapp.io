

import { Link, useNavigate } from "react-router-dom";
import ScrollTop from "../common/ScrollTop";

const AllPages = () => {

	const navigate = useNavigate();
	const handleBack = () => {
		navigate(-1);  // -1 navigates back to the previous page
	};


	return (
		<>
			<ScrollTop />
			<main>
				<div className="appbar">
					<button onClick={handleBack} className="back-page-btn">
						<img src="assets/svg/menu/back-white.svg" alt="icon" />
					</button>
					<h1>pages</h1>
				</div>

				<div className="page-content">
					<div className="pages-title">
						<h2>authentication</h2>
					</div>
					<div className="page-list">
						<ul>
							<li>
								<Link to="/signup">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										sign up page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/signup-email">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										sign up with email page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/signin">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										sign in page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/signin-email">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										sign in with email page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/create-new-password">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										create new password page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>

							<li>
								<Link to="/forgot-password">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										forgot password page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/otp">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										enter OTP page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/select-language">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										select language page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
						</ul>
					</div>
					<div className="pages-title">
						<h2>home</h2>
					</div>
					<div className="page-list">
						<ul>
							<li>
								<Link to="/home">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										home page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
						</ul>
					</div>
					<div className="pages-title">
						<h2>chat</h2>
					</div>
					<div className="page-list">
						<ul>
							<li>
								<Link to="/chat">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										chat page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/message">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										message page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
						</ul>
					</div>
					<div className="pages-title">
						<h2>call</h2>
					</div>
					<div className="page-list">
						<ul>
							<li>
								<Link to="/audio-call">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										audio call page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/video-call">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										video call page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
						</ul>
					</div>
					<div className="pages-title">
						<h2>profile</h2>
					</div>
					<div className="page-list">
						<ul>
							<li>
								<Link to="/user-profile">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										user profile page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/user-info">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										user info page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/guide-profile">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										guide profile page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
						</ul>
					</div>
					<div className="pages-title">
						<h2>profile settings</h2>
					</div>
					<div className="page-list">
						<ul>
							<li>
								<Link to="/user-address">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										address page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/add-address">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										add address page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/add-card">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										add card page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/change-password">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										change password page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/forgot-password">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										forgot password page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/notifications">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										notifications page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/security">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										security page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/user-language">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										language page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/user-payment">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										payment page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
						</ul>
					</div>
					<div className="pages-title">
						<h2>hotel</h2>
					</div>
					<div className="page-list">
						<ul>
							<li>
								<Link to="/book-hotel">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										book hotel page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/checkout-hotel">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										checkout hotel page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/hotels">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										hotels page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/hotel-details">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										hotel details page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
						</ul>
					</div>
					<div className="pages-title">
						<h2>vacation</h2>
					</div>
					<div className="page-list">
						<ul>
							<li>
								<Link to="/vacation-details">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										vacation details page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/wishlist">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										wishlist page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/explore">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										explore page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/checkout-vacation">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										checkout vacation page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/search-result">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										search result page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/service-location">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										location page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/ticket-booked">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										booked ticket page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/ticket-detail">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										ticket details page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/tour-guide">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										tour guide page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
						</ul>
					</div>
					<div className="pages-title">
						<h2>others</h2>
					</div>
					<div className="page-list">
						<ul>
							<li>
								<Link to="/">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										welcome
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/notification">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										notification
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/review">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										review
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/policy">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										legal policies page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
							<li>
								<Link to="/help-support">
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/box-white.svg" alt="" />
										</span>
										help and support page
									</div>
									<img src="assets/svg/menu/chevron-right-black.svg" alt="" />
								</Link>
							</li>
						</ul>
					</div>
				</div>

			</main>
		</>
	);
};

export default AllPages;
