import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import PaymentCard from "../components/PaymentCard/PaymentCard";
import { getPayements, supabase } from "../utils/supabase";

interface HomeProps {
	payments: Payment[];
}

const Home: NextPage<HomeProps> = (props) => {
	const [paymentDetails, setPaymentDetails] = useState<Payment[]>();

	useEffect(() => {
		setPaymentDetails(props.payments);
	}, [props.payments]);

	supabase
		.from("Payments")
		.on("*", (_) => {
			getPayements()
				.then((data) => {
					setPaymentDetails(data);
					fetch("/api/revalidate");
				})
				.catch((e) => console.log(e));
		})
		.subscribe();

	return (
		<>
			<Head>
				<title>Payit</title>
				<meta name="description" content="A simple payment reminder" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="myContainer grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
				{paymentDetails &&
					paymentDetails.map((detail) => (
						<PaymentCard key={detail.id} paymentDetails={detail} />
					))}
			</main>
			<Link href="/createPayment" passHref>
				<a className="h-12 w-12 rounded-full bg-primary text-white py-2 text-2xl fixed text-center bottom-10 right-20">
					+
				</a>
			</Link>
		</>
	);
};

export const getStaticProps: GetStaticProps = async (_) => {
	const payments = await getPayements();

	return {
		props: {
			payments,
		},
	};
};

export default Home;
