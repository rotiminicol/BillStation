
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

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
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

  const DashboardContent = () => (
    <div className="space-y-8">
      {/* Header with Animation */}
      <div className={`flex items-center justify-between mb-8 transition-all duration-1000 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Good morning! <Sparkles className="inline h-6 w-6 text-blue-500 animate-pulse" />
          </h1>
          <p className="text-gray-600 text-lg font-medium">{userName}</p>
        </div>
        <Button variant="ghost" size="sm" asChild className="hidden lg:flex group">
          <Link to="/profile">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg">
                {userData?.firstName?.[0] || 'U'}{userData?.lastName?.[0] || ''}
              </span>
            </div>
          </Link>
        </Button>
      </div>

      {/* Balance Card with Premium Animation */}
      <div className={`transition-all duration-1000 delay-200 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Card className="mb-8 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white border-0 shadow-2xl overflow-hidden relative group">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 via-blue-700/50 to-blue-800/50"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700 delay-300"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-white/5 to-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:blur-2xl transition-all duration-1000"></div>
          
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-2">
                <p className="text-blue-100 text-base font-medium">Wallet Balance</p>
                <div className="flex items-center gap-3">
                  <h2 className="text-4xl font-bold tracking-tight">
                  {showBalance ? `₦${userBalance.toLocaleString()}.00` : "••••••••"}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBalance(!showBalance)}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-300 hover:scale-110"
                >
                    {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20 rounded-full px-6 py-3 transition-all duration-300 hover:scale-105 border border-white/20"
              >
                <Plus className="h-5 w-5 mr-2" />
              Add Money
            </Button>
          </div>
            <div className="text-blue-100 text-base space-y-1">
              <p className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Account: {userAccountNumber}
              </p>
              <p className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Bill Station Digital Hub
              </p>
          </div>
        </CardContent>
      </Card>
      </div>

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

      {/* Recent Transactions with Enhanced Design */}
      <div className={`transition-all duration-1000 delay-800 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Recent Transactions
            </CardTitle>
            <Button variant="ghost" size="sm" asChild className="hover:bg-blue-50">
              <Link to="/transfer" className="flex items-center gap-2 text-blue-600">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {transactions.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CreditCard className="h-10 w-10 text-gray-400" />
              </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No transactions yet</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">Start by making your first payment or transfer to see your transaction history here</p>
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
                <Link to="/transfer">Send Money</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-1">
                {transactions.map((transaction, index) => (
                  <div 
                    key={transaction.id} 
                    className={`flex items-center justify-between p-6 hover:bg-gray-50 transition-all duration-300 hover:shadow-sm ${index === transactions.length - 1 ? 'rounded-b-lg' : 'border-b border-gray-100'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                        transaction.type === 'credit' ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-red-500 to-red-600'
                    }`}>
                        <span className={`text-white font-bold text-lg ${
                          transaction.type === 'credit' ? 'text-green-100' : 'text-red-100'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}
                      </span>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 text-lg">{transaction.description || 'Transaction'}</p>
                      <p className="text-sm text-gray-500">{transaction.created_at ? new Date(transaction.created_at).toLocaleDateString() : 'Recently'}</p>
                    </div>
                  </div>
                    <p className={`font-bold text-lg ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}₦{(transaction.amount || 0).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </div>
  );

  return (
    <DesktopLayout>
      <DashboardContent />
      <Navigation />
    </DesktopLayout>
  );
};

export default Dashboard;
