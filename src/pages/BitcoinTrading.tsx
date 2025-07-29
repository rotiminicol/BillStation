import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Bitcoin, TrendingUp, TrendingDown, Sparkles, Activity, CheckCircle, ArrowRight, DollarSign, Wallet, BarChart3, RefreshCw, Calculator, Shield, Clock, Globe, Star, Zap, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  const [animateCards, setAnimateCards] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setAnimateCards(true), 100);
  }, []);

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
      {/* Enhanced Header with Animation */}
      <motion.div 
        className="flex items-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Crypto Trading
          </h1>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-6 w-6 text-blue-500" />
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Crypto Price Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white overflow-hidden relative group">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
          
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Bitcoin className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold">Current Bitcoin Price</h2>
                  <p className="text-orange-100">Live market data</p>
                </div>
              </div>
              <motion.div 
                className="text-right"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-3xl font-bold">₦{cryptoPrices.bitcoin.toLocaleString()}</div>
                <div className="flex items-center gap-1 text-green-300">
                  <TrendingUp className="h-4 w-4" />
                  <span>+2.5%</span>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Enhanced Main Content */}
        <div className="lg:col-span-2 space-y-8 pb-20 lg:pb-0">
          {/* Enhanced Crypto Selection */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-indigo-50/30 opacity-50"></div>
              <CardHeader className="pb-6 relative z-10">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BarChart3 className="h-6 w-6 text-white" />
                  </motion.div>
                  Select Crypto
                </CardTitle>
                <p className="text-gray-600 text-lg">Choose your preferred cryptocurrency</p>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {cryptoCurrencies.map((crypto, index) => (
                    <motion.div
                      key={crypto.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={`p-4 lg:p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                          selectedCrypto === crypto.id
                            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl'
                            : 'border-gray-200 hover:border-gray-300 shadow-lg hover:bg-gradient-to-br from-gray-50 to-gray-100'
                        } group overflow-hidden`}
                        onClick={() => setSelectedCrypto(crypto.id)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="text-center relative z-10">
                          <motion.div 
                            className={`w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${crypto.color} rounded-xl flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}
                            whileHover={{ rotate: 5 }}
                          >
                            <div className="text-2xl lg:text-3xl text-white">{crypto.logo}</div>
                          </motion.div>
                          <h4 className="font-semibold text-gray-900 text-sm lg:text-base group-hover:text-blue-600 transition-colors duration-300">{crypto.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">{crypto.description}</p>
                          <div className="flex items-center justify-center gap-1 mt-2 lg:mt-3">
                            <span className={`text-xs lg:text-sm font-semibold ${crypto.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {crypto.change > 0 ? '+' : ''}{crypto.change}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Trading Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-50/30 to-blue-50/30 opacity-50"></div>
              <CardHeader className="pb-6 relative z-10">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Wallet className="h-6 w-6 text-white" />
                  </motion.div>
                  Trade {cryptoCurrencies.find(c => c.id === selectedCrypto)?.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                {/* Enhanced Tab Navigation */}
                <motion.div 
                  className="flex bg-white rounded-xl p-1 shadow-lg max-w-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {[
                    { id: 'buy', icon: <TrendingUp className="h-5 w-5" />, label: 'Buy' },
                    { id: 'sell', icon: <TrendingDown className="h-5 w-5" />, label: 'Sell' }
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 py-3 px-6 rounded-lg text-base font-semibold transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="inline mr-2">{tab.icon}</span>
                      {tab.label}
                    </motion.button>
                  ))}
                </motion.div>

                <div className="space-y-4">
                  {activeTab === 'buy' ? (
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      <Label htmlFor="amount" className="text-base font-semibold">Amount in Naira</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount in ₦"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                      />
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      <Label htmlFor="cryptoAmount" className="text-base font-semibold">
                        Amount in {cryptoCurrencies.find(c => c.id === selectedCrypto)?.symbol}
                      </Label>
                      <Input
                        id="cryptoAmount"
                        type="number"
                        placeholder={`Enter amount in ${cryptoCurrencies.find(c => c.id === selectedCrypto)?.symbol}`}
                        value={cryptoAmount}
                        onChange={(e) => setCryptoAmount(e.target.value)}
                        className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                      />
                    </motion.div>
                  )}

                  {/* Enhanced Conversion Preview */}
                  <AnimatePresence>
                    {((activeTab === 'buy' && amount) || (activeTab === 'sell' && cryptoAmount)) && (
                      <motion.div 
                        className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border border-green-200"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Calculator className="h-5 w-5 text-green-600" />
                          <p className="text-base font-semibold text-green-800">Conversion Preview</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-green-700">
                              {activeTab === 'buy' ? 'Naira Amount' : `${cryptoCurrencies.find(c => c.id === selectedCrypto)?.symbol} Amount`}
                            </p>
                            <p className="text-lg font-bold text-green-800">
                              {activeTab === 'buy' ? `₦${parseFloat(amount || '0').toLocaleString()}` : `${parseFloat(cryptoAmount || '0').toFixed(8)} ${cryptoCurrencies.find(c => c.id === selectedCrypto)?.symbol}`}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-green-700">
                              {activeTab === 'buy' ? `${cryptoCurrencies.find(c => c.id === selectedCrypto)?.symbol} Amount` : 'Naira Amount'}
                            </p>
                            <p className="text-lg font-bold text-green-800">
                              {activeTab === 'buy' ? `${calculateCryptoAmount().toFixed(8)} ${cryptoCurrencies.find(c => c.id === selectedCrypto)?.symbol}` : `₦${calculateNairaAmount().toLocaleString()}`}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <Button
                      onClick={handleTrade}
                      className="w-full h-14 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      disabled={loading || (activeTab === 'buy' && !amount) || (activeTab === 'sell' && !cryptoAmount)}
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
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Enhanced Sidebar */}
        <div className="lg:col-span-1 space-y-6 hidden lg:block">
          {/* Enhanced Market Stats */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 lg:sticky lg:top-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30 opacity-50"></div>
              <CardHeader className="pb-6 relative z-10">
                <CardTitle className="text-xl flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TrendingUp className="h-5 w-5 text-white" />
                  </motion.div>
                  Market Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  {cryptoCurrencies.map((crypto, index) => (
                    <motion.div 
                      key={crypto.id} 
                      className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 rounded-lg px-2 transition-colors duration-200"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 bg-gradient-to-br ${crypto.color} rounded-lg flex items-center justify-center`}>
                          <span className="text-white text-sm">{crypto.logo}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900">{crypto.symbol}</span>
                          <p className="text-xs text-gray-500">{crypto.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">₦{crypto.price.toLocaleString()}</div>
                        <div className={`text-xs font-semibold ${crypto.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {crypto.change > 0 ? '+' : ''}{crypto.change}%
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Trading Benefits */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-50/30 to-blue-50/30 opacity-50"></div>
              <CardHeader className="pb-6 relative z-10">
                <CardTitle className="text-xl flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CheckCircle className="h-5 w-5 text-white" />
                  </motion.div>
                  Trading Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  {[
                    { icon: <Zap className="h-5 w-5" />, title: "Instant Trading", description: "Real-time execution" },
                    { icon: <Shield className="h-5 w-5" />, title: "Secure Platform", description: "Bank-level security" },
                    { icon: <Clock className="h-5 w-5" />, title: "24/7 Market", description: "Trade anytime" }
                  ].map((benefit, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="p-1 bg-green-100 rounded-lg">
                        <div className="text-green-600">
                          {benefit.icon}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{benefit.title}</p>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* New Premium Features Section */}
      <motion.div 
        className="hidden lg:block"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-500" />
          Trading Features
        </h3>
        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: <TrendingUp className="h-6 w-6" />, title: "Real-time Charts", description: "Advanced technical analysis tools", color: "from-green-500 to-green-600" },
            { icon: <Shield className="h-6 w-6" />, title: "Secure Wallet", description: "Multi-layer security protection", color: "from-blue-500 to-blue-600" },
            { icon: <Users className="h-6 w-6" />, title: "Community", description: "Join our trading community", color: "from-purple-500 to-purple-600" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              whileHover={{ y: -3 }}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  return (
    <DesktopLayout>
      <BitcoinTradingContent />
    </DesktopLayout>
  );
};

export default BitcoinTrading; 