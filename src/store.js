import { configureStore } from "@reduxjs/toolkit";
import matchs from "./features/matchs";
import leagues from "./features/leagues";

export const store = configureStore({
  reducer: {
    matchs,
    leagues,
  },
});
