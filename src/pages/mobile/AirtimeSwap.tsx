import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RefreshCw, Smartphone, ArrowRight, TrendingUp, Clock, CheckCircle } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";
import ViewAllButton from "@/components/ui/view-all-button";

interface Swap {
  id: string;
  fromNetwork: string;
  toNetwork: string;
  amount: number;
  convertedAmount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const AirtimeSwap = () => {
  const [loading, setLoading] = useState(true);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [convertToNetwork, setConvertToNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentSwaps, setRecentSwaps] = useState<Swap[]>([]);
  const { toast } = useToast();

  const networks = [
    { icon: Smartphone, label: "MTN", value: "mtn", color: "from-yellow-500 to-orange-500" },
    { icon: Smartphone, label: "Airtel", value: "airtel", color: "from-red-500 to-pink-500" },
    { icon: Smartphone, label: "Glo", value: "glo", color: "from-green-500 to-emerald-500" },
    { icon: Smartphone, label: "9mobile", value: "9mobile", color: "from-blue-500 to-cyan-500" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock recent swaps data
        const mockSwaps: Swap[] = [
          {
            id: "1",
            fromNetwork: "MTN",
            toNetwork: "Airtel",
            amount: 1000,
            convertedAmount: 850,
            date: "2024-01-15",
            status: "completed"
          },
          {
            id: "2",
            fromNetwork: "Glo",
            toNetwork: "MTN",
            amount: 500,
            convertedAmount: 425,
            date: "2024-01-14",
            status: "completed"
          },
          {
            id: "3",
            fromNetwork: "Airtel",
            toNetwork: "9mobile",
            amount: 2000,
            convertedAmount: 1800,
            date: "2024-01-13",
            status: "pending"
          }
        ];
        
        setRecentSwaps(mockSwaps);
      } catch (error) {
        console.error('Error fetching swap data:', error);
        toast({
          title: "Error",
          description: "Failed to load swap data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleAirtimeSwap = async () => {
    if (!selectedNetwork || !convertToNetwork || !amount || !phoneNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate swap processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Swap Successful",
        description: `Your airtime has been converted successfully`,
      });
      
      // Reset form
      setSelectedNetwork("");
      setConvertToNetwork("");
      setAmount("");
      setPhoneNumber("");
    } catch (error) {
      toast({
        title: "Swap Failed",
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
          <Loader text="Loading networks..." />
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
            <h1 className="text-2xl font-bold text-gray-900">Airtime Swap</h1>
            <p className="text-sm text-gray-600 mt-1">
              Convert airtime to cash or other networks
            </p>
          </div>

          {/* Balance Card */}
          <MobileCard className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6">
            <div className="text-center mb-4">
              <p className="text-sm text-green-100 mb-2">Available Balance</p>
              <h2 className="text-3xl font-bold">$1,250.00</h2>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-white/20">
              <div>
                <p className="text-xs text-green-200">This Month</p>
                <p className="text-sm font-medium">$450.00</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-green-200">Exchange Rate</p>
                <p className="text-sm font-medium">85%</p>
              </div>
            </div>
          </MobileCard>
        </div>

        {/* Network Selection Grid */}
        <div className="grid grid-cols-2 gap-3">
          {networks.map((network) => (
            <button
              key={network.value}
              onClick={() => setSelectedNetwork(network.value)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                selectedNetwork === network.value
                  ? 'bg-green-50 border-2 border-green-200'
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
                              <div className="w-12 h-12 rounded-full bg-[#0B63BC]/10 flex items-center justify-center mb-3">
                                  <network.icon className="h-5 w-5 text-[#0B63BC]" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">{network.label}</span>
            </button>
          ))}
        </div>

        {/* Swap Form */}
        {selectedNetwork && (
          <MobileCard>
            <MobileCard.Header>
              <MobileCard.Title>Convert {selectedNetwork.toUpperCase()} Airtime</MobileCard.Title>
            </MobileCard.Header>
            
            <MobileCard.Content className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="convertTo">Convert to</Label>
                <Select value={convertToNetwork} onValueChange={setConvertToNetwork}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent>
                    {networks
                      .filter(network => network.value !== selectedNetwork)
                      .map((network) => (
                        <SelectItem key={network.value} value={network.value}>
                          {network.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="080XXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              
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
              
              <Button
                onClick={handleAirtimeSwap}
                disabled={isProcessing}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Convert ${formatCurrency(parseFloat(amount) || 0)}`
                )}
              </Button>
            </MobileCard.Content>
          </MobileCard>
        )}

        {/* Recent Swaps */}
        <MobileCard>
          <MobileCard.Header>
            <MobileCard.Title>Recent Swaps</MobileCard.Title>
            <ViewAllButton category="airtime" />
          </MobileCard.Header>
          
          <MobileCard.Content className="mt-4 space-y-4">
            {recentSwaps.length > 0 ? (
              recentSwaps.map((swap) => (
                <div key={swap.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#0B63BC]/10 rounded-full flex items-center justify-center mr-3">
                                              <RefreshCw className="h-5 w-5 text-[#0B63BC]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {swap.fromNetwork} → {swap.toNetwork}
                      </p>
                      <p className="text-xs text-gray-500">{swap.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(swap.amount)} → {formatCurrency(swap.convertedAmount)}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(swap.status)}`}>
                      {swap.status.charAt(0).toUpperCase() + swap.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <RefreshCw className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No recent swaps</p>
                <p className="text-gray-400 text-xs mt-1">Your swap history will appear here</p>
              </div>
            )}
          </MobileCard.Content>
        </MobileCard>
      </div>
    </MobileLayout>
  );
};

export default AirtimeSwap;
