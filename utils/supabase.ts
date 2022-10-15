import { createClient, PostgrestResponse } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supaKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supaKey);

export const getPayments = async (): Promise<Payment[]> => {
	const { data, error } = (await supabase
		.from("Payments")
		.select("*")) as PostgrestResponse<Payment>;
	if (error) {
		return Promise.reject(new Error("Unable to get payment details"));
	}
	const sortedData = [...data].sort((a, b) =>
		a.createdAt < b.createdAt ? 1 : -1
	);
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
		.match({ id });
	if (error) {
		return Promise.reject(new Error(error.message));
	}
	return Promise.resolve(data);
};

export const deleteFile = async (filename: string) => {
	const { data, error } = await supabase.storage
		.from("documents")
		.remove([filename]);
	if (error) {
		return Promise.reject(new Error(error.message));
	}
	return Promise.resolve(data);
};

export const isUserAuthenticated = () => {
	const user = supabase.auth.user();
	if (user) {
		return Promise.resolve("user is authenticated");
	}
	return Promise.reject("user is not authenticated");
};

export const supabaseLogin = async ({
	email,
	password,
}: {
	[key: string]: string;
}) => {
	const { user, session, error } = await supabase.auth.signIn({
		email,
		password,
	});
	if (error) {
		Promise.reject(new Error(error?.message));
	}
	Promise.resolve({ user, session });
};

export const supabaseLogout = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) {
		Promise.reject(error.message);
	}
};

export const udpatePassword = async (password: string) => {
	const { user, error } = await supabase.auth.update({ password });
	if (error) {
		Promise.reject(new Error("error updating password"));
	}
	Promise.resolve(user);
};
