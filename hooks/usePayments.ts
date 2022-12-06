import { useEffect, useState } from "react";
import { getPayments, isUserAuthenticated, supabase } from "../utils/supabase";

export default function usePayments() {
	const [loading, setLoading] = useState(false);
	const [payments, setPayments] = useState<Payment[]>();
	const [error, setError] = useState();

	const refreshPayments = () => {
		setLoading(true);
		getPayments()
			.then((data) => setPayments(data))
			.catch((e) => setError(e))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		refreshPayments();
	}, []);

	return {
		payments,
		loading,
		error,
		refreshPayments,
	};
}
