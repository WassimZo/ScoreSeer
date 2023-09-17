import { configureStore } from "@reduxjs/toolkit";
import matchs from "./features/matchs";

export const store = configureStore({
  reducer: {
    matchs,
  },
});
