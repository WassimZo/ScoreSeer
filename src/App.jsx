import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Home from "./components/home/Home";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import OnboardingModal from "./components/modals/OnboardingModal";
import { useDispatch } from "react-redux";
import { getAllMatchs } from "./features/matchs";

function App() {
  const dispatch = useDispatch();

  return (
    <div className="bg-gray-300 min-h-screen relative">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginModal />} />
          <Route path="/onboarding" element={<OnboardingModal />} />
          <Route path="/register" element={<RegisterModal />} />
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
