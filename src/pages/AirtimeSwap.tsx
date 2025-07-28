import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Smartphone, DollarSign, TrendingUp, Sparkles, Activity, CheckCircle, ArrowRight, RefreshCw, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";
import BackButton from "@/components/ui/back-button";
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
    { id: "mtn", name: "MTN", color: "bg-gradient-to-br from-yellow-500 to-yellow-600", hover: "hover:from-yellow-600 hover:to-yellow-700", rate: 0.85 },
    { id: "airtel", name: "Airtel", color: "bg-gradient-to-br from-red-500 to-red-600", hover: "hover:from-red-600 hover:to-red-700", rate: 0.80 },
    { id: "glo", name: "Glo", color: "bg-gradient-to-br from-green-500 to-green-600", hover: "hover:from-green-600 hover:to-green-700", rate: 0.75 },
    { id: "9mobile", name: "9mobile", color: "bg-gradient-to-br from-green-600 to-green-700", hover: "hover:from-green-700 hover:to-green-800", rate: 0.70 },
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
      {/* Header with Animation */}
      <div className={`flex items-center mb-8 transition-all duration-1000 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <BackButton to="/dashboard" className="mr-4" />
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Airtime to Cash Swap
          </h1>
          <Sparkles className="h-6 w-6 text-blue-500 animate-pulse" />
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8 pb-20 lg:pb-0">
          {/* Network Selection */}
          <div className={`transition-all duration-1000 delay-200 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  Select Network
                </CardTitle>
                <p className="text-gray-600 text-lg">Choose your airtime network to convert to cash</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {networks.map((network, index) => (
                    <div
                      key={network.id}
                      className={`p-4 lg:p-6 rounded-2xl border-2 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                        selectedNetwork === network.id
                          ? 'border-green-500 bg-green-50 shadow-xl'
                          : 'border-gray-200 hover:border-gray-300 shadow-lg'
                      } group`}
                      onClick={() => setSelectedNetwork(network.id)}
                    >
                      <div className="text-center">
                        <div className={`w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 ${network.color} ${network.hover} rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <Smartphone className="h-6 w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10 text-white relative z-10" />
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm lg:text-base xl:text-lg group-hover:text-green-600 transition-colors duration-300">{network.name}</h4>
                        <p className="text-xs lg:text-sm text-gray-500 mt-1">Rate: {network.rate * 100}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Swap Form */}
          <div className={`transition-all duration-1000 delay-400 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  Convert Airtime to Cash
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-semibold">Phone Number</Label>
                    <Input
                      id="phone"
                      type="text"
                      placeholder="080XXXXXXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-base font-semibold">Airtime Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter airtime amount"
                      value={airtimeAmount}
                      onChange={(e) => setAirtimeAmount(e.target.value)}
                      className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300 text-base"
                    />
                  </div>

                  {/* Quick Amounts */}
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Quick Amounts</Label>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {[100, 200, 500, 1000].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          size="sm"
                          onClick={() => setAirtimeAmount(amount.toString())}
                          className="h-12 text-base font-semibold border-2 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 hover:scale-105"
                        >
                          ₦{amount}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Conversion Preview */}
                  {selectedNetwork && airtimeAmount && (
                    <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border border-green-200">
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
                    </div>
                  )}

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
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6 hidden lg:block">
          {/* Exchange Rates */}
          <div className={`transition-all duration-1000 delay-600 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 lg:sticky lg:top-8">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  Exchange Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {networks.map((network) => (
                    <div key={network.id} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${network.color} rounded-lg flex items-center justify-center`}>
                          <Smartphone className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-semibold text-gray-900">{network.name}</span>
                      </div>
                      <span className="font-bold text-lg">{network.rate * 100}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits */}
          <div className={`transition-all duration-1000 delay-800 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Instant Conversion</p>
                      <p className="text-sm text-gray-600">Get cash instantly in your wallet</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Best Rates</p>
                      <p className="text-sm text-gray-600">Competitive exchange rates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Secure Process</p>
                      <p className="text-sm text-gray-600">Safe and reliable transactions</p>
                    </div>
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
      <AirtimeSwapContent />
    </DesktopLayout>
  );
};

export default AirtimeSwap; 