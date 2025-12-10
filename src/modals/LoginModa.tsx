 
import { Link } from "react-router-dom";

const LoginModa = ({ loginModal, setLoginModal }: any) => {
	return (
		<>
			<div
				className={`modal fade loginSuccessModal modalBg ${
					loginModal ? "show" : ""
				}`}
				style={{ display: loginModal ? "block" : "none" }}
				id="loginSuccess"
				tabIndex={-1}
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body text-center">
							<img src="/assets/svg/check-green.svg" alt="Check" />
							<h3>You have logged in successfully</h3>
							<p className="mb-32">
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry.
							</p>
							<Link
								to="/home"
								onClick={() => setLoginModal(false)}
								className="btn-primary"
							>
								Continue
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginModa;
