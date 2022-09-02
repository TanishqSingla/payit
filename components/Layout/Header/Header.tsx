import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

export default function Header() {
	const [theme, setTheme] = useState('');

	useEffect(() => {
		const body = document.querySelector('body')
		if(localStorage.getItem('theme') === null) {
			return;
		}
		if(localStorage.getItem('theme') === 'dark') {
			body?.classList.add('dark');
			setTheme('dark');
		}
		if(localStorage.getItem('theme') === '') {
			body?.classList.remove('dark');
			setTheme('')
		}
	}, [theme])

	return (
		<div className="h-16 flex items-center shadow dark:shadow-slate-600/50 mb-8">
			<div className="lg:max-w-3xl max-w-2xl sm:w-full w-[70%] mx-auto h-full flex items-center justify-between text-onBackground dark:text-onPrimary">
				<Link href="/" passHref>
					<a className="text-3xl">Payit</a>
				</Link>
				<button
					onClick={() => {
						setTheme(!theme ? 'dark': "");
						document.body.classList.toggle('dark')
						localStorage.setItem('theme', !theme ? 'dark' : "")
					}}
				>
					{!theme ? <IoMdMoon /> : <IoMdSunny />}
				</button>
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
