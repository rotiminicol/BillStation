import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { CreditCard, DollarSign, Sparkles, Activity, CheckCircle, ArrowRight, Shield, TrendingUp, Copy, Eye, EyeOff, RefreshCw, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";
import BackButton from "@/components/ui/back-button";
import { useToast } from "@/hooks/use-toast";

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
      status: "active"
    },
    {
      id: 2,
      name: "Travel Card",
      number: "4532 **** **** 5678",
      balance: 75000,
      currency: "USD",
      expiry: "09/26",
      cvv: "456",
      status: "active"
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
      {/* Header with Animation */}
      <div className={`flex items-center mb-8 transition-all duration-1000 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <BackButton to="/dashboard" className="mr-4" />
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Virtual Card
          </h1>
          <Sparkles className="h-6 w-6 text-blue-500 animate-pulse" />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={`flex bg-white rounded-xl p-1 mb-8 shadow-lg max-w-md transition-all duration-1000 delay-200 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <button
          onClick={() => setActiveTab('create')}
          className={`flex-1 py-3 px-6 rounded-lg text-base font-semibold transition-all duration-300 ${
            activeTab === 'create'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <CreditCard className="h-5 w-5 inline mr-2" />
          Create Card
        </button>
        <button
          onClick={() => setActiveTab('manage')}
          className={`flex-1 py-3 px-6 rounded-lg text-base font-semibold transition-all duration-300 ${
            activeTab === 'manage'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Shield className="h-5 w-5 inline mr-2" />
          Manage Cards
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8 pb-20 lg:pb-0">
          {activeTab === 'create' ? (
            /* Create Card Form */
            <div className={`transition-all duration-1000 delay-400 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    Create Virtual Card
                  </CardTitle>
                  <p className="text-gray-600 text-lg">Shop online across borders without limitations</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName" className="text-base font-semibold">Card Name</Label>
                      <Input
                        id="cardName"
                        type="text"
                        placeholder="Enter card name"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300 text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount" className="text-base font-semibold">Amount in Naira</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount in ₦"
                        value={cardAmount}
                        onChange={(e) => setCardAmount(e.target.value)}
                        className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300 text-base"
                      />
                    </div>

                    {/* Quick Amounts */}
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Quick Amounts</Label>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {[50000, 100000, 250000, 500000].map((amount) => (
                          <Button
                            key={amount}
                            variant="outline"
                            size="sm"
                            onClick={() => setCardAmount(amount.toString())}
                            className="h-10 lg:h-12 text-sm lg:text-base font-semibold border-2 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 hover:scale-105"
                          >
                            ₦{amount.toLocaleString()}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Conversion Preview */}
                    {cardAmount && (
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                        <div className="flex items-center gap-3 mb-2">
                          <Calculator className="h-5 w-5 text-blue-600" />
                          <p className="text-base font-semibold text-blue-800">Card Balance</p>
                        </div>
                        <p className="text-2xl font-bold text-blue-800">${calculateUSD().toFixed(2)} USD</p>
                        <p className="text-sm text-blue-600 mt-1">Rate: ₦{exchangeRate.toLocaleString()}/$1</p>
                      </div>
                    )}

                    <Button
                      onClick={handleCreateCard}
                      className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      disabled={!cardAmount || !cardName || loading}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Creating Card...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          Create Virtual Card
                        </div>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Manage Cards */
            <div className={`transition-all duration-1000 delay-400 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    Your Virtual Cards
                  </CardTitle>
                  <p className="text-gray-600 text-lg">Manage your virtual cards and view transactions</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {virtualCards.map((card) => (
                      <div
                        key={card.id}
                        className="p-4 lg:p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg lg:text-xl font-bold text-gray-900">{card.name}</h3>
                            <p className="text-sm lg:text-base text-gray-600">Virtual Card</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl lg:text-2xl font-bold text-gray-900">${(card.balance / exchangeRate).toFixed(2)}</p>
                            <p className="text-xs lg:text-sm text-gray-600">USD Balance</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Card Number</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-semibold">{card.number}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyCardNumber(card.number)}
                                className="p-1 h-6 w-6 hover:bg-gray-100 rounded-full"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Expiry Date</span>
                            <span className="font-semibold">{card.expiry}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">CVV</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-semibold">
                                {showCardDetails ? card.cvv : "***"}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowCardDetails(!showCardDetails)}
                                className="p-1 h-6 w-6 hover:bg-gray-100 rounded-full"
                              >
                                {showCardDetails ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Status</span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                              {card.status}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                          <Button variant="outline" className="flex-1">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Fund Card
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Activity className="h-4 w-4 mr-2" />
                            View Transactions
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6 hidden lg:block">
          {/* Benefits */}
          <div className={`transition-all duration-1000 delay-600 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 lg:sticky lg:top-8">
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
                      <p className="font-semibold text-gray-900">Borderless Shopping</p>
                      <p className="text-sm text-gray-600">Shop online worldwide</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Instant Creation</p>
                      <p className="text-sm text-gray-600">Get your card instantly</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Secure Transactions</p>
                      <p className="text-sm text-gray-600">Safe and encrypted</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Exchange Rate */}
          <div className={`transition-all duration-1000 delay-800 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  Exchange Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">NGN to USD</span>
                    <span className="font-bold">₦{exchangeRate.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">USD to NGN</span>
                    <span className="font-bold">₦{exchangeRate.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="font-bold text-sm">Just now</span>
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
      <VirtualCardContent />
      <Navigation />
    </DesktopLayout>
  );
};

export default VirtualCard; 