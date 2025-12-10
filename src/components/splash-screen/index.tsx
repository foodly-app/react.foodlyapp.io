import { useNavigate } from "react-router-dom";

 
const SplashScreen = () => {

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);  // -1 navigates back to the previous page
  };

  return (
    <>

      <section className="spalsh-screen">
        <div className="circle text-center">
          <div>
            <h1>Travgo</h1>
            <p>Discover Your Destinition</p>
          </div>
        </div>
        <div className="loader-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>


      <div className="appbar">
        <button onClick={handleBack} className="back-page-btn">
          <img src="/assets/svg/menu/back-white.svg" alt="icon" />
        </button>
        <h1>Splash screen</h1>
      </div>
    </>
  );
};

export default SplashScreen;