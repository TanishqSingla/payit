import Head from "next/head";
import { FormEvent, useState } from "react";
import { Button } from "../components/UI/Button";
import { savePayment, supabase } from "../utils/supabase";

export default function CreatePayment() {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		payee: "",
		amount: "",
		fromEnterprise: "",
	});

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		setLoading(true);
		if (formData)
			savePayment(formData)
				.then((data) => fetch("/api/revalidate"))
				.catch((e) => console.log("Error", e))
				.finally(() => setLoading(false));
	};

	return (
		<>
			<Head>
				<title>Payit | Create Payement</title>
				<meta name="description" content="Create payment"></meta>
			</Head>
			<form
				onSubmit={handleSubmit}
				className="max-w-2xl mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-4"
			>
				<div>
					<label htmlFor="payee">Payee</label>
					<input
						className="input"
						name="payee"
						placeholder="Payee"
						onChange={(e) =>
							setFormData({ ...formData, payee: e.target.value })
						}
					/>
				</div>
				<div>
					<label htmlFor="amount">Amount</label>
					<input
						className="input"
						name="amount"
						placeholder="Amount"
						onChange={(e) =>
							setFormData({ ...formData, amount: e.target.value })
						}
					/>
				</div>
				<label htmlFor="fromEnterprise">From</label>
				<div>
					<input
						className="input"
						placeholder="From Enterprise?"
						name="fromEnterprise"
						onChange={(e) =>
							setFormData({
								...formData,
								fromEnterprise: e.target.value,
							})
						}
					/>
				</div>
				<Button type="submit" loading={loading}>
					Submit
				</Button>
			</form>
		</>
	);
}
