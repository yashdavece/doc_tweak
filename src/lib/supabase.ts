import { createClient } from "@supabase/supabase-js";

// Reads from env - replace with your Supabase project values in .env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Supabase environment variables are not set. Please check that VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are defined in your .env file or deployment environment."
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
