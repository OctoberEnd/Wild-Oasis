import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://rtgbkkmechabzrxtfaaw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0Z2Jra21lY2hhYnpyeHRmYWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4MTc3NTIsImV4cCI6MjA1MzM5Mzc1Mn0.DJAawMhRf9eWRpFRxHLKxkaz8OsZZZ5Qzw5_qaYDNJk";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
