interface PaymentCardProps {
	paymentDetails: Payment;
}

export default function PaymentCard({ paymentDetails }: PaymentCardProps) {
	return (
		<div className="sm:w-full w-[16rem] flex flex-col h-[9rem] p-2 border rounded-md border-blue-300 shadow">
			<h1>{paymentDetails.payee}</h1>
			<div className="grow">
				<ul>
					<li>Amount: {paymentDetails.amount}</li>
					<li>
						Created At: {paymentDetails.createdAt.toDateString()}
					</li>
					{paymentDetails?.filename && <li>file: {paymentDetails.filename}</li>}
				</ul>
			</div>
			<div className="flex justify-between h-6">
				<div>details</div>
				<button className="">{paymentDetails.status}</button>
			</div>
		</div>
	);
}
