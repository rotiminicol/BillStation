import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Bitcoin, TrendingUp, TrendingDown, Activity, CheckCircle, ArrowRight, DollarSign, Wallet, BarChart3, RefreshCw, Calculator, Shield, Clock, Globe, Star, Zap, Users, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";
import CryptoCard from "@/components/crypto/CryptoCard";
import TradeInput from "@/components/crypto/TradeInput";
import TradeSummaryModal from "@/components/crypto/TradeSummaryModal";
import { PinInput } from "@/components/PinInput";

import { useToast } from "@/hooks/use-toast";
import { getBankLogo } from "@/lib/bankLogos";

interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  change: number;
  color: string;
  bgColor: string;
  description: string;
  marketCap?: string;
  volume24h?: string;
}

interface TradeSummary {
  id: string;
  type: 'buy' | 'sell';
  crypto: {
    name: string;
    symbol: string;
    logo: string;
  };
  amountCrypto: string;
  amountNaira: number;
  price: number;
  timestamp: string;
  transactionId: string;
  status: 'completed' | 'pending' | 'failed';
  profitLoss?: number;
  originalPrice?: number;
}

const BitcoinTrading = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [currentAmount, setCurrentAmount] = useState(0);
  const [currentAmountType, setCurrentAmountType] = useState<'naira' | 'crypto'>('naira');
  const [loading, setLoading] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [currentTrade, setCurrentTrade] = useState<TradeSummary | null>(null);
  const [pinError, setPinError] = useState('');
  const { toast } = useToast();

  // Mock Crypto prices with enhanced data
  const cryptoCurrencies: CryptoCurrency[] = [
    { 
      id: 'bitcoin', 
      name: 'Bitcoin', 
      symbol: 'BTC', 
      logo: '₿', 
      price: 45000000, 
      change: 2.5, 
      color: 'from-orange-500 to-orange-600', 
      bgColor: 'from-orange-50 to-orange-100', 
      description: 'Digital gold',
      marketCap: '₦850T',
      volume24h: '₦2.1T'
    },
    { 
      id: 'ethereum', 
      name: 'Ethereum', 
      symbol: 'ETH', 
      logo: 'Ξ', 
      price: 2800000, 
      change: -1.2, 
      color: 'from-blue-500 to-blue-600', 
      bgColor: 'from-blue-50 to-blue-100', 
      description: 'Smart contracts',
      marketCap: '₦320T',
      volume24h: '₦890B'
    },
    { 
      id: 'binance', 
      name: 'Binance Coin', 
      symbol: 'BNB', 
      logo: '🟡', 
      price: 45000, 
      change: 3.8, 
      color: 'from-yellow-500 to-yellow-600', 
      bgColor: 'from-yellow-50 to-yellow-100', 
      description: 'Exchange token',
      marketCap: '₦68T',
      volume24h: '₦120B'
    },
    { 
      id: 'cardano', 
      name: 'Cardano', 
      symbol: 'ADA', 
      logo: '₳', 
      price: 450, 
      change: 1.5, 
      color: 'from-blue-600 to-blue-700', 
      bgColor: 'from-blue-50 to-blue-100', 
      description: 'Research-driven',
      marketCap: '₦15T',
      volume24h: '₦45B'
    },
  ];

  // Mock original purchase prices for profit/loss calculation
  const originalPrices = {
    bitcoin: 42000000, // ₦42,000,000
    ethereum: 3000000,  // ₦3,000,000
    binance: 42000,     // ₦42,000
    cardano: 400,       // ₦400
  };

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, this would fetch live prices from an API
      // For now, we'll just simulate small price movements
      console.log('Price update simulation...');
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const selectedCryptoData = cryptoCurrencies.find(c => c.id === selectedCrypto);

  const calculateCryptoAmount = (naira: number) => {
    if (!selectedCryptoData) return 0;
    return naira / selectedCryptoData.price;
  };

  const calculateNairaAmount = (cryptoAmount: number) => {
    if (!selectedCryptoData) return 0;
    return cryptoAmount * selectedCryptoData.price;
  };

  const calculateProfitLoss = () => {
    if (!selectedCryptoData || activeTab !== 'sell') return 0;
    
    const originalPrice = originalPrices[selectedCrypto as keyof typeof originalPrices];
    const currentPrice = selectedCryptoData.price;
    const cryptoAmount = currentAmountType === 'crypto' ? currentAmount : calculateCryptoAmount(currentAmount);
    
    return (currentPrice - originalPrice) * cryptoAmount;
  };

  const handleAmountChange = (amount: number, type: 'naira' | 'crypto') => {
    setCurrentAmount(amount);
    setCurrentAmountType(type);
  };

  const handleTrade = () => {
    if (!selectedCryptoData || currentAmount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount.",
        variant: "destructive"
      });
      return;
    }

    setShowPinInput(true);
  };

  const handlePinComplete = async (pin: string) => {
    if (pin === '1234') { // Mock PIN validation
      setShowPinInput(false);
      setPinError('');
      
      setLoading(true);
      
      // Simulate trade processing
      setTimeout(() => {
        const cryptoAmount = currentAmountType === 'crypto' ? currentAmount : calculateCryptoAmount(currentAmount);
        const nairaAmount = currentAmountType === 'naira' ? currentAmount : calculateNairaAmount(currentAmount);
        const profitLoss = calculateProfitLoss();
        
        const trade: TradeSummary = {
          id: `trade-${Date.now()}`,
          type: activeTab,
          crypto: {
            name: selectedCryptoData!.name,
            symbol: selectedCryptoData!.symbol,
            logo: selectedCryptoData!.logo
          },
          amountCrypto: cryptoAmount.toFixed(8),
          amountNaira: nairaAmount,
          price: selectedCryptoData!.price,
          timestamp: new Date().toLocaleString(),
          transactionId: `TX${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          status: 'completed',
          profitLoss: activeTab === 'sell' ? profitLoss : undefined,
          originalPrice: activeTab === 'sell' ? originalPrices[selectedCrypto as keyof typeof originalPrices] : undefined
        };
        
        setCurrentTrade(trade);
        setShowTradeModal(true);
        setLoading(false);
        
        toast({
          title: "Trade Successful!",
          description: `Successfully ${activeTab === 'buy' ? 'purchased' : 'sold'} ${cryptoAmount.toFixed(8)} ${selectedCryptoData!.symbol}`,
        });
      }, 2000);
    } else {
      setPinError('Incorrect PIN. Please try again.');
    }
  };

  const handlePinClose = () => {
    setShowPinInput(false);
    setPinError('');
  };

  const handleTradeModalClose = () => {
    setShowTradeModal(false);
    setCurrentTrade(null);
    setCurrentAmount(0);
  };

  const handleViewWallet = () => {
    toast({
      title: "Redirecting...",
      description: "Taking you to your crypto wallet.",
    });
    // In a real app, this would navigate to the wallet page
  };

  const handleViewHistory = () => {
    toast({
      title: "Redirecting...",
      description: "Taking you to transaction history.",
    });
    // In a real app, this would navigate to the history page
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your trade receipt is being downloaded.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Shared!",
      description: "Your trade details have been shared.",
    });
  };

  const BitcoinTradingContent = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Crypto Trading Suite
          </h1>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white rounded-xl p-1 mb-8 shadow-lg max-w-md">
        {[
          { id: 'buy', icon: <TrendingUp className="h-5 w-5" />, label: 'Buy Crypto' },
          { id: 'sell', icon: <TrendingDown className="h-5 w-5" />, label: 'Sell Crypto' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'buy' | 'sell')}
            className={`flex-1 py-3 px-6 rounded-lg text-base font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-[#0B63BC] text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <span className="inline mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Crypto Selection */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Bitcoin className="h-5 w-5 text-[#0B63BC]" />
                Select Cryptocurrency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {cryptoCurrencies.map((crypto, index) => (
                  <CryptoCard
                    key={crypto.id}
                    crypto={crypto}
                    isSelected={selectedCrypto === crypto.id}
                    onSelect={setSelectedCrypto}
                    index={index}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trading Form */}
          {selectedCryptoData && (
            <TradeInput
              crypto={selectedCryptoData}
              tradeType={activeTab}
              onAmountChange={handleAmountChange}
              onTrade={handleTrade}
              loading={loading}
              profitLoss={activeTab === 'sell' ? calculateProfitLoss() : undefined}
              originalPrice={activeTab === 'sell' ? originalPrices[selectedCrypto as keyof typeof originalPrices] : undefined}
            />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/transfer" className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Send Money
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/transactions" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  View History
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/wallet" className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  My Wallet
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Market Overview */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">Market Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cryptoCurrencies.slice(0, 3).map((crypto) => (
                <div key={crypto.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm">{crypto.logo}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{crypto.symbol}</p>
                      <p className="text-xs text-gray-500">₦{crypto.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${
                    crypto.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Instant Trading</p>
                  <p className="text-xs text-gray-500">Real-time execution</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0B63BC]/10 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-[#0B63BC]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Secure Platform</p>
                  <p className="text-xs text-gray-500">Bank-level security</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Best Rates</p>
                  <p className="text-xs text-gray-500">Competitive pricing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* PIN Input Modal */}
      {showPinInput && (
        <PinInput
          onComplete={handlePinComplete}
          onClose={handlePinClose}
          error={pinError}
        />
      )}

      {/* Trade Summary Modal */}
      {currentTrade && (
        <TradeSummaryModal
          trade={currentTrade}
          isOpen={showTradeModal}
          onClose={handleTradeModalClose}
          onViewWallet={handleViewWallet}
          onViewHistory={handleViewHistory}
          onDownload={handleDownload}
          onShare={handleShare}
        />
      )}
    </div>
  );

  return (
    <DesktopLayout>
      <BitcoinTradingContent />
    </DesktopLayout>
  );
};

export default BitcoinTrading; 