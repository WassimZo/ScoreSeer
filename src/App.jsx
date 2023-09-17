import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Home from "./components/home/Home";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import OnboardingModal from "./components/modals/OnboardingModal";

function App() {
  return (
    <div className="bg-gray-300 min-h-screen">
      <BrowserRouter>
        <Navbar />
        <Footer />
        <Routes>
          <Route path="/login" element={<LoginModal />} />
          <Route path="/onboarding" element={<OnboardingModal />} />
          <Route path="/register" element={<RegisterModal />} />
          <Route path="/" element={<Home />}></Route>
          <Route path="/leaderboard" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
