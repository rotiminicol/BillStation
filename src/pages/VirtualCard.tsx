import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { CreditCard, DollarSign, Sparkles, Activity, CheckCircle, ArrowRight, Shield, TrendingUp, Copy, Eye, EyeOff, RefreshCw, Calculator, Clock, Globe, Zap, Users, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";

import { useToast } from "@/hooks/use-toast";
import { getBankLogo } from "@/lib/bankLogos";

const VirtualCard = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');
  const [cardAmount, setCardAmount] = useState("");
  const [cardName, setCardName] = useState("");
  const [loading, setLoading] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setAnimateCards(true), 100);
  }, []);

  const virtualCards = [
    {
      id: 1,
      name: "Shopping Card",
      number: "4532 **** **** 1234",
      balance: 50000,
      currency: "USD",
      expiry: "12/25",
      cvv: "123",
      status: "active",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      id: 2,
      name: "Travel Card",
      number: "4532 **** **** 5678",
      balance: 75000,
      currency: "USD",
      expiry: "09/26",
      cvv: "456",
      status: "active",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100"
    }
  ];

  const exchangeRate = 1500; // ₦1,500 per USD

  const calculateUSD = () => {
    if (!cardAmount) return 0;
    return parseFloat(cardAmount) / exchangeRate;
  };

  const handleCreateCard = () => {
    if (!cardAmount || !cardName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast({
        title: "Card Created!",
        description: `Virtual card created with $${calculateUSD().toFixed(2)} USD balance.`,
      });
      setLoading(false);
      setCardAmount("");
      setCardName("");
    }, 2000);
  };

  const copyCardNumber = (cardNumber: string) => {
    navigator.clipboard.writeText(cardNumber);
    toast({
      title: "Copied!",
      description: "Card number copied to clipboard",
    });
  };

  const VirtualCardContent = () => (
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
            Virtual Card
          </h1>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-6 w-6 text-blue-500" />
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Tab Navigation */}
      <motion.div 
        className="flex bg-white rounded-xl p-1 mb-8 shadow-lg max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {[
          { id: 'create', icon: <CreditCard className="h-5 w-5" />, label: 'Create Card' },
          { id: 'manage', icon: <Shield className="h-5 w-5" />, label: 'Manage Cards' }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 px-6 rounded-lg text-base font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
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

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Enhanced Main Content */}
        <div className="lg:col-span-2 space-y-8 pb-20 lg:pb-0">
          {activeTab === 'create' ? (
            /* Enhanced Create Card */
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
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
                      <CreditCard className="h-6 w-6 text-white" />
                    </motion.div>
                    Create Virtual Card
                  </CardTitle>
                  <p className="text-gray-600 text-lg">Create a secure virtual card for online transactions</p>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <Label htmlFor="cardName" className="text-base font-semibold">Card Name</Label>
                      <Input
                        id="cardName"
                        type="text"
                        placeholder="Enter card name"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                      />
                    </motion.div>

                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <Label htmlFor="cardAmount" className="text-base font-semibold">Amount in Naira</Label>
                      <Input
                        id="cardAmount"
                        type="number"
                        placeholder="Enter amount"
                        value={cardAmount}
                        onChange={(e) => setCardAmount(e.target.value)}
                        className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                      />
                    </motion.div>
                  </div>

                  {/* Enhanced Conversion Preview */}
                  <AnimatePresence>
                    {cardAmount && (
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
                            <p className="text-sm text-green-700">Naira Amount</p>
                            <p className="text-lg font-bold text-green-800">₦{parseFloat(cardAmount || '0').toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-green-700">USD Amount</p>
                            <p className="text-lg font-bold text-green-800">${calculateUSD().toFixed(2)}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <Button
                      onClick={handleCreateCard}
                      className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      disabled={!cardAmount || !cardName || loading}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Creating...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5" />
                          Create Virtual Card
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            /* Enhanced Manage Cards */
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
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
                      <Shield className="h-6 w-6 text-white" />
                    </motion.div>
                    Manage Virtual Cards
                  </CardTitle>
                  <p className="text-gray-600 text-lg">View and manage your virtual cards</p>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {virtualCards.map((card, index) => (
                      <motion.div
                        key={card.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="p-6 rounded-2xl border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                          {/* Realistic ATM Card Display */}
                          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 rounded-xl mb-4">
                            {/* Card Network Logo */}
                            <div className="absolute top-4 left-4">
                              <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                                <div className="text-white font-bold text-xs">VISA</div>
                              </div>
                            </div>
                            

                            
                            {/* Card Number */}
                            <div className="mt-12 mb-6">
                              <p className="text-xs text-gray-300 mb-2">CARD NUMBER</p>
                              <p className="text-xl font-mono font-bold tracking-wider">{card.number}</p>
                            </div>
                            
                            {/* Card Holder Name */}
                            <div className="mb-4">
                              <p className="text-xs text-gray-300 mb-1">CARD HOLDER</p>
                              <p className="font-semibold text-lg">JOHN DOE</p>
                            </div>
                            
                            {/* Expiry Date and CVV */}
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs text-gray-300 mb-1">EXPIRES</p>
                                <p className="font-semibold">{card.expiry}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-300 mb-1">CVV</p>
                                <p className="font-semibold">***</p>
                              </div>
                            </div>
                            
                            {/* Bank Logo */}
                            <div className="absolute bottom-4 right-4">
                              <div className="text-white font-bold text-sm">BILL STATION</div>
                            </div>
                          </div>
                          
                          {/* Card Details */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Card Name</span>
                              <span className="font-semibold text-gray-900">{card.name}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Balance</span>
                              <span className="font-bold text-gray-900">${(card.balance / 100).toFixed(2)}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Status</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                card.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {card.status}
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Card Number</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-sm">{card.number}</span>
                                <motion.button
                                  onClick={() => copyCardNumber(card.number)}
                                  className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Copy className="h-4 w-4 text-gray-500" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Enhanced Sidebar */}
        <div className="lg:col-span-1 space-y-6 hidden lg:block">
          {/* Enhanced Card Benefits */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 lg:sticky lg:top-8 overflow-hidden">
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
                  Card Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  {[
                    { icon: <Lock className="h-5 w-5" />, title: "Secure Transactions", description: "Bank-level encryption" },
                    { icon: <Zap className="h-5 w-5" />, title: "Instant Creation", description: "Cards ready in seconds" },
                    { icon: <Globe className="h-5 w-5" />, title: "Global Acceptance", description: "Accepted worldwide" }
                  ].map((benefit, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
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

          {/* Enhanced Exchange Rate */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
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
                  Exchange Rate
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <motion.div 
                    className="p-4 bg-blue-50 rounded-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-blue-800 font-semibold">USD to NGN</span>
                      <span className="text-blue-800 font-bold text-lg">₦{exchangeRate.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">Current exchange rate</p>
                  </motion.div>
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
          Virtual Card Features
        </h3>
        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: <Lock className="h-6 w-6" />, title: "Enhanced Security", description: "Multi-layer fraud protection", color: "from-green-500 to-green-600" },
            { icon: <Zap className="h-6 w-6" />, title: "Instant Activation", description: "Ready to use immediately", color: "from-blue-500 to-blue-600" },
            { icon: <Users className="h-6 w-6" />, title: "Global Support", description: "24/7 customer assistance", color: "from-purple-500 to-purple-600" }
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
      <VirtualCardContent />
    </DesktopLayout>
  );
};

export default VirtualCard; 