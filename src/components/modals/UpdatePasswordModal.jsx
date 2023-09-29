import { useEffect, useRef, useState } from "react";
import BaseModal from "./BaseModal";
import { supabase } from "../../lib/supabaseActions";
import { useNavigate } from "react-router-dom";

export default function UpdatePasswordModal() {
  const navigate = useNavigate();
  const passwdRef = useRef();
  const confirmPasswdRef = useRef();
  const [validation, setValidation] = useState(null);

  useEffect(() => {
    supabase.auth.getUser((response) => {
      if (!response.data.user) navigate("/");
    });
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwdRef.current.value === confirmPasswdRef.current.value) {
      const { data, error } = await supabase.auth.updateUser({
        password: passwdRef.current.value,
      });
      if (!error) {
        navigate("/");
      } else {
        setValidation("An error has occured, Retry please");
      }
    } else {
      setValidation("Password missmatch");
      passwdRef.current.value = "";
      confirmPasswdRef.current.value = "";
    }
  };
  return (
    <BaseModal passwd={true}>
      <div className="h-full w-full px-10 flex flex-col dark:text-slate-50">
        <h1 className="mt-10 text-3xl font-bold mb-10">Reset password</h1>
        <form
          onSubmit={(e) => handleUpdatePassword(e)}
          className="w-full flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium mb-5">
              Enter your new password :{" "}
            </label>
            <input
              ref={passwdRef}
              type="password"
              name="password"
              className="bg-gray-300 rounded-xl pl-4 py-4 text-lg text-black"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="confirm" className="text-sm font-medium mb-5">
              Confirm your new password :{" "}
            </label>
            <input
              ref={confirmPasswdRef}
              type="password"
              name="confirm"
              className="bg-gray-300 rounded-xl pl-4 py-4 text-lg text-black"
            />
          </div>
          {validation && (
            <span className="text-sm text-red-400 xl:text-lg text-center">
              {validation}
            </span>
          )}
          <button
            type="submit"
            className="mx-auto rounded-full bg-black/80 py-4 px-6 shadow-lg text-white font-bold text-lg absolute bottom-4 left-[50%] translate-x-[-50%]"
          >
            Update Password
          </button>
        </form>
      </div>
    </BaseModal>
  );
}
