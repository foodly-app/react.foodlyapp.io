import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { authService } from "../../../api/auth";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";

const SigninEmail = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { login } = useAuth();

	const [email, setEmail] = useState(location.state?.email || "");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleBack = () => {
		navigate(-1);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email || !password) {
			toast.error("Please fill in all fields");
			return;
		}

		setLoading(true);
		try {
			const responseData = await authService.login({ email, password });

			// According to real API structure: { token: "...", user: { id: ..., name: "...", ... } }
			if (responseData && responseData.token) {
				login(responseData.token, responseData.user);
				toast.success("Logged in successfully!");
				navigate("/");
			} else {
				toast.error("Login failed: Invalid response from server");
			}
		} catch (error: any) {
			const errorMsg = error.response?.data?.message || "Invalid credentials";
			toast.error(errorMsg);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<main>
				<section className="auth signin-email">
					<div className="page-title text-center">
						<button
							onClick={handleBack}
							type="button"
							className="back-btn back-page-btn d-flex align-items-center justify-content-center rounded-full"
						>
							<img src="/assets/svg/arrow-left-black.svg" alt="Icon" />
						</button>
						<h3 className="main-title">Sign In</h3>
					</div>
					<div className="auth-form">
						<form onSubmit={handleSubmit}>
							<div className="d-flex flex-column gap-16">
								<div>
									<label htmlFor="lemail2">Email Address</label>
									<input
										type="email"
										id="lemail2"
										placeholder="Enter your email address"
										className="input-field d-block"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
								<div>
									<label htmlFor="lpass">Password</label>
									<div className="position-relative">
										<input
											type={`${showPassword ? "text" : "password"}`}
											id="lpass"
											placeholder="Enter your password"
											className="input-psswd input-field d-block"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
										/>
										<button
											onClick={() => setShowPassword(!showPassword)}
											type="button"
											className="eye-btn"
										>
											<span className={`eye-off ${showPassword ? "d-none" : "d-block"}`}>
												<img src="/assets/svg/eye-off.svg" alt="Eye Off" />
											</span>
											<span className={`eye-on ${showPassword ? "d-block" : "d-none"}`}>
												<img src="/assets/svg/eye-on.svg" alt="Eye On" />
											</span>
										</button>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center gap-8">
										<input
											type="checkbox"
											id="lremember"
											className="input-field-checkbox d-block"
										/>
										<label htmlFor="lremember" className="checkbox-label">
											Remember Me
										</label>
									</div>
									<Link
										to="/recover-password"
										className="fs-14 fw-600 forgot-pass d-inline-block"
									>
										Forgot Password
									</Link>
								</div>
							</div>
							<button type="submit" className="btn-primary mt-24" disabled={loading}>
								{loading ? "Signing In..." : "Sign In"}
							</button>
						</form>

						<div className="divider d-flex align-items-center justify-content-center gap-12">
							<span className="d-inline-block"></span>
							<small className="d-inline-block">Or continue with</small>
							<span className="d-inline-block"></span>
						</div>

						<div className="d-flex flex-column gap-16">
							<button type="button" className="social-btn">
								<img src="/assets/svg/icon-google.svg" alt="Google" />
								Continue with Google
							</button>
							<button type="button" className="social-btn apple">
								<img src="/assets/svg/icon-apple.svg" alt="Apple" />
								Continue with Apple
							</button>
						</div>

						<h6>
							Do not have an account? <Link to="/signup">Sign Up</Link>
						</h6>
					</div>
				</section>
			</main>
		</>
	);
};

export default SigninEmail;

