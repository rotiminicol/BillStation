import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bitcoin, TrendingUp, TrendingDown, ArrowRight, Wallet, Clock, CheckCircle } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";
import ViewAllButton from "@/components/ui/view-all-button";

interface Trade {
  id: string;
  crypto: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  total: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const CryptoTrading = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [tradeType, setTradeType] = useState("");
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentTrades, setRecentTrades] = useState<Trade[]>([]);
  const { toast } = useToast();

  const cryptoTypes = [
    { icon: Bitcoin, label: "Bitcoin", value: "bitcoin", color: "from-orange-500 to-yellow-500", price: 45000 },
    { icon: Bitcoin, label: "Ethereum", value: "ethereum", color: "from-purple-500 to-blue-500", price: 2800 },
    { icon: Bitcoin, label: "USDT", value: "usdt", color: "from-green-500 to-emerald-500", price: 1 },
    { icon: Bitcoin, label: "BNB", value: "bnb", color: "from-yellow-500 to-orange-500", price: 320 },
  ];

  const transactionTypes = [
    { icon: TrendingUp, label: "Buy", value: "buy", color: "from-green-500 to-emerald-500" },
    { icon: TrendingDown, label: "Sell", value: "sell", color: "from-red-500 to-pink-500" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock recent trades data
        const mockTrades: Trade[] = [
          {
            id: "1",
            crypto: "Bitcoin",
            type: "buy",
            amount: 0.5,
            price: 45000,
            total: 22500,
            date: "2024-01-15",
            status: "completed"
          },
          {
            id: "2",
            crypto: "Ethereum",
            type: "sell",
            amount: 2.5,
            price: 2800,
            total: 7000,
            date: "2024-01-14",
            status: "completed"
          },
          {
            id: "3",
            crypto: "USDT",
            type: "buy",
            amount: 1000,
            price: 1,
            total: 1000,
            date: "2024-01-13",
            status: "pending"
          }
        ];
        
        setRecentTrades(mockTrades);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
        toast({
          title: "Error",
          description: "Failed to load crypto data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleCryptoTrade = async () => {
    if (!selectedCrypto || !tradeType || !amount || !walletAddress) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate trade processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Trade Successful",
        description: `Your ${tradeType} order has been processed successfully`,
      });
      
      // Reset form
      setSelectedCrypto("");
      setTradeType("");
      setAmount("");
      setWalletAddress("");
    } catch (error) {
      toast({
        title: "Trade Failed",
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
      case 'completed':
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
          <Loader text="Loading crypto data..." />
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
            <h1 className="text-2xl font-bold text-gray-900">Crypto Trading</h1>
            <p className="text-sm text-gray-600 mt-1">
              Buy and sell cryptocurrencies securely
            </p>
          </div>

          {/* Balance Card */}
          <MobileCard className="bg-gradient-to-r from-orange-600 to-orange-800 text-white p-6">
            <div className="text-center mb-4">
              <p className="text-sm text-orange-100 mb-2">Portfolio Value</p>
              <h2 className="text-3xl font-bold">$45,250.00</h2>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-white/20">
              <div>
                <p className="text-xs text-orange-200">24h Change</p>
                <p className="text-sm font-medium text-green-300">+$2,450.00</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-orange-200">Total Trades</p>
                <p className="text-sm font-medium">156</p>
              </div>
            </div>
          </MobileCard>
        </div>

        {/* Crypto Selection Grid */}
        <div className="grid grid-cols-2 gap-3">
          {cryptoTypes.map((crypto) => (
            <button
              key={crypto.value}
              onClick={() => setSelectedCrypto(crypto.value)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                selectedCrypto === crypto.value
                  ? 'bg-orange-50 border-2 border-orange-200'
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                <crypto.icon className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">{crypto.label}</span>
              <span className="text-xs text-gray-500">${crypto.price.toLocaleString()}</span>
            </button>
          ))}
        </div>

        {/* Trade Type Selection */}
        {selectedCrypto && (
          <div className="grid grid-cols-2 gap-3">
            {transactionTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setTradeType(type.value)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                  tradeType === type.value
                    ? 'bg-orange-50 border-2 border-orange-200'
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${type.color} flex items-center justify-center mb-3`}>
                  <type.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">{type.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Trade Form */}
        {selectedCrypto && tradeType && (
          <MobileCard>
            <MobileCard.Header>
              <MobileCard.Title>{tradeType.toUpperCase()} {selectedCrypto.toUpperCase()}</MobileCard.Title>
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
                <Label htmlFor="wallet">Wallet Address</Label>
                <Input
                  id="wallet"
                  placeholder="Enter wallet address"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
              </div>
              
              <Button
                onClick={handleCryptoTrade}
                disabled={isProcessing}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `${tradeType.toUpperCase()} ${formatCurrency(parseFloat(amount) || 0)}`
                )}
              </Button>
            </MobileCard.Content>
          </MobileCard>
        )}

        {/* Recent Trades */}
        <MobileCard>
          <MobileCard.Header>
            <MobileCard.Title>Recent Trades</MobileCard.Title>
            <ViewAllButton category="crypto" />
          </MobileCard.Header>
          
          <MobileCard.Content className="mt-4 space-y-4">
            {recentTrades.length > 0 ? (
              recentTrades.map((trade) => (
                <div key={trade.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                      <Bitcoin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {trade.type.toUpperCase()} {trade.crypto}
                      </p>
                      <p className="text-xs text-gray-500">{trade.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {trade.amount} {trade.crypto}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(trade.status)}`}>
                      {trade.status.charAt(0).toUpperCase() + trade.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Bitcoin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No recent trades</p>
                <p className="text-gray-400 text-xs mt-1">Your trade history will appear here</p>
              </div>
            )}
          </MobileCard.Content>
        </MobileCard>
      </div>
    </MobileLayout>
  );
};

export default CryptoTrading;
