import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Gift, ShoppingBag, Star, ArrowRight, CheckCircle, TrendingUp, Activity, CheckCircle2, ArrowRightCircle } from "lucide-react";
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
        title: "Success!",
        description: `Gift card purchased successfully for ${recipient}`,
      });
      
      // Reset form
      setSelectedBrand("");
      setAmount("");
      setRecipient("");
      setMessage("");
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to purchase gift card",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
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

  const GiftCardContent = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gift Cards</h1>
          <p className="text-gray-600 mt-1">Purchase and send gift cards to your loved ones</p>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Brand Selection */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Gift className="h-5 w-5 text-blue-600" />
                Select Gift Card Brand
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {giftCardBrands.map((brand) => (
                  <Card
                    key={brand.value}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedBrand === brand.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setSelectedBrand(brand.value)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                        selectedBrand === brand.value
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        <brand.icon className="h-6 w-6" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{brand.label}</h4>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {brand.discount} off
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Purchase Form */}
          {selectedBrand && (
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Purchase Gift Card
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (USD)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient Email</Label>
                  <Input
                    id="recipient"
                    type="email"
                    placeholder="Enter recipient email"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Personal Message (Optional)</Label>
                  <Input
                    id="message"
                    placeholder="Add a personal message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="h-12"
                  />
                </div>

                <Button
                  onClick={handleGiftCardPurchase}
                  disabled={isProcessing || !amount || !recipient}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Purchase Gift Card
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Purchases */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">Recent Purchases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPurchases.length === 0 ? (
                  <div className="text-center py-8">
                    <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No recent purchases</p>
                  </div>
                ) : (
                  recentPurchases.map((purchase) => (
                    <div key={purchase.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Gift className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{purchase.brand}</p>
                          <p className="text-xs text-gray-500">{purchase.recipient}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 text-sm">{formatCurrency(purchase.amount)}</p>
                        <Badge className={`mt-1 ${getStatusColor(purchase.status)}`}>
                          {purchase.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/cards" className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Buy Gift Cards
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
        </div>
      </div>
    </div>
  );

  return (
    <DesktopLayout>
      <GiftCardContent />
    </DesktopLayout>
  );
};

export default GiftCard; 