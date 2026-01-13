
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { authService } from "../../../api/auth";
import toast from "react-hot-toast";

const Otp = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const email = location.state?.email || "";

	const [code, setCode] = useState(["", "", "", ""]);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (!email) {
			navigate("/signup");
		}
	}, [email, navigate]);

	const handleBack = () => {
		navigate(-1);
	};

	const handleChange = (index: number, value: string) => {
		if (value.length > 1) value = value[0];
		const newCode = [...code];
		newCode[index] = value;
		setCode(newCode);

		// Auto-focus next
		if (value && index < 3) {
			const nextInput = document.getElementById(`digit-${index + 2}`);
			nextInput?.focus();
		}
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			const prevInput = document.getElementById(`digit-${index}`);
			prevInput?.focus();
		}
	};

	const handleSubmit = async () => {
		const fullCode = code.join("");
		if (fullCode.length < 4) {
			toast.error("Please enter the full code");
			return;
		}

		setLoading(true);
		try {
			await authService.verifyEmail({ email, code: fullCode });
			setSuccess(true);
			toast.success("Email verified successfully!");
		} catch (error: any) {
			const errorMsg = error.response?.data?.message || "Invalid code";
			toast.error(errorMsg);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<main>
				<section className="auth signin-email enter-otp">
					<div className="page-title">
						<button
							onClick={handleBack}
							type="button"
							className="back-btn back-page-btn d-flex align-items-center justify-content-center rounded-full"
						>
							<img src="/assets/svg/arrow-left-black.svg" alt="Icon" />
						</button>
					</div>

					<div className="heading">
						<h2>Enter OTP</h2>
						<p>
							We have just sent you 4 digit code via your email{" "}
							<span>{email}</span>
						</p>
					</div>

					<div className="auth-form">
						<div className="digit-group">
							{code.map((digit, index) => (
								<input
									key={index}
									type="text"
									id={`digit-${index + 1}`}
									maxLength={1}
									value={digit}
									onChange={(e) => handleChange(index, e.target.value)}
									onKeyDown={(e) => handleKeyDown(index, e)}
									autoFocus={index === 0}
								/>
							))}
						</div>
						<button
							onClick={handleSubmit}
							type="button"
							className="btn-primary"
							disabled={loading}
						>
							{loading ? "Verifying..." : "Continue"}
						</button>
						<h6>
							Did not receive code? <button type="button">Resend Code</button>
						</h6>
					</div>
				</section>
			</main>

			{success && (
				<div
					className="modal fade loginSuccessModal modalBg show d-block"
					id="loginSuccess"
					tabIndex={-1}
					aria-hidden="true"
				>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-body text-center">
								<img src="/assets/svg/check-green.svg" alt="Check" />
								<h3>Account verified successfully</h3>
								<p className="mb-32">
									Your account has been verified. You can now log in and start using our service.
								</p>
								<Link to="/signin-email" className="btn-primary">
									Go to Login
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Otp;

