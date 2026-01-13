
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderOne from "../../../layouts/headers/HeaderOne";
import { authService } from "../../../api/auth";
import toast from "react-hot-toast";

const Signup = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email) {
			toast.error("Please enter your email");
			return;
		}

		setLoading(true);
		try {
			const response = await authService.checkEmail({ email });
			if (response.verified !== undefined) {
				// According to API: { message, email, verified: true }
				navigate("/signup-email", { state: { email } });
			} else {
				toast.error(response.message || "Enter a valid email");
			}
		} catch (error: any) {
			toast.error(error.response?.data?.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<main className="auth-main">
				<HeaderOne />

				<section className="auth signin">
					<div className="heading">
						<h2>Create account</h2>
						<p>Lorem ipsum dolor sit amet</p>
					</div>

					<div className="form-area auth-form">
						<form onSubmit={handleSubmit}>
							<div>
								<label htmlFor="remail1">Email</label>
								<input
									type="email"
									id="remail1"
									placeholder="Enter your email address"
									className="input-field"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<button type="submit" className="btn-primary mt-24" disabled={loading}>
								{loading ? "Checking..." : "Continue with Email"}
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
							Already have an account? <Link to="/signin">Login</Link>
						</h6>
					</div>
				</section>
			</main>
		</>
	);
};

export default Signup;

