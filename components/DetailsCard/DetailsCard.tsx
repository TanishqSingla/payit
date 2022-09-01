import React, { useState } from "react";
import { IoIosCloseCircleOutline, IoMdCreate, IoMdTrash } from "react-icons/io";
import { deleteFile, deletePayment, supabase, updateStatus } from "../../utils/supabase";
import { Button } from "../UI/Button";

interface DetailProps {
	details: Payment;
	onCloseHandle: (e: React.MouseEvent) => void;
	handleRefresh: () => void;
}

export default function DetailsCard({
	details,
	onCloseHandle,
	handleRefresh,
}: DetailProps) {
	const [status, setStatus] = useState(details.status);
	const [saveLoading, setSaveLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);

	const handleSave = async (e: React.MouseEvent) => {
		if (status !== details.status) {
			setSaveLoading(true);
			updateStatus(status, details.id)
				.then((data) => {
					handleRefresh();
					onCloseHandle(e);
				})
				.catch((e) => console.log(e))
				.finally(() => setSaveLoading(false));
		}
	};

	const handleDelete = async (e: React.MouseEvent) => {
		setDeleteLoading(true);
		if(details.fileName) {
			deleteFile(details.fileName).then(data => console.log(data)).catch(e => console.log(e));
		}
		deletePayment(details.id)
			.then((data) => {
				onCloseHandle(e);
				handleRefresh();
			})
			.catch((e) => console.log(e))
			.finally(() => setDeleteLoading(false));
	};

	return (
		<div
			className="aspect-square w-[32rem] md:scale-100 scale-75 bg-white rounded-lg z-50 p-4 px-8 space-y-4 flex flex-col"
			onClick={(e) => e.stopPropagation()}
		>
			<div className="flex justify-between items-center">
				<span className="text-xl font-bold">Transaction Details</span>
				<button onClick={onCloseHandle}>
					<IoIosCloseCircleOutline className="text-2xl" fill="red" />
				</button>
			</div>
			<div className="w-full grow overflow-y-scroll">
				<div className="modal-details">
					<div>
						<p>Payee</p>
						<p>{details.payee}</p>
					</div>
					<div>
						<p>Amount</p>
						<p className="before:content-['₹']">{details.amount}</p>
					</div>
					<div>
						<p>From</p>
						<p>{details.fromEnterprise}</p>
					</div>
					<div>
						<p>Status</p>
						<select
							value={status}
							className="bg-inherit"
							onChange={(e) => setStatus(e.target.value)}
						>
							<option value="pending">Pending</option>
							<option value="done">Done</option>
							<option value="blocked">Blocked</option>
						</select>
					</div>
					{details.fileName && (
						<div>
							<p>Filename</p>
							<a className="bg-blue-50 text-blue-500 px-2 rounded-lg text-ellipsis" target="_blank" rel="noopener noreferrer" href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/documents/${details.fileName}`}>
								{details.fileName}
							</a>
						</div>
					)}
				</div>
			</div>
			<div className="flex justify-between">
				<Button
					loading={deleteLoading}
					className="bg-red-500"
					onClick={handleDelete}
				>
					<IoMdTrash className="text-xl" />
				</Button>
				<Button
					type="button"
					onClick={handleSave}
					loading={saveLoading}
					disabled={details.status === status}
				>
					Save
				</Button>
			</div>
		</div>
	);
}
