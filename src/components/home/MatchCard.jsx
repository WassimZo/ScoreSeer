import { useEffect, useState, useRef } from "react";
import {
  getLeagueById,
  getTeamById,
  insertPronostic,
} from "../../lib/supabaseActions";
import { useNavigate } from "react-router-dom";
import clockIcon from "../../assets/clock-regular.svg";
import stadeIcon from "../../assets/stade.png";
import siffletIcon from "../../assets/sifflet.png";

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
    <div className="w-full bg-white flex flex-col py-4 px-6 rounded-2xl shadow-xl dark:bg-slate-700">
      <img
        src={league?.logo}
        alt="league-logo"
        className="w-10 h-10 mx-auto md:w-14 md:h-14"
      />
      <div className="w-full flex justify-stretch mt-2 sm:mt-4 lg:mt-6 xl:mt-10 2xl:mt-14">
        <div className="flex flex-col gap-4 items-center w-full">
          <div className="rounded-full bg-transparent p-2 w-fit">
            <img
              src={homeTeam?.logo}
              alt="home team logo"
              className="h-14 w-14 md:h-20 md:w-20 xl:w-32 xl:h-32"
            />
          </div>
          <span className="font-semibold text-sm text-center dark:text-slate-50 md:text-xl">
            {homeTeam?.name}
          </span>
        </div>
        {pronostic ? (
          <div className="flex flex-col w-full justify-center gap-8">
            <div
              className={`w-full flex items-center justify-center text-center font-bold text-xl px-4 dark:text-slate-50 md:text-3xl ${
                pronostic.status == 10
                  ? "text-green-700 dark:text-green-400"
                  : pronostic.status == 5
                  ? "text-orange-400 dark:text-orange-400"
                  : pronostic.status == -1
                  ? "text-red-500 dark:text-red-400"
                  : ""
              }`}
            >
              <span className="w-full">{pronostic.homeProno}</span>
              <span className="w-full">-</span>
              <span className="w-full">{pronostic.awayProno}</span>
            </div>
            <div
              className={`${
                match.scoreHome && match.scoreAway
                  ? "w-full flex items-center text-sm text-center xl:text-lg"
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
              className="bg-black text-white text-sm font-bold rounded-2xl px-4 py-2 dark:bg-slate-900 md:px-8 md:py-4 md:text-lg xl:px-12 xl:py-6 xl:text-xl"
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
            <div className="w-full flex gap-2 md:gap-6 lg:gap-16 xl:gap-24 lg:justify-between">
              <input
                ref={homePronoRef}
                type="text"
                className="w-full lg:w-[60%] xl:w-[40%]  border-2 rounded-lg  border-gray-300 pl-2 py-1 md:pl-4 md:py-2 lg:text-lg xl:text-xl bg-gray-300 focus:bg-white font-bold text-sm"
                maxLength="2"
                pattern="\d{1,2}"
                required
              />
              <input
                ref={awayPronoRef}
                type="text"
                className="w-full lg:w-[60%] xl:w-[40%] border-2 rounded-lg  border-gray-300 pl-2 py-1 md:pl-4 md:py-2  lg:text-lg xl:text-xl bg-gray-300 focus:bg-white font-bold text-sm"
                maxLength="2"
                pattern="\d{1,2}"
                required
              />
            </div>
            <input
              type="submit"
              value="Predict"
              className=" bg-black text-white text-sm px-4 py-2 lg:px-6 lg:py-4 lg:text-lg xl:text-xl rounded-xl font-semibold dark:bg-slate-900"
            />
          </form>
        )}

        <div className="flex flex-col gap-4 items-center w-full">
          <div className="rounded-full bg-transparent p-2 w-fit">
            <img
              src={awayTeam?.logo}
              alt="home team logo"
              className="h-14 w-14 md:h-20 md:w-20 xl:w-32 xl:h-32"
            />
          </div>
          <span className="font-semibold text-sm text-center dark:text-slate-50 md:text-xl">
            {awayTeam?.name}
          </span>
        </div>
      </div>
      <div className="hidden md:visible md:flex md:text-gray-500 md:py-4 md:text-sm md:mt-4 dark:text-slate-50 xl:text-lg lg:mt-12">
        <div className="w-full flex items-center justify-center  gap-4">
          <img src={clockIcon} alt="date and time" className="w-4 h-4" />
          <span>{match.date}</span>
          <span> - </span>
          <span>{match.time}</span>
        </div>
        <div className="w-full flex items-center justify-center gap-4">
          <img src={stadeIcon} alt="date and time" className="w-4 h-4" />
          <span>{match.place}</span>
        </div>
        {match.referee && (
          <div className="w-full flex items-center justify-center gap-4">
            <img src={siffletIcon} alt="date and time" className="w-4 h-4" />
            <span>{match.referee}</span>
          </div>
        )}
      </div>
    </div>
  );
}
