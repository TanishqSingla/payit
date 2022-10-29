import Head from "next/head";
import Link from "next/link";
import { Accounts, CreatePaymentIcon, Payment } from "../public/icons";

export default function Dashboard() {
	return (
		<>
			<Head>
				<title>Payit | Dashboard</title>
				<meta name="description" content="Dashboard for payit" />
			</Head>
			<main className="myContainer">
				<div className="scaffold">
					<div className="flex gap-8 flex-wrap">
						<div className="dashboard-button">
							<Link href="accounts" passHref>
								<a>
									<Accounts size="4rem" />
									<p>Accounts</p>
								</a>
							</Link>
						</div>
						<div className="dashboard-button">
							<Link href="payments" passHref>
								<a>
									<Payment size="4rem" />
									<p>Payments</p>
								</a>
							</Link>
						</div>
						<div className="dashboard-button">
							<Link href="payments" passHref>
								<a>
									<CreatePaymentIcon size="4rem"/>
									<p className="w-16 text-center leading-3">Create Payment</p>
								</a>
							</Link>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
