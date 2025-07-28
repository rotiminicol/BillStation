
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, DollarSign, TrendingUp, Search, Sparkles, Activity, CheckCircle, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";
import BackButton from "@/components/ui/back-button";
import { useToast } from "@/hooks/use-toast";
import { getBankLogo } from "@/lib/bankLogos";

const Cards = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [selectedGiftCard, setSelectedGiftCard] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setAnimateCards(true), 100);
  }, []);

  const giftCards = [
    { id: 'amazon', name: 'Amazon', logo: '🛒', color: 'bg-gradient-to-br from-orange-500 to-orange-600', hover: 'hover:from-orange-600 hover:to-orange-700' },
    { id: 'steam', name: 'Steam', logo: '🎮', color: 'bg-gradient-to-br from-blue-600 to-blue-700', hover: 'hover:from-blue-700 hover:to-blue-800' },
    { id: 'apple', name: 'Apple', logo: '🍎', color: 'bg-gradient-to-br from-gray-800 to-gray-900', hover: 'hover:from-gray-900 hover:to-black' },
    { id: 'google', name: 'Google Play', logo: '▶️', color: 'bg-gradient-to-br from-green-500 to-green-600', hover: 'hover:from-green-600 hover:to-green-700' },
    { id: 'sephora', name: 'Sephora', logo: '💄', color: 'bg-gradient-to-br from-pink-500 to-pink-600', hover: 'hover:from-pink-600 hover:to-pink-700' },
    { id: 'nordstrom', name: 'Nordstrom', logo: '👗', color: 'bg-gradient-to-br from-gray-600 to-gray-700', hover: 'hover:from-gray-700 hover:to-gray-800' },
    { id: 'nike', name: 'Nike', logo: '👟', color: 'bg-gradient-to-br from-black to-gray-900', hover: 'hover:from-gray-900 hover:to-black' },
    { id: 'vanilla', name: 'Vanilla Visa', logo: '💳', color: 'bg-gradient-to-br from-purple-500 to-purple-600', hover: 'hover:from-purple-600 hover:to-purple-700' },
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
      {/* Header with Animation */}
      <div className={`flex items-center mb-8 transition-all duration-1000 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <BackButton to="/dashboard" className="mr-4" />
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Gift Cards
          </h1>
          <Sparkles className="h-6 w-6 text-blue-500 animate-pulse" />
        </div>
      </div>

      {/* Tab Navigation with Enhanced Design */}
      <div className={`flex bg-white rounded-xl p-1 mb-8 shadow-lg max-w-md transition-all duration-1000 delay-200 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <button
          onClick={() => setActiveTab('buy')}
          className={`flex-1 py-3 px-6 rounded-lg text-base font-semibold transition-all duration-300 ${
            activeTab === 'buy'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Gift className="h-5 w-5 inline mr-2" />
          Buy Gift Cards
        </button>
        <button
          onClick={() => setActiveTab('sell')}
          className={`flex-1 py-3 px-6 rounded-lg text-base font-semibold transition-all duration-300 ${
            activeTab === 'sell'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <DollarSign className="h-5 w-5 inline mr-2" />
          Sell Gift Cards
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className={`transition-all duration-1000 delay-400 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {activeTab === 'buy' ? (
              /* Buy Gift Cards */
              <div>
                <Card className="mb-8 border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Gift className="h-6 w-6 text-white" />
                      </div>
                      Buy Gift Cards
                    </CardTitle>
                    <p className="text-gray-600 text-lg">Browse through a variety of top brands and make secure, instant gift card purchases</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {giftCards.map((card, index) => (
                        <div
                          key={card.id}
                          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                            selectedGiftCard === card.id
                              ? 'border-blue-500 bg-blue-50 shadow-xl'
                              : 'border-gray-200 hover:border-gray-300 shadow-lg'
                          } group`}
                          onClick={() => setSelectedGiftCard(card.id)}
                        >
                          <div className="text-center">
                            <div className={`w-16 h-16 lg:w-20 lg:h-20 ${card.color} ${card.hover} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden`}>
                              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <span className="text-2xl lg:text-3xl relative z-10">{card.logo}</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-base lg:text-lg group-hover:text-blue-600 transition-colors duration-300">{card.name}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* Sell Gift Cards */
              <div>
                <Card className="mb-8 border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                      Sell Gift Cards
                    </CardTitle>
                    <p className="text-gray-600 text-lg">Turn your unused gift cards into cash quickly and securely</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {giftCards.map((card, index) => (
                        <div
                          key={card.id}
                          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                            selectedGiftCard === card.id
                              ? 'border-green-500 bg-green-50 shadow-xl'
                              : 'border-gray-200 hover:border-gray-300 shadow-lg'
                          } group`}
                          onClick={() => setSelectedGiftCard(card.id)}
                        >
                          <div className="text-center">
                            <div className={`w-16 h-16 lg:w-20 lg:h-20 ${card.color} ${card.hover} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden`}>
                              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <span className="text-2xl lg:text-3xl relative z-10">{card.logo}</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-base lg:text-lg group-hover:text-green-600 transition-colors duration-300">{card.name}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar with Enhanced Design */}
        <div className="lg:col-span-1 space-y-6">
          <div className={`transition-all duration-1000 delay-600 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {selectedGiftCard && (
              <Card className="mb-6 lg:sticky lg:top-8 border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 ${giftCards.find(c => c.id === selectedGiftCard)?.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl">{giftCards.find(c => c.id === selectedGiftCard)?.logo}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {activeTab === 'buy' ? 'Buy' : 'Sell'} {giftCards.find(c => c.id === selectedGiftCard)?.name} Gift Card
                      </h3>
                      <p className="text-gray-600">Secure and instant transaction</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {activeTab === 'sell' && (
                      <div>
                        <label className="block text-base font-semibold text-gray-700 mb-3">Gift Card Code</label>
                        <input
                          type="text"
                          placeholder="Enter gift card code"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 text-base"
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-base font-semibold text-gray-700 mb-3">Amount (USD)</label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 text-base"
                      />
                    </div>
                    {activeTab === 'sell' && (
                      <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                          <p className="text-base font-semibold text-green-800">Estimated payout</p>
                        </div>
                        <p className="text-lg font-bold text-green-700">₦{(parseFloat(amount) || 0) * 1500} (Rate: ₦1500/$1)</p>
                      </div>
                    )}
                    <Button
                      onClick={() => handleGiftCardAction(activeTab === 'buy' ? 'Purchase' : 'Sale')}
                      className={`w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                        activeTab === 'buy' 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' 
                          : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                      }`}
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
                          {activeTab === 'buy' 
                            ? `Buy for $${amount || "0"}` 
                            : `Sell for ₦${(parseFloat(amount) || 0) * 1500}`
                          }
                        </div>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Market Rates with Enhanced Design */}
          <div className={`transition-all duration-1000 delay-800 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  Current Exchange Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <span className="text-gray-600 text-base">USD to NGN</span>
                    <span className="font-bold text-lg">₦1,500</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <span className="text-gray-600 text-base">EUR to NGN</span>
                    <span className="font-bold text-lg">₦1,650</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-gray-600 text-base">GBP to NGN</span>
                    <span className="font-bold text-lg">₦1,900</span>
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
      <CardsContent />
    </DesktopLayout>
  );
};

export default Cards;
