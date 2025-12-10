 
import HeaderOne from "../../../layouts/headers/HeaderOne";
import ScrollTop from "../../common/ScrollTop";
import Onboarding from "./Onboarding"; 

const MainHome = () => {
	return (
		<>
			<HeaderOne />
			<main>
				<Onboarding />
			</main>
			<ScrollTop />
		</>
	);
};

export default MainHome;
