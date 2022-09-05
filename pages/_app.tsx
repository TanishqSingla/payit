import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { useEffect, useState } from "react";
import { isUserAuthenticated } from "../utils/supabase";

function MyApp({ Component, pageProps }: AppProps) {
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		if(isUserAuthenticated()) {
			setAuthenticated(true);
		}
	}, [])

	return (
		<Layout
			setAuthenticated={setAuthenticated}
			authenticated={authenticated}
		>
			<Component
				setAuthenticated={setAuthenticated}
				authenticated={authenticated}
				{...pageProps}
			/>
		</Layout>
	);
}

export default MyApp;
