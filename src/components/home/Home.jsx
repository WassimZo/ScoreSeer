import React from "react";
import SearchBar from "./SearchBar";
import SelectLeague from "./SelectLeague";
import MatchCard from "./MatchCard";
import { useSelector } from "react-redux";

export default function Home() {
  const matchs = useSelector((state) => state.matchs);
  const matchList = matchs.matchs;
  return (
    <div className="w-full h-full flex flex-col px-4">
      <SearchBar />
      <SelectLeague />
      <section className="w-full flex flex-col gap-4 mt-10">
        {matchList.map((match) => (
          <MatchCard match={match} />
        ))}
      </section>
    </div>
  );
}
