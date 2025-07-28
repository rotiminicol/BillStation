
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Plus, Send, CreditCard, Smartphone, Zap, Gift, TrendingUp, ArrowRight, Sparkles, Activity, DollarSign, RefreshCw, Plane, Bitcoin } from "lucide-react";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";
import Loader from "@/components/Loader";
import { authAPI, transactionAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { getBankLogo } from "@/lib/bankLogos";
import { User, Transaction } from "@/types";

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [animateCards, setAnimateCards] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [userResponse, transactionsResponse] = await Promise.all([
          authAPI.getMe(),
          transactionAPI.getAll().catch(() => [])
        ]);
        
        setUserData(userResponse);
        setTransactions(transactionsResponse.slice(0, 4)); // Show only recent 4 transactions
        console.log('Dashboard data loaded:', { user: userResponse, transactions: transactionsResponse });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
        // Trigger animations after data loads
        setTimeout(() => setAnimateCards(true), 100);
      }
    };

    fetchDashboardData();
  }, [toast]);

  const quickActions = [
    { icon: Send, label: "Send Money", href: "/transfer", color: "bg-gradient-to-br from-blue-500 to-blue-600", description: "Transfer to anyone", hover: "hover:from-blue-600 hover:to-blue-700" },
    { icon: Smartphone, label: "Bill Payments", href: "/bills", color: "bg-gradient-to-br from-green-500 to-green-600", description: "Pay bills & utilities", hover: "hover:from-green-600 hover:to-green-700" },
    { icon: RefreshCw, label: "Airtime Swap", href: "/airtime-swap", color: "bg-gradient-to-br from-teal-500 to-teal-600", description: "Convert airtime to cash", hover: "hover:from-teal-600 hover:to-teal-700" },
    { icon: Plane, label: "Flight Booking", href: "/flight-booking", color: "bg-gradient-to-br from-purple-500 to-purple-600", description: "Book flights & hotels", hover: "hover:from-purple-600 hover:to-purple-700" },
    { icon: Bitcoin, label: "Bitcoin Trading", href: "/bitcoin-trading", color: "bg-gradient-to-br from-orange-500 to-orange-600", description: "Trade cryptocurrencies", hover: "hover:from-orange-600 hover:to-orange-700" },
    { icon: Gift, label: "Gift Cards", href: "/cards", color: "bg-gradient-to-br from-pink-500 to-pink-600", description: "Trade gift cards", hover: "hover:from-pink-600 hover:to-pink-700" },
    { icon: DollarSign, label: "Virtual Card", href: "/virtual-card", color: "bg-gradient-to-br from-indigo-500 to-indigo-600", description: "Shop worldwide", hover: "hover:from-indigo-600 hover:to-indigo-700" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <Loader size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  const userName = userData ? `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || "User" : "User";
  const userBalance = userData?.balance || 20000; // Default to 20k if no balance set
  const userAccountNumber = userData?.accountNumber || "Not available";

  const DashboardContent = () => {
    const isMobile = window.innerWidth < 1024; // crude check for mobile, replace with useIsMobile if needed
    return (
      <div className={isMobile ? "space-y-6 px-2 pt-4 pb-32 bg-white min-h-screen" : "space-y-8"}>
        {/* Top Card: Balance & User Info */}
        <div className={isMobile ? "w-full max-w-md mx-auto" : ""}>
          <div className="relative rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white shadow-2xl overflow-hidden p-6 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold shadow-lg">
                {(userData?.firstName?.[0] || 'U') + (userData?.lastName?.[0] || '')}
              </div>
              <div>
                <div className="text-lg font-semibold">{userName}</div>
                <div className="text-blue-100 text-xs">Bill Station User</div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex flex-col">
                <span className="text-blue-100 text-xs font-medium">Wallet Balance</span>
                <span className="text-3xl font-bold tracking-tight mt-1">
                  {showBalance ? `₦${userBalance.toLocaleString()}.00` : "••••••••"}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBalance(!showBalance)}
                className="text-white hover:bg-white/20 rounded-full p-2"
              >
                {showBalance ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
              </Button>
            </div>
            <div className="flex items-center justify-between mt-4 bg-white/10 rounded-xl px-4 py-2">
              <span className="flex items-center gap-2 text-blue-100 text-xs">
                <Activity className="h-4 w-4" />
                {userAccountNumber}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20 rounded-full px-4 py-2 border border-white/20"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Money
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions: Horizontal Scroll on Mobile */}
        <div className={isMobile ? "w-full max-w-md mx-auto" : ""}>
          <h3 className="text-base font-semibold text-gray-900 mb-2 pl-2">Quick Actions</h3>
          <div className={isMobile ? "flex gap-4 overflow-x-auto pb-2 px-1 hide-scrollbar" : "grid grid-cols-2 lg:grid-cols-4 gap-6"}>
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href} className={isMobile ? "min-w-[90px]" : ""}>
                <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 rounded-xl shadow-lg p-4 w-20 h-24 transition-all duration-300 border border-blue-200 group`}>
                  <div className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center mb-2 shadow-md group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-blue-900 text-center mt-1" style={{fontFamily: 'Inter, system-ui'}}> {action.label} </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Transactions: Rounded Card */}
        <div className={isMobile ? "w-full max-w-md mx-auto" : ""}>
          <div className="rounded-3xl bg-white shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <span className="text-lg font-bold text-blue-900 flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" /> Recent Transactions
              </span>
              <Button variant="ghost" size="sm" asChild className="hover:bg-blue-50">
                <Link to="/transfer" className="flex items-center gap-2 text-blue-600">
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="divide-y divide-gray-100">
              {transactions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CreditCard className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">No transactions yet</h3>
                  <p className="text-gray-500 mb-4 max-w-xs mx-auto text-xs">Start by making your first payment or transfer to see your transaction history here</p>
                  <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg rounded-full px-6">
                    <Link to="/transfer">Send Money</Link>
                  </Button>
                </div>
              ) : (
                transactions.map((transaction, index) => (
                  <div 
                    key={transaction.id} 
                    className={`flex items-center justify-between px-6 py-4 ${index === transactions.length - 1 ? '' : 'border-b border-gray-100'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden">
                        <img
                          src={getBankLogo({ code: transaction.bankCode, name: transaction.bankName || transaction.description })}
                          alt={transaction.bankName || transaction.description || 'Bank'}
                          className="w-8 h-8 object-contain"
                          onError={e => { e.currentTarget.src = '/placeholder.svg'; }}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{transaction.description || 'Transaction'}</p>
                        <p className="text-xs text-gray-500">{transaction.created_at ? new Date(transaction.created_at).toLocaleDateString() : 'Recently'}</p>
                      </div>
                    </div>
                    <p className={`font-bold text-base ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'credit' ? '+' : '-'}₦{(transaction.amount || 0).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Desktop-only: Keep existing stats and layout */}
        {!isMobile && (
          <>
            {/* Quick Actions with Staggered Animation */}
            <div className={`transition-all duration-1000 delay-400 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                Easy Actions
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action, index) => (
                  <Link key={index} to={action.href}>
                    <div className={`text-center group transition-all duration-500 delay-${index * 100} ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                      <div className={`w-16 h-16 lg:w-20 lg:h-20 ${action.color} ${action.hover} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <action.icon className="h-7 w-7 lg:h-8 lg:w-8 text-white relative z-10" />
                      </div>
                      <span className="text-sm lg:text-base text-gray-700 font-semibold block group-hover:text-blue-600 transition-colors duration-300">{action.label}</span>
                      <span className="text-xs text-gray-500 hidden lg:block mt-1">{action.description}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {/* Stats Cards with Hover Effects */}
            <div className={`hidden lg:grid lg:grid-cols-3 gap-6 mb-8 transition-all duration-1000 delay-600 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
                      <p className="text-3xl font-bold text-gray-900">{transactions.length}</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <TrendingUp className="h-7 w-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">This Month</p>
                      <p className="text-3xl font-bold text-gray-900">₦{(userBalance * 0.3).toLocaleString()}</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Send className="h-7 w-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Account Status</p>
                      <p className="text-3xl font-bold text-gray-900">Active</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <CreditCard className="h-7 w-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <DesktopLayout>
      <DashboardContent />
    </DesktopLayout>
  );
};

export default Dashboard;
