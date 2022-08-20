import Head from "next/head";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "../components/UI/Button";
import { savePayment, supabase } from "../utils/supabase";

export default function CreatePayment() {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		payee: "",
		amount: "",
		fromEnterprise: "",
		fileName: "",
	});
	const [uploadedFile, setUploadedFile] = useState<File>();

	useEffect(() => {
		if (uploadedFile?.name) {
			setFormData((prevState) => ({
				...prevState,
				fileName: uploadedFile.name,
			}));
		}
	}, [uploadedFile]);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		setLoading(true);
		if (formData)
			savePayment(formData)
				.then(async (_) => {
					if (uploadedFile) {
						const { data, error } = await supabase.storage
							.from("documents")
							.upload(uploadedFile.name, uploadedFile);
						if (error) {
							await supabase.from("Payments").update({fileName: null}).eq('fileName', uploadedFile.name)
						}
					}
					fetch("/api/revalidate");
				})
				.catch(async (e) => {
					console.table(e)
				})
				.finally(() => setLoading(false));
	};

	const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) {
			return;
		}

		setUploadedFile(event.target.files[0]);
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
						value={formData.payee}
					/>
				</div>
				<div>
					<label htmlFor="amount">Amount</label>
					<input
						className="input"
						name="amount"
						placeholder="Amount"
						onChange={(e) =>
							setFormData({
								...formData,
								amount: e.target.value.trim(),
							})
						}
						value={formData.amount}
					/>
				</div>
				<div>
					<label htmlFor="fromEnterprise">From</label>
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
						value={formData.fromEnterprise}
					/>
				</div>
				<div>
					<label htmlFor="uploadImage"></label>
					<input type="file" onChange={handleFileUpload} />
				</div>
				<Button type="submit" loading={loading}>
					Submit
				</Button>
			</form>
		</>
	);
}
