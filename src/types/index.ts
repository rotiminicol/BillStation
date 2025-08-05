export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  balance: number;
  accountNumber: string;
  profilePicture?: string;
  tier: 'tier1' | 'tier2' | 'tier3';
  tierLimit: number;
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

// Password Reset Types
export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
  success: boolean;
}

export interface VerifyResetTokenRequest {
  token: string;
}

export interface VerifyResetTokenResponse {
  valid: boolean;
  message?: string;
} 