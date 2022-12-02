import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Accounts, CreatePaymentIcon, Payment } from "../../public/icons";
import { isUserAuthenticated } from "../../utils/supabase";
import { useRouter } from "next/router";
import style from "./dashboard.module.css";

export default function Dashboard() {
	const router = useRouter();

	useEffect(() => {
		isUserAuthenticated().catch(() => router.replace("/"));
	}, [router]);

	return (
		<>
			<Head>
				<title>Payit | Dashboard</title>
				<meta name="description" content="Dashboard for payit" />
			</Head>
			<main className="myContainer">
				<div className="scaffold">
					<div className="flex gap-8 flex-wrap justify-evenly">
						<div className={style.DashBoardButton}>
							<Link href="accounts" passHref>
								<Accounts size="4rem" />
								<p>Accounts</p>
							</Link>
						</div>
						<div className={style.DashBoardButton}>
							<Link href="payments" passHref>
								<Payment size="4rem" />
								<p>Payments</p>
							</Link>
						</div>
						<div className={style.DashBoardButton}>
							<Link href="createPayment" passHref>
								<CreatePaymentIcon size="4rem" />
								<p className="w-16 text-center leading-3">Create Payment</p>
							</Link>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
