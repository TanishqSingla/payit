import { useEffect, useState } from "react";
import { getPayments, isUserAuthenticated, supabase } from "../utils/supabase";

export default function usePayments(initialData: Payment[] = []) {
	const [loading, setLoading] = useState(false);
	const [payments, setPayments] = useState<Payment[]>(initialData);
	const [error, setError] = useState();

	const refreshPayments = () => {
		setLoading(true);
		getPayments()
			.then((data) => setPayments(data))
			.catch((e) => setError(e))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		const subscription = supabase
			.from("Payments")
			.on("*", refreshPayments)
			.subscribe();
		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return {
		payments,
		loading,
		error,
		refreshPayments,
	};
}
