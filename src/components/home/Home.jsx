import SelectLeague from "./SelectLeague";
import MatchCard from "./MatchCard";
import HomeLeaderboard from "../leaderboard/HomeLeaderboard";
import { useSelector, useDispatch } from "react-redux";
import { getAllMatchs } from "../../features/matchs";
import { getUserPronostics } from "../../features/pronostics";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getTodayFormattedDate } from "../../lib/supabaseActions";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseActions";

export default function Home({ session }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const matchs = useSelector((state) => state.matchs);
  const pronos = useSelector((state) => state.pronostics);
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get("date") || getTodayFormattedDate();
  const league = searchParams.get("league");
  const [username, setUsername] = useState();
  let result = false;

  useEffect(() => {
    dispatch(getAllMatchs());
  }, []);

  useEffect(() => {
    if (username) dispatch(getUserPronostics(username));
  }, [username]);

  useEffect(() => {
    supabase.auth.getUser().then((response) => {
      if (response.data.user) {
        const user = response.data.user.id;
        supabase
          .from("Points")
          .select("username")
          .eq("user_id", `${user}`)
          .then((response) => {
            if (response.data.length == 0) {
              navigate("/onboarding");
            } else {
              setUsername(response.data[0].username);
            }
          });
      }
    });
  }, []);

  if (session) console.log(pronos.pronostics);

  const handleSelectLeague = (id) => {
    if (searchParams.get("league")) {
      searchParams.delete("league");
    }
    searchParams.append("league", id);
    setSearchParams(searchParams);
  };

  return (
    <div className="w-full h-full flex flex-col px-4 relative">
      <SelectLeague handleLeague={handleSelectLeague} leagueId={league} />
      <section className="w-full flex flex-col gap-4 mt-10 mb-10">
        {matchs.matchs.length > 0 &&
          matchs.matchs.map((match) => {
            const prono = pronos.pronostics.find(
              (prono) => prono.match === match.id
            );
            if (match.date === date) {
              if (league) {
                if (match.league == league) {
                  result = true;
                  return (
                    <MatchCard
                      key={match.id}
                      match={match}
                      username={username}
                      pronostic={prono}
                    />
                  );
                }
              } else {
                result = true;
                return (
                  <MatchCard
                    key={match.id}
                    match={match}
                    username={username}
                    pronostic={prono}
                  />
                );
              }
            }
          })}
        {!result && (
          <div className="w-full min-h-[40vh] flex items-center justify-center">
            <span className="text-lg text-gray-500">
              There is no match{" "}
              {date !== getTodayFormattedDate() ? "this day" : "today"}
            </span>
          </div>
        )}
      </section>
      <HomeLeaderboard username={username} />
    </div>
  );
}
