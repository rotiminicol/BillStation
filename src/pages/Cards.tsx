
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, DollarSign, TrendingUp, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";
import BackButton from "@/components/ui/back-button";
import { useToast } from "@/hooks/use-toast";

const Cards = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [selectedGiftCard, setSelectedGiftCard] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const giftCards = [
    { id: 'amazon', name: 'Amazon', logo: '🛒', color: 'bg-orange-500' },
    { id: 'steam', name: 'Steam', logo: '🎮', color: 'bg-blue-600' },
    { id: 'apple', name: 'Apple', logo: '🍎', color: 'bg-gray-800' },
    { id: 'google', name: 'Google Play', logo: '▶️', color: 'bg-green-500' },
    { id: 'sephora', name: 'Sephora', logo: '💄', color: 'bg-pink-500' },
    { id: 'nordstrom', name: 'Nordstrom', logo: '👗', color: 'bg-gray-600' },
    { id: 'nike', name: 'Nike', logo: '👟', color: 'bg-black' },
    { id: 'vanilla', name: 'Vanilla Visa', logo: '💳', color: 'bg-purple-500' },
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
    <>
      {/* Header */}
      <div className="flex items-center mb-6 lg:mb-8">
        <BackButton to="/dashboard" className="mr-2 lg:mr-4" />
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Gift Cards</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white rounded-lg p-1 mb-6 lg:mb-8 shadow-sm max-w-md">
        <button
          onClick={() => setActiveTab('buy')}
          className={`flex-1 py-2 px-4 rounded-md text-sm lg:text-base font-medium transition-colors ${
            activeTab === 'buy'
              ? 'bg-primary-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Gift className="h-4 w-4 lg:h-5 lg:w-5 inline mr-2" />
          Buy Gift Cards
        </button>
        <button
          onClick={() => setActiveTab('sell')}
          className={`flex-1 py-2 px-4 rounded-md text-sm lg:text-base font-medium transition-colors ${
            activeTab === 'sell'
              ? 'bg-primary-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <DollarSign className="h-4 w-4 lg:h-5 lg:w-5 inline mr-2" />
          Sell Gift Cards
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {activeTab === 'buy' ? (
            /* Buy Gift Cards */
            <div>
              <Card className="mb-6 lg:mb-8">
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl">Buy Gift Cards</CardTitle>
                  <p className="text-gray-600 text-sm lg:text-base">Browse through a variety of top brands and make secure, instant gift card purchases</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {giftCards.map((card) => (
                      <div
                        key={card.id}
                        className={`p-4 lg:p-6 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedGiftCard === card.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedGiftCard(card.id)}
                      >
                        <div className="text-center">
                          <div className={`w-12 h-12 lg:w-16 lg:h-16 ${card.color} rounded-lg flex items-center justify-center mx-auto mb-2 lg:mb-3 text-white text-xl lg:text-2xl shadow-lg`}>
                            {card.logo}
                          </div>
                          <h4 className="font-medium text-gray-900 text-sm lg:text-base">{card.name}</h4>
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
              <Card className="mb-6 lg:mb-8">
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl">Sell Gift Cards</CardTitle>
                  <p className="text-gray-600 text-sm lg:text-base">Turn your unused gift cards into cash quickly and securely</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {giftCards.map((card) => (
                      <div
                        key={card.id}
                        className={`p-4 lg:p-6 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedGiftCard === card.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedGiftCard(card.id)}
                      >
                        <div className="text-center">
                          <div className={`w-12 h-12 lg:w-16 lg:h-16 ${card.color} rounded-lg flex items-center justify-center mx-auto mb-2 lg:mb-3 text-white text-xl lg:text-2xl shadow-lg`}>
                            {card.logo}
                          </div>
                          <h4 className="font-medium text-gray-900 text-sm lg:text-base">{card.name}</h4>
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
        <div className="lg:col-span-1">
          {selectedGiftCard && (
            <Card className="mb-6 lg:sticky lg:top-8">
              <CardContent className="p-6 lg:p-8">
                <h3 className="font-semibold text-gray-900 mb-4 lg:mb-6 text-lg lg:text-xl">
                  {activeTab === 'buy' ? 'Buy' : 'Sell'} {giftCards.find(c => c.id === selectedGiftCard)?.name} Gift Card
                </h3>
                <div className="space-y-4 lg:space-y-6">
                  {activeTab === 'sell' && (
                    <div>
                      <label className="block text-sm lg:text-base font-medium text-gray-700 mb-2">Gift Card Code</label>
                      <input
                        type="text"
                        placeholder="Enter gift card code"
                        className="w-full px-3 py-2 lg:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm lg:text-base"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm lg:text-base font-medium text-gray-700 mb-2">Amount (USD)</label>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-3 py-2 lg:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm lg:text-base"
                    />
                  </div>
                  {activeTab === 'sell' && (
                    <div className="bg-green-50 p-3 lg:p-4 rounded-md">
                      <p className="text-sm lg:text-base text-green-700">
                        <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5 inline mr-1" />
                        Estimated payout: ₦{(parseFloat(amount) || 0) * 1500} (Rate: ₦1500/$1)
                      </p>
                    </div>
                  )}
                  <Button
                    onClick={() => handleGiftCardAction(activeTab === 'buy' ? 'Purchase' : 'Sale')}
                    className={`w-full h-12 lg:h-14 text-base lg:text-lg font-medium ${
                      activeTab === 'buy' 
                        ? 'bg-primary-600 hover:bg-primary-700' 
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                    disabled={!amount || loading}
                  >
                    {loading ? "Processing..." : activeTab === 'buy' 
                      ? `Buy for $${amount || "0"}` 
                      : `Sell for ₦${(parseFloat(amount) || 0) * 1500}`
                    }
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Market Rates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">Current Exchange Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 lg:space-y-4">
                <div className="flex justify-between items-center py-2 lg:py-3 border-b">
                  <span className="text-gray-600 text-sm lg:text-base">USD to NGN</span>
                  <span className="font-semibold text-sm lg:text-base">₦1,500</span>
                </div>
                <div className="flex justify-between items-center py-2 lg:py-3 border-b">
                  <span className="text-gray-600 text-sm lg:text-base">EUR to NGN</span>
                  <span className="font-semibold text-sm lg:text-base">₦1,650</span>
                </div>
                <div className="flex justify-between items-center py-2 lg:py-3">
                  <span className="text-gray-600 text-sm lg:text-base">GBP to NGN</span>
                  <span className="font-semibold text-sm lg:text-base">₦1,900</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );

  return (
    <DesktopLayout>
      <CardsContent />
      <Navigation />
    </DesktopLayout>
  );
};

export default Cards;
