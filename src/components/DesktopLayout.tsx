import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  Building2, 
  CreditCard, 
  ArrowUpDown, 
  FileText,
  ChevronDown,
  ArrowRight,
  Send,
  Smartphone,
  RefreshCw,
  Plane,
  Bitcoin,
  DollarSign,
  Gift,
  Car,
  User,
  LogOut,
  Ticket,
  Store,
  Crown,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/use-auth";

interface DesktopLayoutProps {
  children: ReactNode;
}

const DesktopLayout = ({ children }: DesktopLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [animateSidebar, setAnimateSidebar] = useState(false);
  const { user } = useAuth();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Trigger sidebar animations after component mounts
    setTimeout(() => setAnimateSidebar(true), 100);
  }, []);

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    // Navigate to login page
    navigate('/login');
  };

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Zap, label: "Payments", href: "/payment" },
    { icon: CreditCard, label: "Cards", href: "/card" },
    { icon: Store, label: "Our Station", href: "/our-station" },
    { icon: ArrowUpDown, label: "Transactions", href: "/transactions" },
    { icon: User, label: "Account", href: "/account" },
  ];

  const getTierInfo = () => {
    const currentTier = user?.tier || 'tier1';
    const tierLimits = {
      tier1: { limit: 50000, name: 'Tier 1', color: 'bg-gray-100 text-gray-700' },
      tier2: { limit: 100000, name: 'Tier 2', color: 'bg-blue-100 text-blue-700' },
      tier3: { limit: 500000, name: 'Tier 3', color: 'bg-purple-100 text-purple-700' }
    };
    return tierLimits[currentTier as keyof typeof tierLimits];
  };

  const tierInfo = getTierInfo();

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      {!isMobile && (
        <div className="flex">
          {/* Enhanced Sidebar */}
          <div className={`w-64 bg-white border-r border-gray-100 h-screen ${animateSidebar ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'} transition-all duration-500 flex flex-col sticky top-0`}>
            {/* Logo Section - Fixed */}
            <div className="p-6 flex-shrink-0">
              <div className="flex items-center mb-8">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src="/logo.png" 
                    alt="Bill Station Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="ml-3">
                  <h1 className="text-lg font-bold text-gray-900">BILL STATION</h1>
                  <p className="text-xs text-gray-500">Financial Services</p>
                </div>
              </div>
            </div>

            {/* Navigation - Scrollable */}
            <nav className="flex-1 overflow-y-auto px-6 hide-scrollbar">
              <div className="space-y-6">
                {/* Navigation Items */}
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-[#0B63BC]/10 to-[#0B63BC]/20 text-[#0B63BC] border border-[#0B63BC]/30 shadow-sm"
                            : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-[#0B63BC]/10 hover:text-[#0B63BC] hover:border hover:border-[#0B63BC]/20"
                        }`}
                      >
                        <div className={`p-2 rounded-lg mr-3 ${
                          isActive 
                            ? "bg-[#0B63BC] text-white" 
                            : "bg-[#0B63BC]/10 text-[#0B63BC]"
                        }`}>
                          <item.icon className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </nav>

            {/* Bottom Section - Fixed */}
            <div className="p-6 flex-shrink-0 border-t border-gray-100">
              <div className="space-y-3">
                {/* Tier Status */}
                <Link to="/upgrade-tier">
                  <div className={`flex items-center justify-between px-4 py-3 rounded-xl ${tierInfo.color} hover:opacity-80 transition-all duration-200 cursor-pointer`}>
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg mr-3 bg-white/20">
                        <Crown className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-medium text-sm">{tierInfo.name}</span>
                        <p className="text-xs opacity-70">₦{tierInfo.limit.toLocaleString()} limit</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 rounded-xl text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:border hover:border-red-200 transition-all duration-200"
                >
                  <div className="p-2 rounded-lg mr-3 bg-red-100 text-red-600">
                    <LogOut className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-gray-50 h-screen overflow-y-auto">
            <div className="p-8 min-h-full">
              <div className={`transition-all duration-500 delay-200 ${animateSidebar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}> 
                {children}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Content */}
      {isMobile && (
        <div className="min-h-screen pb-24">
          <div className={`transition-all duration-500 delay-400 ${animateSidebar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}> 
            {children}
          </div>
          <Navigation />
        </div>
      )}
    </div>
  );
};

export default DesktopLayout; 