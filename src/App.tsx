

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Otp from "./components/auth/otp";
import AllPages from "./components/all-pages";
import Signup from "./components/auth/signup";
import Signin from "./components/auth/signin";
import MainHome from "./components/homes/home";
import Products from "./components/homes/home-2";
import SignupEmail from "./components/auth/signup-email";
import SigninEmail from "./components/auth/signin-email";
import UserProfile from "./components/profile/user-profile";
import SelectLanguage from "./components/auth/select-language";
import ForgotPassword from "./components/profile/forgot-password";
import CreateNewPassword from "./components/auth/create-new-password";
import ChatArea from "./components/chat/chat-area";
import Message from "./components/chat/message";
import AudioCall from "./components/chat/audio-call";
import VideoCall from "./components/chat/video-call";
import UserInfo from "./components/profile/user-info";
import GuideProfile from "./components/inner-homes/guide-profile";
import UserAddress from "./components/profile/user-address";
import AddAddress from "./components/profile/add-address";
import AddCard from "./components/profile/add-card";
import ChangePassword from "./components/profile/change-password";
import Notifications from "./components/profile/notifications";
import Security from "./components/profile/security";
import UserLanguage from "./components/profile/user-language";
import UserPayment from "./components/profile/user-payment";
import BookHotel from "./components/inner-homes/book-hotel";
import CheckoutHotel from "./components/inner-homes/checkout-hotel";
import Hotels from "./components/inner-homes/hotels";
import HotelDetails from "./components/inner-homes/hotel-details";
import VacationDetails from "./components/inner-homes/vacation-details";
import Wishlist from "./components/profile/wishlist";
import Explore from "./components/profile/explore";
import CheckoutVacation from "./components/inner-homes/checkout-vacation";
import SearchResult from "./components/profile/search-result";
import ServiceLocation from "./components/inner-homes/service-location";
import TicketBooked from "./components/profile/ticket-booked";
import TicketDetail from "./components/profile/ticket-detail";
import TourGuide from "./components/inner-homes/tour-guide";
import Notification from "./components/notification";
import Review from "./components/inner-homes/review";
import Policy from "./components/profile/policy";
import HelpSupport from "./components/profile/help-support";
import SplashScreen from "./components/splash-screen";
import Support from "./components/profile/support";
import Language from "./components/profile/language";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";


const router = createBrowserRouter([
  { path: "/", element: <MainHome /> },
  { path: "/user-profile", element: <UserProfile /> },
  { path: "/home", element: <Products /> },
  { path: "/all-pages", element: <AllPages /> },
  { path: "/signup", element: <Signup /> },
  { path: "/signup-email", element: <SignupEmail /> },
  { path: "/signin", element: <Signin /> },
  { path: "/signin-email", element: <SigninEmail /> },
  { path: "/create-new-password", element: <CreateNewPassword /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/otp", element: <Otp /> },
  { path: "/select-language", element: <SelectLanguage /> },
  { path: "/chat", element: <ChatArea /> },
  { path: "/message", element: <Message /> },
  { path: "/audio-call", element: <AudioCall /> },
  { path: "/video-call", element: <VideoCall /> },
  { path: "/user-info", element: <UserInfo /> },
  { path: "/guide-profile", element: <GuideProfile /> },
  { path: "/user-address", element: <UserAddress /> },
  { path: "/add-address", element: <AddAddress /> },
  { path: "/add-card", element: <AddCard /> },
  { path: "/change-password", element: <ChangePassword /> },
  { path: "/notifications", element: <Notifications /> },
  { path: "/security", element: <Security /> },
  { path: "/user-language", element: <UserLanguage /> },
  { path: "/user-payment", element: <UserPayment /> },
  { path: "/book-hotel", element: <BookHotel /> },
  { path: "/checkout-hotel", element: <CheckoutHotel /> },
  { path: "/hotels", element: <Hotels /> },
  { path: "/hotel-details", element: <HotelDetails /> },
  { path: "/vacation-details", element: <VacationDetails /> },
  { path: "/wishlist", element: <Wishlist /> },
  { path: "/explore", element: <Explore /> },
  { path: "/checkout-vacation", element: <CheckoutVacation /> },
  { path: "/search-result", element: <SearchResult /> },
  { path: "/service-location", element: <ServiceLocation /> },
  { path: "/ticket-booked", element: <TicketBooked /> },
  { path: "/ticket-detail", element: <TicketDetail /> },
  { path: "/tour-guide", element: <TourGuide /> },
  { path: "/notification", element: <Notification /> },
  { path: "/review", element: <Review /> },
  { path: "/policy", element: <Policy /> },
  { path: "/help-support", element: <HelpSupport /> },
  { path: "/splash-screen", element: <SplashScreen /> },
  { path: "/support", element: <Support /> },
  { path: "/language", element: <Language /> },

  //  { path: "*", element: <NotFound />, errorElement: <CustomError /> },
]);



import { useFcm } from "./hooks/useFcm";
import PermissionModal from "./modals/PermissionModal";

import { NotificationProvider } from "./context/NotificationContext";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Toaster position="top-right" />
        <AppContent />
      </NotificationProvider>
    </AuthProvider>
  )
}

function AppContent() {
  const { initializeFcm } = useFcm();

  return (
    <>
      <PermissionModal onEnableNotifications={initializeFcm} />
      <RouterProvider router={router} />
    </>
  );
}

export default App
