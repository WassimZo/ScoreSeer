import BaseModal from "./baseModal";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseActions";
import { useNavigate } from "react-router-dom";

export default function OnboardingModal() {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const [validation, setValidation] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then((response) => {
      if (response.data.user) {
        const user = response.data.user.id;
        supabase
          .from("Points")
          .select("username")
          .eq("user_id", `${user}`)
          .then((response) => {
            if (response.data[0].username) {
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
          setValidation(response.error.message);
        }
      });
  };

  return (
    <BaseModal>
      <div className="h-full w-full px-4 flex flex-col dark:text-slate-50">
        <h1 className="mt-32 text-3xl font-bold mb-10">Onboarding</h1>
        <form
          onSubmit={(e) => handleUsername(e)}
          className="w-full flex flex-col gap-10"
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
            <span className="text-sm font-medium text-red-400">
              {validation}
            </span>
          )}
          <h1 className="text-2xl font-bold mt-10 mb-6">Concept </h1>
          <p className="text-sm px-2">
            Every week you have access to all matchs from the Premier League,
            Bundesliga, La Liga, Serie A, Ligue 1 and Champions League. You will
            be able to try to predict the final score of each game, and then get
            points with the following rules :
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
            Take fun and good luck !
          </p>

          <button
            type="submit"
            className="mx-auto rounded-full bg-black/80 py-4 px-6 shadow-lg text-white font-bold mt-10 text-lg"
          >
            Start !
          </button>
        </form>
      </div>
    </BaseModal>
  );
}
