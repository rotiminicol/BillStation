
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
import ViewAllButton from "@/components/ui/view-all-button";
import { currencyRates, currencySymbols, languages } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [animateCards, setAnimateCards] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

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

  // Handle clicking outside language dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.language-dropdown')) {
        setShowLanguageDropdown(false);
      }
    };

    if (showLanguageDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLanguageDropdown]);

  // Updated easy actions with real project pages - limited to 8 items
  const easyActions = [
    { icon: Send, label: "Transfer", href: "/transfer" },
    { icon: Smartphone, label: "Bills", href: "/bills" },
    { icon: CreditCard, label: "Cards", href: "/cards" },
    { icon: RefreshCw, label: "Airtime Swap", href: "/airtime-swap" },
    { icon: Plane, label: "Flight Booking", href: "/flight-booking" },
    { icon: Bitcoin, label: "Bitcoin Trading", href: "/bitcoin-trading" },
    { icon: GiftCard, label: "Gift Cards", href: "/gift-card" },
    { icon: Building2, label: "Hotel Booking", href: "/hotel-booking" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  const userEmail = user?.email || userData?.email || "user@example.com";
  const userBalance = userData?.balance || 100000; // Default to 100k if no balance set

  const DashboardContent = () => {
    const isMobile = window.innerWidth < 1024;
    return (
      <div className={isMobile ? "space-y-6 px-4 pt-4 pb-32 bg-white min-h-screen" : "space-y-8"}>
        {/* Top Section: User Greeting and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0B63BC] rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {(userData?.firstName?.[0] || 'A') + (userData?.lastName?.[0] || '')}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hello {userEmail}</h1>
              <p className="text-gray-600 text-sm">Send save and receive funds in various currencies.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Currency Rates Dropdown */}
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-[#0B63BC] hover:bg-[#0B63BC]/10 border-[#0B63BC]/30 hover:border-[#0B63BC]/50 shadow-sm hover:shadow-md transition-all duration-200 px-4 py-2"
                onMouseEnter={() => setShowCurrencyDropdown(true)}
                onMouseLeave={() => setShowCurrencyDropdown(false)}
              >
                See our rates
              </Button>
              
              {/* Currency Dropdown */}
              <AnimatePresence>
                {showCurrencyDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden"
                    onMouseEnter={() => setShowCurrencyDropdown(true)}
                    onMouseLeave={() => setShowCurrencyDropdown(false)}
                  >
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Currency Exchange Rates</h3>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {Object.entries(currencyRates).map(([currency, rate]) => (
                          <div key={currency} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{currencySymbols[currency as keyof typeof currencySymbols]}</span>
                              <span className="font-medium text-gray-900">{currency}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-gray-900">₦{rate.toLocaleString()}</div>
                              <div className="text-xs text-gray-500">1 {currency} = ₦{rate}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Dropdown */}
            <div className="relative language-dropdown">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 px-4 py-2"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              >
                English (US)
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              {/* Language Dropdown */}
              <AnimatePresence>
                {showLanguageDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-50"
                  >
                    <div className="p-2">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                          onClick={() => {
                            setShowLanguageDropdown(false);
                            // Handle language change here
                          }}
                        >
                          <span className="text-lg">{language.flag}</span>
                          <span className="text-sm font-medium text-gray-900">{language.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Wallet Balance Card */}
        <div className="bg-gradient-to-br from-[#0B63BC] via-[#0B63BC]/90 to-[#0B63BC]/80 rounded-2xl p-8 text-white relative overflow-hidden min-h-[280px]">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full"></div>
          <div className="absolute top-12 right-8 w-1 h-1 bg-white/30 rounded-full"></div>
          <div className="absolute bottom-8 left-6 w-3 h-3 bg-white/15 rounded-full"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30 border-0">
                Primary Wallet
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
                className="text-white hover:bg-white/20 rounded-full p-2"
              >
                {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
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
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white text-[#0B63BC] border-white hover:bg-gray-50 hover:border-gray-200 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200"
                asChild
              >
                <Link to="/transfer">
                  <Plus className="h-6 w-6" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white text-[#0B63BC] border-white hover:bg-gray-50 hover:border-gray-200 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200"
                asChild
              >
                <Link to="/transfer">
                  <Send className="h-6 w-6" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white text-[#0B63BC] border-white hover:bg-gray-50 hover:border-gray-200 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200"
                asChild
              >
                <Link to="/cards">
                  <CreditCard className="h-6 w-6" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Promotional Section */}
        <div className="bg-gradient-to-r from-[#0B63BC] via-[#0B63BC]/90 to-[#0B63BC]/80 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3">Introducing bill station physical card</h3>
              <p className="text-white/80 text-sm mb-4">Get your personalized physical card for seamless transactions worldwide</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white text-gray-900 border-white hover:bg-gray-50 hover:border-gray-200 transition-all duration-200"
                asChild
              >
                <Link to="/cards">
                  Learn More
                </Link>
              </Button>
            </div>
            <div className="relative flex-shrink-0">
              <img 
                src="/image14.png" 
                alt="Physical Card" 
                className="w-48 h-auto object-contain drop-shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-300"
              />
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
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#0B63BC]/10 transition-colors duration-200">
                      <action.icon className="h-7 w-7 text-[#0B63BC]" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: Recent Transactions */}
        {!isMobile && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <span className="text-lg font-bold text-gray-900">
                Recent Transactions
              </span>
              <ViewAllButton />
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
                  <Button asChild size="sm" className="bg-[#0B63BC] hover:bg-[#0B63BC]/90 shadow-lg rounded-full px-6 transition-all duration-200">
                    <Link to="/transfer">Send Money</Link>
                  </Button>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {transactions.slice(0, 5).map((transaction, index) => (
                    <Link key={transaction.id} to={`/transactions/${transaction.id}`}>
                      <motion.div 
                        className={`flex items-center justify-between px-6 py-4 ${index === Math.min(transactions.length - 1, 4) ? '' : 'border-b border-gray-100'} hover:bg-gray-50 transition-colors duration-200 cursor-pointer`}
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
                    </Link>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>
        )}

        {/* Mobile-only: Recent Transactions */}
        {isMobile && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <span className="text-lg font-bold text-gray-900">
                Recent Transactions
              </span>
              <ViewAllButton />
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
                  <Button asChild size="sm" className="bg-[#0B63BC] hover:bg-[#0B63BC]/90 shadow-lg rounded-full px-6 transition-all duration-200">
                    <Link to="/transfer">Send Money</Link>
                  </Button>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {transactions.map((transaction, index) => (
                    <Link key={transaction.id} to={`/transactions/${transaction.id}`}>
                      <motion.div 
                        className={`flex items-center justify-between px-6 py-4 ${index === transactions.length - 1 ? '' : 'border-b border-gray-100'} hover:bg-gray-50 transition-colors duration-200 cursor-pointer`}
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
                    </Link>
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
