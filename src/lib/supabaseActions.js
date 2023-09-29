import { createClient } from "@supabase/supabase-js";
import { redirect } from "react-router-dom";
import { store } from "../store";
import { addPronostic, resetPronostics } from "../features/pronostics";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getLeagueById(id) {
  const league = await supabase.from("League").select("*").eq("id", id);
  return league.data[0];
}

export async function getTeamById(id) {
  const team = await supabase.from("Team").select("*").eq("id", id);
  return team.data[0];
}

export function getTodayFormattedDate() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(today.getDate()).padStart(2, "0")}`;
}

export function getWeekFormattedDate() {
  let result = ["Today", "Tomorrow"];
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let i = 2; i <= 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    result.push(
      `${week[date.getDay()]} ${String(date.getDate()).padStart(
        2,
        "0"
      )} / ${String(date.getMonth() + 1).padStart(2, "0")}`
    );
  }
  return result;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  store.dispatch(resetPronostics());
  redirect("/");
  window.location.reload();
}

export async function insertPronostic(newProno) {
  const { data, error } = await supabase
    .from("Pronostic")
    .insert(newProno)
    .select();

  store.dispatch(addPronostic(data[0]));
}
