import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  matchs: [
    {
      id: 54645,
      homeTeam: {
        id: 465462,
        name: "Manchester United",
        logo: "https://media.api-sports.io/football/teams/33.png",
      },
      awayTeam: {
        id: 65463,
        name: "Liverpool",
        logo: "https://media.api-sports.io/football/teams/40.png",
      },
      league: {
        id: 64653,
        name: "Premier League",
        logo: "https://media-4.api-sports.io/football/leagues/39.png",
      },
      date: "15/05/2023",
      time: "8:00pm",
      place: "Old Trafford Stadium",
      referee: "Michael Oliver",
      scoreHome: undefined,
      scoreAway: undefined,
    },
  ],
};

export const matchs = createSlice({
  name: "matchs",
  initialState,
  reducers: {},
});

export default matchs.reducer;
