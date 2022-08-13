import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supaKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supaKey);

export const getPayements = async () => {
  const {data: Payments, error} = await supabase.from('Payments').select('id,amount');
  return Payments
}