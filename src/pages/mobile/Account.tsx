import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  User, 
  Settings, 
  Crown, 
  HelpCircle, 
  Shield, 
  FileText, 
  Bell,
  ChevronRight,
  CreditCard,
  Lock,
  Globe,
  MessageCircle,
  Star,
  Zap
} from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";

const Account = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const accountOptions = [
    {
      id: "profile",
      title: "Profile",
      description: "Manage your personal information and account details",
      icon: User,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      href: "/profile",
      badge: null
    },
    {
      id: "settings",
      title: "Settings",
      description: "Customize your account preferences and security settings",
      icon: Settings,
      color: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-600",
      href: "/settings",
      badge: null
    },
    {
      id: "upgrade-tier",
      title: "Upgrade Tier",
      description: "Unlock premium features and higher transaction limits",
      icon: Crown,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      href: "/upgrade-tier",
      badge: "Premium"
    },
    {
      id: "help-center",
      title: "Help Center",
      description: "Get support and find answers to common questions",
      icon: HelpCircle,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      href: "/help-center",
      badge: null
    },
    {
      id: "privacy",
      title: "Privacy",
      description: "Manage your privacy settings and data preferences",
      icon: Shield,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      href: "/privacy",
      badge: null
    },
    {
      id: "terms",
      title: "Terms & Conditions",
      description: "Read our terms of service and user agreement",
      icon: FileText,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
      href: "/terms",
      badge: null
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Manage your notification preferences and alerts",
      icon: Bell,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
      href: "/notifications",
      badge: "3"
    }
  ];

  const AccountContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Account</h1>
          <p className="text-sm text-gray-600">Manage your account settings and preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Account Options Grid */}
      <div className="grid grid-cols-1 gap-4">
        {accountOptions.map((option, index) => (
          <MobileCard
            key={option.id}
            className={`group cursor-pointer transition-all duration-500 ease-out hover:scale-102 active:scale-98 border-0 bg-white/90 backdrop-blur-sm ${
              selectedOption === option.id 
                ? 'ring-2 ring-blue-500 border-blue-500 shadow-lg scale-102' 
                : 'hover:border-gray-200/50'
            }`}
            style={{
              animationDelay: `${index * 30}ms`
            }}
            onClick={() => setSelectedOption(option.id)}
          >
            <div className="p-5 relative overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Icon with enhanced styling */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${option.bgColor} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <option.icon className={`h-6 w-6 ${option.iconColor} group-hover:rotate-12 transition-transform duration-300`} />
                </div>
                <div className="text-right">
                  {option.badge && (
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      option.badge === 'Premium' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {option.badge}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Content with better spacing */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 text-base group-hover:text-gray-800 transition-colors">{option.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{option.description}</p>
              </div>

              {/* Enhanced button */}
              <div className="mt-5 pt-3 border-t border-gray-100/50">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group-hover:bg-gray-50 group-hover:border-gray-300 transition-all duration-300 font-medium"
                  asChild
                >
                  <Link to={option.href} className="flex items-center justify-center gap-2">
                    Manage
                    <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            </div>
          </MobileCard>
        ))}
      </div>

      
    </div>
  );

  return (
    <MobileLayout>
      <AccountContent />
    </MobileLayout>
  );
};

export default Account; 