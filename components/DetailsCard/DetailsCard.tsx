import { IoIosCloseCircleOutline } from "react-icons/io";

interface DetailProps {
	details: Payment;
	onCloseHandle: (e: React.MouseEvent) => void;
}

export default function DetailsCard({ details, onCloseHandle }: DetailProps) {
	return (
		<div
			className="aspect-square w-[32rem] md:scale-100 scale-75 bg-white rounded-lg z-50 p-4 space-y-4 flex flex-col"
			onClick={(e) => e.stopPropagation()}
		>
			<div className="flex justify-between items-center">
				<span className="text-xl font-bold">Transaction Details</span>
				<button onClick={onCloseHandle}>
					<IoIosCloseCircleOutline className="text-2xl" fill="red" />
				</button>
			</div>
			<div className="w-full grow overflow-y-scroll">
			</div>
			<div className="flex justify-end">
				<button>save</button>
			</div>
		</div>
	);
}
