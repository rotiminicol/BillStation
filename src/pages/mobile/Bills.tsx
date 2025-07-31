import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, CreditCard, Building2, Zap, Wifi, Droplets, ArrowRight, Plus } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";
import ViewAllButton from "@/components/ui/view-all-button";

interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  category: string;
  provider: string;
}

const Bills = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [provider, setProvider] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentBills, setRecentBills] = useState<Bill[]>([]);
  const { toast } = useToast();

  const billCategories = [
    { icon: Building2, label: "Electricity", value: "electricity", color: "from-yellow-500 to-orange-500" },
    { icon: Droplets, label: "Water", value: "water", color: "from-blue-500 to-cyan-500" },
    { icon: Wifi, label: "Internet", value: "internet", color: "from-purple-500 to-pink-500" },
    { icon: CreditCard, label: "Cable TV", value: "cable", color: "from-red-500 to-pink-500" },
    { icon: Zap, label: "Gas", value: "gas", color: "from-green-500 to-emerald-500" },
    { icon: Building2, label: "Waste", value: "waste", color: "from-gray-500 to-slate-500" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock recent bills data
        const mockBills: Bill[] = [
          {
            id: "1",
            name: "Electricity Bill",
            amount: 250.00,
            dueDate: "2024-01-15",
            status: "paid",
            category: "electricity",
            provider: "PHCN"
          },
          {
            id: "2",
            name: "Water Bill",
            amount: 120.50,
            dueDate: "2024-01-20",
            status: "pending",
            category: "water",
            provider: "Water Corp"
          },
          {
            id: "3",
            name: "Internet Bill",
            amount: 89.99,
            dueDate: "2024-01-10",
            status: "overdue",
            category: "internet",
            provider: "Spectranet"
          }
        ];
        
        setRecentBills(mockBills);
      } catch (error) {
        console.error('Error fetching bills data:', error);
        toast({
          title: "Error",
          description: "Failed to load bills data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleBillPayment = async () => {
    if (!selectedCategory || !amount || !provider || !accountNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful",
        description: `Your ${selectedCategory} bill has been paid successfully`,
      });
      
      // Reset form
      setSelectedCategory("");
      setAmount("");
      setProvider("");
      setAccountNumber("");
    } catch (error) {
      toast({
        title: "Payment Failed",
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
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center h-full">
          <Loader text="Loading bills..." />
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
            <h1 className="text-2xl font-bold text-gray-900">Pay Bills</h1>
            <p className="text-sm text-gray-600 mt-1">
              Pay your utility bills quickly and securely
            </p>
          </div>

          {/* Balance Card */}
          <MobileCard className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
            <div className="text-center mb-4">
              <p className="text-sm text-blue-100 mb-2">Available Balance</p>
              <h2 className="text-3xl font-bold">$2,450.00</h2>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-white/20">
              <div>
                <p className="text-xs text-blue-200">This Month</p>
                <p className="text-sm font-medium">$320.50</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-blue-200">Next Due</p>
                <p className="text-sm font-medium">Jan 15, 2024</p>
              </div>
            </div>
          </MobileCard>
        </div>

        {/* Bill Categories Grid */}
        <div className="grid grid-cols-3 gap-3">
          {billCategories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                selectedCategory === category.value
                  ? 'bg-[#0B63BC]/10 border-2 border-[#0B63BC]/20'
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
                              <div className="w-12 h-12 rounded-full bg-[#0B63BC]/10 flex items-center justify-center mb-3">
                                  <category.icon className="h-5 w-5 text-[#0B63BC]" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Payment Form */}
        {selectedCategory && (
          <MobileCard>
            <MobileCard.Header>
              <MobileCard.Title>Pay {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Bill</MobileCard.Title>
            </MobileCard.Header>
            
            <MobileCard.Content className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="provider">Service Provider</Label>
                <Input
                  id="provider"
                  placeholder="Enter provider name"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="account">Account Number</Label>
                <Input
                  id="account"
                  placeholder="Enter account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
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
                onClick={handleBillPayment}
                disabled={isProcessing}
                className="w-full bg-[#0B63BC] hover:bg-[#0B63BC]/90 text-white"
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Pay ${formatCurrency(parseFloat(amount) || 0)}`
                )}
              </Button>
            </MobileCard.Content>
          </MobileCard>
        )}

        {/* Recent Bills */}
        <MobileCard>
          <MobileCard.Header>
            <MobileCard.Title>Recent Bills</MobileCard.Title>
            <ViewAllButton category="bills" />
          </MobileCard.Header>
          
          <MobileCard.Content className="mt-4 space-y-4">
            {recentBills.length > 0 ? (
              recentBills.map((bill) => (
                <div key={bill.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#0B63BC]/10 rounded-full flex items-center justify-center mr-3">
                                              <CreditCard className="h-5 w-5 text-[#0B63BC]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{bill.name}</p>
                      <p className="text-xs text-gray-500">{bill.provider}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(bill.amount)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(bill.status)}`}>
                      {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No recent bills</p>
                <p className="text-gray-400 text-xs mt-1">Your bill history will appear here</p>
              </div>
            )}
          </MobileCard.Content>
        </MobileCard>
      </div>
    </MobileLayout>
  );
};

export default Bills;
