import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { CreditCard, DollarSign, Activity, CheckCircle, ArrowRight, Shield, TrendingUp, Copy, Eye, EyeOff, RefreshCw, Calculator, Clock, Globe, Zap, Users, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";

import { useToast } from "@/hooks/use-toast";
import { getBankLogo } from "@/lib/bankLogos";

const VirtualCard = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');
  const [cardAmount, setCardAmount] = useState("");
  const [cardName, setCardName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const { toast } = useToast();

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
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Virtual Cards
          </h1>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white rounded-xl p-1 mb-8 shadow-lg max-w-md">
        {[
          { id: 'create', icon: <CreditCard className="h-5 w-5" />, label: 'Create Card' },
          { id: 'manage', icon: <Shield className="h-5 w-5" />, label: 'Manage Cards' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'create' | 'manage')}
            className={`flex-1 py-3 px-6 rounded-lg text-base font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <span className="inline mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'create' ? (
            /* Create Card Form */
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  Create Virtual Card
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Card Name</Label>
                  <Input
                    id="cardName"
                    placeholder="Enter card name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardAmount">Amount in Naira (₦)</Label>
                  <Input
                    id="cardAmount"
                    type="number"
                    placeholder="Enter amount"
                    value={cardAmount}
                    onChange={(e) => setCardAmount(e.target.value)}
                    className="h-12"
                  />
                  {cardAmount && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 text-sm">
                        USD Equivalent: <span className="font-bold">${calculateUSD().toFixed(2)}</span>
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleCreateCard}
                  disabled={loading || !cardAmount || !cardName}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
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
              </CardContent>
            </Card>
          ) : (
            /* Manage Cards */
            <div className="space-y-6">
              {virtualCards.map((card) => (
                <Card key={card.id} className="border-0 shadow-lg bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{card.name}</h3>
                        <p className="text-sm text-gray-500">Virtual Card</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyCardNumber(card.number)}
                          className="flex items-center gap-1"
                        >
                          <Copy className="h-4 w-4" />
                          Copy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowCardDetails(!showCardDetails)}
                          className="flex items-center gap-1"
                        >
                          {showCardDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          {showCardDetails ? 'Hide' : 'Show'}
                        </Button>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm opacity-80">Card Number</span>
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <p className="text-lg font-mono mb-2">
                        {showCardDetails ? card.number.replace('****', '1234') : card.number}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <span className="opacity-80">Expires</span>
                          <p className="font-mono">{card.expiry}</p>
                        </div>
                        <div>
                          <span className="opacity-80">CVV</span>
                          <p className="font-mono">{showCardDetails ? card.cvv : '***'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Balance</p>
                        <p className="text-lg font-semibold text-gray-900">
                          ${(card.balance / 100).toFixed(2)} {card.currency}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Status</p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {card.status}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
                <Link to="/cards" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Gift Cards
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/transactions" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  View History
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/transfer" className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Send Money
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
                  <p className="font-medium text-gray-900 text-sm">Instant Creation</p>
                  <p className="text-xs text-gray-500">Get cards instantly</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Secure Cards</p>
                  <p className="text-xs text-gray-500">Bank-level security</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Globe className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Global Use</p>
                  <p className="text-xs text-gray-500">Accepted worldwide</p>
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
      <VirtualCardContent />
    </DesktopLayout>
  );
};

export default VirtualCard; 