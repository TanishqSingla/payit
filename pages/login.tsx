import Head from "next/head";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../components/UI/Button";
import { isUserAuthenticated, supabaseLogin } from "../utils/supabase";

type componentProps = {
	authenticated: boolean;
	setAuthenticated: Dispatch<SetStateAction<boolean>>;
};

export default function Login(props: componentProps) {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		isUserAuthenticated()
			.then((_) => router.replace("/dashboard"))
			.catch((_) => setLoading(false));
	}, [router]);

	const loginHandle = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		supabaseLogin({ email, password })
			.then((data) => {
				props.setAuthenticated(true);
				router.replace("/dashboard");
			})
			.catch((e) => setError(true))
			.finally(() => setLoading(false));
	};

	return (
		<>
			<Head>
				<title>Payit | Login</title>
				<meta name="description" content="Login at Payit"></meta>
			</Head>
			<main>
				<form
					className="max-w-2xl mx-auto rounded px-8 pt-6 pb-8 mb-4 space-y-4 surface"
					onSubmit={loginHandle}
				>
					<div>
						<label htmlFor="email">Email</label>
						<input
							className="input"
							name="email"
							required
							placeholder="example@example.com"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
						{error && <span className="text-red-500">Invalid Credentials</span>}
					</div>
					<div>
						<label htmlFor="payee">Password</label>
						<input
							className="input"
							type="password"
							name="password"
							required
							placeholder="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
						{error && <span className="text-red-500">Invalid Credentials</span>}
					</div>
					<Button type="submit" loading={loading}>
						Login
					</Button>
				</form>
			</main>
		</>
	);
}
