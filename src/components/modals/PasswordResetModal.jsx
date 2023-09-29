import { useEffect, useRef, useState } from "react";
import BaseModal from "./BaseModal";
import { supabase } from "../../lib/supabaseActions";

export default function PasswordResetModal() {
  const emailRef = useRef();
  const [sent, setSent] = useState(false);
  const [validation, setValidation] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    let { data, error } = await supabase.auth.resetPasswordForEmail(
      emailRef.current.value
    );
    if (!error) {
      setSent(true);
    } else {
      setValidation("E-mail not found");
    }
  };

  return (
    <BaseModal>
      <div className="h-full w-full px-10 flex flex-col dark:text-slate-50">
        <h1 className="mt-10 text-3xl font-bold mb-10">Reset password</h1>
        {!sent ? (
          <form
            onSubmit={(e) => handleResetPassword(e)}
            className="w-full flex flex-col gap-4"
          >
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium mb-5">
                Enter your e-mail address :{" "}
              </label>
              <input
                ref={emailRef}
                type="email"
                name="email"
                className="bg-gray-300 rounded-xl pl-4 py-4 text-lg dark:text-slate-900"
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
              Reset
            </button>
          </form>
        ) : (
          <h1 className="w-full py-10 text-center text-xl text-slate-900 dark:text-slate-50">
            You received an e-mail with the link to update your password !
          </h1>
        )}
      </div>
    </BaseModal>
  );
}
