interface CardProps {
	paymentDetails: Payment;
	footer?: JSX.Element[];
}

export default function PaymentCard({ paymentDetails, footer }: CardProps) {
	const backgrounds: { [key: string]: string } = {
		done: "before:from-green-400 before:to-lime-300 dark:before:from-green-800 dark:before:to-lime-600",
		pending:
			"before:from-yellow-500 before:to-amber-300 dark:before:from-yellow-600 dark:before:to-amber-600",
		blocked:
			"before:from-red-600 before:to-orange-500 dark:before:from-red-800 dark:before:to-red-700",
	};
	return (
		<div
			className={`cardContainer surface flex flex-col p-2 accent transition-colors duration-500 ${
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
						Created At: {new Date(paymentDetails.createdAt).toDateString()}
					</li>
					{paymentDetails?.fileName && (
						<li className="truncate">
							file:{" "}
							<a
								className="bg-blue-50 text-blue-500 px-2 dark:text-blue-300 rounded-lg dark:bg-blue-50/20"
								href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/documents/${paymentDetails.fileName}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								{paymentDetails.fileName}
							</a>
						</li>
					)}
				</ul>
			</div>
			{footer?.map((e) => e)}
		</div>
	);
}
