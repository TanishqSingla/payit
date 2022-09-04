import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "../components/UI/Button";
import { isUserAuthenticated, supabaseLogin } from "../utils/supabase";

export default function Login() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (isUserAuthenticated()) {
			router.push("/payments");
		}
	}, []);

  const loginHandle = () => {
    supabaseLogin({email, password}).then(data => {
      router.push('/');
    }).catch(e => {
      console.log('error logging in', e)
    })
  }

	return (
		<>
			<Head>
				<title>Payit | Login</title>
				<meta name="description" content="Login at Payit"></meta>
			</Head>
			<form className="max-w-2xl mx-auto rounded px-8 pt-6 pb-8 mb-4 space-y-4 surface" onSubmit={loginHandle}>
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
				</div>
				<div>
					<label htmlFor="payee">Password</label>
					<input
						className="input"
						name="password"
						required
						placeholder="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>
        <Button type="submit" loading={loading}>Login</Button>
			</form>
		</>
	);
}
