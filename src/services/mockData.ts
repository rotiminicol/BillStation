// Mock data service to replace API calls
// This provides static data for UI development without backend dependencies

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  balance: number;
  accountNumber: string;
  tier: 'tier1' | 'tier2' | 'tier3';
  tierLimit: number;
  isVerified: boolean;
  joinDate: string;
}

export interface Transaction {
  id: string;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  recipient?: string;
  reference: string;
  date: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface Card {
  id: string;
  cardNumber: string;
  cardType: 'visa' | 'mastercard';
  expiryDate: string;
  cvv: string;
  balance: number;
  isActive: boolean;
}

export interface Bank {
  id: number;
  name: string;
  code: string;
  country: string;
}

export interface Country {
  name: string;
  code: string;
  code3: string;
}

export interface State {
  id: number;
  name: string;
  country_id: number;
  country_code: string;
}

// Mock user data
export const mockUser: User = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+234 801 234 5678',
  balance: 250000,
  accountNumber: '1234567890',
  tier: 'tier2',
  tierLimit: 100000,
  isVerified: true,
  joinDate: 'January 2024'
};

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'credit',
    amount: 50000,
    description: 'Salary payment',
    reference: 'REF001',
    date: '2024-01-15',
    status: 'completed'
  },
  {
    id: '2',
    type: 'debit',
    amount: 15000,
    description: 'Transfer to Jane Smith',
    recipient: 'Jane Smith',
    reference: 'REF002',
    date: '2024-01-14',
    status: 'completed'
  },
  {
    id: '3',
    type: 'debit',
    amount: 5000,
    description: 'Airtime purchase',
    reference: 'REF003',
    date: '2024-01-13',
    status: 'completed'
  },
  {
    id: '4',
    type: 'credit',
    amount: 25000,
    description: 'Received from Business',
    reference: 'REF004',
    date: '2024-01-12',
    status: 'completed'
  },
  {
    id: '5',
    type: 'debit',
    amount: 10000,
    description: 'Electricity bill payment',
    reference: 'REF005',
    date: '2024-01-11',
    status: 'completed'
  }
];

// Mock cards
export const mockCards: Card[] = [
  {
    id: '1',
    cardNumber: '**** **** **** 1234',
    cardType: 'visa',
    expiryDate: '12/25',
    cvv: '123',
    balance: 50000,
    isActive: true
  },
  {
    id: '2',
    cardNumber: '**** **** **** 5678',
    cardType: 'mastercard',
    expiryDate: '09/26',
    cvv: '456',
    balance: 75000,
    isActive: true
  },
  {
    id: '3',
    cardNumber: '**** **** **** 9012',
    cardType: 'visa',
    expiryDate: '03/27',
    cvv: '789',
    balance: 30000,
    isActive: false
  }
];

// Mock banks
export const mockBanks: Bank[] = [
  { id: 1, name: 'Access Bank', code: '044', country: 'NG' },
  { id: 2, name: 'Zenith Bank', code: '057', country: 'NG' },
  { id: 3, name: 'First Bank', code: '011', country: 'NG' },
  { id: 4, name: 'UBA', code: '033', country: 'NG' },
  { id: 5, name: 'GT Bank', code: '058', country: 'NG' },
  { id: 6, name: 'Stanbic IBTC', code: '221', country: 'NG' },
  { id: 7, name: 'Fidelity Bank', code: '070', country: 'NG' },
  { id: 8, name: 'Union Bank', code: '032', country: 'NG' }
];

// Mock countries
export const mockCountries: Country[] = [
  { name: 'Nigeria', code: 'NG', code3: 'NGA' },
  { name: 'United States', code: 'US', code3: 'USA' },
  { name: 'United Kingdom', code: 'GB', code3: 'GBR' },
  { name: 'Canada', code: 'CA', code3: 'CAN' },
  { name: 'Australia', code: 'AU', code3: 'AUS' },
  { name: 'Germany', code: 'DE', code3: 'DEU' },
  { name: 'France', code: 'FR', code3: 'FRA' },
  { name: 'Italy', code: 'IT', code3: 'ITA' },
  { name: 'Spain', code: 'ES', code3: 'ESP' },
  { name: 'Netherlands', code: 'NL', code3: 'NLD' }
];

// Mock states for Nigeria
export const mockStates: State[] = [
  { id: 1, name: 'Lagos', country_id: 1, country_code: 'NG' },
  { id: 2, name: 'Kano', country_id: 1, country_code: 'NG' },
  { id: 3, name: 'Kaduna', country_id: 1, country_code: 'NG' },
  { id: 4, name: 'Katsina', country_id: 1, country_code: 'NG' },
  { id: 5, name: 'Oyo', country_id: 1, country_code: 'NG' },
  { id: 6, name: 'Rivers', country_id: 1, country_code: 'NG' },
  { id: 7, name: 'Bauchi', country_id: 1, country_code: 'NG' },
  { id: 8, name: 'Jigawa', country_id: 1, country_code: 'NG' },
  { id: 9, name: 'Benue', country_id: 1, country_code: 'NG' },
  { id: 10, name: 'Anambra', country_id: 1, country_code: 'NG' }
];

// Simplified mock service functions - no validation, just navigation
export const mockService = {
  // Auth functions - simplified for UI flow
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Always succeed for UI flow
    return {
      user: mockUser,
      authToken: 'mock-jwt-token-12345'
    };
  },

  signup: async (userData: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Always succeed for UI flow
    return {
      user: { ...mockUser, ...userData },
      authToken: 'mock-jwt-token-12345'
    };
  },

  getMe: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUser;
  },

  logout: () => {
    // No API call needed for logout
    return Promise.resolve();
  },

  forgotPassword: async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { message: 'Password reset email sent successfully' };
  },

  resetPassword: async (token: string, newPassword: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { message: 'Password reset successfully' };
  },

  // Transaction functions
  getTransactions: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTransactions;
  },

  // Card functions
  getCards: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCards;
  },

  // Bank functions
  getBanks: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockBanks;
  },

  // Country/State functions
  getCountries: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCountries;
  },

  getStates: async (countryCode: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (countryCode === 'NG') {
      return mockStates;
    }
    return [];
  }
};
