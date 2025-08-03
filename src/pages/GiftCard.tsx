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
import { motion, AnimatePresence } from "framer-motion";

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
      {/* Header with animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gift Cards</h1>
          <p className="text-gray-600 mt-1">Purchase and send gift cards to your loved ones</p>
        </div>
      </motion.div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Brand Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg bg-[#F6F6F8]">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Gift className="h-5 w-5 text-[#0B63BC]" />
                  Select Gift Card Brand
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {giftCardBrands.map((brand, index) => (
                    <motion.div
                      key={brand.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                          selectedBrand === brand.value
                            ? "border-[#0B63BC] bg-white ring-2 ring-[#0B63BC]"
                            : "border-gray-200 hover:border-[#0B63BC] bg-white"
                        }`}
                        onClick={() => setSelectedBrand(brand.value)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                            selectedBrand === brand.value
                              ? "bg-[#0B63BC] text-white"
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
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Purchase Form */}
          <AnimatePresence>
            {selectedBrand && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-lg bg-[#F6F6F8]">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Purchase Gift Card
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="amount">Amount (USD)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="h-12 bg-white"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="recipient">Recipient Email</Label>
                      <Input
                        id="recipient"
                        type="email"
                        placeholder="Enter recipient email"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="h-12 bg-white"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="message">Personal Message (Optional)</Label>
                      <Input
                        id="message"
                        placeholder="Add a personal message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="h-12 bg-white"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Button
                        onClick={handleGiftCardPurchase}
                        disabled={isProcessing || !amount || !recipient}
                        className="w-full h-12 bg-[#0B63BC] hover:bg-[#0A58A8] text-lg font-semibold transition-colors duration-300"
                      >
                        {isProcessing ? (
                          <div className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            ></motion.div>
                            Processing...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5" />
                            Purchase Gift Card
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Purchases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg bg-[#F6F6F8]">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">Recent Purchases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPurchases.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8"
                    >
                      <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No recent purchases</p>
                    </motion.div>
                  ) : (
                    recentPurchases.map((purchase) => (
                      <motion.div
                        key={purchase.id}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Gift className="h-5 w-5 text-[#0B63BC]" />
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
                      </motion.div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-0 shadow-lg bg-[#F6F6F8]">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button variant="outline" size="sm" asChild className="w-full justify-start bg-white">
                    <Link to="/cards" className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4 text-[#0B63BC]" />
                      Buy Gift Cards
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button variant="outline" size="sm" asChild className="w-full justify-start bg-white">
                    <Link to="/transactions" className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-[#0B63BC]" />
                      View History
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button variant="outline" size="sm" asChild className="w-full justify-start bg-white">
                    <Link to="/transfer" className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-[#0B63BC]" />
                      Send Money
                    </Link>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
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