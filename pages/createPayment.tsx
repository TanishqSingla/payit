import Head from "next/head";
import { FormEvent, useState } from "react";
import { Button } from "../components/UI/Button";

export default function CreatePayment() {
	const [loading, setLoading] = useState(false);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		setLoading(true);
		fetch("/api/savePayment", {
			method: "POST",
			body: JSON.stringify(Object.fromEntries(new FormData(form))),
		})
			.then((_) => {
				console.log("Created Payment Successfully");
			})
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
					<input onChange={e => e.target.value.trim()} className="input" name="payee" placeholder="Payee" />
				</div>
				<div>
					<label htmlFor="password">Amount</label>
					<input
						className="input"
						name="amount"
						placeholder="Amount"
					/>
				</div>
				<label htmlFor="fromEnterprise">From</label>
				<div>
					<input
						className="input"
						placeholder="From Enterprise?"
						name="fromEnterprise"
					/>
				</div>
				<Button loading={loading}>Submit</Button>
			</form>
		</>
	);
}
