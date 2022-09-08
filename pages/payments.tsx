import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
	HiOutlineInformationCircle,
	HiOutlineRefresh,
	HiPlus,
} from "react-icons/hi";
import DetailsCard from "../components/DetailsCard/DetailsCard";
import PaymentCard from "../components/PaymentCard/PaymentCard";
import Loading from "../components/UI/Loading";
import Modal from "../components/UI/Modal";
import { getPayments, isUserAuthenticated, supabase } from "../utils/supabase";

const Payments: NextPage<{ payments: Payment[] }> = (props) => {
	const [payments, setPayments] = useState<Payment[]>();
	const [loading, setLoading] = useState(false);
	const [modalDetails, setModalDetails] = useState<Payment>();
	const [modalVisible, setModalVisible] = useState(false);

	const router = useRouter();

	useEffect(() => {
		setPayments(props.payments);
	}, [props.payments]);

	useEffect(() => {
		if (!isUserAuthenticated()) {
			router.push("/");
		}

		const subscription = supabase
			.from("Payments")
			.on("*", (_) => {
				getPaymentData();
			})
			.subscribe();
		return () => {
			subscription.unsubscribe();
		};
	}, []);

	const getPaymentData = () => {
		getPayments()
			.then((data) => {
				setPayments(data);
			})
			.catch((e) => console.log(e))
			.finally(() => setLoading(false));
	};

	const handleRefresh = () => {
		setLoading(true);
		getPaymentData();
	};

	return (
		<>
			<Head>
				<title>Payit | Payments</title>
				<meta name="description" content="A simple payment reminder" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="myContainer">
				<div className="flex h-8 items-center text-sm mx-auto w-[16rem] sm:w-full">
					<button
						className="flex items-center surface-text"
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
						payments &&
						payments.map((detail) => (
							<PaymentCard
								key={detail.id}
								paymentDetails={detail}
								footer={[
									<button
										key="1"
										className="flex items-center gap-1"
										onClick={() => {
											setModalDetails(detail);
											setModalVisible(true);
										}}
									>
										<HiOutlineInformationCircle className="scale-110 mx-1" />
										More details
									</button>,
								]}
							/>
						))}
				</div>
			</main>
			<Link href="/createPayment" passHref>
				<a className="transition-colors duration-500 h-12 w-12 rounded-full bg-primary dark:bg-dark-secondary text-white py-2 text-2xl fixed text-center bottom-10 right-5 md:right-20 grid place-items-center">
					<HiPlus />
				</a>
			</Link>
			{modalDetails && (
				<Modal
					visible={modalVisible}
					onCancel={() => setModalVisible(false)}
				>
					<DetailsCard
						details={modalDetails}
						onCloseHandle={() => setModalVisible(false)}
						handleRefresh={handleRefresh}
					/>
				</Modal>
			)}
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
	const payments = await getPayments();

	return {
		props: {
			payments,
		},
	};
};

export default Payments;
