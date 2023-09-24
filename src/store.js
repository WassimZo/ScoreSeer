import { configureStore } from "@reduxjs/toolkit";
import matchs from "./features/matchs";
import leagues from "./features/leagues";
import players from "./features/leaderboard";
import pronostics from "./features/pronostics";

export const store = configureStore({
  reducer: {
    matchs,
    leagues,
    players,
    pronostics,
  },
});
