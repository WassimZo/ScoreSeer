import SelectLeague from "./SelectLeague";
import MatchCard from "./MatchCard";
import { useSelector, useDispatch } from "react-redux";
import { getAllMatchs } from "../../features/matchs";
import { useSearchParams } from "react-router-dom";
import { getTodayFormattedDate } from "../../lib/supabaseActions";

export default function Home() {
  const dispatch = useDispatch();
  const matchs = useSelector((state) => state.matchs);
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get("date") || getTodayFormattedDate();
  const league = searchParams.get("league");

  dispatch(getAllMatchs());

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
      <section className="w-full flex flex-col gap-4 mt-10 mb-32">
        {matchs.matchs.length > 0 &&
          matchs.matchs.map((match) => {
            if (match.date === date) {
              if (league) {
                if (match.league == league) {
                  return <MatchCard key={match.id} match={match} />;
                }
              } else {
                return <MatchCard key={match.id} match={match} />;
              }
            }
          })}
      </section>
    </div>
  );
}
