import Footer from "./Footer/Footer";
import Header from "./Header/Header";

type LayoutProps = {
	children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
	return (
		<>
			<Header />
			{props.children}
			<Footer />
		</>
	);
}
