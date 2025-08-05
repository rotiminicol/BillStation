
// Base API configuration
const AUTH_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:Ye7qAxAj';
const API_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:kQC-7-zf';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to make authenticated requests
const makeRequest = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Utility function to generate account numbers
const generateAccountNumber = (): string => {
  // Generate 10-digit account number starting with 1234 for Kuda
  const prefix = '1234';
  const suffix = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return prefix + suffix;
};

// Authentication API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${AUTH_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    
    const data = await response.json();
    if (data.authToken) {
      localStorage.setItem('authToken', data.authToken);
    }
    return data;
  },

  signup: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    // Generate account number for new user
    const accountNumber = generateAccountNumber();
    
    const signupData = {
      ...userData,
      name: `${userData.firstName} ${userData.lastName}`,
      accountNumber,
      balance: 20000, // Starting balance of 20k
    };

    const response = await fetch(`${AUTH_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupData),
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Signup failed' }));
      throw new Error(error.message || 'Signup failed');
    }
    
    const data = await response.json();
    if (data.authToken) {
      localStorage.setItem('authToken', data.authToken);
    }
    return data;
  },

  getMe: async () => {
    return makeRequest(`${AUTH_BASE_URL}/auth/me`);
  },

  updateBalance: async (newBalance: number) => {
    return makeRequest(`${AUTH_BASE_URL}/auth/me`, {
      method: 'PATCH',
      body: JSON.stringify({ balance: newBalance }),
    });
  },

  logout: () => {
    localStorage.removeItem('authToken');
  },
};

// Transaction API
export const transactionAPI = {
  getAll: () => makeRequest(`${API_BASE_URL}/transaction`),
  getById: (id: string) => makeRequest(`${API_BASE_URL}/transaction/${id}`),
  create: (data: {
    type: 'debit' | 'credit';
    amount: number;
    description: string;
    recipient?: string;
    reference?: string;
  }) => makeRequest(`${API_BASE_URL}/transaction`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => makeRequest(`${API_BASE_URL}/transaction/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => makeRequest(`${API_BASE_URL}/transaction/${id}`, {
    method: 'DELETE',
  }),
};

// Card API
export const cardAPI = {
  getAll: () => makeRequest(`${API_BASE_URL}/card`),
  getById: (id: string) => makeRequest(`${API_BASE_URL}/card/${id}`),
  create: (data: any) => makeRequest(`${API_BASE_URL}/card`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => makeRequest(`${API_BASE_URL}/card/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => makeRequest(`${API_BASE_URL}/card/${id}`, {
    method: 'DELETE',
  }),
};

// Bill API
export const billAPI = {
  getAll: () => makeRequest(`${API_BASE_URL}/bill`),
  getById: (id: string) => makeRequest(`${API_BASE_URL}/bill/${id}`),
  create: (data: any) => makeRequest(`${API_BASE_URL}/bill`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => makeRequest(`${API_BASE_URL}/bill/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => makeRequest(`${API_BASE_URL}/bill/${id}`, {
    method: 'DELETE',
  }),
};

// Notification API
export const notificationAPI = {
  getAll: () => makeRequest(`${API_BASE_URL}/notification`),
  getById: (id: string) => makeRequest(`${API_BASE_URL}/notification/${id}`),
  create: (data: any) => makeRequest(`${API_BASE_URL}/notification`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => makeRequest(`${API_BASE_URL}/notification/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => makeRequest(`${API_BASE_URL}/notification/${id}`, {
    method: 'DELETE',
  }),
};

// User Settings API
export const userSettingAPI = {
  getAll: () => makeRequest(`${API_BASE_URL}/user_setting`),
  getById: (id: string) => makeRequest(`${API_BASE_URL}/user_setting/${id}`),
  create: (data: any) => makeRequest(`${API_BASE_URL}/user_setting`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => makeRequest(`${API_BASE_URL}/user_setting/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => makeRequest(`${API_BASE_URL}/user_setting/${id}`, {
    method: 'DELETE',
  }),
};

// User Session API
export const userSessionAPI = {
  getAll: () => makeRequest(`${API_BASE_URL}/user_session`),
  getById: (id: string) => makeRequest(`${API_BASE_URL}/user_session/${id}`),
  create: (data: any) => makeRequest(`${API_BASE_URL}/user_session`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => makeRequest(`${API_BASE_URL}/user_session/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => makeRequest(`${API_BASE_URL}/user_session/${id}`, {
    method: 'DELETE',
  }),
};

// Paystack API integration
export const paystackAPI = {
  getBanks: async () => {
    const response = await fetch('https://api.paystack.co/bank', {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_PAYSTACK_SK}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch banks');
    }
    
    return response.json();
  },

  verifyAccount: async (accountNumber: string, bankCode: string) => {
    const response = await fetch(`https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_PAYSTACK_SK}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to verify account');
    }
    
    return response.json();
  },

  initiateTransfer: async (transferData: {
    amount: number;
    recipient: string;
    reason?: string;
    reference?: string;
  }) => {
    const response = await fetch('https://api.paystack.co/transfer', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_PAYSTACK_SK}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transferData),
    });
    
    if (!response.ok) {
      throw new Error('Transfer failed');
    }
    
    return response.json();
  },
};

