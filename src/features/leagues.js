import { createSlice } from "@reduxjs/toolkit";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseActions";

const initialState = {
  leagues: [],
};

export const leagues = createSlice({
  name: "leagues",
  initialState,
  reducers: {
    addLeagues: (state, action) => {
      state.leagues = action.payload;
    },
  },
});

export function getLeagues(action) {
  return function (dispatch, getState) {
    supabase
      .from("League")
      .select("*")
      .then((response) => dispatch(addLeagues(response.data)));
  };
}

export const { addLeagues } = leagues.actions;
export default leagues.reducer;
