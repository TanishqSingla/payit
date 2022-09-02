import Header from "./Header/Header";

type LayoutProps = {
	children: React.ReactNode;
};

export default function Layout({children}: LayoutProps) {
	return (
		<div className="dark:bg-dark-primary min-h-[100vh] transition-colors duration-500">
			<Header />
			{children}
		</div>
	);
}
