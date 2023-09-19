import { createSlice } from "@reduxjs/toolkit";
import { createClient } from "@supabase/supabase-js";

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
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    supabase
      .from("Match")
      .select("*")
      .eq("date", formattedDate)
      .then((response) => dispatch(addMatchs(response.data)));
  };
}

export function getMatchsByDate(date) {
  return function (dispatch, getState) {
    supabase
      .from("Match")
      .select("*")
      .eq("date", date)
      .then((response) => dispatch(addMatchs(response.data)));
  };
}

export function filterByLeague(leagueId) {
  return function (dispatch, getState) {
    const matchState = getState();
    const filteredMatchs = matchState.matchs.matchs.map((match) =>
      console.log(match)
    );
    console.log(filteredMatchs);
    dispatch(addMatchs(filteredMatchs));
  };
}

export const { addMatchs } = matchs.actions;
export default matchs.reducer;
