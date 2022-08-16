import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabase";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { data, error } = await supabase
		.from("Payments")
		.insert([JSON.parse(req.body)]);
	if (data) {
		res.revalidate('/')
		res.status(200).json(data);
	} else {
		res.status(400).json(error);
	}
}
