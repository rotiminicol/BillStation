
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Settings, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Edit,
  Shield,
  CreditCard,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  Eye,
  Copy,
  Star,
  Sparkles,
  Activity,
  CheckCircle,
  ArrowRight,
  Globe,
  Zap,
  Lock,
  Clock,
  Building
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";

import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import PersonalInfoModal from "@/components/profile/PersonalInfoModal";
import AccountSettingsModal from "@/components/profile/AccountSettingsModal";
import NotificationsModal from "@/components/profile/NotificationsModal";
import HelpSupportModal from "@/components/profile/HelpSupportModal";
import { authAPI, transactionAPI, cardAPI } from "@/services/api";
import { User as UserType, Transaction, Card as CardType } from "@/types";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showBalance, setShowBalance] = useState(false);
  const [userData, setUserData] = useState<UserType | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [animateCards, setAnimateCards] = useState(false);

  // Fetch user data from Xano
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userResponse, transactionsResponse, cardsResponse] = await Promise.all([
          authAPI.getMe(),
          transactionAPI.getAll().catch(() => []),
          cardAPI.getAll().catch(() => [])
        ]);
        
        setUserData(userResponse);
        setTransactions(transactionsResponse);
        setCards(cardsResponse);
        console.log('User data loaded:', userResponse);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
        // Trigger animations after data loads
        setTimeout(() => setAnimateCards(true), 100);
      }
    };

    fetchUserData();
  }, [toast]);

  // Get user's first and last name with fallbacks
  const firstName = userData?.firstName || 'User';
  const lastName = userData?.lastName || '';

  // Build profile data with proper fallbacks
  const profileData = {
    firstName,
    lastName,
    email: userData?.email || "user@email.com",
    phone: userData?.phone || "+234 801 234 5678",
    address: userData?.address || "Lagos, Nigeria",
    dateJoined: userData?.created_at ? new Date(userData.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "January 2024",
    accountNumber: userData?.accountNumber || "No account number",
    bank: "Bill Station Digital Hub",
    accountType: "Digital Wallet",
    bvn: "***********",
    balance: userData?.balance || 0,
    currency: "NGN"
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive"
      });
    }
  };

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(profileData.accountNumber);
    toast({
      title: "Copied!",
      description: "Account number copied to clipboard",
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const ProfileContent = () => (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <motion.div 
        className="flex items-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Profile
          </h1>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-6 w-6 text-blue-500" />
          </motion.div>
        </div>
      </motion.div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Enhanced Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Enhanced Profile Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-indigo-50/30 opacity-50"></div>
              <CardContent className="p-8 relative z-10">
                <div className="flex items-start gap-6">
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
                      <AvatarImage src={userData?.avatar} alt={`${firstName} ${lastName}`} />
                      <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        {getInitials(firstName, lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <motion.div 
                      className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <CheckCircle className="h-4 w-4 text-white" />
                    </motion.div>
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.div 
                      className="flex items-center justify-between mb-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{firstName} {lastName}</h2>
                        <p className="text-gray-600">{profileData.email}</p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={() => setActiveModal('personal-info')}
                          variant="outline"
                          className="border-2 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      </motion.div>
                    </motion.div>
                    
                    <motion.div 
                      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <p className="text-sm text-blue-600 font-semibold">Member Since</p>
                        <p className="text-lg font-bold text-blue-800">{profileData.dateJoined}</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                        <p className="text-sm text-green-600 font-semibold">Account Type</p>
                        <p className="text-lg font-bold text-green-800">{profileData.accountType}</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                        <p className="text-sm text-purple-600 font-semibold">Status</p>
                        <p className="text-lg font-bold text-purple-800">Active</p>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                        <p className="text-sm text-orange-600 font-semibold">Verification</p>
                        <p className="text-lg font-bold text-orange-800">Verified</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Account Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-50/30 to-blue-50/30 opacity-50"></div>
              <CardHeader className="pb-6 relative z-10">
                <CardTitle className="text-xl flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Shield className="h-5 w-5 text-blue-600" />
                  </motion.div>
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Account Number</p>
                          <p className="font-semibold text-gray-900">{profileData.accountNumber}</p>
                        </div>
                      </div>
                      <motion.button
                        onClick={copyAccountNumber}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Copy className="h-4 w-4 text-gray-500" />
                      </motion.button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Building className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Bank</p>
                          <p className="font-semibold text-gray-900">{profileData.bank}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <User className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">BVN</p>
                          <p className="font-semibold text-gray-900">{profileData.bvn}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Account Type</p>
                          <p className="font-semibold text-gray-900">{profileData.accountType}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Personal Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-50/30 to-pink-50/30 opacity-50"></div>
              <CardHeader className="pb-6 relative z-10">
                <CardTitle className="text-xl flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <User className="h-5 w-5 text-white" />
                  </motion.div>
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Mail className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-semibold text-gray-900">{profileData.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Phone className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-semibold text-gray-900">{profileData.phone}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <MapPin className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Address</p>
                          <p className="font-semibold text-gray-900">{profileData.address}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Joined</p>
                          <p className="font-semibold text-gray-900">{profileData.dateJoined}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Enhanced Sidebar */}
        <div className="lg:col-span-1 space-y-6 hidden lg:block">
          {/* Enhanced Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 lg:sticky lg:top-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-indigo-50/30 opacity-50"></div>
              <CardHeader className="pb-6 relative z-10">
                <CardTitle className="text-xl flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Settings className="h-5 w-5 text-blue-600" />
                  </motion.div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  {[
                    { icon: <User className="h-5 w-5" />, title: "Personal Info", action: () => setActiveModal('personal-info') },
                    { icon: <Settings className="h-5 w-5" />, title: "Account Settings", action: () => setActiveModal('account-settings') },
                    { icon: <Bell className="h-5 w-5" />, title: "Notifications", action: () => setActiveModal('notifications') },
                    { icon: <HelpCircle className="h-5 w-5" />, title: "Help & Support", action: () => setActiveModal('help-support') }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 cursor-pointer group"
                      onClick={item.action}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <div className="text-blue-600">
                            {item.icon}
                          </div>
                        </div>
                        <span className="font-semibold text-gray-900">{item.title}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Security Status */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-50/30 to-blue-50/30 opacity-50"></div>
              <CardHeader className="pb-6 relative z-10">
                <CardTitle className="text-xl flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Shield className="h-5 w-5 text-white" />
                  </motion.div>
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  {[
                    { icon: <CheckCircle className="h-5 w-5" />, title: "Email Verified", status: "Verified", color: "text-green-600", bgColor: "bg-green-100" },
                    { icon: <CheckCircle className="h-5 w-5" />, title: "Phone Verified", status: "Verified", color: "text-green-600", bgColor: "bg-green-100" },
                    { icon: <CheckCircle className="h-5 w-5" />, title: "BVN Verified", status: "Verified", color: "text-green-600", bgColor: "bg-green-100" },
                    { icon: <Lock className="h-5 w-5" />, title: "2FA Enabled", status: "Active", color: "text-blue-600", bgColor: "bg-blue-100" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 ${item.bgColor} rounded-lg flex items-center justify-center`}>
                          <div className={item.color}>
                            {item.icon}
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{item.title}</span>
                      </div>
                      <Badge variant="secondary" className={item.color}>
                        {item.status}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Logout Button */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full h-12 border-2 border-red-200 hover:border-red-500 hover:bg-red-50 text-red-600 hover:text-red-700 transition-all duration-300"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* New Premium Features Section */}
      <motion.div 
        className="hidden lg:block"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-500" />
          Account Features
        </h3>
        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: <Shield className="h-6 w-6" />, title: "Bank-Level Security", description: "256-bit encryption protection", color: "from-green-500 to-green-600" },
            { icon: <Zap className="h-6 w-6" />, title: "Instant Access", description: "24/7 account availability", color: "from-blue-500 to-blue-600" },
            { icon: <Globe className="h-6 w-6" />, title: "Global Support", description: "Worldwide customer assistance", color: "from-purple-500 to-purple-600" }
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

      {/* Enhanced Modals */}
      <AnimatePresence>
        {activeModal === 'personal-info' && (
          <PersonalInfoModal
            isOpen={activeModal === 'personal-info'}
            onClose={() => setActiveModal(null)}
            userData={userData}
          />
        )}
        {activeModal === 'account-settings' && (
          <AccountSettingsModal
            isOpen={activeModal === 'account-settings'}
            onClose={() => setActiveModal(null)}
          />
        )}
        {activeModal === 'notifications' && (
          <NotificationsModal
            isOpen={activeModal === 'notifications'}
            onClose={() => setActiveModal(null)}
          />
        )}
        {activeModal === 'help-support' && (
          <HelpSupportModal
            isOpen={activeModal === 'help-support'}
            onClose={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );

  if (loading) {
    return (
      <DesktopLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </DesktopLayout>
    );
  }

  return (
    <DesktopLayout>
      <ProfileContent />
    </DesktopLayout>
  );
};

export default Profile;
