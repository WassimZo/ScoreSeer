import BaseModal from "./BaseModal";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseActions";
import { useNavigate } from "react-router-dom";

export default function OnboardingModal() {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const [validation, setValidation] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then((response) => {
      if (response.data.user) {
        const user = response.data.user.id;
        supabase
          .from("points")
          .select("username")
          .eq("user_id", `${user}`)
          .then((response) => {
            if (response.data[0]?.username) {
              navigate("/");
            }
          });
      } else {
        navigate("/login");
      }
    });
  }, []);

  const handleUsername = async (e) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    supabase
      .from("points")
      .insert([
        {
          user_id: `${user.id}`,
          username: `${usernameRef.current.value}`,
        },
      ])
      .then((response) => {
        if (!response.error) {
          navigate("/");
        } else {
          setValidation("Username already used");
          usernameRef.current.value = "";
        }
      });
  };

  return (
    <BaseModal>
      <div className="h-full w-full px-10 flex flex-col dark:text-slate-50">
        <h1 className="mt-10 text-3xl font-bold mb-10">Onboarding</h1>
        <form
          onSubmit={(e) => handleUsername(e)}
          className="w-full flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-medium mb-5">
              Choose a username :{" "}
            </label>
            <input
              ref={usernameRef}
              type="text"
              name="username"
              className="bg-gray-300 rounded-xl pl-4 py-4 text-lg text-black dark:text-slate-50"
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
            Start !
          </button>
        </form>
        <h1 className="text-2xl font-bold pt-4">Concept </h1>
        <div className="text-sm lg:text-lg xl:text-xl">
          <p>
            Every week you have access to all matchs from the Premier League,
            Bundesliga, La Liga, Serie A, Ligue 1 and Champions League. You will
            be able to try to predict the final score of each game, and then get
            points with the following rules :
          </p>
          <br />
          <br />
          <ul>
            <li>
              <b>Find the exact score </b>=&gt; + 5pts.
            </li>
            <li>
              <b>Find the winner but not the good score </b>=&gt; + 3pts.
            </li>
            <li>
              <b>Find nothing </b>=&gt; + 0pts.
            </li>
          </ul>
          <br />
          <span>Take fun and good luck !</span>
        </div>
      </div>
    </BaseModal>
  );
}
