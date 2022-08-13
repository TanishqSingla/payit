import Link from "next/link";

export default function Header() {
	return (
		<div className="bg-background p-2 h-16 flex items-center">
			<div className="text-3xl text-onBackground mx-2">
				<Link href="/" passHref>
					<a>Payit</a>
				</Link>
			</div>
			<div className="grow"></div>
			<nav>
				{/* <Link href="/login">
					<button className="btn-primary m-8">Login</button>
				</Link> */}
			</nav>
		</div>
	);
}
