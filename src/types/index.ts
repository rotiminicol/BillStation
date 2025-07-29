export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  balance: number;
  accountNumber: string;
  created_at?: string;
  address?: string;
  // Note: Removed optional 'name' field to enforce consistent use of firstName/lastName
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  recipient?: string;
  reference: string;
  bankCode?: string;
  bankName?: string;
  created_at: string;
}

export interface Card {
  id: string;
  type: string;
  number: string;
  expiry: string;
  cvv: string;
  isActive: boolean;
} 