import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from "../components/UI/Spinner";
import styles from "../styles/landing.module.css";
import { isUserAuthenticated } from "../utils/supabase";

const Home: NextPage = () => {
	const [loading, setLoading] = useState(true);

	const router = useRouter();

	useEffect(() => {
		isUserAuthenticated()
			.then((_) => {
				router.replace("/payments");
			})
			.catch((_) => setLoading(false));
	}, [router]);

	return (
		<>
			<Head>
				<title>Payit</title>
				<meta name="description" content="A simple payment reminder" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="grid place-items-center grow">
				{loading ? (
					<Spinner />
				) : (
					<div className="flex flex-col items-center justify-center max-w-[24rem]">
						<h1 className="md:text-8xl text-6xl font-bold mb-8 text-center">
							Welcome to Payit!
						</h1>
						<Link href="/login" passHref>
							<a>
								<button className={styles.landingButton}>Sign In</button>
							</a>
						</Link>
					</div>
				)}
			</main>
		</>
	);
};

export default Home;
