import { createClient } from "@supabase/supabase-js";

// Reads from env - replace with your Supabase project values in .env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // This is intentionally not a hard failure so local dev without env vars still works.
  console.warn("Supabase env variables are not set: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
}

export const supabase = createClient(SUPABASE_URL ?? "", SUPABASE_ANON_KEY ?? "");
