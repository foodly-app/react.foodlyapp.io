import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { authService } from "../../../api/auth";
import toast from "react-hot-toast";

const SignupEmail = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [email] = useState(location.state?.email || "");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);

	useEffect(() => {
		if (!email) {
			navigate("/signup");
		}
	}, [email, navigate]);

	const handleBack = () => {
		navigate(-1);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (password !== passwordConfirmation) {
			toast.error("Passwords do not match");
			return;
		}

		setLoading(true);
		try {
			await authService.register({
				first_name: firstName,
				last_name: lastName,
				email,
				password,
				password_confirmation: passwordConfirmation,
			});

			toast.success("Registration successful! Please verify your email.");
			navigate("/otp", { state: { email } });
		} catch (error: any) {
			const errorMsg = error.response?.data?.message || "Registration failed";
			toast.error(errorMsg);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<main>
				<section className="auth signin-email">
					<div className="page-title">
						<button
							onClick={handleBack}
							type="button"
							className="back-btn back-page-btn d-flex align-items-center justify-content-center rounded-full"
						>
							<img src="/assets/svg/arrow-left-black.svg" alt="Icon" />
						</button>
						<h3 className="main-title">Sign Up</h3>
					</div>

					<div className="heading">
						<h2>Complete your account</h2>
						<p>Fill in the details to create your account</p>
					</div>
					<div className="auth-form">
						<form onSubmit={handleSubmit}>
							<div className="d-flex flex-column gap-16">
								<div className="row">
									<div className="col-6">
										<label htmlFor="fname">First Name</label>
										<input
											type="text"
											id="fname"
											placeholder="First name"
											className="input-field d-block"
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
											required
										/>
									</div>
									<div className="col-6">
										<label htmlFor="lname">Last Name</label>
										<input
											type="text"
											id="lname"
											placeholder="Last name"
											className="input-field d-block"
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
											required
										/>
									</div>
								</div>
								<div>
									<label htmlFor="remail2">Email Address</label>
									<input
										type="email"
										id="remail2"
										placeholder="Enter your email address"
										className="input-field d-block"
										value={email}
										readOnly
									/>
								</div>
								<div>
									<label htmlFor="rpass">Password</label>
									<div className="position-relative">
										<input
											type={`${showPassword ? "text" : "password"}`}
											id="rpass"
											placeholder="Enter your password"
											className="input-psswd input-field d-block"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
										/>
										<button
											type="button"
											className="eye-btn"
											onClick={() => setShowPassword(!showPassword)}
										>
											<span className={`eye-off ${showPassword ? "d-none" : ""}`}>
												<img src="/assets/svg/eye-off.svg" alt="Eye Off" />
											</span>
											<span className={`eye-on ${showPassword ? "" : "d-none"}`}>
												<img src="/assets/svg/eye-on.svg" alt="Eye On" />
											</span>
										</button>
									</div>
								</div>
								<div>
									<label htmlFor="rcpass">Confirm Password</label>
									<div className="position-relative">
										<input
											type={`${showPassword2 ? "text" : "password"}`}
											id="rcpass"
											placeholder="Confirm your password"
											className="input-psswd input-field d-block"
											value={passwordConfirmation}
											onChange={(e) => setPasswordConfirmation(e.target.value)}
											required
										/>
										<button
											type="button"
											className="eye-btn"
											onClick={() => setShowPassword2(!showPassword2)}
										>
											<span className={`eye-off ${showPassword2 ? "d-none" : ""}`}>
												<img src="/assets/svg/eye-off.svg" alt="Eye Off" />
											</span>
											<span className={`eye-on ${showPassword2 ? "" : "d-none"}`}>
												<img src="/assets/svg/eye-on.svg" alt="Eye On" />
											</span>
										</button>
									</div>
								</div>
							</div>
							<button type="submit" className="btn-primary mt-24" disabled={loading}>
								{loading ? "Signing Up..." : "Sign Up"}
							</button>
						</form>

						<h6>
							Already have an account? <Link to="/signin">Login</Link>
						</h6>
					</div>
				</section>
			</main>
		</>
	);
};

export default SignupEmail;

