export {};

declare global {
	interface Payment {
		id: string;
		payee: string;
		amount: string;
		createdAt: Date;
		fromEnterprise: string;
		status: string;
		fileName?: string | null;
	}

	type AccountDetails = {
		id: number,
		name: string;
		amount: string;
	};
}
