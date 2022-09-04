import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "../components/UI/Button";
import { savePayment, supabase } from "../utils/supabase";

export default function CreatePayment() {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState<Partial<Payment>>({
		payee: "",
		amount: "",
		fromEnterprise: "Tanishq Enterprises",
		fileName: null,
		status: "pending",
	});
	const [uploadedFile, setUploadedFile] = useState<File>();
	
	const router = useRouter()

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
							await supabase
								.from("Payments")
								.update({ fileName: null })
								.eq("fileName", uploadedFile.name);
						}
					}
					fetch("/api/revalidate");
				})
				.catch(async (e) => {
					console.table(e);
				})
				.finally(() => {
					setLoading(false)
					router.push('/')
				});
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
				className="max-w-2xl mx-auto rounded px-8 pt-6 pb-8 mb-4 space-y-4 surface"
			>
				<div>
					<label htmlFor="payee">Payee</label>
					<input
						className="input"
						name="payee"
						required
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
					<select
						className="input"
						onChange={(e) =>
							setFormData({
								...formData,
								fromEnterprise: e.target.value,
							})
						}
						placeholder="From Enterprise?"
						value={formData.fromEnterprise}
					>
						<option value="Tanishq Enterprises">
							Tanishq Enterprises
						</option>
						<option value="Vinayak Enterprises">
							Vinayak Enterprises
						</option>
						<option value="SS Enterprises">SS Enterprises</option>
					</select>
				</div>
				<div>
					<label htmlFor="status">Status:</label>
					<select
						className="input"
						value={formData.status}
						onChange={(e) =>
							setFormData({ ...formData, status: e.target.value })
						}
					>
						<option value="pending">Pending</option>
						<option value="done">Done</option>
						<option value="blocked">Blocked</option>
					</select>
				</div>
				<div>
					<label htmlFor="uploadImage">Upload File</label>
					<input type="file" onChange={handleFileUpload} />
				</div>
				<Button className="dark:bg-dark-secondary bg-primary" type="submit" loading={loading}>
					Submit
				</Button>
			</form>
		</>
	);
}
