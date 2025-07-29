import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Settings, Shield, Bell, HelpCircle, LogOut, ArrowRight, CheckCircle } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  memberSince: string;
  lastLogin: string;
  totalTransactions: number;
  accountStatus: 'verified' | 'pending' | 'unverified';
}

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const profileMenuItems = [
    { icon: User, label: "Personal Information", href: "/profile/personal" },
    { icon: Settings, label: "Account Settings", href: "/profile/settings" },
    { icon: Shield, label: "Security & Privacy", href: "/profile/security" },
    { icon: Bell, label: "Notifications", href: "/profile/notifications" },
    { icon: HelpCircle, label: "Help & Support", href: "/profile/help" },
  ];

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock profile data
        const mockProfileData: ProfileData = {
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+234 801 234 5678",
          avatar: "/logo.png",
          memberSince: "January 2023",
          lastLogin: "2 hours ago",
          totalTransactions: 156,
          accountStatus: "verified"
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

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center h-full">
          <Loader text="Loading profile..." />
        </div>
      </MobileLayout>
    );
  }

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
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{profileData?.name}</h2>
                <p className="text-sm text-gray-300">{profileData?.email}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(profileData?.accountStatus || 'pending')}`}>
                  {profileData?.accountStatus?.charAt(0).toUpperCase() + profileData?.accountStatus?.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
              <div>
                <p className="text-xs text-gray-300">Member Since</p>
                <p className="text-sm font-medium">{profileData?.memberSince}</p>
              </div>
              <div>
                <p className="text-xs text-gray-300">Last Login</p>
                <p className="text-sm font-medium">{profileData?.lastLogin}</p>
              </div>
            </div>
          </MobileCard>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <MobileCard className="text-center p-4">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
              <ArrowRight className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{profileData?.totalTransactions}</p>
            <p className="text-xs text-gray-500">Total Transactions</p>
          </MobileCard>
          
          <MobileCard className="text-center p-4">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">98%</p>
            <p className="text-xs text-gray-500">Success Rate</p>
          </MobileCard>
        </div>

        {/* Profile Menu */}
        <div className="space-y-3">
          {profileMenuItems.map((item) => (
            <Link key={item.href} to={item.href}>
              <MobileCard className="hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-blue-600" />
                  </div>
                    <span className="font-medium text-gray-900">{item.label}</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </MobileCard>
            </Link>
          ))}
        </div>

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

        {/* App Version */}
        <div className="text-center">
          <p className="text-xs text-gray-400">Bill Station v1.0.0</p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Profile;
