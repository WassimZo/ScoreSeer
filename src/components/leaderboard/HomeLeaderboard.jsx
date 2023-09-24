import { useDispatch, useSelector } from "react-redux";
import { getLeaderboard } from "../../features/leaderboard";
import { useEffect } from "react";

export default function HomeLeaderboard({ username }) {
  const dispatch = useDispatch();
  const playerState = useSelector((state) => state.players);
  const players = playerState.players;

  useEffect(() => {
    dispatch(getLeaderboard());
  }, [username]);

  const getUserRank = () => {
    if (username) {
      for (let i = 0; i < players.length; i++) {
        if (players[i].username === username) {
          return i;
        }
      }
    } else {
      return 0;
    }
  };

  const getIndexes = () => {
    if (username) {
      for (let i = 0; i < players.length; i++) {
        if (players[i].username === username) {
          if (i > 0 && i < players.length - 1) {
            return [i - 1, i, i + 1];
          }
          if (i == 0) return [i, i + 1, i + 2];
          if (i == players.length - 1) return [i - 2, i - 1, i];
        }
      }
      return [];
    } else {
      return [0, 1, 2];
    }
  };

  const userRank = getUserRank();
  const indexes = getIndexes();

  return (
    <div className="w-full h-full px-4 py-10 flex flex-col mb-32">
      <h1 className="text-black text-4xl font-bold mx-auto mb-8">
        Leaderboard
      </h1>
      <div className="bg-white w-full flex flex-col rounded-2xl p-4">
        <ul>
          {indexes.length > 0 &&
            players.length > 0 &&
            indexes.map((index, i) => (
              <div
                key={i}
                className={`flex px-2 py-4 ${
                  i != indexes.length - 1 ? "border-b-2 border-gray-200" : ""
                }`}
              >
                <span className={`${index == userRank ? "text-blue-500" : ""}`}>
                  {index + 1}{" "}
                </span>
                <span className="font-semibold w-full ml-4">
                  {players[index].username}
                </span>
                <span>{players[index].Points}</span>
              </div>
            ))}
        </ul>
        <span className="text-sm text-gray-500 mx-auto my-4">
          <a href="/leaderboard">See all...</a>
        </span>
      </div>
    </div>
  );
}
