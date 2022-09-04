import { NextPage } from "next";
import Head from "next/head";
import styles from '../styles/landing.module.css' 

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Payit</title>
				<meta name="description" content="A simple payment reminder" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="mx-auto max-w-[28rem]">
				<div className="">
				<h1 className="md:text-8xl text-6xl font-bold">Welcome to Payit</h1>
				<button className={styles.landingButton}>Sign In</button>
				</div>
			</main>
		</>
	);
};

export default Home;
