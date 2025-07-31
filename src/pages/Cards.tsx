
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, DollarSign, TrendingUp, Search, Activity, CheckCircle, ArrowRight, Star, Shield, Clock, Globe, Zap, Users, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";

import { useToast } from "@/hooks/use-toast";
import { getBankLogo } from "@/lib/bankLogos";

const Cards = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [selectedGiftCard, setSelectedGiftCard] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const giftCards = [
    { id: 'amazon', name: 'Amazon', logo: '🛒', description: 'Online shopping' },
    { id: 'steam', name: 'Steam', logo: '🎮', description: 'Gaming platform' },
    { id: 'apple', name: 'Apple', logo: '🍎', description: 'Tech products' },
    { id: 'google', name: 'Google Play', logo: '▶️', description: 'Apps & games' },
    { id: 'sephora', name: 'Sephora', logo: '💄', description: 'Beauty products' },
    { id: 'nordstrom', name: 'Nordstrom', logo: '👗', description: 'Fashion retail' },
    { id: 'nike', name: 'Nike', logo: '👟', description: 'Sports gear' },
    { id: 'vanilla', name: 'Vanilla Visa', logo: '💳', description: 'Universal gift card' },
  ];

  const handleGiftCardAction = (action: string) => {
    setLoading(true);
    setTimeout(() => {
      toast({
        title: `${action} Successful!`,
        description: `Your gift card ${action.toLowerCase()} has been processed.`,
      });
      setLoading(false);
      setAmount('');
      setSelectedGiftCard('');
    }, 2000);
  };

  const CardsContent = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Gift Cards
          </h1>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white rounded-xl p-1 mb-8 shadow-lg max-w-md">
        {[
          { id: 'buy', icon: <Gift className="h-5 w-5" />, label: 'Buy Gift Cards' },
          { id: 'sell', icon: <DollarSign className="h-5 w-5" />, label: 'Sell Gift Cards' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'buy' | 'sell')}
            className={`flex-1 py-3 px-6 rounded-lg text-base font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-[#0B63BC] text-white shadow-lg'
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
          {/* Gift Card Selection */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-[#0B63BC]" />
                Select Gift Card
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {giftCards.map((card) => (
                  <Card
                    key={card.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedGiftCard === card.id
                                        ? "border-[#0B63BC] bg-[#0B63BC]/10"
                : "border-gray-200 hover:border-[#0B63BC]/30"
                    }`}
                    onClick={() => setSelectedGiftCard(card.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">{card.logo}</div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">{card.name}</h4>
                      <p className="text-xs text-gray-500">{card.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Form */}
          {selectedGiftCard && (
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {activeTab === 'buy' ? 'Buy' : 'Sell'} Gift Card
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Amount (₦)</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B63BC] focus:border-transparent"
                  />
                </div>

                <Button
                  onClick={() => handleGiftCardAction(activeTab === 'buy' ? 'Purchase' : 'Sale')}
                  disabled={loading || !amount}
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
                      {activeTab === 'buy' ? 'Buy' : 'Sell'} Gift Card
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
                <Link to="/virtual-card" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Virtual Card
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/transactions" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Transaction History
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
                  <p className="font-medium text-gray-900 text-sm">Instant Delivery</p>
                  <p className="text-xs text-gray-500">Get your gift cards instantly</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0B63BC]/10 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-[#0B63BC]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Secure Transactions</p>
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
      <CardsContent />
    </DesktopLayout>
  );
};

export default Cards;
