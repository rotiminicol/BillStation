
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Smartphone, Zap, Tv, GraduationCap, Gamepad2, Home, Wifi, Car, Sparkles, Activity, CheckCircle, ArrowRight, Shield, Clock, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";

import { useToast } from "@/hooks/use-toast";
import { getBankLogo } from "@/lib/bankLogos";

const Bills = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setAnimateCards(true), 100);
  }, []);

  const categories = [
    { id: "airtime", name: "Airtime", icon: Smartphone, description: "Recharge any network" },
    { id: "data", name: "Data", icon: Wifi, description: "Internet bundles" },
    { id: "electricity", name: "Electricity", icon: Zap, description: "Power bills" },
    { id: "tv", name: "Cable TV", icon: Tv, description: "TV subscriptions" },
    { id: "education", name: "Education", icon: GraduationCap, description: "School fees" },
    { id: "betting", name: "Betting", icon: Gamepad2, description: "Sports betting" },
    { id: "rent", name: "Rent", icon: Home, description: "Property payments" },
    { id: "transport", name: "Transport", icon: Car, description: "Transport services" },
  ];

  const providers = {
    airtime: ["MTN", "Airtel", "Glo", "9mobile"],
    data: ["MTN", "Airtel", "Glo", "9mobile"],
    electricity: ["AEDC", "EKEDC", "IKEDC", "PHEDC", "BEDC", "KEDCO"],
    tv: ["DStv", "GOtv", "StarTimes", "TStv"],
    education: ["WAEC", "JAMB", "NECO", "NABTEB"],
    betting: ["Bet9ja", "SportyBet", "NairaBet", "BetKing", "1xBet"],
    rent: ["Property Management", "Landlord", "Real Estate"],
    transport: ["Uber", "Bolt", "Taxify", "Public Transport"],
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: `₦${amount} ${selectedCategory} payment completed.`,
      });
      setLoading(false);
      setAmount("");
      setPhone("");
    }, 2000);
  };

  const BillsContent = () => (
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
            Bill Payments
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
        {/* Enhanced Categories */}
        <div className="lg:col-span-2 mb-8 lg:mb-0">
          <motion.h3 
            className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Activity className="h-5 w-5 text-blue-600" />
            Select Bill Category
          </motion.h3>
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                    selectedCategory === category.id
                      ? "ring-2 ring-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl"
                      : "hover:bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg"
                  } group overflow-hidden`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-6 text-center relative z-10">
                    <motion.div 
                      className="w-16 h-16 lg:w-20 lg:h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden"
                      whileHover={{ rotate: 5 }}
                    >
                      <category.icon className="h-8 w-8 lg:h-10 lg:w-10 text-blue-600" />
                    </motion.div>
                    <h4 className="font-semibold text-gray-900 text-base lg:text-lg group-hover:text-blue-600 transition-colors duration-300 mb-1">{category.name}</h4>
                    <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">{category.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Payment Form */}
        <div className="lg:col-span-1">
          <AnimatePresence>
            {selectedCategory && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="mb-6 lg:sticky lg:top-8 border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-indigo-50/30 opacity-50"></div>
                  <CardContent className="p-8 space-y-6 relative z-10">
                    <motion.div 
                      className="flex items-center gap-3 mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <motion.div 
                        className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {(() => {
                          const category = categories.find(c => c.id === selectedCategory);
                          return category ? <category.icon className="h-6 w-6 text-blue-600" /> : null;
                        })()}
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {categories.find(c => c.id === selectedCategory)?.name}
                        </h3>
                        <p className="text-gray-600">Quick and secure payment</p>
                      </div>
                    </motion.div>

                    <div className="space-y-4">
                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <Label htmlFor="provider" className="text-base font-semibold">Service Provider</Label>
                        <Select>
                          <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300">
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                          <SelectContent>
                            {providers[selectedCategory as keyof typeof providers]?.map((provider) => (
                              <SelectItem key={provider} value={provider.toLowerCase()}>
                                {provider}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>

                      {(selectedCategory === "airtime" || selectedCategory === "data" || selectedCategory === "electricity") && (
                        <motion.div 
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                        >
                          <Label htmlFor="phone" className="text-base font-semibold">
                            {selectedCategory === "airtime" || selectedCategory === "data" ? "Phone Number" : "Meter Number"}
                          </Label>
                          <Input
                            id="phone"
                            type="text"
                            placeholder={selectedCategory === "airtime" || selectedCategory === "data" ? "080XXXXXXXX" : "Enter meter number"}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                          />
                        </motion.div>
                      )}

                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        <Label htmlFor="amount" className="text-base font-semibold">Amount</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <Button
                          onClick={handlePayment}
                          className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                          disabled={!amount || loading}
                        >
                          {loading ? (
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Processing...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5" />
                              Pay ₦{amount || "0"}
                            </div>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Quick Amounts */}
          <AnimatePresence>
            {(selectedCategory === "airtime" || selectedCategory === "data") && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-50/30 to-blue-50/30 opacity-50"></div>
                  <CardContent className="p-8 relative z-10">
                    <h4 className="font-semibold text-gray-900 mb-6 text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-blue-500" />
                      Quick Amounts
                    </h4>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {[100, 200, 500, 1000].map((quickAmount, index) => (
                        <motion.div
                          key={quickAmount}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAmount(quickAmount.toString())}
                            className="w-full h-12 text-base font-semibold border-2 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
                          >
                            ₦{quickAmount}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
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
          <Shield className="h-5 w-5 text-green-500" />
          Bill Payment Features
        </h3>
        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: <Clock className="h-6 w-6" />, title: "Instant Processing", description: "Payments processed in real-time with instant confirmation", color: "from-blue-500 to-blue-600" },
            { icon: <Shield className="h-6 w-6" />, title: "Secure Payments", description: "Bank-level encryption and fraud protection for all transactions", color: "from-green-500 to-green-600" },
            { icon: <TrendingUp className="h-6 w-6" />, title: "Payment History", description: "Track all your bill payments with detailed transaction records", color: "from-purple-500 to-purple-600" }
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
      <BillsContent />
    </DesktopLayout>
  );
};

export default Bills;
