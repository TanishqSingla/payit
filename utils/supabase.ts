import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supaKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supaKey);

export const getPayements = async (): Promise<Payment[]> => {
	const { data, error } = await supabase.from("Payments").select("*");
	if (error) {
		return Promise.reject(new Error("Unable to get payment details"));
	}
	return Promise.resolve(data);
};

export const savePayment = async (payload: any) => {
	const { data, error } = await supabase.from("Payments").insert(payload);
	if (error) {
		return Promise.reject(new Error("Unable to save payment"));
	}
	return Promise.resolve(data);
};
