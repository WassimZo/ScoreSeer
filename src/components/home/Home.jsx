import SearchBar from "./SearchBar";
import SelectLeague from "./SelectLeague";
import MatchCard from "./MatchCard";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllMatchs,
  getMatchsByDate,
  filterByLeague,
} from "../../features/matchs";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const matchs = useSelector((state) => state.matchs);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("date")) {
      dispatch(getMatchsByDate(searchParams.get("date")));
    } else {
      dispatch(getAllMatchs());
    }

    if (searchParams.get("league")) {
      dispatch(filterByLeague(searchParams.get("league")));
    }
  }, [searchParams]);

  const handleSelectLeague = (id) => {
    if (searchParams.get("league")) {
      searchParams.delete("league");
    }
    searchParams.append("league", id);
    setSearchParams(searchParams);
  };

  return (
    <div className="w-full h-full flex flex-col px-4 relative">
      <SearchBar />
      <SelectLeague handleClick={handleSelectLeague} />
      <section className="w-full flex flex-col gap-4 mt-10 mb-32">
        {matchs?.matchs?.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </section>
    </div>
  );
}
