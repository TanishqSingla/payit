export {};

declare global {
  interface Payment {
    id: string;
    payee: string;
    amount: string;
    createdAt: Date;
    fromEnterprise: string;
    status: 'TBD' | 'DONE' | 'BLOCKED';
    filename?: string;
  }
}