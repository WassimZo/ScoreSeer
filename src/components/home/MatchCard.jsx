import React from "react";

export default function MatchCard({ match }) {
  return (
    <div className="w-full bg-white flex flex-col py-4 px-6 rounded-2xl shadow-xl">
      <img
        src={match.league.logo}
        alt="league-logo"
        className="w-10 h-10 mx-auto"
      />
      <div className="w-full flex justify-stretch mt-2">
        <div className="flex flex-col gap-4 items-center w-full">
          <div className="rounded-full bg-gray-400 p-2 w-fit">
            <img
              src={match.homeTeam.logo}
              alt="home team logo"
              className="h-14 w-14"
            />
          </div>
          <span className="font-semibold text-sm text-center">
            {match.homeTeam.name}
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
              src={match.awayTeam.logo}
              alt="home team logo"
              className="h-14 w-14"
            />
          </div>
          <span className="font-semibold text-sm text-center">
            {match.awayTeam.name}
          </span>
        </div>
      </div>
    </div>
  );
}
