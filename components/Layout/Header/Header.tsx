import Link from "next/link";

export default function Header() {
	return (
		<div className="bg-background h-16 flex items-center shadow mb-8">
			<div className="lg:max-w-3xl max-w-2xl sm:w-full w-[70%] mx-auto text-3xl text-onBackground">
				<Link href="/" passHref>
					<a>Payit</a>
				</Link>
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
