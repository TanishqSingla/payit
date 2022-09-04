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
			router.push("/payments");
		}
	}, []);

	return (
		<>
			<Head>
				<title>Payit</title>
				<meta name="description" content="A simple payment reminder" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="mx-auto max-w-[24rem]">
				<div className="">
					<h1 className="md:text-8xl text-6xl font-bold mb-8">
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
