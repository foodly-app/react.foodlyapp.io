

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LanguageSwitcher from "../../components/common/LanguageSwitcher";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../api/auth";
import toast from "react-hot-toast";

const HeaderOne = () => {
	const { user, isAuthenticated, logout } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const chk: HTMLInputElement | null = document.getElementById(
			"check-mode"
		) as HTMLInputElement;
		const modeChk: HTMLInputElement | null = document.getElementById(
			"mode-change"
		) as HTMLInputElement;
		const enableMode: HTMLInputElement | null = document.getElementById(
			"enableMode"
		) as HTMLInputElement;

		const toggleDarkMode = (darkModeStatus: boolean): void => {
			document.body.classList.toggle("dark-mode", darkModeStatus);
		};

		const changeHandler = (event: Event) => {
			const target = event.target as HTMLInputElement;
			const darkModeStatus = target.checked;
			toggleDarkMode(darkModeStatus);
			localStorage.setItem("darkModeStatus", darkModeStatus.toString());
			if (modeChk) modeChk.checked = darkModeStatus;
			if (enableMode) enableMode.checked = darkModeStatus;
		};

		if (chk) {
			chk.addEventListener("change", changeHandler);
			const storedDarkModeStatus = localStorage.getItem("darkModeStatus");
			if (storedDarkModeStatus === "true") {
				toggleDarkMode(true);
				chk.checked = true;
			}
		}

		if (modeChk) {
			modeChk.addEventListener("change", changeHandler);
			const storedDarkModeStatus = localStorage.getItem("darkModeStatus");
			if (storedDarkModeStatus === "true") {
				toggleDarkMode(true);
				modeChk.checked = true;
			}
		}

		if (enableMode) {
			enableMode.addEventListener("change", changeHandler);
			const storedDarkModeStatus = localStorage.getItem("darkModeStatus");
			if (storedDarkModeStatus === "true") {
				toggleDarkMode(true);
				enableMode.checked = true;
			}
		}

		return () => {
			if (chk) chk.removeEventListener("change", changeHandler);
			if (modeChk) modeChk.removeEventListener("change", changeHandler);
			if (enableMode) enableMode.removeEventListener("change", changeHandler);
		};
	}, []);

	const [show, setShow] = React.useState(false);
	const toggleShow = () => {
		setShow(!show);
	};

	const handleLogout = async () => {
		try {
			await authService.logout();
			logout();
			toast.success("Logged out successfully");
			navigate("/signin");
		} catch (error) {
			logout(); // Logout locally anyway
			navigate("/signin");
		}
	};

	return (
		<>
			<section className="wrapper dz-mode">
				<div className="menu d-flex align-items-center justify-content-between">
					<button onClick={toggleShow} className="toggle-btn">
						<img
							src="assets/svg/menu/burger-white.svg"
							alt=""
							className="icon"
						/>
					</button>

					<Link to="/" className="main-logo">
						<img src="/assets/images/logo.png" alt="logo" style={{ height: '28px', objectFit: 'contain' }} />
					</Link>

					<div className="btn-grp d-flex align-items-center gap-16">
						{/* <label
							htmlFor="mode-change"
							className="mode-change d-flex align-items-center justify-content-center"
						>
							<input type="checkbox" id="mode-change" />
							<img
								src="assets/svg/menu/sun-white.svg"
								alt="icon"
								className="sun"
							/>
							<img
								src="assets/svg/menu/moon-white.svg"
								alt="icon"
								className="moon"
							/>
						</label> */}
						<LanguageSwitcher />
					</div>
				</div>
				<div
					className={`m-menu__overlay ${show ? "show" : ""}`}
					onClick={toggleShow}
				></div>

				<div className={`m-menu ${show ? "show" : ""}`}>
					<div className="m-menu__header">
						<button onClick={toggleShow} className="m-menu__close">
							<img src="assets/svg/menu/close-white.svg" alt="icon" />
						</button>
						<div className="menu-user">
							<img src={user?.avatar || "assets/images/profile/avatar.png"} alt="avatar" />
							<div>
								<a href="#!">{user ? `${user.name} ${user.surname}` : "Guest User"}</a>
								<h3>{user ? "Verified user" : "Sign in to access more features"}</h3>
							</div>
						</div>
					</div>
					<ul>
						<li>
							<h2 className="menu-title">menu</h2>
						</li>

						<li>
							<Link to="/" onClick={toggleShow}>
								<div className="d-flex align-items-center gap-16">
									<span className="icon">
										<img src="assets/svg/menu/pie-white.svg" alt="image-here" />
									</span>
									overview
								</div>
								<img
									src="assets/svg/menu/chevron-right-black.svg"
									alt="image-here"
								/>
							</Link>
						</li>

						{isAuthenticated ? (
							<li>
								<button
									onClick={handleLogout}
									className="d-flex align-items-center justify-content-between w-100 bg-transparent border-0 p-0 text-white"
									style={{ textTransform: 'lowercase' }}
								>
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/logout-white.svg" alt="icon" style={{ filter: 'brightness(0) invert(1)' }} />
										</span>
										logout
									</div>
									<img
										src="assets/svg/menu/chevron-right-black.svg"
										alt="icon"
									/>
								</button>
							</li>
						) : (
							<li>
								<Link to="/signin" onClick={toggleShow}>
									<div className="d-flex align-items-center gap-16">
										<span className="icon">
											<img src="assets/svg/menu/profile-white.svg" alt="icon" />
										</span>
										login
									</div>
									<img
										src="assets/svg/menu/chevron-right-black.svg"
										alt="icon"
									/>
								</Link>
							</li>
						)}

						<li>
							<h2 className="menu-title">settings</h2>
						</li>

						<li>
							<Link to="/user-info" onClick={toggleShow}>
								<div className="d-flex align-items-center gap-16">
									<span className="icon">
										<img src="assets/svg/menu/gear-white.svg" alt="icon" />
									</span>
									profile settings
								</div>
								<img
									src="assets/svg/menu/chevron-right-black.svg"
									alt="icon"
								/>
							</Link>
						</li>

						{/* <li className="dz-switch">
							<div className="a-label__chevron">
								<div className="d-flex align-items-center gap-16">
									<span className="icon">
										<img
											src="assets/svg/menu/moon-white.svg"
											alt="image-here"
										/>
									</span>
									switch to dark mode
								</div>
								<label className="toggle-switch" htmlFor="enableMode">
									<input
										type="checkbox"
										id="enableMode"
										className="mode-switch"
									/>
									<span className="slider"></span>
								</label>
							</div>
						</li> */}
					</ul>
				</div>
			</section >
		</>
	);
};

export default HeaderOne;

