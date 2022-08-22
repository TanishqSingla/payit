import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import PaymentCard from "../components/PaymentCard/PaymentCard";
import Loading from "../components/UI/Loading";
import { getPayements, supabase } from "../utils/supabase";
import { HiOutlineRefresh } from "react-icons/hi";

interface HomeProps {
	payments: Payment[];
}

const Home: NextPage<HomeProps> = (props) => {
	const [paymentDetails, setPaymentDetails] = useState<Payment[]>();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setPaymentDetails(props.payments);
	}, [props.payments]);

	useEffect(() => {
		const subscription = supabase
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
		return () => {
			subscription.unsubscribe();
		};
	}, []);

	const handleRefresh = () => {
		setLoading(true);
		getPayements()
			.then((data) => {
				setPaymentDetails((prevState) => {
					if (prevState === data) {
						return;
					}
					fetch("/api/revalidate");
					return data;
				});
			})
			.catch((e) => console.log(e))
			.finally(() => setLoading(false));
	};

	return (
		<>
			<Head>
				<title>Payit</title>
				<meta name="description" content="A simple payment reminder" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="myContainer">
				<div className="flex h-8 items-center text-sm mx-auto w-[16rem] sm:w-full">
					<button
						className="flex items-center"
						onClick={handleRefresh}
					>
						<HiOutlineRefresh
							className={loading ? "animate-spin" : ""}
						/>
						Refresh
					</button>
				</div>
				<div className="grid gird-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
					{loading && (
						<>
							<Loading />
							<Loading />
							<Loading />
							<Loading />
						</>
					)}
					{!loading &&
						paymentDetails &&
						paymentDetails.map((detail) => (
							<PaymentCard
								key={detail.id}
								paymentDetails={detail}
							/>
						))}
				</div>
			</main>
			<Link href="/createPayment" passHref>
				<a className="h-12 w-12 rounded-full bg-primary text-white py-2 text-2xl fixed text-center bottom-10 right-5 md:right-20">
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
