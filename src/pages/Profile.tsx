
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
    address: "Lagos, Nigeria",
    joinDate: "January 2024",
    dateJoined: "January 2024",
    accountNumber: "1234567890",
    balance: 250000,
    totalTransactions: transactions.length,
    totalCards: cards.length
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.clear();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to logout",
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account and preferences</p>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Overview */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5 text-[#0B63BC]" />
                Profile Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 mb-6">
                                 <Avatar className="h-20 w-20">
                   <AvatarImage src="/placeholder.svg" alt={`${profileData.firstName} ${profileData.lastName}`} />
                   <AvatarFallback className="bg-[#0B63BC]/10 text-[#0B63BC] text-xl font-semibold">
                     {getInitials(profileData.firstName, profileData.lastName)}
                   </AvatarFallback>
                 </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profileData.firstName} {profileData.lastName}
                  </h2>
                  <p className="text-gray-600">{profileData.email}</p>
                  <p className="text-sm text-gray-500">Member since {profileData.joinDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#0B63BC]/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-[#0B63BC]" />
                    <span className="text-sm font-medium text-[#0B63BC]">Balance</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    ₦{profileData.balance.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Transactions</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{profileData.totalTransactions}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-600">Cards</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{profileData.totalCards}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5 text-[#0B63BC]" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{profileData.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveModal('personal-info')}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{profileData.phone}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveModal('personal-info')}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium text-gray-900">{profileData.address}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveModal('personal-info')}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Security */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#0B63BC]" />
                Account Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Password</p>
                      <p className="text-sm text-gray-500">Last changed 30 days ago</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveModal('account-settings')}
                  >
                    Change
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveModal('account-settings')}
                  >
                    Enable
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => setActiveModal('notifications')}
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => setActiveModal('help-support')}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Help & Support
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => setActiveModal('account-settings')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </CardContent>
          </Card>

          {/* Account Details */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">Account Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Account Number</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono font-medium text-gray-900">{profileData.accountNumber}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyAccountNumber}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Member Since</p>
                  <p className="font-medium text-gray-900">{profileData.joinDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logout */}
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="pt-6">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'personal-info' && (
        <PersonalInfoModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          profileData={profileData}
        />
      )}
      {activeModal === 'account-settings' && (
        <AccountSettingsModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'notifications' && (
        <NotificationsModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'help-support' && (
        <HelpSupportModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );

  if (loading) {
    return (
      <DesktopLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
                            <div className="w-8 h-8 border-2 border-[#0B63BC] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
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
