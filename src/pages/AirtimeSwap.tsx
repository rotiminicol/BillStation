import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Smartphone, DollarSign, TrendingUp, Activity, CheckCircle, ArrowRight, RefreshCw, Calculator, Shield, Clock, Zap, Users, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";

import { useToast } from "@/hooks/use-toast";
import { getBankLogo } from "@/lib/bankLogos";

const AirtimeSwap = () => {
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [airtimeAmount, setAirtimeAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

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
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Airtime to Cash Swap
          </h1>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Network Selection */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-[#0B63BC]" />
                Select Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {networks.map((network) => (
                  <Card
                    key={network.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedNetwork === network.id
                                        ? "border-[#0B63BC] bg-[#0B63BC]/10"
                : "border-gray-200 hover:border-[#0B63BC]/30"
                    }`}
                    onClick={() => setSelectedNetwork(network.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                        selectedNetwork === network.id
                          ? "bg-[#0B63BC] text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        <Smartphone className="h-6 w-6" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{network.name}</h4>
                      <p className="text-xs text-gray-500 mb-2">{network.description}</p>
                      <p className="text-sm font-medium text-[#0B63BC]">Rate: {network.rate * 100}%</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Swap Form */}
          {selectedNetwork && (
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Swap Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Airtime Amount (₦)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter airtime amount"
                    value={airtimeAmount}
                    onChange={(e) => setAirtimeAmount(e.target.value)}
                    className="h-12"
                  />
                </div>

                {/* Cash Value Display */}
                {airtimeAmount && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-green-800 font-medium">Cash Value:</span>
                      <span className="text-green-800 font-bold text-lg">
                        ₦{calculateCashValue().toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleSwap}
                  disabled={loading || !airtimeAmount || !phoneNumber}
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
                      Swap Airtime
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
                <Link to="/bills" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Pay Bills
                </Link>
              </Button>
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
                  <p className="font-medium text-gray-900 text-sm">Instant Conversion</p>
                  <p className="text-xs text-gray-500">Get cash instantly</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0B63BC]/10 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-[#0B63BC]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Secure Process</p>
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
      <AirtimeSwapContent />
    </DesktopLayout>
  );
};

export default AirtimeSwap; 