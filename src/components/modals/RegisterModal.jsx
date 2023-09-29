import BaseModal from "./baseModal";
import { supabase } from "../../lib/supabaseActions";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterModal() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const navigate = useNavigate();
  const [validation, setValidation] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value === passwordConfirmationRef.current.value) {
      supabase.auth
        .signUp({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
        .then((response) => {
          if (response.error) {
            throw new Error();
          } else {
            supabase.auth.getUser().then((response) => {
              navigate("/onboarding");
            });
          }
        })
        .catch((err) => {
          setValidation("E-mail already used");
          emailRef.current.value = "";
          passwordRef.current.value = "";
          passwordConfirmationRef.current.value = "";
        });
    } else {
      passwordRef.current.value = "";
      passwordConfirmationRef.current.value = "";
      setValidation("Password missmatch");
    }
  };

  return (
    <BaseModal>
      <div className="h-full w-full px-4 dark:text-slate-50">
        <h1 className="mt-20 text-3xl font-bold mb-10">Register</h1>
        <form
          onSubmit={(e) => handleRegister(e)}
          className="w-full flex flex-col gap-10"
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-5">
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
            <label htmlFor="email" className="text-sm font-medium mb-5">
              Password :{" "}
            </label>
            <input
              type="password"
              name="password"
              ref={passwordRef}
              className="bg-gray-300 rounded-xl pl-4 py-4 text-lg text-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium mb-5">
              Confirm Password :{" "}
            </label>
            <input
              type="password"
              name="password"
              ref={passwordConfirmationRef}
              className="bg-gray-300 rounded-xl pl-4 py-4 text-lg text-black"
            />
          </div>
          {validation && (
            <span className="text-sm font-medium text-red-400">
              {validation}
            </span>
          )}
          <input
            type="submit"
            className="w-52 mx-auto py-4 text-center rounded-full shadow-lg bg-black/80 text-white font-bold text-lg"
            value="Register"
          />
        </form>
      </div>
    </BaseModal>
  );
}
