import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Gift, ShoppingBag, Star, ArrowRight, CheckCircle, TrendingUp, Sparkles, Activity, CheckCircle2, ArrowRightCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import DesktopLayout from "@/components/DesktopLayout";
import Navigation from "@/components/Navigation";
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
        await new Promise(resolve => setTimeout(resolve, 1000));
        
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Gift Card Purchased!",
        description: `Your ${selectedBrand} gift card has been sent to ${recipient}`,
      });
      
      // Reset form
      setSelectedBrand("");
      setAmount("");
      setRecipient("");
      setMessage("");
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Failed to purchase gift card. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
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

  return (
    <DesktopLayout>
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gift Cards</h1>
            <p className="text-gray-600 mt-2">Purchase digital gift cards for your loved ones</p>
          </div>
          <ViewAllButton category="gift-card" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Brand Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-purple-600" />
                  Select Brand
                </CardTitle>
                <CardDescription>Choose from popular gift card brands</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {giftCardBrands.map((brand) => (
                    <div
                      key={brand.value}
                      onClick={() => setSelectedBrand(brand.value)}
                      className={`relative cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 hover:scale-105 ${
                        selectedBrand === brand.value
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3`}>
                        <brand.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">{brand.label}</h3>
                      <Badge variant="secondary" className="mt-2">
                        {brand.discount} off
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Purchase Form */}
            <Card>
              <CardHeader>
                <CardTitle>Purchase Details</CardTitle>
                <CardDescription>Enter gift card details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Amount (₦)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="recipient">Recipient Email</Label>
                    <Input
                      id="recipient"
                      type="email"
                      placeholder="recipient@example.com"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Personal Message (Optional)</Label>
                  <Input
                    id="message"
                    placeholder="Add a personal message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleGiftCardPurchase}
                  disabled={isProcessing || !selectedBrand || !amount || !recipient}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Gift className="h-4 w-4 mr-2" />
                      Purchase Gift Card
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Purchases */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Recent Purchases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPurchases.map((purchase) => (
                    <div key={purchase.id} className="flex items-center gap-3 p-3 rounded-lg border">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {purchase.brand[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{purchase.brand}</p>
                        <p className="text-sm text-gray-500">{purchase.recipient}</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {formatCurrency(purchase.amount)}
                        </p>
                      </div>
                      <Badge className={getStatusColor(purchase.status)}>
                        {purchase.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Spent</span>
                    <span className="font-semibold text-gray-900">₦175,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Cards Purchased</span>
                    <span className="font-semibold text-gray-900">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Savings</span>
                    <span className="font-semibold text-green-600">₦15,750</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
};

export default GiftCard; 