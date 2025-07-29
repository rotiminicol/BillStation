import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Gift, ShoppingBag, Star, ArrowRight, CheckCircle } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";
import ViewAllButton from "@/components/ui/view-all-button";

interface GiftCardPurchase {
  id: string;
  brand: string;
  amount: number;
  recipient: string;
  date: string;
  status: 'delivered' | 'pending' | 'failed';
}

const GiftCard = () => {
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentPurchases, setRecentPurchases] = useState<GiftCardPurchase[]>([]);
  const { toast } = useToast();

  const giftCardBrands = [
    { icon: Gift, label: "Amazon", value: "amazon", color: "from-orange-500 to-yellow-500", discount: "10%" },
    { icon: Gift, label: "Apple", value: "apple", color: "from-gray-500 to-gray-700", discount: "5%" },
    { icon: Gift, label: "Google Play", value: "google-play", color: "from-green-500 to-blue-500", discount: "15%" },
    { icon: Gift, label: "Steam", value: "steam", color: "from-blue-500 to-purple-500", discount: "8%" },
    { icon: Gift, label: "Netflix", value: "netflix", color: "from-red-500 to-pink-500", discount: "12%" },
    { icon: Gift, label: "Spotify", value: "spotify", color: "from-green-500 to-emerald-500", discount: "7%" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock recent purchases data
        const mockPurchases: GiftCardPurchase[] = [
          {
            id: "1",
            brand: "Amazon",
            amount: 100,
            recipient: "john@example.com",
            date: "2024-01-15",
            status: "delivered"
          },
          {
            id: "2",
            brand: "Apple",
            amount: 50,
            recipient: "jane@example.com",
            date: "2024-01-14",
            status: "pending"
          },
          {
            id: "3",
            brand: "Google Play",
            amount: 25,
            recipient: "mike@example.com",
            date: "2024-01-13",
            status: "delivered"
          }
        ];
        
        setRecentPurchases(mockPurchases);
      } catch (error) {
        console.error('Error fetching gift card data:', error);
        toast({
          title: "Error",
          description: "Failed to load gift card data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleGiftCardPurchase = async () => {
    if (!selectedBrand || !amount || !recipient) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate purchase processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Purchase Successful",
        description: "Your gift card has been purchased successfully",
      });
      
      // Reset form
      setSelectedBrand("");
      setAmount("");
      setRecipient("");
      setMessage("");
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center h-full">
          <Loader text="Loading gift cards..." />
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Gift Cards</h1>
            <p className="text-sm text-gray-600 mt-1">
              Buy and send gift cards to friends and family
            </p>
          </div>

          {/* Balance Card */}
          <MobileCard className="bg-gradient-to-r from-pink-600 to-pink-800 text-white p-6">
            <div className="text-center mb-4">
              <p className="text-sm text-pink-100 mb-2">Available Balance</p>
              <h2 className="text-3xl font-bold">$1,850.00</h2>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-white/20">
              <div>
                <p className="text-xs text-pink-200">This Month</p>
                <p className="text-sm font-medium">$320.00</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-pink-200">Total Purchases</p>
                <p className="text-sm font-medium">18</p>
              </div>
            </div>
          </MobileCard>
        </div>

        {/* Gift Card Brands Grid */}
        <div className="grid grid-cols-3 gap-3">
          {giftCardBrands.map((brand) => (
            <button
              key={brand.value}
              onClick={() => setSelectedBrand(brand.value)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                selectedBrand === brand.value
                  ? 'bg-pink-50 border-2 border-pink-200'
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                <brand.icon className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">{brand.label}</span>
              <span className="text-xs text-green-600 font-medium">{brand.discount} off</span>
            </button>
          ))}
        </div>

        {/* Purchase Form */}
        {selectedBrand && (
          <MobileCard>
            <MobileCard.Header>
              <MobileCard.Title>Buy {selectedBrand.toUpperCase()} Gift Card</MobileCard.Title>
            </MobileCard.Header>
            
            <MobileCard.Content className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-2xl font-bold text-center bg-gradient-to-r from-gray-50 to-gray-100"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Email</Label>
                <Input
                  id="recipient"
                  type="email"
                  placeholder="recipient@example.com"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Personal Message (Optional)</Label>
                <Input
                  id="message"
                  placeholder="Happy Birthday!"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              
              <Button
                onClick={handleGiftCardPurchase}
                disabled={isProcessing}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white"
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Buy ${formatCurrency(parseFloat(amount) || 0)} Gift Card`
                )}
              </Button>
            </MobileCard.Content>
          </MobileCard>
        )}

        {/* Recent Purchases */}
        <MobileCard>
          <MobileCard.Header>
            <MobileCard.Title>Recent Purchases</MobileCard.Title>
            <ViewAllButton category="gift-card" />
          </MobileCard.Header>
          
          <MobileCard.Content className="mt-4 space-y-4">
            {recentPurchases.length > 0 ? (
              recentPurchases.map((purchase) => (
                <div key={purchase.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                      <Gift className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {purchase.brand} Gift Card
                      </p>
                      <p className="text-xs text-gray-500">{purchase.recipient} • {purchase.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(purchase.amount)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(purchase.status)}`}>
                      {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Gift className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No recent purchases</p>
                <p className="text-gray-400 text-xs mt-1">Your gift card purchases will appear here</p>
              </div>
            )}
          </MobileCard.Content>
        </MobileCard>
      </div>
    </MobileLayout>
  );
};

export default GiftCard;
