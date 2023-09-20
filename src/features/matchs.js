import { createSlice } from "@reduxjs/toolkit";
import { createClient } from "@supabase/supabase-js";
import { getTodayFormattedDate } from "../lib/supabaseActions";

const supabaseUrl = "https://odctynkvqgnjtqeubaym.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const initialState = {
  matchs: [],
};

export const matchs = createSlice({
  name: "matchs",
  initialState,
  reducers: {
    addMatchs: (state, action) => {
      state.matchs = action.payload;
    },
  },
});

export function getAllMatchs(action) {
  return function (dispatch, getState) {
    const today = new Date();
    const lastDay = new Date();

    lastDay.setDate(lastDay.getDate() + 7);
    const formattedToday = getTodayFormattedDate();
    const formattedLastday = `${lastDay.getFullYear()}-${String(
      lastDay.getMonth() + 1
    ).padStart(2, "0")}-${String(lastDay.getDate()).padStart(2, "0")}`;

    supabase
      .from("Match")
      .select("*")
      .gte("date", formattedToday)
      .lte("date", formattedLastday)
      .then((response) => dispatch(addMatchs(response.data)));
  };
}

export const { addMatchs } = matchs.actions;
export default matchs.reducer;
