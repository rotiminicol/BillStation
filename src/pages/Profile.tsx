
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Building,
  Crown,
  AlertTriangle,
  Trash2,
  Camera,
  Upload,
  Download,
  Key,
  Fingerprint,
  Smartphone as PhoneIcon,
  Mail as MailIcon,
  Shield as ShieldIcon,
  EyeOff,
  Camera as CameraIcon,
  X,
  Plus,
  Minus,
  DollarSign,
  Users,
  FileText,
  Briefcase,
  Home,
  Heart,
  AlertCircle
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";
import PersonalInfoModal from "@/components/profile/PersonalInfoModal";
import AccountSettingsModal from "@/components/profile/AccountSettingsModal";
import NotificationsModal from "@/components/profile/NotificationsModal";
import HelpSupportModal from "@/components/profile/HelpSupportModal";
import { authAPI, transactionAPI, cardAPI } from "@/services/api";
import { User as UserType, Transaction, Card as CardType } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showBalance, setShowBalance] = useState(false);
  const [userData, setUserData] = useState<UserType | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileCompletion, setProfileCompletion] = useState(75);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showTierDialog, setShowTierDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states for dialogs
  const [pinForm, setPinForm] = useState({
    currentPin: '',
    newPin: '',
    confirmPin: '',
    showCurrentPin: false,
    showNewPin: false,
    showConfirmPin: false
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false
  });

  const [deleteForm, setDeleteForm] = useState({
    password: '',
    reason: '',
    feedback: ''
  });

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
    totalCards: cards.length,
    tier: userData?.tier || 'tier1',
    tierLimit: userData?.tierLimit || 50000,
    isVerified: userData?.isVerified || false
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

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      toast({
        title: "Profile Picture Updated",
        description: "Your profile picture has been updated successfully",
      });
    }
  };

  const handlePinChange = async () => {
    if (pinForm.newPin !== pinForm.confirmPin) {
      toast({
        title: "Error",
        description: "New PINs do not match",
        variant: "destructive"
      });
      return;
    }

    if (pinForm.newPin.length !== 4) {
      toast({
        title: "Error",
        description: "PIN must be exactly 4 digits",
        variant: "destructive"
      });
      return;
    }

    try {
      // API call to change PIN
      toast({
        title: "PIN Changed",
        description: "Your transaction PIN has been updated successfully",
      });
      setShowPinDialog(false);
      setPinForm({ currentPin: '', newPin: '', confirmPin: '', showCurrentPin: false, showNewPin: false, showConfirmPin: false });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change PIN",
        variant: "destructive"
      });
    }
  };

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive"
      });
      return;
    }

    try {
      // API call to change password
      toast({
        title: "Password Changed",
        description: "Your password has been updated successfully",
      });
      setShowPasswordDialog(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '', showCurrentPassword: false, showNewPassword: false, showConfirmPassword: false });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password",
        variant: "destructive"
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // API call to delete account
      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account",
        variant: "destructive"
      });
    }
  };

  const getTierInfo = (tier: string) => {
    switch (tier) {
      case 'tier1':
        return { name: 'Basic', limit: '₦50,000', color: 'bg-blue-100 text-blue-800', nextTier: 'tier2' };
      case 'tier2':
        return { name: 'Premium', limit: '₦500,000', color: 'bg-purple-100 text-purple-800', nextTier: 'tier3' };
      case 'tier3':
        return { name: 'VIP', limit: '₦5,000,000', color: 'bg-yellow-100 text-yellow-800', nextTier: null };
      default:
        return { name: 'Basic', limit: '₦50,000', color: 'bg-blue-100 text-blue-800', nextTier: 'tier2' };
    }
  };

  const tierInfo = getTierInfo(profileData.tier);

  const ProfileContent = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account and preferences</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={tierInfo.color}>
            <Crown className="h-3 w-3 mr-1" />
            {tierInfo.name}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
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
                    <div className="relative">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder.svg" alt={`${profileData.firstName} ${profileData.lastName}`} />
                        <AvatarFallback className="bg-[#0B63BC]/10 text-[#0B63BC] text-xl font-semibold">
                          {getInitials(profileData.firstName, profileData.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfilePictureUpload}
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {profileData.firstName} {profileData.lastName}
                      </h2>
                      <p className="text-gray-600">{profileData.email}</p>
                      <p className="text-sm text-gray-500">Member since {profileData.joinDate}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={profileData.isVerified ? "default" : "secondary"}>
                          {profileData.isVerified ? "Verified" : "Unverified"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Profile Completion */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                      <span className="text-sm text-gray-500">{profileCompletion}%</span>
                    </div>
                    <Progress value={profileCompletion} className="h-2" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-[#0B63BC]/10 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-[#0B63BC]" />
                        <span className="text-sm font-medium text-[#0B63BC]">Balance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold text-gray-900">
                          {showBalance ? `₦${profileData.balance.toLocaleString()}` : '₦****'}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowBalance(!showBalance)}
                          className="h-6 w-6 p-0"
                        >
                          {showBalance ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                      </div>
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

              {/* Tier Information */}
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Crown className="h-5 w-5 text-[#0B63BC]" />
                    Account Tier
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{tierInfo.name} Tier</h3>
                      <p className="text-sm text-gray-600">Transaction Limit: {tierInfo.limit}</p>
                      <p className="text-xs text-gray-500">Daily transfer limit</p>
                    </div>
                    {tierInfo.nextTier && (
                      <Button onClick={() => setShowTierDialog(true)}>
                        Upgrade Tier
                      </Button>
                    )}
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
        </TabsContent>

        <TabsContent value="personal" className="space-y-6">
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
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#0B63BC]" />
                Security Settings
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
                    onClick={() => setShowPasswordDialog(true)}
                  >
                    Change
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Key className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Transaction PIN</p>
                      <p className="text-sm text-gray-500">4-digit PIN for transactions</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPinDialog(true)}
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

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Fingerprint className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Biometric Login</p>
                      <p className="text-sm text-gray-500">Use fingerprint or face ID</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-0 shadow-lg bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-red-900 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-white">
                  <div className="flex items-center gap-3">
                    <Trash2 className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium text-red-900">Delete Account</p>
                      <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Settings className="h-5 w-5 text-[#0B63BC]" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Notifications */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Push Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications on your device</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">SMS Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                {/* Privacy */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Profile Visibility</p>
                        <p className="text-sm text-gray-500">Control who can see your profile</p>
                      </div>
                      <Select defaultValue="private">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="friends">Friends</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Data Sharing</p>
                        <p className="text-sm text-gray-500">Allow data sharing for analytics</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Language</p>
                        <p className="text-sm text-gray-500">Choose your preferred language</p>
                      </div>
                      <Select defaultValue="en">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Currency</p>
                        <p className="text-sm text-gray-500">Choose your preferred currency</p>
                      </div>
                      <Select defaultValue="NGN">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NGN">NGN</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Theme</p>
                        <p className="text-sm text-gray-500">Choose your preferred theme</p>
                      </div>
                      <Select defaultValue="light">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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

      {/* PIN Change Dialog */}
      <Dialog open={showPinDialog} onOpenChange={setShowPinDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Transaction PIN</DialogTitle>
            <DialogDescription>
              Enter your current PIN and choose a new 4-digit PIN for transactions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentPin">Current PIN</Label>
              <div className="relative">
                <Input
                  id="currentPin"
                  type={pinForm.showCurrentPin ? "text" : "password"}
                  value={pinForm.currentPin}
                  onChange={(e) => setPinForm({...pinForm, currentPin: e.target.value})}
                  maxLength={4}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setPinForm({...pinForm, showCurrentPin: !pinForm.showCurrentPin})}
                >
                  {pinForm.showCurrentPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="newPin">New PIN</Label>
              <div className="relative">
                <Input
                  id="newPin"
                  type={pinForm.showNewPin ? "text" : "password"}
                  value={pinForm.newPin}
                  onChange={(e) => setPinForm({...pinForm, newPin: e.target.value})}
                  maxLength={4}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setPinForm({...pinForm, showNewPin: !pinForm.showNewPin})}
                >
                  {pinForm.showNewPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirmPin">Confirm New PIN</Label>
              <div className="relative">
                <Input
                  id="confirmPin"
                  type={pinForm.showConfirmPin ? "text" : "password"}
                  value={pinForm.confirmPin}
                  onChange={(e) => setPinForm({...pinForm, confirmPin: e.target.value})}
                  maxLength={4}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setPinForm({...pinForm, showConfirmPin: !pinForm.showConfirmPin})}
                >
                  {pinForm.showConfirmPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPinDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handlePinChange}>
              Change PIN
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new password.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={passwordForm.showCurrentPassword ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setPasswordForm({...passwordForm, showCurrentPassword: !passwordForm.showCurrentPassword})}
                >
                  {passwordForm.showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={passwordForm.showNewPassword ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setPasswordForm({...passwordForm, showNewPassword: !passwordForm.showNewPassword})}
                >
                  {passwordForm.showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={passwordForm.showConfirmPassword ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setPasswordForm({...passwordForm, showConfirmPassword: !passwordForm.showConfirmPassword})}
                >
                  {passwordForm.showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handlePasswordChange}>
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete Account</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="deletePassword">Enter your password to confirm</Label>
              <Input
                id="deletePassword"
                type="password"
                value={deleteForm.password}
                onChange={(e) => setDeleteForm({...deleteForm, password: e.target.value})}
                placeholder="Enter your password"
              />
            </div>
            <div>
              <Label htmlFor="deleteReason">Reason for deletion (optional)</Label>
              <Select value={deleteForm.reason} onValueChange={(value) => setDeleteForm({...deleteForm, reason: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="privacy">Privacy concerns</SelectItem>
                  <SelectItem value="not-using">Not using the service</SelectItem>
                  <SelectItem value="switching">Switching to another service</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="deleteFeedback">Additional feedback (optional)</Label>
              <Input
                id="deleteFeedback"
                value={deleteForm.feedback}
                onChange={(e) => setDeleteForm({...deleteForm, feedback: e.target.value})}
                placeholder="Help us improve our service"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tier Upgrade Dialog */}
      <Dialog open={showTierDialog} onOpenChange={setShowTierDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade Your Tier</DialogTitle>
            <DialogDescription>
              Unlock higher transaction limits and premium features.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-blue-900">Premium Tier</h3>
                    <Badge className="bg-blue-600">Recommended</Badge>
                  </div>
                  <p className="text-sm text-blue-700 mb-2">₦500,000 daily limit</p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>• Higher transaction limits</li>
                    <li>• Priority customer support</li>
                    <li>• Advanced security features</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTierDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast({
                title: "Tier Upgrade",
                description: "Your tier upgrade request has been submitted",
              });
              setShowTierDialog(false);
            }}>
              Upgrade to Premium
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
