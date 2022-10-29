import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import { Spinner } from "../components/UI/Spinner";
import {
	getAccountDetails,
	isUserAuthenticated,
	updateAccountAmount,
} from "../utils/supabase";

export default function Accounts() {
	const [loading, setLoading] = useState(false);
	const [details, setDetails] = useState<AccountDetails[]>();
	const [isDisable, setIsDisable] = useState(true);

	const router = useRouter();

	const amountInput = useRef<string>();

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
			.then(() => {
				getDetails();
			})
			.catch((_) => router.replace("/"))
			.finally(() => setLoading(false));
	}, [router]);

	const debounceInput = (amount: string, account: AccountDetails) => {
		if (amountInput.current === amount) {
			return;
		}
		amountInput.current = amount;
		updateAccountAmount(account.id, amount).finally(() => setIsDisable(true));
	};

	const onAmountChange = async (
		e: React.ChangeEvent<HTMLInputElement>,
		account: AccountDetails
	) => {
		let timer;
		clearTimeout(timer);
		timer = setTimeout(() => {
			debounceInput(e.target.value, account);
		}, 3000);
	};

	return (
		<>
			<Head>
				<title>Payit | Accounts</title>
				<meta name="description" content="Account details" />
			</Head>
			{loading ? (
				<Spinner />
			) : (
				<main className="myContainer">
					<div className="flex justify-between max-w-3xl mx-auto">
						<button
							className="flex items-center surface-text"
							onClick={handleRefresh}
						>
							<HiOutlineRefresh className={loading ? "animate-spin" : ""} />
							Refresh
						</button>
						<button
							onClick={() => setIsDisable(!isDisable)}
							className="surface-text"
						>
							{isDisable ? "Edit" : "Stop Edit"}
						</button>
					</div>
					<div className="max-w-3xl mx-auto space-y-4">
						{details &&
							details.map((account: AccountDetails) => {
								return (
									<div className="account-detail" key={account.id}>
										<p>{account.name}</p>
										<input
											className="amount"
											type="number"
											defaultValue={account.amount}
											disabled={isDisable}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												onAmountChange(e, account)
											}
										/>
									</div>
								);
							})}
					</div>
				</main>
			)}
		</>
	);
}
