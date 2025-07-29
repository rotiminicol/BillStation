
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Plus, Send, CreditCard, Smartphone, Zap, Gift, TrendingUp, ArrowRight, Sparkles, Activity, DollarSign, RefreshCw, Plane, Bitcoin, Users, Shield, Globe, Clock, CheckCircle, AlertCircle, Building2, ChevronDown, ArrowUpDown, Phone, Tv, Zap as Electricity, Gift as GiftCard, MoreHorizontal } from "lucide-react";
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

  const easyActions = [
    { icon: Phone, label: "Airtime", href: "/airtime" },
    { icon: ArrowUpDown, label: "Airtime Swap", href: "/airtime-swap" },
    { icon: Globe, label: "Data", href: "/data" },
    { icon: TrendingUp, label: "Betting", href: "/betting" },
    { icon: Tv, label: "Cable TV", href: "/cable-tv" },
    { icon: GiftCard, label: "Sell Giftcard", href: "/sell-giftcard" },
    { icon: Electricity, label: "Electricity", href: "/electricity" },
    { icon: MoreHorizontal, label: "More", href: "/more" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  const userName = userData ? `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || "User" : "User";
  const userBalance = userData?.balance || 100000; // Default to 100k if no balance set

  const DashboardContent = () => {
    const isMobile = window.innerWidth < 1024;
    return (
      <div className={isMobile ? "space-y-6 px-4 pt-4 pb-32 bg-white min-h-screen" : "space-y-8"}>
        {/* Top Section: User Greeting and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {(userData?.firstName?.[0] || 'A') + (userData?.lastName?.[0] || '')}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hello {userData?.firstName || 'Azeeza'}</h1>
              <p className="text-gray-600 text-sm">Send save and receive funds in various currencies.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
              <ArrowRight className="h-4 w-4 mr-2" />
              See our rates
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              English (US)
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Wallet Balance Card */}
        <div className="bg-blue-600 rounded-2xl p-6 text-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30 border-0">
                Primary Wallet
              </Button>
              <div className="w-6 h-6 bg-white/20 rounded-full"></div>
            </div>
            
            <div className="text-center mb-6">
              <motion.div 
                className="text-4xl font-bold mb-2"
                key={showBalance ? 'visible' : 'hidden'}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {showBalance ? `₦ ${userBalance.toLocaleString()}.00` : "••••••••"}
              </motion.div>
            </div>

            <div className="flex items-center justify-center gap-8">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full p-3">
                <Plus className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full p-3">
                <Send className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full p-3">
                <CreditCard className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Promotional Section */}
        <div className="bg-blue-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Introducing bill station physical card</h3>
            </div>
            <div className="relative">
              <div className="w-16 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xs">1234 5678 9105 8745</span>
              </div>
              <div className="w-16 h-12 bg-blue-400 rounded-lg shadow-lg flex items-center justify-center absolute -top-2 -right-2">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Easy Actions Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">Easy Actions</h3>
          <div className="grid grid-cols-4 gap-6">
            {easyActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Link to={action.href}>
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-50 transition-colors duration-200">
                      <action.icon className="h-7 w-7 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile-only: Recent Transactions */}
        {isMobile && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <span className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" /> Recent Transactions
              </span>
              <Button variant="ghost" size="sm" asChild className="hover:bg-blue-50 transition-colors duration-200">
                <Link to="/transactions" className="flex items-center gap-2 text-blue-600">
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
                  <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 shadow-lg rounded-full px-6 transition-all duration-200">
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
          </div>
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