// Country and States API functions
export const fetchCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,cca3');
    const countries = await response.json();
    return countries
      .map((country: any) => ({
        name: country.name.common,
        code: country.cca2,
        code3: country.cca3
      }))
      .sort((a: any, b: any) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching countries:', error);
         // Fallback to a comprehensive list of countries
     return [
       { name: 'Nigeria', code: 'NG', code3: 'NGA' },
       { name: 'United States', code: 'US', code3: 'USA' },
       { name: 'United Kingdom', code: 'GB', code3: 'GBR' },
       { name: 'Canada', code: 'CA', code3: 'CAN' },
       { name: 'Australia', code: 'AU', code3: 'AUS' },
      { name: 'Germany', code: 'DE', code3: 'DEU' },
      { name: 'France', code: 'FR', code3: 'FRA' },
      { name: 'Italy', code: 'IT', code3: 'ITA' },
      { name: 'Spain', code: 'ES', code3: 'ESP' },
      { name: 'Netherlands', code: 'NL', code3: 'NLD' },
      { name: 'Belgium', code: 'BE', code3: 'BEL' },
      { name: 'Switzerland', code: 'CH', code3: 'CHE' },
      { name: 'Austria', code: 'AT', code3: 'AUT' },
      { name: 'Sweden', code: 'SE', code3: 'SWE' },
      { name: 'Norway', code: 'NO', code3: 'NOR' },
      { name: 'Denmark', code: 'DK', code3: 'DNK' },
      { name: 'Finland', code: 'FI', code3: 'FIN' },
      { name: 'Poland', code: 'PL', code3: 'POL' },
      { name: 'Czech Republic', code: 'CZ', code3: 'CZE' },
      { name: 'Hungary', code: 'HU', code3: 'HUN' },
      { name: 'Romania', code: 'RO', code3: 'ROU' },
      { name: 'Bulgaria', code: 'BG', code3: 'BGR' },
      { name: 'Greece', code: 'GR', code3: 'GRC' },
      { name: 'Portugal', code: 'PT', code3: 'PRT' },
      { name: 'Ireland', code: 'IE', code3: 'IRL' },
      { name: 'Luxembourg', code: 'LU', code3: 'LUX' },
      { name: 'Malta', code: 'MT', code3: 'MLT' },
      { name: 'Cyprus', code: 'CY', code3: 'CYP' },
      { name: 'Estonia', code: 'EE', code3: 'EST' },
      { name: 'Latvia', code: 'LV', code3: 'LVA' },
      { name: 'Lithuania', code: 'LT', code3: 'LTU' },
      { name: 'Slovenia', code: 'SI', code3: 'SVN' },
      { name: 'Slovakia', code: 'SK', code3: 'SVK' },
      { name: 'Croatia', code: 'HR', code3: 'HRV' },
      { name: 'South Africa', code: 'ZA', code3: 'ZAF' },
      { name: 'Kenya', code: 'KE', code3: 'KEN' },
      { name: 'Ghana', code: 'GH', code3: 'GHA' },
      { name: 'Uganda', code: 'UG', code3: 'UGA' },
      { name: 'Tanzania', code: 'TZ', code3: 'TZA' },
      { name: 'Ethiopia', code: 'ET', code3: 'ETH' },
      { name: 'Egypt', code: 'EG', code3: 'EGY' },
      { name: 'Morocco', code: 'MA', code3: 'MAR' },
      { name: 'Algeria', code: 'DZ', code3: 'DZA' },
      { name: 'Tunisia', code: 'TN', code3: 'TUN' },
      { name: 'Libya', code: 'LY', code3: 'LBY' },
      { name: 'Sudan', code: 'SD', code3: 'SDN' },
      { name: 'Chad', code: 'TD', code3: 'TCD' },
      { name: 'Niger', code: 'NE', code3: 'NER' },
      { name: 'Mali', code: 'ML', code3: 'MLI' },
      { name: 'Burkina Faso', code: 'BF', code3: 'BFA' },
      { name: 'Senegal', code: 'SN', code3: 'SEN' },
      { name: 'Guinea', code: 'GN', code3: 'GIN' },
      { name: 'Sierra Leone', code: 'SL', code3: 'SLE' },
      { name: 'Liberia', code: 'LR', code3: 'LBR' },
      { name: 'Ivory Coast', code: 'CI', code3: 'CIV' },
      { name: 'Togo', code: 'TG', code3: 'TGO' },
      { name: 'Benin', code: 'BJ', code3: 'BEN' },
      { name: 'Cameroon', code: 'CM', code3: 'CMR' },
      { name: 'Central African Republic', code: 'CF', code3: 'CAF' },
      { name: 'Gabon', code: 'GA', code3: 'GAB' },
      { name: 'Congo', code: 'CG', code3: 'COG' },
      { name: 'Democratic Republic of the Congo', code: 'CD', code3: 'COD' },
      { name: 'Angola', code: 'AO', code3: 'AGO' },
      { name: 'Zambia', code: 'ZM', code3: 'ZMB' },
      { name: 'Zimbabwe', code: 'ZW', code3: 'ZWE' },
      { name: 'Botswana', code: 'BW', code3: 'BWA' },
      { name: 'Namibia', code: 'NA', code3: 'NAM' },
      { name: 'Mozambique', code: 'MZ', code3: 'MOZ' },
      { name: 'Malawi', code: 'MW', code3: 'MWI' },
      { name: 'Madagascar', code: 'MG', code3: 'MDG' },
      { name: 'Mauritius', code: 'MU', code3: 'MUS' },
      { name: 'Seychelles', code: 'SC', code3: 'SYC' },
      { name: 'Comoros', code: 'KM', code3: 'COM' },
      { name: 'Djibouti', code: 'DJ', code3: 'DJI' },
      { name: 'Somalia', code: 'SO', code3: 'SOM' },
      { name: 'Eritrea', code: 'ER', code3: 'ERI' },
      { name: 'Burundi', code: 'BI', code3: 'BDI' },
      { name: 'Rwanda', code: 'RW', code3: 'RWA' },
      { name: 'Equatorial Guinea', code: 'GQ', code3: 'GNQ' },
      { name: 'São Tomé and Príncipe', code: 'ST', code3: 'STP' },
      { name: 'Cape Verde', code: 'CV', code3: 'CPV' },
      { name: 'Guinea-Bissau', code: 'GW', code3: 'GNB' },
      { name: 'The Gambia', code: 'GM', code3: 'GMB' },
      { name: 'Mauritania', code: 'MR', code3: 'MRT' },
      { name: 'Western Sahara', code: 'EH', code3: 'ESH' },
      { name: 'India', code: 'IN', code3: 'IND' },
      { name: 'China', code: 'CN', code3: 'CHN' },
      { name: 'Japan', code: 'JP', code3: 'JPN' },
      { name: 'South Korea', code: 'KR', code3: 'KOR' },
      { name: 'North Korea', code: 'KP', code3: 'PRK' },
      { name: 'Mongolia', code: 'MN', code3: 'MNG' },
      { name: 'Taiwan', code: 'TW', code3: 'TWN' },
      { name: 'Hong Kong', code: 'HK', code3: 'HKG' },
      { name: 'Macau', code: 'MO', code3: 'MAC' },
      { name: 'Vietnam', code: 'VN', code3: 'VNM' },
      { name: 'Laos', code: 'LA', code3: 'LAO' },
      { name: 'Cambodia', code: 'KH', code3: 'KHM' },
      { name: 'Thailand', code: 'TH', code3: 'THA' },
      { name: 'Myanmar', code: 'MM', code3: 'MMR' },
      { name: 'Malaysia', code: 'MY', code3: 'MYS' },
      { name: 'Singapore', code: 'SG', code3: 'SGP' },
      { name: 'Indonesia', code: 'ID', code3: 'IDN' },
      { name: 'Philippines', code: 'PH', code3: 'PHL' },
      { name: 'Brunei', code: 'BN', code3: 'BRN' },
      { name: 'East Timor', code: 'TL', code3: 'TLS' },
      { name: 'Papua New Guinea', code: 'PG', code3: 'PNG' },
      { name: 'Fiji', code: 'FJ', code3: 'FJI' },
      { name: 'New Zealand', code: 'NZ', code: 'NZL' },
      { name: 'Vanuatu', code: 'VU', code3: 'VUT' },
      { name: 'New Caledonia', code: 'NC', code3: 'NCL' },
      { name: 'Solomon Islands', code: 'SB', code3: 'SLB' },
      { name: 'Kiribati', code: 'KI', code3: 'KIR' },
      { name: 'Tuvalu', code: 'TV', code3: 'TUV' },
      { name: 'Nauru', code: 'NR', code3: 'NRU' },
      { name: 'Palau', code: 'PW', code3: 'PLW' },
      { name: 'Micronesia', code: 'FM', code3: 'FSM' },
      { name: 'Marshall Islands', code: 'MH', code3: 'MHL' },
      { name: 'Samoa', code: 'WS', code3: 'WSM' },
      { name: 'American Samoa', code: 'AS', code3: 'ASM' },
      { name: 'Tonga', code: 'TO', code3: 'TON' },
      { name: 'Cook Islands', code: 'CK', code3: 'COK' },
      { name: 'Niue', code: 'NU', code3: 'NIU' },
      { name: 'Tokelau', code: 'TK', code3: 'TKL' },
      { name: 'Wallis and Futuna', code: 'WF', code3: 'WLF' },
      { name: 'French Polynesia', code: 'PF', code3: 'PYF' },
      { name: 'Pitcairn Islands', code: 'PN', code3: 'PCN' },
      { name: 'Easter Island', code: 'CL', code3: 'CHL' },
      { name: 'Hawaii', code: 'US', code3: 'USA' },
      { name: 'Alaska', code: 'US', code3: 'USA' },
      { name: 'Greenland', code: 'GL', code3: 'GRL' },
      { name: 'Iceland', code: 'IS', code3: 'ISL' },
      { name: 'Faroe Islands', code: 'FO', code3: 'FRO' },
      { name: 'Svalbard and Jan Mayen', code: 'SJ', code3: 'SJM' },
      { name: 'Bouvet Island', code: 'BV', code3: 'BVT' },
      { name: 'South Georgia and the South Sandwich Islands', code: 'GS', code3: 'SGS' },
      { name: 'Falkland Islands', code: 'FK', code3: 'FLK' },
      { name: 'Antarctica', code: 'AQ', code3: 'ATA' },
      { name: 'French Southern Territories', code: 'TF', code3: 'ATF' },
      { name: 'Heard Island and McDonald Islands', code: 'HM', code3: 'HMD' },
      { name: 'British Indian Ocean Territory', code: 'IO', code3: 'IOT' },
      { name: 'Christmas Island', code: 'CX', code3: 'CXR' },
      { name: 'Cocos Islands', code: 'CC', code3: 'CCK' },
      { name: 'Norfolk Island', code: 'NF', code3: 'NFK' },
      { name: 'Australia', code: 'AU', code3: 'AUS' },
      { name: 'New Zealand', code: 'NZ', code3: 'NZL' },
      { name: 'Papua New Guinea', code: 'PG', code3: 'PNG' },
      { name: 'Fiji', code: 'FJ', code3: 'FJI' },
      { name: 'Solomon Islands', code: 'SB', code3: 'SLB' },
      { name: 'Vanuatu', code: 'VU', code3: 'VUT' },
      { name: 'New Caledonia', code: 'NC', code3: 'NCL' },
      { name: 'French Polynesia', code: 'PF', code3: 'PYF' },
      { name: 'Wallis and Futuna', code: 'WF', code3: 'WLF' },
      { name: 'Samoa', code: 'WS', code3: 'WSM' },
      { name: 'American Samoa', code: 'AS', code3: 'ASM' },
      { name: 'Tonga', code: 'TO', code3: 'TON' },
      { name: 'Cook Islands', code: 'CK', code3: 'COK' },
      { name: 'Niue', code: 'NU', code3: 'NIU' },
      { name: 'Tokelau', code: 'TK', code3: 'TKL' },
      { name: 'Pitcairn Islands', code: 'PN', code3: 'PCN' },
      { name: 'Easter Island', code: 'CL', code3: 'CHL' },
      { name: 'Hawaii', code: 'US', code3: 'USA' },
      { name: 'Alaska', code: 'US', code3: 'USA' },
      { name: 'Greenland', code: 'GL', code3: 'GRL' },
      { name: 'Iceland', code: 'IS', code3: 'ISL' },
      { name: 'Faroe Islands', code: 'FO', code3: 'FRO' },
      { name: 'Svalbard and Jan Mayen', code: 'SJ', code3: 'SJM' },
      { name: 'Bouvet Island', code: 'BV', code3: 'BVT' },
      { name: 'South Georgia and the South Sandwich Islands', code: 'GS', code3: 'SGS' },
      { name: 'Falkland Islands', code: 'FK', code3: 'FLK' },
      { name: 'Antarctica', code: 'AQ', code3: 'ATA' },
      { name: 'French Southern Territories', code: 'TF', code3: 'ATF' },
      { name: 'Heard Island and McDonald Islands', code: 'HM', code3: 'HMD' },
      { name: 'British Indian Ocean Territory', code: 'IO', code3: 'IOT' },
      { name: 'Christmas Island', code: 'CX', code3: 'CXR' },
      { name: 'Cocos Islands', code: 'CC', code3: 'CCK' },
      { name: 'Norfolk Island', code: 'NF', code3: 'NFK' }
    ];
  }
};

