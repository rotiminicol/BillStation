import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Bitcoin, TrendingUp, TrendingDown, Sparkles, Activity, CheckCircle, ArrowRight, DollarSign, Wallet, BarChart3, RefreshCw, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";
import BackButton from "@/components/ui/back-button";
import { useToast } from "@/hooks/use-toast";
import { getBankLogo } from "@/lib/bankLogos";

const BitcoinTrading = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState("");
  const [bitcoinAmount, setBitcoinAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setAnimateCards(true), 100);
  }, []);

  // Mock Bitcoin price (in real app, this would come from API)
  const bitcoinPrice = 45000000; // ₦45,000,000 per BTC
  const exchangeRate = 1500; // ₦1,500 per USD

  const calculateBitcoinAmount = () => {
    if (!amount) return 0;
    return parseFloat(amount) / bitcoinPrice;
  };

  const calculateNairaAmount = () => {
    if (!bitcoinAmount) return 0;
    return parseFloat(bitcoinAmount) * bitcoinPrice;
  };

  const cryptoCurrencies = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', logo: '₿', price: 45000000, change: 2.5, color: 'bg-gradient-to-br from-orange-500 to-orange-600' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', logo: 'Ξ', price: 2800000, change: -1.2, color: 'bg-gradient-to-br from-blue-500 to-blue-600' },
    { id: 'binance', name: 'Binance Coin', symbol: 'BNB', price: 45000, change: 3.8, color: 'bg-gradient-to-br from-yellow-500 to-yellow-600' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 450, change: 1.5, color: 'bg-gradient-to-br from-blue-600 to-blue-700' },
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

    if (activeTab === 'sell' && !bitcoinAmount) {
      toast({
        title: "Error",
        description: "Please enter the Bitcoin amount you want to sell.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const action = activeTab === 'buy' ? 'purchased' : 'sold';
      const value = activeTab === 'buy' ? calculateBitcoinAmount() : calculateNairaAmount();
      const unit = activeTab === 'buy' ? 'BTC' : '₦';
      
      toast({
        title: "Trade Successful!",
        description: `Successfully ${action} ${value.toFixed(8)} ${unit}`,
      });
      setLoading(false);
      setAmount("");
      setBitcoinAmount("");
    }, 2000);
  };

  const BitcoinTradingContent = () => (
    <div className="space-y-8">
      {/* Header with Animation */}
      <div className={`flex items-center mb-8 transition-all duration-1000 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <BackButton to="/dashboard" className="mr-4" />
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Bitcoin Trading
          </h1>
          <Sparkles className="h-6 w-6 text-blue-500 animate-pulse" />
        </div>
      </div>

      {/* Bitcoin Price Card */}
      <div className={`transition-all duration-1000 delay-200 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white overflow-hidden relative group">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/50 via-orange-700/50 to-orange-800/50"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700 delay-300"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-white/5 to-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:blur-2xl transition-all duration-1000"></div>
          
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Bitcoin className="h-8 w-8 text-orange-200" />
                  <h2 className="text-2xl font-bold">Bitcoin (BTC)</h2>
                </div>
                <p className="text-4xl font-bold tracking-tight">₦{bitcoinPrice.toLocaleString()}</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-300" />
                  <span className="text-green-300 font-semibold">+2.5% (24h)</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-orange-200 text-lg">Market Cap</p>
                <p className="text-2xl font-bold">₦8.9T</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className={`flex bg-white rounded-xl p-1 mb-8 shadow-lg max-w-md transition-all duration-1000 delay-400 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <button
          onClick={() => setActiveTab('buy')}
          className={`flex-1 py-3 px-6 rounded-lg text-base font-semibold transition-all duration-300 ${
            activeTab === 'buy'
              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <TrendingUp className="h-5 w-5 inline mr-2" />
          Buy Bitcoin
        </button>
        <button
          onClick={() => setActiveTab('sell')}
          className={`flex-1 py-3 px-6 rounded-lg text-base font-semibold transition-all duration-300 ${
            activeTab === 'sell'
              ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <TrendingDown className="h-5 w-5 inline mr-2" />
          Sell Bitcoin
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8 pb-20 lg:pb-0">
          {/* Trading Form */}
          <div className={`transition-all duration-1000 delay-600 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Bitcoin className="h-6 w-6 text-white" />
                  </div>
                  {activeTab === 'buy' ? 'Buy Bitcoin' : 'Sell Bitcoin'}
                </CardTitle>
                <p className="text-gray-600 text-lg">Trade Bitcoin securely and instantly</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {activeTab === 'buy' ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount" className="text-base font-semibold">Amount in Naira</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount in ₦"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="h-14 border-2 border-gray-200 focus:border-orange-500 transition-colors duration-300 text-base"
                      />
                    </div>

                    {/* Quick Amounts */}
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Quick Amounts</Label>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {[10000, 50000, 100000, 500000].map((quickAmount) => (
                          <Button
                            key={quickAmount}
                            variant="outline"
                            size="sm"
                            onClick={() => setAmount(quickAmount.toString())}
                            className="h-12 text-base font-semibold border-2 hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 hover:scale-105"
                          >
                            ₦{quickAmount.toLocaleString()}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Conversion Preview */}
                    {amount && (
                      <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl border border-orange-200">
                        <div className="flex items-center gap-3 mb-2">
                          <Calculator className="h-5 w-5 text-orange-600" />
                          <p className="text-base font-semibold text-orange-800">You'll Receive</p>
                        </div>
                        <p className="text-2xl font-bold text-orange-800">{calculateBitcoinAmount().toFixed(8)} BTC</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bitcoinAmount" className="text-base font-semibold">Bitcoin Amount</Label>
                      <Input
                        id="bitcoinAmount"
                        type="number"
                        placeholder="Enter BTC amount"
                        value={bitcoinAmount}
                        onChange={(e) => setBitcoinAmount(e.target.value)}
                        className="h-14 border-2 border-gray-200 focus:border-orange-500 transition-colors duration-300 text-base"
                      />
                    </div>

                    {/* Conversion Preview */}
                    {bitcoinAmount && (
                      <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl border border-red-200">
                        <div className="flex items-center gap-3 mb-2">
                          <Calculator className="h-5 w-5 text-red-600" />
                          <p className="text-base font-semibold text-red-800">You'll Receive</p>
                        </div>
                        <p className="text-2xl font-bold text-red-800">₦{calculateNairaAmount().toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                )}

                <Button
                  onClick={handleTrade}
                  className={`w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                    activeTab === 'buy' 
                      ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' 
                      : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                  }`}
                  disabled={loading || (activeTab === 'buy' ? !amount : !bitcoinAmount)}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {activeTab === 'buy' ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                      {activeTab === 'buy' ? 'Buy Bitcoin' : 'Sell Bitcoin'}
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Market Overview */}
          <div className={`transition-all duration-1000 delay-800 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  Market Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {cryptoCurrencies.map((crypto) => (
                    <div
                      key={crypto.id}
                      className="p-4 lg:p-6 rounded-2xl border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                    >
                      <div className="text-center">
                        <div className={`w-10 h-10 lg:w-12 lg:h-12 ${crypto.color} rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-3 shadow-lg`}>
                          <span className="text-xl lg:text-2xl text-white">{crypto.logo}</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm lg:text-base group-hover:text-blue-600 transition-colors duration-300">{crypto.name}</h4>
                        <p className="text-base lg:text-lg font-bold text-gray-900">₦{crypto.price.toLocaleString()}</p>
                        <div className={`flex items-center justify-center gap-1 mt-1 lg:mt-2 ${
                          crypto.change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {crypto.change > 0 ? <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4" /> : <TrendingDown className="h-3 w-3 lg:h-4 lg:w-4" />}
                          <span className="text-xs lg:text-sm font-semibold">{crypto.change}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6 hidden lg:block">
          {/* Trading Benefits */}
          <div className={`transition-all duration-1000 delay-1000 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 lg:sticky lg:top-8">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  Trading Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Instant Trading</p>
                      <p className="text-sm text-gray-600">Buy and sell instantly</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Low Fees</p>
                      <p className="text-sm text-gray-600">Competitive trading fees</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Secure Wallet</p>
                      <p className="text-sm text-gray-600">Safe and encrypted storage</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Market Stats */}
          <div className={`transition-all duration-1000 delay-1200 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  Market Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">24h Volume</span>
                    <span className="font-bold">₦2.1B</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Market Cap</span>
                    <span className="font-bold">₦8.9T</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Circulating Supply</span>
                    <span className="font-bold">19.5M BTC</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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