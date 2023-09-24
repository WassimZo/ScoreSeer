import { useEffect, useState, useRef } from "react";
import {
  getLeagueById,
  getTeamById,
  insertPronostic,
} from "../../lib/supabaseActions";
import { useNavigate } from "react-router-dom";

export default function MatchCard({ match, pronostic, username }) {
  const navigate = useNavigate();
  const [league, setLeague] = useState();
  const [homeTeam, setHomeTeam] = useState();
  const [awayTeam, setAwayTeam] = useState();
  const [toggleForm, setToggleForm] = useState(false);
  const homePronoRef = useRef();
  const awayPronoRef = useRef();

  const fetchData = async () => {
    setLeague(await getLeagueById(match.league));
    setHomeTeam(await getTeamById(match.homeTeam));
    setAwayTeam(await getTeamById(match.awayTeam));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    if (username) setToggleForm(true);
    else navigate("/login");
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const newProno = {
      homeProno: homePronoRef.current.value,
      awayProno: awayPronoRef.current.value,
      match: match.id,
      username: username,
    };
    insertPronostic(newProno);
  };

  useEffect(() => {
    if (!username) setToggleForm(false);
  }, [username]);

  return (
    <div className="w-full bg-white flex flex-col py-4 px-6 rounded-2xl shadow-xl">
      <img src={league?.logo} alt="league-logo" className="w-10 h-10 mx-auto" />
      <div className="w-full flex justify-stretch mt-2">
        <div className="flex flex-col gap-4 items-center w-full">
          <div className="rounded-full bg-transparent p-2 w-fit">
            <img
              src={homeTeam?.logo}
              alt="home team logo"
              className="h-14 w-14"
            />
          </div>
          <span className="font-semibold text-sm text-center">
            {homeTeam?.name}
          </span>
        </div>
        {pronostic ? (
          <div
            className={`w-full flex items-center justify-center text-center font-bold text-xl px-4 ${
              pronostic.status == 10
                ? "text-green-700"
                : pronostic.status == 5
                ? "text-orange-400"
                : pronostic.status == -1
                ? "text-red-500"
                : ""
            }`}
          >
            <span className="w-full">{pronostic.homeProno}</span>
            <span className="w-full">-</span>
            <span className="w-full">{pronostic.awayProno}</span>
            <div
              className={`${
                match.scoreHome && match.scoreAway
                  ? "w-full flex items-center text-sm"
                  : "hidden"
              }`}
            >
              <span className="w-full">{match.scoreHome}</span>
              <span className="w-full">-</span>
              <span className="w-full">{match.scoreAway}</span>
            </div>
          </div>
        ) : !toggleForm ? (
          <div className="flex items-center justify-center w-full">
            <button
              className="bg-black text-white text-sm font-bold rounded-2xl px-4 py-2 "
              onClick={handleClick}
            >
              Predict
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => handleForm(e)}
            className="w-full flex flex-col items-center justify-center gap-4"
          >
            <div className="w-full flex gap-2">
              <input
                ref={homePronoRef}
                type="text"
                className="w-full border-2 rounded-lg  border-gray-300 pl-2 py-1 bg-gray-300 focus:bg-white font-bold text-sm"
                maxLength="2"
                pattern="\d{1,2}"
                required
              />
              <input
                ref={awayPronoRef}
                type="text"
                className="w-full border-2 rounded-lg  border-gray-300 pl-2 py-1 bg-gray-300 focus:bg-white font-bold text-sm"
                maxLength="2"
                pattern="\d{1,2}"
                required
              />
            </div>
            <input
              type="submit"
              value="Predict"
              className=" bg-black text-white text-sm px-4 py-2 rounded-xl font-semibold"
            />
          </form>
        )}

        <div className="flex flex-col gap-4 items-center w-full">
          <div className="rounded-full bg-transparent p-2 w-fit">
            <img
              src={awayTeam?.logo}
              alt="home team logo"
              className="h-14 w-14"
            />
          </div>
          <span className="font-semibold text-sm text-center">
            {awayTeam?.name}
          </span>
        </div>
      </div>
    </div>
  );
}
