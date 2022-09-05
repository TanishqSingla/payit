import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button } from "../components/UI/Button";
import { isUserAuthenticated, udpatePassword } from "../utils/supabase";

export default function SignOn() {
	const router = useRouter();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const urlFragment = window.location.hash
		if(urlFragment) {
			if(urlFragment.includes('type=invite')) {
				return;
			}
		}
		router.push('/')
	}, []);

	useEffect(() => {
		if (confirmPassword !== password) {
			return;
		}
	}, [confirmPassword]);

	const signOnHandle = (e: React.FormEvent) => {
		e.preventDefault();	
		if (password !== confirmPassword) {
			return;
		}
		udpatePassword(password)
			.then((data) => {
				router.push("/payments");
			})
			.catch((e) => console.log(e))
			.finally(() => setLoading(false));
		setLoading(true);
	};

	return (
		<>
			<Head>
				<title>Payit | Sign On</title>
				<meta
					name="description"
					content="You've been invited to payit"
				/>
			</Head>
			<form
				className="max-w-2xl mx-auto rounded px-8 pt-6 pb-8 mb-4 space-y-4 surface"
				onSubmit={signOnHandle}
			>
				<div>
					<label htmlFor="email">Password</label>
					<input
						className="input"
						name="password"
						type="password"
						required
						placeholder="Enter password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>
				<div>
					<label htmlFor="payee">Password</label>
					<input
						className="input"
						name="password"
						type="password"
						required
						placeholder="Confirm Password"
						onChange={(e) => setConfirmPassword(e.target.value)}
						value={confirmPassword}
					/>
				</div>
				<Button type="submit" loading={loading}>
					Set Password
				</Button>
			</form>
		</>
	);
}
