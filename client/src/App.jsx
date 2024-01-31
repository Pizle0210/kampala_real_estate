import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HomeScreen } from "./Screens/HomeScreen";
import { AboutScreen } from "./Screens/AboutScreen";
import { SignInScreen } from "./Screens/SignInScreen";
import { SignUpScreen } from "./Screens/SignUpScreen";
import { ErrorScreen } from "./Screens/ErrorScreen";
import { ProfileScreen } from "./Screens/ProfileScreen";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifySuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeButton: true,
    pauseOnHover: false,
    closeOnClick: true,
    draggablePercent: true,
    theme: "dark",
  });
};
export const notifyError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    pauseOnHover: false,
    closeButton: true,
    closeOnClick: true,
    draggablePercent: true,
    theme: "dark",
    progressStyle: true,
  });
};
export const notifyInfo = (message) => {
  toast.info(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    pauseOnHover: false,
    closeButton: true,
    closeOnClick: true,
    draggablePercent: true,
    theme: "dark",
    progressStyle: true,
  });
};

function App() {
  return (
    <>
      <Provider store={store}>
        <div className="flex flex-col min-h-screen justify-between w-screen ">
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/login" element={<SignInScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="*" element={<ErrorScreen />} />
            </Routes>
          </Router>
          <Footer />
        </div>
        <ToastContainer />
      </Provider>
    </>
  );
}

export default App;
