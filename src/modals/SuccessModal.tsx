import { Link } from "react-router-dom";

 

const SuccessModal = ({ success }: any) => {
	return (
		<>
			<div
				className={`modal fade orderSuccessModal modalBg ${
					success ? "show" : ""
				}`}
				style={{ display: success ? "block" : "none" }}
				id="orderSuccessModal"
				tabIndex={-1}
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body text-center">
							<img src="/assets/images/booking/thumsup.png" alt="" />
							<h3 className="pt-30">Order Successful</h3>
							<p className="pt-8 pb-30">
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry.
							</p>
							<Link to="/" className="btn-primary">
								Continue
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SuccessModal;
