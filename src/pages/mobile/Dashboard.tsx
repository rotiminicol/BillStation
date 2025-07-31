import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Send, Plus, RefreshCw, Plane, Bitcoin, Gift, ArrowRight, CreditCard, Car, DollarSign, Ticket } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import MobileHeader from "@/components/MobileHeader";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import ViewAllButton from "@/components/ui/view-all-button";
import { useAuth } from "@/hooks/use-auth";
import { authAPI, transactionAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";

interface Transaction {
  id: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  date: string;
  recipient?: string;
  status: 'success' | 'pending' | 'failed';
}

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API calls
        const [userData, transactionsData] = await Promise.all([
          authAPI.getMe(),
          transactionAPI.getAll()
        ]);
        
        setBalance(userData?.balance || 0);
        setTransactions(transactionsData.slice(0, 5)); // Show only recent 5 transactions
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const quickActions = [
    { icon: Send, label: "Send Money", path: "/transfer" },
    { icon: RefreshCw, label: "Airtime Swap", path: "/airtime-swap" },
    { icon: Plane, label: "Flight Booking", path: "/flight-book" },
    { icon: Plane, label: "Book Private Jet", path: "/flight-book-private-jet" },
    { icon: Bitcoin, label: "Crypto Trading", path: "/bitcoin-trading" },
    { icon: DollarSign, label: "Convert Asset", path: "/convert-asset" },
    { icon: Gift, label: "Gift Cards", path: "/gift-card" },
    { icon: Ticket, label: "Buy Tickets", path: "/buy-tickets" },
    { icon: CreditCard, label: "Virtual Card", path: "/virtual-card" },
    { icon: Car, label: "Book Ride", path: "/book-ride" },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center h-full">
          <Loader text="Loading dashboard..." />
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
            <h1 className="text-lg font-semibold text-gray-900">
              Welcome back!
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {user?.email || 'User'}
            </p>
          </div>

          {/* Balance Card */}
                      <MobileCard className="bg-gradient-to-r from-[#0B63BC] to-[#0B63BC]/80 text-white p-6">
            <div className="text-center mb-6">
                              <p className="text-sm text-[#0B63BC]/80 mb-2">Available Balance</p>
              <div className="flex items-center justify-center">
                <h2 className="text-3xl font-bold">
                  {showBalance ? formatCurrency(balance) : '••••••'}
                </h2>
                <button 
                  onClick={() => setShowBalance(!showBalance)}
                  className="ml-3 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {showBalance ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Account Info */}
            <div className="flex justify-between items-center pt-4 border-t border-white/20">
              <div>
                <p className="text-xs text-[#0B63BC]/60">Account Number</p>
                <p className="text-sm font-medium">•••• 1234</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#0B63BC]/60">Account Type</p>
                <p className="text-sm font-medium">Savings</p>
              </div>
            </div>
          </MobileCard>

          {/* Quick Action Buttons */}
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              className="flex-1 bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              asChild
            >
              <Link to="/transfer">
                <Send className="h-4 w-4 mr-2" />
                Send Money
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              asChild
            >
              <Link to="/bills">
                <Plus className="h-4 w-4 mr-2" />
                Pay Bills
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <Link 
              key={action.path} 
              to={action.path}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors border border-gray-100"
            >
                              <div className="w-12 h-12 rounded-full bg-[#0B63BC]/10 flex items-center justify-center mb-3">
                                  <action.icon className="h-5 w-5 text-[#0B63BC]" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">{action.label}</span>
            </Link>
          ))}
        </div>

        {/* Recent Transactions */}
        <MobileCard>
          <MobileCard.Header>
            <MobileCard.Title>Recent Transactions</MobileCard.Title>
            <ViewAllButton />
          </MobileCard.Header>
          
          <MobileCard.Content className="mt-4 space-y-4">
            {transactions.length > 0 ? (
              transactions.map((txn) => (
                <Link key={txn.id} to={`/transactions/${txn.id}`}>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full ${
                        txn.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {txn.type === 'credit' ? (
                          <ArrowRight className="h-4 w-4 rotate-180" />
                        ) : (
                          <ArrowRight className="h-4 w-4" />
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {txn.type === 'credit' ? 'Received' : 'Sent'} {txn.recipient ? `to ${txn.recipient}` : ''}
                        </p>
                        <p className="text-xs text-gray-500">{formatDate(txn.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        txn.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {txn.type === 'credit' ? '+' : '-'}{formatCurrency(txn.amount)}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        txn.status === 'success' 
                          ? 'bg-green-100 text-green-800' 
                          : txn.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">No recent transactions</p>
                <p className="text-gray-400 text-xs mt-1">Your transactions will appear here</p>
              </div>
            )}
          </MobileCard.Content>
        </MobileCard>
      </div>
    </MobileLayout>
  );
};

export default Dashboard;
