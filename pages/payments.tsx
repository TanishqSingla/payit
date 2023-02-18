import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useLayoutEffect, useState } from "react";
import {
	HiOutlineInformationCircle,
	HiOutlineRefresh,
	HiPlus,
} from "react-icons/hi";
import DetailsCard from "../components/DetailsCard/DetailsCard";
import PaymentCard from "../components/PaymentCard/PaymentCard";
import Searchbar from "../components/Searchbar/Searchbar";
import Loading from "../components/UI/Loading";
import Modal from "../components/UI/Modal";
import usePayments from "../hooks/usePayments";
import { getPayments, isUserAuthenticated } from "../utils/supabase";

type PaymentsPageProps = {
	payments: Payment[];
};

const Payments: NextPage<{ payments: Payment[] }> = (
	props: PaymentsPageProps
) => {
	const { payments, loading, refreshPayments } = usePayments(props.payments);
	const [modalDetails, setModalDetails] = useState<Payment>();
	const [modalVisible, setModalVisible] = useState(false);
	const [paymentData, setPaymentData] = useState<Payment[]>(props.payments);

	const router = useRouter();

	useLayoutEffect(() => {
		isUserAuthenticated().catch(() => router.replace("/"));
	}, [router]);

	useEffect(() => {
		setPaymentData(payments);
	}, [payments]);

	let pendingStatus = payments?.filter(
		(payment) => payment.status === "pending"
	).length;

	const handleSearchChange = (e: ChangeEvent) => {
		const eventTarget = e.target as HTMLInputElement;
		setPaymentData(() =>
			payments.filter((payment) =>
				payment.payee.toLowerCase().includes(eventTarget.value.toLowerCase())
			)
		);
	};

	return (
		<>
			<Head>
				<title>
					{pendingStatus ? `🟡(${pendingStatus})` : ""} Payit | Payments
				</title>
				<meta name="description" content="A simple payment reminder" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="myContainer">
				<Searchbar onChange={handleSearchChange} />
				<div className="flex h-8 items-center text-sm mx-auto w-[16rem] sm:w-full justify-between">
					<button
						className="flex items-center surface-text"
						onClick={refreshPayments}
					>
						<HiOutlineRefresh className={loading ? "animate-spin" : ""} />
						Refresh
					</button>
				</div>
				<div className="grid gird-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
					{loading && (
						<>
							<Loading />
							<Loading />
							<Loading />
							<Loading />
						</>
					)}
					{!loading &&
						paymentData &&
						paymentData.map((detail) => (
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
			<Link
				href="/createPayment"
				className="transition-colors duration-500 h-12 w-12 rounded-full bg-primary dark:bg-dark-secondary text-white py-2 text-2xl fixed text-center bottom-10 right-5 md:right-20 grid place-items-center"
			>
				<HiPlus />
			</Link>
			{modalDetails && (
				<Modal visible={modalVisible} onCancel={() => setModalVisible(false)}>
					<DetailsCard
						details={modalDetails}
						onCloseHandle={() => setModalVisible(false)}
					/>
				</Modal>
			)}
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const payments = await getPayments();

	return {
		props: {
			payments,
		},
	};
};

export default Payments;
