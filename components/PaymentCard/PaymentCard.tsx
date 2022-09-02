interface CardProps {
	paymentDetails: Payment;
	footer?: JSX.Element[];
}

export default function PaymentCard({ paymentDetails, footer }: CardProps) {
	const backgrounds: { [key: string]: string } = {
		done: "before:from-green-400 before:to-lime-300 dark:before:from-green-800 dark:before:to-lime-600",
		pending: "before:from-yellow-500 before:to-amber-300 dark:before:from-yellow-600 dark:before:to-amber-600",
		blocked: "before:from-red-600 before:to-orange-500 dark:before:from-red-800 dark:before:to-red-700"
	};
	return (
		<div
			className={`cardContainer dark:text-white flex flex-col p-2 accent dark:bg-zinc-800 transition-colors duration-500 ${
				backgrounds[paymentDetails.status]
			}`}
		>
			<h1>{paymentDetails.payee}</h1>
			<div className="grow">
				<ul className="dark:font-thin">
					{paymentDetails.fromEnterprise && (
						<li>from: {paymentDetails.fromEnterprise}</li>
					)}
					<li>Amount: ₹{paymentDetails.amount}</li>
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
			{footer?.map((e) => e)}
		</div>
	);
}
