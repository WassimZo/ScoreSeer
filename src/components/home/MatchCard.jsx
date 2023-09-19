import { useEffect, useState } from "react";
import { getLeagueById, getTeamById } from "../../lib/supabaseActions";

export default function MatchCard({ match }) {
  const [league, setLeague] = useState();
  const [homeTeam, setHomeTeam] = useState();
  const [awayTeam, setAwayTeam] = useState();

  useEffect(() => {
    async function fetchData() {
      setLeague(await getLeagueById(match.league));
      setHomeTeam(await getTeamById(match.homeTeam));
      setAwayTeam(await getTeamById(match.awayTeam));
    }
    fetchData();
  }, []);

  return (
    <div className="w-full bg-white flex flex-col py-4 px-6 rounded-2xl shadow-xl">
      <img src={league?.logo} alt="league-logo" className="w-10 h-10 mx-auto" />
      <div className="w-full flex justify-stretch mt-2">
        <div className="flex flex-col gap-4 items-center w-full">
          <div className="rounded-full bg-gray-400 p-2 w-fit">
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
        <div className="flex items-center justify-center w-full">
          <button className="bg-gray-400 text-white text-sm font-bold rounded-2xl px-4 py-2 ">
            Predict
          </button>
        </div>
        <div className="flex flex-col gap-4 items-center w-full">
          <div className="rounded-full bg-gray-400 p-2 w-fit">
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
