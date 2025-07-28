
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Smartphone, Zap, Tv, GraduationCap, Gamepad2, Home, Wifi, Car, Sparkles, Activity, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";
import BackButton from "@/components/ui/back-button";
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
    { id: "airtime", name: "Airtime", icon: Smartphone, color: "bg-gradient-to-br from-green-500 to-green-600", hover: "hover:from-green-600 hover:to-green-700" },
    { id: "data", name: "Data", icon: Wifi, color: "bg-gradient-to-br from-blue-500 to-blue-600", hover: "hover:from-blue-600 hover:to-blue-700" },
    { id: "electricity", name: "Electricity", icon: Zap, color: "bg-gradient-to-br from-yellow-500 to-yellow-600", hover: "hover:from-yellow-600 hover:to-yellow-700" },
    { id: "tv", name: "Cable TV", icon: Tv, color: "bg-gradient-to-br from-purple-500 to-purple-600", hover: "hover:from-purple-600 hover:to-purple-700" },
    { id: "education", name: "Education", icon: GraduationCap, color: "bg-gradient-to-br from-indigo-500 to-indigo-600", hover: "hover:from-indigo-600 hover:to-indigo-700" },
    { id: "betting", name: "Betting", icon: Gamepad2, color: "bg-gradient-to-br from-red-500 to-red-600", hover: "hover:from-red-600 hover:to-red-700" },
    { id: "rent", name: "Rent", icon: Home, color: "bg-gradient-to-br from-orange-500 to-orange-600", hover: "hover:from-orange-600 hover:to-orange-700" },
    { id: "transport", name: "Transport", icon: Car, color: "bg-gradient-to-br from-teal-500 to-teal-600", hover: "hover:from-teal-600 hover:to-teal-700" },
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
      {/* Header with Animation */}
      <div className={`flex items-center mb-8 transition-all duration-1000 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <BackButton to="/dashboard" className="mr-4" />
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Bill Payments
          </h1>
          <Sparkles className="h-6 w-6 text-blue-500 animate-pulse" />
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Categories with Enhanced Animation */}
        <div className="lg:col-span-2 mb-8 lg:mb-0">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Select Bill Category
          </h3>
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-200 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {categories.map((category, index) => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                  selectedCategory === category.id
                    ? "ring-2 ring-blue-500 bg-blue-50 shadow-xl"
                    : "hover:bg-gray-50 shadow-lg"
                } group`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 lg:w-20 lg:h-20 ${category.color} ${category.hover} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <category.icon className="h-8 w-8 lg:h-10 lg:w-10 text-white relative z-10" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-base lg:text-lg group-hover:text-blue-600 transition-colors duration-300">{category.name}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Form with Premium Design */}
        <div className="lg:col-span-1">
          {selectedCategory && (
            <div className={`transition-all duration-1000 delay-400 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Card className="mb-6 lg:sticky lg:top-8 border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8 space-y-6">
                                     <div className="flex items-center gap-3 mb-6">
                     <div className={`w-12 h-12 ${categories.find(c => c.id === selectedCategory)?.color} rounded-xl flex items-center justify-center shadow-lg`}>
                       {(() => {
                         const category = categories.find(c => c.id === selectedCategory);
                         return category ? <category.icon className="h-6 w-6 text-white" /> : null;
                       })()}
                     </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {categories.find(c => c.id === selectedCategory)?.name}
                      </h3>
                      <p className="text-gray-600">Quick and secure payment</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
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
                    </div>

                    {(selectedCategory === "airtime" || selectedCategory === "data" || selectedCategory === "electricity") && (
                      <div className="space-y-2">
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
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="amount" className="text-base font-semibold">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                      />
                    </div>

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
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Quick Amounts with Enhanced Design */}
          {(selectedCategory === "airtime" || selectedCategory === "data") && (
            <div className={`transition-all duration-1000 delay-600 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8">
                  <h4 className="font-semibold text-gray-900 mb-6 text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    Quick Amounts
                  </h4>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[100, 200, 500, 1000].map((quickAmount) => (
                      <Button
                        key={quickAmount}
                        variant="outline"
                        size="sm"
                        onClick={() => setAmount(quickAmount.toString())}
                        className="h-12 text-base font-semibold border-2 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 hover:scale-105"
                      >
                        ₦{quickAmount}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
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
