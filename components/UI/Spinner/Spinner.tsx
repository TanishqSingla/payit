import style from "./Spinner.module.css";

export default function Spinner() {
	return (
		<div
			className={`${style.loader} ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32`}
		/>
	);
}
