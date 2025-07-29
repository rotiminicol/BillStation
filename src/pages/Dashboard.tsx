
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Plus, Send, CreditCard, Smartphone, Zap, Gift, TrendingUp, ArrowRight, Sparkles, Activity, DollarSign, RefreshCw, Plane, Bitcoin, Users, Shield, Globe, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    { icon: Send, label: "Send Money", href: "/transfer", description: "Transfer to anyone" },
    { icon: Smartphone, label: "Bill Payments", href: "/bills", description: "Pay bills & utilities" },
    { icon: RefreshCw, label: "Airtime Swap", href: "/airtime-swap", description: "Convert airtime to cash" },
    { icon: Plane, label: "Flight Booking", href: "/flight-booking", description: "Book flights & hotels" },
    { icon: Bitcoin, label: "Crypto Trading", href: "/bitcoin-trading", description: "Trade cryptocurrencies" },
    { icon: Gift, label: "Gift Cards", href: "/cards", description: "Trade gift cards" },
    { icon: DollarSign, label: "Virtual Card", href: "/virtual-card", description: "Shop worldwide" },
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
        {/* Enhanced Top Card: Balance & User Info */}
        <div className={isMobile ? "w-full max-w-md mx-auto" : ""}>
          <motion.div 
            className="relative rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white shadow-2xl overflow-hidden p-6 flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Background decorative elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold shadow-lg backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {(userData?.firstName?.[0] || 'U') + (userData?.lastName?.[0] || '')}
                </motion.div>
                <div>
                  <div className="text-lg font-semibold">{userName}</div>
                  <div className="text-blue-100 text-xs">{userData?.email || 'Welcome to Bill Station'}</div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-col">
                  <span className="text-blue-100 text-xs font-medium">Wallet Balance</span>
                  <motion.span 
                    className="text-3xl font-bold tracking-tight mt-1"
                    key={showBalance ? 'visible' : 'hidden'}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {showBalance ? `₦${userBalance.toLocaleString()}.00` : "••••••••"}
                  </motion.span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
                >
                  {showBalance ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                </Button>
              </div>
              <div className="flex items-center justify-between mt-4 bg-white/10 rounded-xl px-4 py-2 backdrop-blur-sm">
                <span className="flex items-center gap-2 text-blue-100 text-xs">
                  <Activity className="h-4 w-4" />
                  {userAccountNumber}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20 rounded-full px-4 py-2 border border-white/20 transition-all duration-200"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Money
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className={isMobile ? "w-full max-w-md mx-auto" : ""}>
          <motion.h3 
            className="text-base font-semibold text-gray-900 mb-2 pl-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Quick Actions
          </motion.h3>
          <div className={isMobile ? "flex gap-4 overflow-x-auto pb-2 px-1 hide-scrollbar" : "grid grid-cols-2 lg:grid-cols-4 gap-6"}>
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Link to={action.href} className={isMobile ? "min-w-[90px]" : ""}>
                  <div className={`flex flex-col items-center justify-center bg-gradient-to-br ${action.bgColor} hover:from-blue-200 hover:to-blue-300 rounded-xl shadow-lg p-4 w-20 h-24 transition-all duration-300 border border-blue-200 group hover:shadow-xl hover:scale-105`}>
                    <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-2 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-blue-900 text-center mt-1" style={{fontFamily: 'Inter, system-ui'}}> {action.label} </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Recent Transactions */}
        <div className={isMobile ? "w-full max-w-md mx-auto" : ""}>
          <motion.div 
            className="rounded-3xl bg-white shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <span className="text-lg font-bold text-blue-900 flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" /> Recent Transactions
              </span>
              <Button variant="ghost" size="sm" asChild className="hover:bg-blue-50 transition-colors duration-200">
                <Link to="/transfer" className="flex items-center gap-2 text-blue-600">
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="divide-y divide-gray-100">
              {transactions.length === 0 ? (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CreditCard className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">No transactions yet</h3>
                  <p className="text-gray-500 mb-4 max-w-xs mx-auto text-xs">Start by making your first payment or transfer to see your transaction history here</p>
                  <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg rounded-full px-6 transition-all duration-200">
                    <Link to="/transfer">Send Money</Link>
                  </Button>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {transactions.map((transaction, index) => (
                    <motion.div 
                      key={transaction.id} 
                      className={`flex items-center justify-between px-6 py-4 ${index === transactions.length - 1 ? '' : 'border-b border-gray-100'} hover:bg-gray-50 transition-colors duration-200`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      whileHover={{ x: 5 }}
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
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Desktop-only: Premium stats and layout */}
        {!isMobile && (
          <>
            {/* Enhanced Quick Actions with Staggered Animation */}
            <motion.div 
              className={`transition-all duration-1000 delay-400 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                Easy Actions
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  >
                    <Link to={action.href}>
                      <div className="text-center group transition-all duration-500">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                          <action.icon className="h-7 w-7 lg:h-8 lg:w-8 text-blue-600" />
                        </div>
                        <span className="text-sm lg:text-base text-gray-700 font-semibold block group-hover:text-blue-600 transition-colors duration-300">{action.label}</span>
                        <span className="text-xs text-gray-500 hidden lg:block mt-1">{action.description}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Stats Cards with Premium Design */}
            <motion.div 
              className="hidden lg:grid lg:grid-cols-3 gap-6 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-full blur-2xl"></div>
                  <CardContent className="p-6 relative z-10">
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
              </motion.div>

              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-full blur-2xl"></div>
                  <CardContent className="p-6 relative z-10">
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
              </motion.div>

              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-full blur-2xl"></div>
                  <CardContent className="p-6 relative z-10">
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
              </motion.div>
            </motion.div>

            {/* New Premium Features Section */}
            <motion.div 
              className="hidden lg:block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Platform Features
              </h3>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: <Globe className="h-6 w-6" />, title: "Global Access", description: "Available worldwide with multi-currency support", color: "from-blue-500 to-blue-600" },
                  { icon: <Clock className="h-6 w-6" />, title: "24/7 Support", description: "Round-the-clock customer service and technical assistance", color: "from-green-500 to-green-600" },
                  { icon: <CheckCircle className="h-6 w-6" />, title: "Bank Security", description: "Enterprise-grade encryption and fraud protection", color: "from-purple-500 to-purple-600" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                    whileHover={{ y: -3 }}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
