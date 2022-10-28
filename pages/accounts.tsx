import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import { getAccountDetails, isUserAuthenticated } from "../utils/supabase";

export default function Accounts() {
	const [loading, setLoading] = useState(false);
	const [details, setDetails] = useState<any>();

	const router = useRouter();

	const getDetails = () => {
		getAccountDetails()
			.then((data) => setDetails(data))
			.catch((e) => console.log(e))
			.finally(() => setLoading(false));
	};

	const handleRefresh = () => {
		setLoading(true);
		getDetails();
	};

	useEffect(() => {
		setLoading(true);
		isUserAuthenticated()
			.then(() => setLoading(false))
			.catch((_) => router.replace("/"));
	}, [router]);

	useEffect(() => getDetails(), []);

	return (
		<>
			<Head>
				<title>Payit | Accounts</title>
			</Head>
			<main className="myContainer">
				<button
					className="flex items-center surface-text"
					onClick={handleRefresh}
				>
					<HiOutlineRefresh className={loading ? "animate-spin" : ""} />
					Refresh
				</button>
				<div className="max-w-3xl mx-auto space-y-4">
					{details &&
						details.map((account: AccountDetails, index: number) => {
							return (
								<div className="account-detail" key={index}>
									<p>{account.name}</p>
									<input className="amount" value={account.amount} />
								</div>
							);
						})}
				</div>
			</main>
		</>
	);
}
