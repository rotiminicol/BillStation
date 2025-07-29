import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Smartphone, DollarSign, TrendingUp, Sparkles, Activity, CheckCircle, ArrowRight, RefreshCw, Calculator, Shield, Clock, Zap, Users, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";

import { useToast } from "@/hooks/use-toast";
import { getBankLogo } from "@/lib/bankLogos";

const AirtimeSwap = () => {
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [airtimeAmount, setAirtimeAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setAnimateCards(true), 100);
  }, []);

  const networks = [
    { id: "mtn", name: "MTN", color: "from-yellow-500 to-yellow-600", bgColor: "from-yellow-50 to-yellow-100", rate: 0.85, description: "Best rates for MTN" },
    { id: "airtel", name: "Airtel", color: "from-red-500 to-red-600", bgColor: "from-red-50 to-red-100", rate: 0.80, description: "Fast conversion" },
    { id: "glo", name: "Glo", color: "from-green-500 to-green-600", bgColor: "from-green-50 to-green-100", rate: 0.75, description: "Reliable service" },
    { id: "9mobile", name: "9mobile", color: "from-green-600 to-green-700", bgColor: "from-green-50 to-green-100", rate: 0.70, description: "Quick processing" },
  ];

  const calculateCashValue = () => {
    if (!selectedNetwork || !airtimeAmount) return 0;
    const network = networks.find(n => n.id === selectedNetwork);
    return network ? parseFloat(airtimeAmount) * network.rate : 0;
  };

  const handleSwap = () => {
    if (!selectedNetwork || !airtimeAmount || !phoneNumber) {
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
        title: "Swap Successful!",
        description: `₦${calculateCashValue().toLocaleString()} has been credited to your wallet.`,
      });
      setLoading(false);
      setAirtimeAmount("");
      setPhoneNumber("");
      setSelectedNetwork("");
    }, 2000);
  };

  const AirtimeSwapContent = () => (
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
            Airtime to Cash Swap
          </h1>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-6 w-6 text-blue-500" />
          </motion.div>
        </div>
      </motion.div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Enhanced Main Content */}
        <div className="lg:col-span-2 space-y-8 pb-20 lg:pb-0">
          {/* Enhanced Network Selection */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
                    <Smartphone className="h-6 w-6 text-white" />
                  </motion.div>
                  Select Network
                </CardTitle>
                <p className="text-gray-600 text-lg">Choose your airtime network to convert to cash</p>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {networks.map((network, index) => (
                    <motion.div
                      key={network.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={`p-4 lg:p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                          selectedNetwork === network.id
                            ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100 shadow-xl'
                            : 'border-gray-200 hover:border-gray-300 shadow-lg hover:bg-gradient-to-br from-gray-50 to-gray-100'
                        } group overflow-hidden`}
                        onClick={() => setSelectedNetwork(network.id)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="text-center relative z-10">
                          <motion.div 
                            className={`w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-gradient-to-br ${network.color} rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden`}
                            whileHover={{ rotate: 5 }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <Smartphone className="h-6 w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10 text-white relative z-10" />
                          </motion.div>
                          <h4 className="font-semibold text-gray-900 text-sm lg:text-base xl:text-lg group-hover:text-green-600 transition-colors duration-300">{network.name}</h4>
                          <p className="text-xs lg:text-sm text-gray-500 mt-1">Rate: {network.rate * 100}%</p>
                          <p className="text-xs text-gray-400 mt-1">{network.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Swap Form */}
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
                    <DollarSign className="h-6 w-6 text-white" />
                  </motion.div>
                  Convert Airtime to Cash
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="space-y-4">
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Label htmlFor="phone" className="text-base font-semibold">Phone Number</Label>
                    <Input
                      id="phone"
                      type="text"
                      placeholder="080XXXXXXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300 text-base"
                    />
                  </motion.div>

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <Label htmlFor="amount" className="text-base font-semibold">Airtime Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter airtime amount"
                      value={airtimeAmount}
                      onChange={(e) => setAirtimeAmount(e.target.value)}
                      className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300 text-base"
                    />
                  </motion.div>

                  {/* Enhanced Quick Amounts */}
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <Label className="text-base font-semibold">Quick Amounts</Label>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {[100, 200, 500, 1000].map((amount, index) => (
                        <motion.div
                          key={amount}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAirtimeAmount(amount.toString())}
                            className="w-full h-12 text-base font-semibold border-2 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
                          >
                            ₦{amount}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Enhanced Conversion Preview */}
                  <AnimatePresence>
                    {selectedNetwork && airtimeAmount && (
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
                            <p className="text-sm text-green-700">Airtime Value</p>
                            <p className="text-lg font-bold text-green-800">₦{parseFloat(airtimeAmount).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-green-700">Cash Value</p>
                            <p className="text-lg font-bold text-green-800">₦{calculateCashValue().toLocaleString()}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <Button
                      onClick={handleSwap}
                      className="w-full h-14 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      disabled={!selectedNetwork || !airtimeAmount || !phoneNumber || loading}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <RefreshCw className="h-5 w-5" />
                          Swap for ₦{calculateCashValue().toLocaleString()}
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
          {/* Enhanced Exchange Rates */}
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
                  Exchange Rates
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  {networks.map((network, index) => (
                    <motion.div 
                      key={network.id} 
                      className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 rounded-lg px-2 transition-colors duration-200"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 bg-gradient-to-br ${network.color} rounded-lg flex items-center justify-center`}>
                          <Smartphone className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-semibold text-gray-900">{network.name}</span>
                      </div>
                      <span className="font-bold text-lg">{network.rate * 100}%</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Benefits */}
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
                  Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  {[
                    { icon: <Zap className="h-5 w-5" />, title: "Instant Conversion", description: "Get cash instantly in your wallet" },
                    { icon: <TrendingUp className="h-5 w-5" />, title: "Best Rates", description: "Competitive exchange rates" },
                    { icon: <Shield className="h-5 w-5" />, title: "Secure Process", description: "Safe and reliable transactions" }
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
          Swap Features
        </h3>
        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: <Clock className="h-6 w-6" />, title: "24/7 Service", description: "Convert airtime to cash anytime, anywhere", color: "from-blue-500 to-blue-600" },
            { icon: <Users className="h-6 w-6" />, title: "All Networks", description: "Support for MTN, Airtel, Glo, and 9mobile", color: "from-green-500 to-green-600" },
            { icon: <Shield className="h-6 w-6" />, title: "Secure Exchange", description: "Bank-level security for all transactions", color: "from-purple-500 to-purple-600" }
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
      <AirtimeSwapContent />
    </DesktopLayout>
  );
};

export default AirtimeSwap; 