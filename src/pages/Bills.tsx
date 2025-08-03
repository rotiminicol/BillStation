import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Smartphone, Zap, Tv, GraduationCap, Gamepad2, Home, Wifi, Car, Activity, CheckCircle, ArrowRight, Shield, Clock, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
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
  const { toast } = useToast();

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
        className: "bg-[#0B63BC] text-white border-[#0B63BC]/50",
      });
      setLoading(false);
      setAmount("");
      setPhone("");
    }, 2000);
  };

  const BillsContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 p-4 sm:p-6 bg-[#F6F6F8] min-h-screen"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center mb-8"
      >
        <h1 className="text-4xl font-bold text-[#0B63BC] tracking-tight">
          Bill Payments
        </h1>
      </motion.div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 mb-8 lg:mb-0"
        >
          <h3 className="text-xl font-semibold text-[#0B63BC] mb-6">
            Select Bill Category
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(11, 99, 188, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 border-2 ${
                    selectedCategory === category.id
                      ? "border-[#0B63BC] bg-[#0B63BC]/10 shadow-lg"
                      : "border-[#F6F6F8] hover:border-[#0B63BC]/50 bg-white"
                  } rounded-xl overflow-hidden`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-6 sm:p-8 text-center">
                    <motion.div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                        selectedCategory === category.id
                          ? "bg-[#0B63BC] text-white"
                          : "bg-[#F6F6F8] text-[#0B63BC]"
                      }`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <category.icon className="h-8 w-8" />
                    </motion.div>
                    <h4 className="font-semibold text-gray-900 text-xl sm:text-2xl">{category.name}</h4>
                    <p className="text-sm sm:text-base text-gray-500 mt-2">{category.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Payment Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-1"
        >
          <Card className="border-0 shadow-xl bg-white rounded-xl overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[#0B63BC] mb-6">Payment Details</h3>
              
              <AnimatePresence>
                {selectedCategory ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    {/* Provider Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="provider" className="text-[#0B63BC] font-medium">Provider</Label>
                      <Select>
                        <SelectTrigger className="h-12 border-[#0B63BC]/30 focus:ring-[#0B63BC] rounded-lg">
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[#0B63BC]/20">
                          {providers[selectedCategory as keyof typeof providers]?.map((provider) => (
                            <SelectItem key={provider} value={provider} className="hover:bg-[#F6F6F8]">
                              {provider}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[#0B63BC] font-medium">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-12 border-[#0B63BC]/30 focus:ring-[#0B63BC] rounded-lg transition-all duration-300"
                      />
                    </div>

                    {/* Amount */}
                    <div className="space-y-2">
                      <Label htmlFor="amount" className="text-[#0B63BC] font-medium">Amount (₦)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="h-12 border-[#0B63BC]/30 focus:ring-[#0B63BC] rounded-lg transition-all duration-300"
                      />
                    </div>

                    {/* Pay Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handlePayment}
                        disabled={loading || !amount || !phone}
                        className="w-full h-12 bg-[#0B63BC] hover:bg-[#0B63BC]/90 text-white text-lg font-semibold rounded-lg transition-all duration-300"
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
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
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      className="w-16 h-16 bg-[#F6F6F8] rounded-full flex items-center justify-center mx-auto mb-4"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <Activity className="h-8 w-8 text-[#0B63BC]/50" />
                    </motion.div>
                    <p className="text-gray-500 font-medium">Select a bill category to proceed</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <DesktopLayout>
      <BillsContent />
    </DesktopLayout>
  );
};

export default Bills;