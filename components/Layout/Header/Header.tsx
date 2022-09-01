import Link from "next/link";
import { useState } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

export default function Header() {
	const [theme, setTheme] = useState('');

	return (
		<div className="h-16 flex items-center shadow dark:shadow-slate-600/50 mb-8">
			<div className="lg:max-w-3xl max-w-2xl sm:w-full w-[70%] mx-auto h-full flex items-center justify-between text-onBackground dark:text-onPrimary">
				<Link href="/" passHref>
					<a className="text-3xl">Payit</a>
				</Link>
				<button
					onClick={() => {
						document.body.classList.toggle("dark");
						setTheme(!theme ? 'dark' : '');
					}}
				>
					{theme ? <IoMdMoon /> : <IoMdSunny />}
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
