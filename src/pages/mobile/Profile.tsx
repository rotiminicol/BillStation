import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  Settings, 
  Shield, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ArrowRight, 
  CheckCircle,
  Camera,
  Edit,
  Crown,
  Lock,
  Key,
  Fingerprint,
  AlertTriangle,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  TrendingUp,
  Activity,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  AlertCircle,
  Camera as CameraIcon,
  Upload,
  Download,
  Smartphone,
  Globe,
  Zap
} from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  memberSince: string;
  lastLogin: string;
  totalTransactions: number;
  accountStatus: 'verified' | 'pending' | 'unverified';
  balance: number;
  tier: 'tier1' | 'tier2' | 'tier3';
  tierLimit: number;
  accountNumber: string;
  address: string;
  profileCompletion: number;
}

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [showBalance, setShowBalance] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showTierDialog, setShowTierDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const profileMenuItems = [
    { 
      icon: User, 
      label: "Personal Information", 
      href: "/profile/personal",
      description: "Manage your personal details"
    },
    { 
      icon: Settings, 
      label: "Account Settings", 
      href: "/profile/settings",
      description: "Customize your preferences"
    },
    { 
      icon: Shield, 
      label: "Security & Privacy", 
      href: "/profile/security",
      description: "Manage security settings"
    },
    { 
      icon: Bell, 
      label: "Notifications", 
      href: "/profile/notifications",
      description: "Control your notifications"
    },
    { 
      icon: HelpCircle, 
      label: "Help & Support", 
      href: "/profile/help",
      description: "Get help and support"
    },
  ];

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock profile data - this will be replaced with real API call
        const mockProfileData: ProfileData = {
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+234 801 234 5678",
          avatar: "/logo.png",
          memberSince: "January 2023",
          lastLogin: "2 hours ago",
          totalTransactions: 156,
          accountStatus: "verified",
          balance: 250000,
          tier: "tier1",
          tierLimit: 50000,
          accountNumber: "1234567890",
          address: "Lagos, Nigeria",
          profileCompletion: 75
        };
        
        setProfileData(mockProfileData);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [toast]);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: "Please try again",
        variant: "destructive"
      });
    }
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

  const copyAccountNumber = () => {
    if (profileData) {
      navigator.clipboard.writeText(profileData.accountNumber);
      toast({
        title: "Copied!",
        description: "Account number copied to clipboard",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'unverified':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center h-full">
          <Loader text="Loading profile..." />
        </div>
      </MobileLayout>
    );
  }

  if (!profileData) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Failed to load profile data</p>
          </div>
        </div>
      </MobileLayout>
    );
  }

  const tierInfo = getTierInfo(profileData.tier);

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your account and preferences
            </p>
          </div>

          {/* Profile Card */}
          <MobileCard className="bg-gradient-to-r from-gray-600 to-gray-800 text-white p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <Avatar className="w-16 h-16">
                  <AvatarImage 
                    src={profileData.avatar} 
                    alt={profileData.name}
                  />
                  <AvatarFallback className="bg-white/20 text-white text-xl font-semibold">
                    {profileData.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full p-0 bg-white"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="h-3 w-3" />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePictureUpload}
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{profileData.name}</h2>
                <p className="text-sm text-gray-300">{profileData.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(profileData.accountStatus)}`}>
                    {profileData.accountStatus.charAt(0).toUpperCase() + profileData.accountStatus.slice(1)}
                  </span>
                  <Badge className={tierInfo.color}>
                    <Crown className="h-3 w-3 mr-1" />
                    {tierInfo.name}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
              <div>
                <p className="text-xs text-gray-300">Member Since</p>
                <p className="text-sm font-medium">{profileData.memberSince}</p>
              </div>
              <div>
                <p className="text-xs text-gray-300">Last Login</p>
                <p className="text-sm font-medium">{profileData.lastLogin}</p>
              </div>
            </div>
          </MobileCard>
        </div>

        {/* Profile Completion */}
        <MobileCard>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Profile Completion</span>
              <span className="text-sm text-gray-500">{profileData.profileCompletion}%</span>
            </div>
            <Progress value={profileData.profileCompletion} className="h-2" />
          </div>
        </MobileCard>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <MobileCard className="text-center p-4">
            <div className="w-12 h-12 bg-[#0B63BC]/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="h-6 w-6 text-[#0B63BC]" />
            </div>
            <div className="flex items-center justify-center gap-1">
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
            <p className="text-xs text-gray-500">Balance</p>
          </MobileCard>
          
          <MobileCard className="text-center p-4">
            <div className="w-12 h-12 bg-[#0B63BC]/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Activity className="h-6 w-6 text-[#0B63BC]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{profileData.totalTransactions}</p>
            <p className="text-xs text-gray-500">Transactions</p>
          </MobileCard>
        </div>

        {/* Account Details */}
        <MobileCard>
          <div className="p-4 space-y-3">
            <h3 className="font-semibold text-gray-900">Account Details</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Account Number</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-medium">{profileData.accountNumber}</span>
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
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Daily Limit</span>
                <span className="text-sm font-medium">{tierInfo.limit}</span>
              </div>
            </div>
          </div>
        </MobileCard>

        {/* Profile Menu */}
        <div className="space-y-3">
          {profileMenuItems.map((item) => (
            <Link key={item.href} to={item.href}>
              <MobileCard className="hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#0B63BC]/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-[#0B63BC]" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">{item.label}</span>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </MobileCard>
            </Link>
          ))}
        </div>

        {/* Security Quick Actions */}
        <MobileCard>
          <div className="p-4 space-y-3">
            <h3 className="font-semibold text-gray-900">Security</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => setShowPasswordDialog(true)}
              >
                <Lock className="h-4 w-4 mr-2" />
                Change Password
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => setShowPinDialog(true)}
              >
                <Key className="h-4 w-4 mr-2" />
                Change Transaction PIN
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <Fingerprint className="h-4 w-4 mr-2" />
                Biometric Settings
              </Button>
            </div>
          </div>
        </MobileCard>

        {/* Tier Upgrade */}
        {tierInfo.nextTier && (
          <MobileCard className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-blue-900">Upgrade to Premium</h3>
                  <p className="text-sm text-blue-700">Unlock higher limits and features</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => setShowTierDialog(true)}
                >
                  Upgrade
                </Button>
              </div>
            </div>
          </MobileCard>
        )}

        {/* Logout Section */}
        <MobileCard>
          <div className="p-4">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </MobileCard>

        {/* Danger Zone */}
        <MobileCard className="border-red-200 bg-red-50">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium text-red-900">Delete Account</p>
                  <p className="text-sm text-red-600">Permanently delete your account</p>
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
        </MobileCard>

        {/* App Version */}
        <div className="text-center">
          <p className="text-xs text-gray-400">Bill Station v1.0.0</p>
        </div>

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
                <div className="p-4 border-2 border-blue-200 bg-blue-50 rounded-lg">
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
                </div>
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
    </MobileLayout>
  );
};

export default Profile;
