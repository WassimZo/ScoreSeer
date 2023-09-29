import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Home from "./components/home/Home";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import OnboardingModal from "./components/modals/OnboardingModal";
import Leaderboard from "./components/leaderboard/Leaderboard";
import { supabase } from "./lib/supabaseActions";
import { useEffect, useState } from "react";
import PasswordResetModal from "./components/modals/PasswordResetModal";
import UpdatePasswordModal from "./components/modals/UpdatePasswordModal";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="bg-gray-300 min-h-screen relative dark:bg-slate-900">
      <BrowserRouter>
        <Navbar session={session} />
        <Routes>
          <Route path="/login" element={<LoginModal />} />
          <Route path="/onboarding" element={<OnboardingModal />} />
          <Route path="/register" element={<RegisterModal />} />
          <Route path="/" element={<Home session={session} />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/password-reset" element={<PasswordResetModal />} />
          <Route path="/password-update" element={<UpdatePasswordModal />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
