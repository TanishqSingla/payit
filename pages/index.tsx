import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/landing.module.css";
import { isUserAuthenticated } from "../utils/supabase";

const Home: NextPage = () => {
	const router = useRouter();
	useEffect(() => {
		if (isUserAuthenticated()) {
			router.replace("/payments");
		}
	}, []);

	return (
		<>
			<Head>
				<title>Payit</title>
				<meta name="description" content="A simple payment reminder" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="mx-auto max-w-[24rem]" style={{ height: "calc(100vh - 8rem)" }}>
				<div className="flex flex-col items-center justify-center h-[90%]">
					<h1 className="md:text-8xl text-6xl font-bold mb-8 text-center">
						Welcome to Payit!
					</h1>
					<Link href="/login" passHref>
						<a>
							<button className={styles.landingButton}>
								Sign In
							</button>
						</a>
					</Link>
				</div>
			</main>
		</>
	);
};

export default Home;
