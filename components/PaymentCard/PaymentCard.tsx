import { HiOutlineInformationCircle } from "react-icons/hi";

export default function PaymentCard({
	paymentDetails,
}: {
	paymentDetails: Payment;
}) {
	const backgrounds: { [key: string]: string } = {
		DONE: "before:from-green-400 before:to-lime-300",
		TBD: "before:from-yellow-500 before:to-amber-300",
		BLOCKED: "before:from-red-600 before:to-orange-500",
	};
	return (
		<div
			className={`cardContainer flex flex-col p-2 accent ${backgrounds[paymentDetails.status]} from-`}
		>
			<h1>{paymentDetails.payee}</h1>
			<div className="grow">
				<ul>
					{paymentDetails.fromEnterprise && (
						<li>from: {paymentDetails.fromEnterprise}</li>
					)}
					<li>Amount: {paymentDetails.amount}</li>
					<li>
						Created At:{" "}
						{new Date(paymentDetails.createdAt).toDateString()}
					</li>
					{paymentDetails?.fileName && (
						<li className="truncate">
							file: {paymentDetails.fileName}
						</li>
					)}
				</ul>
			</div>
			<button className="flex items-center gap-1">
				<HiOutlineInformationCircle className="scale-125" />
				More details
			</button>
		</div>
	);
}
