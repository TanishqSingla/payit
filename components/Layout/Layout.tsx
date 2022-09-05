import { Dispatch, SetStateAction } from "react";
import Header from "./Header/Header";

type LayoutProps = {
	authenticated: boolean;
	setAuthenticated: Dispatch<SetStateAction<boolean>>; 
	children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
	return (
		<div className="dark:bg-dark-primary min-h-[100vh] transition-colors duration-500">
			<Header authenticated={props.authenticated} setAuthenticated={props.setAuthenticated}/>
			{props.children}
		</div>
	);
}
