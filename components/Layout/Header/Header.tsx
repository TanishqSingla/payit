import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { supabaseLogout } from "../../../utils/supabase";
import { Button } from "../../UI/Button";

type HeaderProps = {
	authenticated: boolean;
	setAuthenticated: Dispatch<SetStateAction<boolean>>;
};

export default function Header(props: HeaderProps) {
	const router = useRouter();
	const [theme, setTheme] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const body = document.querySelector("body");
		if (localStorage.getItem("theme") === null) {
			return;
		}
		if (localStorage.getItem("theme") === "dark") {
			body?.classList.add("dark");
			setTheme("dark");
		}
		if (localStorage.getItem("theme") === "") {
			body?.classList.remove("dark");
			setTheme("");
		}
	}, [theme]);

	const logoutHandle = () => {
		setLoading(true);
		supabaseLogout()
			.then(() => {
				props.setAuthenticated(false);
				router.push("/");
			})
			.catch((e) => console.log(e))
			.finally(() => setLoading(false));
	};

	return (
		<div className="h-16 flex items-center shadow dark:shadow-slate-600/50 mb-8">
			<div className="lg:max-w-3xl max-w-2xl sm:w-full w-[70%] mx-auto h-full flex items-center justify-between surface-text">
				{props.authenticated ? (
					<Link href="/dashboard" className="text-3xl">
						Payit
					</Link>
				) : (
					<Link href="/" className="text-3xl">
						Payit
					</Link>
				)}
				<div className="flex gap-8">
					<button
						onClick={() => {
							setTheme(!theme ? "dark" : "");
							document.body.classList.toggle("dark");
							localStorage.setItem("theme", !theme ? "dark" : "");
						}}
					>
						{!theme ? <IoMdMoon /> : <IoMdSunny fill="yellow" />}
					</button>
					{props.authenticated && (
						<Button type="button" onClick={logoutHandle} loading={loading}>
							Log out
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
