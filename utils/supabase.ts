import { createClient, PostgrestResponse } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supaKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supaKey);

export const getPayements = async (): Promise<Payment[]> => {
	const { data, error } = await supabase.from("Payments").select("*") as PostgrestResponse<Payment>;
	if (error) {
		return Promise.reject(new Error("Unable to get payment details"));
	}
	const sortedData = [...data].sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)
	return Promise.resolve(sortedData);
};

export const savePayment = async (payment: Partial<Payment>) => {
	const { data, error } = await supabase.from("Payments").insert(payment);
	if (error) {
		return Promise.reject(new Error("Unable to save payment"));
	}
	return Promise.resolve(data);
};

export const updateStatus = async (status: string, id: string) => {
	const { data, error } = await supabase
		.from("Payments")
		.update({ status })
		.eq("id", id);
	if (error) {
		return Promise.reject(new Error(error.message));
	}
	return Promise.resolve(data);
};

export const deletePayment = async (id: string) => {
	const { data, error } = await supabase
		.from("Payments")
		.delete()
		.eq("id", id);
	if (error) {
		return Promise.reject(new Error(error.message));
	}
	return Promise.resolve(data);
};

export const deleteFile = async (filename: string) => {
	const {data, error} = await supabase.storage.from('documents').remove([filename])
	if(error) {
		return Promise.reject(new Error(error.message))
	}
	return Promise.resolve(data);
}

export const isUserAuthenticated = () => {
	const user = supabase.auth.user();
	return user ? true : false;
}