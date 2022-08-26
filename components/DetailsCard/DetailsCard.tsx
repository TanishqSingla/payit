interface DetailProps {
	details: Payment;
}

export default function DetailsCard({ details }: DetailProps) {
	return (
		<div className="aspect-square w-[32rem] md:scale-100 scale-75 bg-white rounded-lg z-40 p-4 space-y-4" onClickCapture={e => e.stopPropagation()}>
				<span className="text-2xl md:text-3xl font-bold">
					{details.payee}
				</span>
        <div>
          hello
        </div>
		</div>
	);
}
