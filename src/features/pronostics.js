import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "../lib/supabaseActions";

const initialState = {
  pronostics: [],
};

export const pronostics = createSlice({
  name: "pronostics",
  initialState,
  reducers: {
    setPronostics: (state, action) => {
      state.pronostics = action.payload;
    },
    addPronostic: (state, action) => {
      state.pronostics.push(action.payload);
    },
    resetPronostics: (state, action) => {
      state.pronostics = [];
    },
  },
});

export function getUserPronostics(username) {
  return function (dispatch, getState) {
    supabase
      .from("Pronostic")
      .select("*")
      .eq("username", username)
      .then((response) => {
        dispatch(setPronostics(response.data));
      });
  };
}

export const { setPronostics, addPronostic, resetPronostics } =
  pronostics.actions;
export default pronostics.reducer;
