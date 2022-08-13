interface PaymentCardProps {
	paymentDetails: {
		recipentName: string;
		createdAt: Date;
		amount: string;
	}
}

export default function PaymentCard({paymentDetails}: PaymentCardProps) {
	return (
		<div className="w-[100%] max-w-[16rem] flex flex-col h-[9rem] mx-4 p-4">
			<div>{paymentDetails.recipentName}</div>
			<div>{paymentDetails.amount}</div>
			<div className="flex justify-between">
				<div>details</div>
				<button className="green">status</button>
			</div>
		</div>
	);
}
