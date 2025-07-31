import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Bitcoin, TrendingUp, TrendingDown, Activity, CheckCircle, ArrowRight, DollarSign, Wallet, BarChart3, RefreshCw, Calculator, Shield, Clock, Globe, Star, Zap, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";

import { useToast } from "@/hooks/use-toast";
import { getBankLogo } from "@/lib/bankLogos";

const BitcoinTrading = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [amount, setAmount] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock Crypto prices (in real app, this would come from API)
  const cryptoPrices = {
    bitcoin: 45000000, // ₦45,000,000 per BTC
    ethereum: 2800000, // ₦2,800,000 per ETH
    binance: 45000, // ₦45,000 per BNB
    cardano: 450, // ₦450 per ADA
  };

  const exchangeRate = 1500; // ₦1,500 per USD

  const calculateCryptoAmount = () => {
    if (!amount) return 0;
    const price = cryptoPrices[selectedCrypto as keyof typeof cryptoPrices];
    return parseFloat(amount) / price;
  };

  const calculateNairaAmount = () => {
    if (!cryptoAmount) return 0;
    const price = cryptoPrices[selectedCrypto as keyof typeof cryptoPrices];
    return parseFloat(cryptoAmount) * price;
  };

  const cryptoCurrencies = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', logo: '₿', price: 45000000, change: 2.5, color: 'from-orange-500 to-orange-600', bgColor: 'from-orange-50 to-orange-100', description: 'Digital gold' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', logo: 'Ξ', price: 2800000, change: -1.2, color: 'from-blue-500 to-blue-600', bgColor: 'from-blue-50 to-blue-100', description: 'Smart contracts' },
    { id: 'binance', name: 'Binance Coin', symbol: 'BNB', price: 45000, change: 3.8, color: 'from-yellow-500 to-yellow-600', bgColor: 'from-yellow-50 to-yellow-100', description: 'Exchange token' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 450, change: 1.5, color: 'from-blue-600 to-blue-700', bgColor: 'from-blue-50 to-blue-100', description: 'Research-driven' },
  ];

  const handleTrade = () => {
    if (activeTab === 'buy' && !amount) {
      toast({
        title: "Error",
        description: "Please enter the amount you want to spend.",
        variant: "destructive"
      });
      return;
    }

    if (activeTab === 'sell' && !cryptoAmount) {
      toast({
        title: "Error",
        description: "Please enter the crypto amount you want to sell.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const action = activeTab === 'buy' ? 'purchased' : 'sold';
      const value = activeTab === 'buy' ? calculateCryptoAmount() : calculateNairaAmount();
      const unit = activeTab === 'buy' ? cryptoCurrencies.find(c => c.id === selectedCrypto)?.symbol : '₦';
      
      toast({
        title: "Trade Successful!",
        description: `Successfully ${action} ${value.toFixed(8)} ${unit}`,
      });
      setLoading(false);
      setAmount("");
      setCryptoAmount("");
    }, 2000);
  };

  const BitcoinTradingContent = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Crypto Trading
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
                ? 'bg-blue-600 text-white shadow-lg'
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
                <Bitcoin className="h-5 w-5 text-blue-600" />
                Select Cryptocurrency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {cryptoCurrencies.map((crypto) => (
                  <Card
                    key={crypto.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedCrypto === crypto.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setSelectedCrypto(crypto.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                        selectedCrypto === crypto.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        <span className="text-2xl">{crypto.logo}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{crypto.name}</h4>
                      <p className="text-xs text-gray-500 mb-2">{crypto.description}</p>
                      <p className="text-sm font-medium text-blue-600">₦{crypto.price.toLocaleString()}</p>
                      <div className={`flex items-center justify-center gap-1 mt-1 ${
                        crypto.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {crypto.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        <span className="text-xs">{Math.abs(crypto.change)}%</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trading Form */}
          {selectedCrypto && (
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {activeTab === 'buy' ? 'Buy' : 'Sell'} {cryptoCurrencies.find(c => c.id === selectedCrypto)?.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {activeTab === 'buy' ? (
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount in Naira (₦)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount in Naira"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="h-12"
                    />
                    {amount && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 text-sm">
                          You will receive: <span className="font-bold">{calculateCryptoAmount().toFixed(8)} {cryptoCurrencies.find(c => c.id === selectedCrypto)?.symbol}</span>
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="cryptoAmount">Amount in {cryptoCurrencies.find(c => c.id === selectedCrypto)?.symbol}</Label>
                    <Input
                      id="cryptoAmount"
                      type="number"
                      placeholder={`Enter amount in ${cryptoCurrencies.find(c => c.id === selectedCrypto)?.symbol}`}
                      value={cryptoAmount}
                      onChange={(e) => setCryptoAmount(e.target.value)}
                      className="h-12"
                    />
                    {cryptoAmount && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 text-sm">
                          You will receive: <span className="font-bold">₦{calculateNairaAmount().toLocaleString()}</span>
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <Button
                  onClick={handleTrade}
                  disabled={loading || (activeTab === 'buy' ? !amount : !cryptoAmount)}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      {activeTab === 'buy' ? 'Buy' : 'Sell'} {cryptoCurrencies.find(c => c.id === selectedCrypto)?.symbol}
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
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
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-blue-600" />
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
    </div>
  );

  return (
    <DesktopLayout>
      <BitcoinTradingContent />
    </DesktopLayout>
  );
};

export default BitcoinTrading; 