import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://odctynkvqgnjtqeubaym.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getLeagueById(id) {
  const league = await supabase.from("League").select("*").eq("id", id);
  return league.data[0];
}

export async function getTeamById(id) {
  const team = await supabase.from("Team").select("*").eq("id", id);
  return team.data[0];
}
