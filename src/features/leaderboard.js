import { createSlice } from "@reduxjs/toolkit";
import { getTodayFormattedDate } from "../lib/supabaseActions";
import { supabase } from "../lib/supabaseActions";

const initialState = {
  players: [],
};

export const players = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayers: (state, action) => {
      state.players = action.payload;
    },
  },
});

export function getLeaderboard() {
  return function (dispatch, getState) {
    supabase
      .from("points")
      .select("*")
      .order("score", { ascending: false })
      .then((response) => {
        dispatch(addPlayers(response.data));
      });
  };
}

export const { addPlayers } = players.actions;
export default players.reducer;
