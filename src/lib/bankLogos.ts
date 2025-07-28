interface BankLogoParams {
  code?: string;
  name?: string;
}

export const getBankLogo = ({ code, name }: BankLogoParams): string => {
  // Bank code mappings
  const bankLogos: Record<string, string> = {
    '044': 'https://raw.githubusercontent.com/wovenfinance/cdn/main/banks/044.png', // Access Bank
    '050': 'https://raw.githubusercontent.com/wovenfinance/cdn/main/banks/050.png', // Ecobank
    '057': 'https://raw.githubusercontent.com/wovenfinance/cdn/main/banks/057.png', // Zenith Bank
    '011': 'https://raw.githubusercontent.com/wovenfinance/cdn/main/banks/011.png', // First Bank
    '058': 'https://raw.githubusercontent.com/wovenfinance/cdn/main/banks/058.png', // GT Bank
    '030': 'https://raw.githubusercontent.com/wovenfinance/cdn/main/banks/030.png', // Heritage Bank
    '082': 'https://raw.githubusercontent.com/wovenfinance/cdn/main/banks/082.png', // Keystone Bank
    '221': 'https://raw.githubusercontent.com/wovenfinance/cdn/main/banks/221.png', // Stanbic IBTC
    '232': 'https://raw.githubusercontent.com/wovenfinance/cdn/main/banks/232.png', // Sterling Bank
    '032': 'https://raw.githubusercontent.com/wovenfinance/cdn/main/banks/032.png', // Union Bank
    '033': 'https://raw.githubusercontent.com/wovenfinance/cdn/main/banks/033.png', // UBA
    '215': 'https://raw.githubusercontent.com/wovenfinance/cdn/main/banks/215.png', // Unity Bank
    '035': 'https://raw.githubusercontent.com/wovenfinance/cdn/main/banks/035.png', // Wema Bank
  };

  // Service/Provider mappings
  const serviceLogos: Record<string, string> = {
    'mtn': 'https://raw.githubusercontent.com/Nelwhix/nigerian-bank-icons/main/mtn.png',
    'airtel': 'https://raw.githubusercontent.com/Nelwhix/nigerian-bank-icons/main/airtel.png',
    'glo': 'https://raw.githubusercontent.com/Nelwhix/nigerian-bank-icons/main/glo.png',
    '9mobile': 'https://raw.githubusercontent.com/Nelwhix/nigerian-bank-icons/main/9mobile.png',
    'bet9ja': 'https://raw.githubusercontent.com/Nelwhix/nigerian-bank-icons/main/bet9ja.png',
    'nairabet': 'https://raw.githubusercontent.com/Nelwhix/nigerian-bank-icons/main/nairabet.png',
    'uber': 'https://raw.githubusercontent.com/Nelwhix/nigerian-bank-icons/main/uber.png',
    'bolt': 'https://raw.githubusercontent.com/Nelwhix/nigerian-bank-icons/main/bolt.png',
    'amazon': 'https://raw.githubusercontent.com/Nelwhix/nigerian-bank-icons/main/amazon.png',
    'steam': 'https://raw.githubusercontent.com/Nelwhix/nigerian-bank-icons/main/steam.png',
    'netflix': 'https://raw.githubusercontent.com/Nelwhix/nigerian-bank-icons/main/netflix.png',
    'spotify': 'https://raw.githubusercontent.com/Nelwhix/nigerian-bank-icons/main/spotify.png',
  };

  // Try to find by bank code first
  if (code && bankLogos[code]) {
    return bankLogos[code];
  }

  // Try to find by name (case insensitive)
  if (name) {
    const lowerName = name.toLowerCase();
    
    // Check bank names
    for (const [bankCode, logo] of Object.entries(bankLogos)) {
      if (lowerName.includes('access') && bankCode === '044') return logo;
      if (lowerName.includes('ecobank') && bankCode === '050') return logo;
      if (lowerName.includes('zenith') && bankCode === '057') return logo;
      if (lowerName.includes('first') && bankCode === '011') return logo;
      if (lowerName.includes('gt') && bankCode === '058') return logo;
      if (lowerName.includes('heritage') && bankCode === '030') return logo;
      if (lowerName.includes('keystone') && bankCode === '082') return logo;
      if (lowerName.includes('stanbic') && bankCode === '221') return logo;
      if (lowerName.includes('sterling') && bankCode === '232') return logo;
      if (lowerName.includes('union') && bankCode === '032') return logo;
      if (lowerName.includes('uba') && bankCode === '033') return logo;
      if (lowerName.includes('unity') && bankCode === '215') return logo;
      if (lowerName.includes('wema') && bankCode === '035') return logo;
    }

    // Check service names
    for (const [serviceName, logo] of Object.entries(serviceLogos)) {
      if (lowerName.includes(serviceName)) return logo;
    }
  }

  // Default fallback
  return '/placeholder.svg';
}; 