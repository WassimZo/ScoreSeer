import React, { useEffect, useState } from "react";
import { getLeaderboard } from "../../features/leaderboard";
import { useSelector, useDispatch } from "react-redux";

export default function Leaderboard() {
  const dispatch = useDispatch();
  const playerState = useSelector((state) => state.players);
  const players = playerState.players;

  useEffect(() => {
    dispatch(getLeaderboard());
  }, []);

  return (
    <div className="w-full h-full px-4 py-10 flex flex-col">
      <h1 className="text-white text-4xl font-bold mx-auto mb-8">
        Leaderboard
      </h1>
      <div className="bg-white w-full flex flex-col rounded-2xl p-4 dark:text-slate-50 dark:bg-slate-700">
        <ul>
          {players.length > 0 &&
            players.map((player, index) => (
              <div
                key={index}
                className={`flex px-2 py-4 ${
                  index != players.length - 1
                    ? "border-b-2 border-gray-200"
                    : ""
                }`}
              >
                <span
                  className={`${
                    index + 1 == 1 ? "text-blue-500 dark:text-blue-300" : ""
                  }`}
                >
                  {index + 1}{" "}
                </span>
                <span className="font-semibold w-full ml-4">
                  {player.username}
                </span>
                <span>{player.Points}</span>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
}
