import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPA_URL || '';
const supaKey = process.env.NEXT_PUBLIC_SUPA_KEY || '';

const supabase = createClient(supabaseUrl, supaKey);

export const getUser = async () => {
  const user = await supabase.auth.user();
  return user;
}