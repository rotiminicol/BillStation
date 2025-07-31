
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Smartphone, Zap, Tv, GraduationCap, Gamepad2, Home, Wifi, Car, Activity, CheckCircle, ArrowRight, Shield, Clock, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
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
      });
      setLoading(false);
      setAmount("");
      setPhone("");
    }, 2000);
  };

  const BillsContent = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Bill Payments
          </h1>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Categories */}
        <div className="lg:col-span-2 mb-8 lg:mb-0">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <Activity className="h-5 w-5 text-[#0B63BC]" />
            Select Bill Category
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedCategory === category.id
                                    ? "border-[#0B63BC] bg-[#0B63BC]/10"
                : "border-gray-200 hover:border-[#0B63BC]/30"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    selectedCategory === category.id
                      ? "bg-[#0B63BC] text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{category.name}</h4>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Form */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Payment Details</h3>
              
              {selectedCategory ? (
                <div className="space-y-4">
                  {/* Provider Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="provider">Provider</Label>
                    <Select>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {providers[selectedCategory as keyof typeof providers]?.map((provider) => (
                          <SelectItem key={provider} value={provider}>
                            {provider}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  {/* Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (₦)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  {/* Pay Button */}
                  <Button
                    onClick={handlePayment}
                    disabled={loading || !amount || !phone}
                    className="w-full h-12 bg-[#0B63BC] hover:bg-[#0B63BC]/90 text-lg font-semibold"
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
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">Select a bill category to proceed</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <DesktopLayout>
      <BillsContent />
    </DesktopLayout>
  );
};

export default Bills;
