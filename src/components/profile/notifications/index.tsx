import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFcm } from "../../../hooks/useFcm";
import toast from "react-hot-toast";

const Notifications = () => {
	const navigate = useNavigate();
	const { requestPermission, hasPermission } = useFcm();

	// State for notification preferences
	const [pushEnabled, setPushEnabled] = useState(false);
	const [paymentReminder, setPaymentReminder] = useState(true);
	const [scheduleReminder, setScheduleReminder] = useState(true);
	const [messageNotif, setMessageNotif] = useState(true);
	const [callNotif, setCallNotif] = useState(true);

	// Load preferences from localStorage on mount
	useEffect(() => {
		const prefs = localStorage.getItem('notificationPreferences');
		if (prefs) {
			const parsed = JSON.parse(prefs);
			setPaymentReminder(parsed.paymentReminder ?? true);
			setScheduleReminder(parsed.scheduleReminder ?? true);
			setMessageNotif(parsed.messageNotif ?? true);
			setCallNotif(parsed.callNotif ?? true);
		}

		// Check if push notifications are enabled
		setPushEnabled(hasPermission);
	}, [hasPermission]);

	// Save preferences to localStorage
	const savePreferences = (key: string, value: boolean) => {
		const prefs = {
			paymentReminder,
			scheduleReminder,
			messageNotif,
			callNotif,
			[key]: value
		};
		localStorage.setItem('notificationPreferences', JSON.stringify(prefs));
	};

	const handleBack = () => {
		navigate(-1);
	};

	const handlePushToggle = async () => {
		if (!pushEnabled) {
			// Request permission
			const granted = await requestPermission();
			if (granted) {
				setPushEnabled(true);
				toast.success("Push notifications enabled!");
			} else {
				toast.error("Push notification permission denied");
			}
		} else {
			// Disable push notifications
			setPushEnabled(false);
			toast.success("Push notifications disabled");
		}
	};

	const handleToggle = (key: string, setter: (val: boolean) => void, currentValue: boolean) => {
		const newValue = !currentValue;
		setter(newValue);
		savePreferences(key, newValue);
	};

	return (
		<>
			<main>
				<div className="page-title">
					<button
						type="button"
						onClick={handleBack}
						className="back-btn back-page-btn d-flex align-items-center justify-content-center rounded-full"
					>
						<img src="/assets/svg/arrow-left-black.svg" alt="arrow" />
					</button>
					<h3 className="main-title">Notifications</h3>
				</div>

				<section className="msg-notifications px-24">
					{/* Push Notifications Section */}
					<div className="border-box mb-16">
						<h5>Push Notifications</h5>
						<p className="fs-14 color-secondary mb-16">
							Receive real-time notifications about your reservations and updates
						</p>
						<ul>
							<li className="d-flex align-items-center justify-content-between">
								<div>
									<p className="fw-600">Enable Push Notifications</p>
									<small className="color-gray">
										{pushEnabled ? "Browser notifications are enabled" : "Enable to receive instant updates"}
									</small>
								</div>
								<label className="toggle-switch">
									<input
										type="checkbox"
										className="mode-switch"
										checked={pushEnabled}
										onChange={handlePushToggle}
									/>
									<span className="slider"></span>
								</label>
							</li>
						</ul>
					</div>

					{/* Messages Notifications Section */}
					<div className="border-box">
						<h5>Messages Notifications</h5>
						<ul>
							<li className="d-flex align-items-center justify-content-between">
								<p>Payment Reminder</p>
								<label className="toggle-switch">
									<input
										type="checkbox"
										className="mode-switch"
										checked={paymentReminder}
										onChange={() => handleToggle('paymentReminder', setPaymentReminder, paymentReminder)}
									/>
									<span className="slider"></span>
								</label>
							</li>
							<li className="d-flex align-items-center justify-content-between">
								<p>Schedule Reminder</p>
								<label className="toggle-switch">
									<input
										type="checkbox"
										className="mode-switch"
										checked={scheduleReminder}
										onChange={() => handleToggle('scheduleReminder', setScheduleReminder, scheduleReminder)}
									/>
									<span className="slider"></span>
								</label>
							</li>
							<li className="d-flex align-items-center justify-content-between">
								<p>Message</p>
								<label className="toggle-switch">
									<input
										type="checkbox"
										className="mode-switch"
										checked={messageNotif}
										onChange={() => handleToggle('messageNotif', setMessageNotif, messageNotif)}
									/>
									<span className="slider"></span>
								</label>
							</li>
							<li className="d-flex align-items-center justify-content-between">
								<p>Call</p>
								<label className="toggle-switch">
									<input
										type="checkbox"
										className="mode-switch"
										checked={callNotif}
										onChange={() => handleToggle('callNotif', setCallNotif, callNotif)}
									/>
									<span className="slider"></span>
								</label>
							</li>
						</ul>
					</div>
				</section>
			</main>
		</>
	);
};

export default Notifications;
