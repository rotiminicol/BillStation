
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Smartphone, Zap, Tv, GraduationCap, Gamepad2, Home, Wifi, Car } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";
import BackButton from "@/components/ui/back-button";
import { useToast } from "@/hooks/use-toast";

const Bills = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const categories = [
    { id: "airtime", name: "Airtime", icon: Smartphone, color: "bg-green-500" },
    { id: "data", name: "Data", icon: Wifi, color: "bg-blue-500" },
    { id: "electricity", name: "Electricity", icon: Zap, color: "bg-yellow-500" },
    { id: "tv", name: "Cable TV", icon: Tv, color: "bg-purple-500" },
    { id: "education", name: "Education", icon: GraduationCap, color: "bg-indigo-500" },
    { id: "betting", name: "Betting", icon: Gamepad2, color: "bg-red-500" },
    { id: "rent", name: "Rent", icon: Home, color: "bg-orange-500" },
    { id: "transport", name: "Transport", icon: Car, color: "bg-teal-500" },
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
    <>
      {/* Header */}
      <div className="flex items-center mb-6 lg:mb-8">
        <BackButton to="/dashboard" className="mr-2 lg:mr-4" />
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Bill Payments</h1>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Categories */}
        <div className="lg:col-span-2 mb-6 lg:mb-0">
          <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">Select Bill Category</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedCategory === category.id
                    ? "ring-2 ring-primary-500 bg-primary-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-4 lg:p-6 text-center">
                  <div className={`w-12 h-12 lg:w-16 lg:h-16 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-3 shadow-lg`}>
                    <category.icon className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm lg:text-base">{category.name}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Form */}
        <div className="lg:col-span-1">
          {selectedCategory && (
            <Card className="mb-6 lg:sticky lg:top-8">
              <CardContent className="p-6 lg:p-8 space-y-4 lg:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="provider" className="text-sm lg:text-base">Service Provider</Label>
                  <Select>
                    <SelectTrigger className="h-12 lg:h-14">
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
                    <Label htmlFor="phone" className="text-sm lg:text-base">
                      {selectedCategory === "airtime" || selectedCategory === "data" ? "Phone Number" : "Meter Number"}
                    </Label>
                    <Input
                      id="phone"
                      type="text"
                      placeholder={selectedCategory === "airtime" || selectedCategory === "data" ? "080XXXXXXXX" : "Enter meter number"}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-12 lg:h-14"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-sm lg:text-base">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-12 lg:h-14"
                  />
                </div>

                <Button
                  onClick={handlePayment}
                  className="w-full h-12 lg:h-14 bg-primary-600 hover:bg-primary-700 text-base lg:text-lg font-medium"
                  disabled={!amount || loading}
                >
                  {loading ? "Processing..." : `Pay ₦${amount || "0"}`}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Quick Amounts for Airtime/Data */}
          {(selectedCategory === "airtime" || selectedCategory === "data") && (
            <Card>
              <CardContent className="p-6 lg:p-8">
                <h4 className="font-medium text-gray-900 mb-3 lg:mb-4 text-base lg:text-lg">Quick Amounts</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
                  {[100, 200, 500, 1000].map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(quickAmount.toString())}
                      className="h-10 lg:h-12 text-sm lg:text-base"
                    >
                      ₦{quickAmount}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );

  return (
    <DesktopLayout>
      <BillsContent />
      <Navigation />
    </DesktopLayout>
  );
};

export default Bills;
