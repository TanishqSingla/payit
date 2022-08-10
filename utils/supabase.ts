import { createClient, Session, User } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPA_URL || '';
const supaKey = process.env.NEXT_PUBLIC_SUPA_KEY || '';

const supabase = createClient(supabaseUrl, supaKey);

export const getUser = async () => {
  const user = await supabase.auth.user();
  return user;
}

export const firstSignOn = async (password: string): Promise<User> => {
  const session = supabase.auth.session();
  if(!session) {
    return Promise.reject(new Error('User not authenticated'));
  }
  supabase.auth.setAuth(session?.access_token);
  const {data, error} = await supabase.auth.update({password})
  if(data) {
    return Promise.resolve(data);
  }
  return Promise.reject(error)
}