import BaseModal from "./BaseModal";
import facebookIcon from "../../assets/facebook.svg";
import googleIcon from "../../assets/google.svg";
import { useRef, useState } from "react";
import { supabase } from "../../lib/supabaseActions";
import { useNavigate } from "react-router-dom";

export default function LoginModal() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [validation, setValidation] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    supabase.auth
      .signInWithPassword({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((response) => {
        if (response.error) {
          throw new Error("Auth error");
        }
        navigate("/onboarding");
      })
      .catch((err) => {
        passwordRef.current.value = "";
        setValidation("Password or email error");
      });
  };

  const handleProviders = async (provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    });
  };

  return (
    <BaseModal>
      <div className="h-full w-full px-4 flex flex-col justify-between dark:text-slate-50">
        <form
          onSubmit={(e) => handleLogin(e)}
          className="w-full flex flex-col gap-4"
        >
          <h1 className="mt-20 text-3xl font-bold mb-10">Login</h1>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-4">
              E-mail address :{" "}
            </label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              className="bg-gray-300 rounded-xl pl-4 py-4 text-lg text-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium mb-4">
              Password :{" "}
            </label>
            <input
              type="password"
              name="password"
              ref={passwordRef}
              className="bg-gray-300 rounded-xl pl-4 py-4 text-lg text-black "
            />
          </div>
          {validation && (
            <span className="text-sm font-medium text-red-400">
              {validation}
            </span>
          )}
          <span className="font-extralight text-black/50 dark:text-slate-50 hover:text-black dark:hover:text-white text-sm">
            <a href="/password-reset">
              <b>Reset your password.</b>
            </a>
          </span>
          <input
            type="submit"
            className="w-52 mx-auto py-4 text-center rounded-full shadow-xl bg-black/80 text-white font-bold text-lg"
            value="Login"
          />
        </form>
        <section className="w-full flex flex-col gap-6 items-center px-10">
          <button
            className="bg-slate-100 w-full py-3 px-4 font-semibold text-black/75 rounded-xl text-lg flex justify-between shadow-xl"
            onClick={(e) => handleProviders("google")}
          >
            <span>Login with Google</span>
            <img src={googleIcon} alt="facebook-icon" className="w-7 h-7" />
          </button>
          <button
            className="bg-blue-500 w-full py-3 px-4 font-semibold text-white rounded-xl text-lg flex justify-between shadow-xl"
            onClick={(e) => handleProviders("facebook")}
          >
            <span>Login with Facebook</span>
            <img src={facebookIcon} alt="facebook-icon" className="w-7 h-7" />
          </button>
        </section>
        <span className="mx-auto mb-4">
          No account yet ?
          <a href="/register">
            <b>
              <i> Register here.</i>
            </b>
          </a>
        </span>
      </div>
    </BaseModal>
  );
}
