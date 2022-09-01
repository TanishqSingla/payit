import Header from "./Header/Header";

type LayoutProps = {
	children: React.ReactNode;
};

export default function Layout({children}: LayoutProps) {
	return (
		<div className="dark:bg-dark-grey min-h-[100vh]">
			<Header />
			{children}
		</div>
	);
}
