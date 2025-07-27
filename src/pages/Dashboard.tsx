
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Plus, Send, CreditCard, Smartphone, Zap, Gift, TrendingUp, ArrowRight } from "lucide-react";
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
      }
    };

    fetchDashboardData();
  }, [toast]);

  const quickActions = [
    { icon: Send, label: "Send Money", href: "/transfer", color: "bg-blue-500", description: "Transfer to anyone" },
    { icon: Smartphone, label: "Airtime", href: "/bills", color: "bg-green-500", description: "Buy airtime & data" },
    { icon: Zap, label: "Bills", href: "/bills", color: "bg-orange-500", description: "Pay utilities" },
    { icon: Gift, label: "Gift Cards", href: "/cards", color: "bg-purple-500", description: "Trade gift cards" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  const userName = userData ? `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || "User" : "User";
  const userBalance = userData?.balance || 20000; // Default to 20k if no balance set
  const userAccountNumber = userData?.accountNumber || "Not available";

  const DashboardContent = () => (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Good morning!</h1>
          <p className="text-gray-600 text-lg">{userName}</p>
        </div>
        <Button variant="ghost" size="sm" asChild className="hidden lg:flex">
          <Link to="/profile">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {userData?.firstName?.[0] || 'U'}{userData?.lastName?.[0] || ''}
              </span>
            </div>
          </Link>
        </Button>
      </div>

      {/* Balance Card */}
      <Card className="mb-6 lg:mb-8 bg-gradient-to-r from-primary-600 to-primary-700 text-white border-0">
        <CardContent className="p-6 lg:p-8">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <div>
              <p className="text-primary-100 text-sm lg:text-base">Wallet Balance</p>
              <div className="flex items-center gap-2">
                <h2 className="text-3xl lg:text-4xl font-bold">
                  {showBalance ? `₦${userBalance.toLocaleString()}.00` : "••••••••"}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-white hover:bg-white/20"
                >
                  {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Plus className="h-4 w-4 mr-1" />
              Add Money
            </Button>
          </div>
          <div className="text-primary-100 text-sm lg:text-base">
            <p>Account: {userAccountNumber}</p>
            <p>Bill Station Digital Hub</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mb-6 lg:mb-8">
        <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">Easy Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.href}>
              <div className="text-center group">
                <div className={`w-14 h-14 lg:w-16 lg:h-16 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-2 hover:scale-105 transition-transform shadow-lg`}>
                  <action.icon className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
                </div>
                <span className="text-xs lg:text-sm text-gray-600 font-medium block">{action.label}</span>
                <span className="text-xs text-gray-500 hidden lg:block">{action.description}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Cards - Desktop Only */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">₦{(userBalance * 0.3).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Send className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Account Status</p>
                <p className="text-2xl font-bold text-gray-900">Active</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg lg:text-xl">Recent Transactions</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/transfer" className="flex items-center gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {transactions.length === 0 ? (
            <div className="text-center py-12 lg:py-16">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 lg:h-10 lg:w-10 text-gray-400" />
              </div>
              <h3 className="text-lg lg:text-xl font-medium text-gray-900 mb-2">No transactions yet</h3>
              <p className="text-gray-500 mb-6 lg:mb-8">Start by making your first payment or transfer</p>
              <Button asChild size="lg">
                <Link to="/transfer">Send Money</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-1">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 lg:p-6 hover:bg-gray-50">
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center ${
                      transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <span className={`text-sm lg:text-base ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 lg:text-lg">{transaction.description || 'Transaction'}</p>
                      <p className="text-sm text-gray-500">{transaction.created_at ? new Date(transaction.created_at).toLocaleDateString() : 'Recently'}</p>
                    </div>
                  </div>
                  <p className={`font-medium lg:text-lg ${
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
    </>
  );

  return (
    <DesktopLayout>
      <DashboardContent />
      <Navigation />
    </DesktopLayout>
  );
};

export default Dashboard;
