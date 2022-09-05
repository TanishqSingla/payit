import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { isUserAuthenticated, supabaseLogout } from "../../../utils/supabase";
import { Button } from "../../UI/Button";

export default function Header() {
	const router = useRouter();
	const [theme, setTheme] = useState("");

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
		supabaseLogout()
			.then(() => router.push("/"))
			.catch((e) => console.log(e));
	};

	return (
		<div className="h-16 flex items-center shadow dark:shadow-slate-600/50 mb-8">
			<div className="lg:max-w-3xl max-w-2xl sm:w-full w-[70%] mx-auto h-full flex items-center justify-between surface-text">
				<Link
					href={`/${isUserAuthenticated() ? "payments" : ""}`}
					passHref
				>
					<a className="text-3xl">Payit</a>
				</Link>
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
					{isUserAuthenticated() && (
						<Button type="button" onClick={logoutHandle}>
							Log out
						</Button>
					)}
				</div>
			</div>
			{/* <div className="grow"></div> */}
			{/* <nav>
				<Link href="/login">
					<button className="btn-primary m-8">Login</button>
				</Link>
			</nav> */}
		</div>
	);
}