export const fetchStates = async (countryCode: string) => {
  try {
    // For Nigeria, return states
    if (countryCode === 'NG') {
      return [
        'Abuja Federal Capital Territory',
        'Abia',
        'Adamawa',
        'Akwa Ibom',
        'Anambra',
        'Bauchi',
        'Bayelsa',
        'Benue',
        'Borno',
        'Cross River',
        'Delta',
        'Ebonyi',
        'Edo',
        'Ekiti',
        'Enugu',
        'Gombe',
        'Imo',
        'Jigawa',
        'Kaduna',
        'Kano',
        'Katsina',
        'Kebbi',
        'Kogi',
        'Kwara',
        'Lagos',
        'Nasarawa',
        'Niger',
        'Ogun',
        'Ondo',
        'Osun',
        'Oyo',
        'Plateau',
        'Rivers',
        'Sokoto',
        'Taraba',
        'Yobe',
        'Zamfara'
      ].sort();
    }

         // For US, return states
     if (countryCode === 'US') {
       return [
         'Alabama',
         'Alaska',
         'Arizona',
         'Arkansas',
         'California',
         'Colorado',
         'Connecticut',
         'Delaware',
         'Florida',
         'Georgia',
         'Hawaii',
         'Idaho',
         'Illinois',
         'Indiana',
         'Iowa',
         'Kansas',
         'Kentucky',
         'Louisiana',
         'Maine',
         'Maryland',
         'Massachusetts',
         'Michigan',
         'Minnesota',
         'Mississippi',
         'Missouri',
         'Montana',
         'Nebraska',
         'Nevada',
         'New Hampshire',
         'New Jersey',
         'New Mexico',
         'New York',
         'North Carolina',
         'North Dakota',
         'Ohio',
         'Oklahoma',
         'Oregon',
         'Pennsylvania',
         'Rhode Island',
         'South Carolina',
         'South Dakota',
         'Tennessee',
         'Texas',
         'Utah',
         'Vermont',
         'Virginia',
         'Washington',
         'West Virginia',
         'Wisconsin',
         'Wyoming'
       ].sort();
     }

     // For Canada, return provinces and territories
     if (countryCode === 'CA') {
       return [
         'Alberta',
         'British Columbia',
         'Manitoba',
         'New Brunswick',
         'Newfoundland and Labrador',
         'Northwest Territories',
         'Nova Scotia',
         'Nunavut',
         'Ontario',
         'Prince Edward Island',
         'Quebec',
         'Saskatchewan',
         'Yukon'
       ].sort();
     }

     // For UK, return countries and regions
     if (countryCode === 'GB') {
       return [
         'England',
         'Scotland',
         'Wales',
         'Northern Ireland'
       ].sort();
     }

     // For Australia, return states and territories
     if (countryCode === 'AU') {
       return [
         'Australian Capital Territory',
         'New South Wales',
         'Northern Territory',
         'Queensland',
         'South Australia',
         'Tasmania',
         'Victoria',
         'Western Australia'
       ].sort();
     }

    // For other countries, try to fetch from a states API
    const response = await fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, {
      headers: {
        'X-CSCAPI-KEY': 'YOUR_API_KEY' // You'll need to get a free API key from countrystatecity.in
      }
    });
    
    if (response.ok) {
      const states = await response.json();
      return states.map((state: any) => state.name).sort();
    }

    // Fallback: return empty array for countries without states data
    return [];
  } catch (error) {
    console.error('Error fetching states:', error);
    return [];
  }
};
