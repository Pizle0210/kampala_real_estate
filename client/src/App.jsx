import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HomeScreen } from "./Screens/HomeScreen";
import { AboutScreen } from "./Screens/AboutScreen";
import { SignInScreen } from "./Screens/SignInScreen";
import { SignOutScreen } from "./Screens/SignOutScreen";
import { ErrorPage } from "./Screens/ErrorPage";
import { ProfileScreen } from "./Screens/ProfileScreen";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/login" element={<SignInScreen />} />
          <Route path="/logout" element={<SignOutScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
