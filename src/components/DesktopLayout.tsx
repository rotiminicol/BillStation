import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Send, 
  Smartphone, 
  CreditCard, 
  User, 
  LogOut,
  RefreshCw,
  Plane,
  Bitcoin,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Navigation from "@/components/Navigation";

interface DesktopLayoutProps {
  children: ReactNode;
}

const DesktopLayout = ({ children }: DesktopLayoutProps) => {
  const location = useLocation();
  const [animateSidebar, setAnimateSidebar] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Trigger sidebar animations after component mounts
    setTimeout(() => setAnimateSidebar(true), 100);
  }, []);

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", gradient: "from-blue-500 to-blue-600" },
    { icon: Send, label: "Send Money", href: "/transfer", gradient: "from-green-500 to-green-600" },
    { icon: Smartphone, label: "Bill Payments", href: "/bills", gradient: "from-orange-500 to-orange-600" },
    { icon: RefreshCw, label: "Airtime Swap", href: "/airtime-swap", gradient: "from-teal-500 to-teal-600" },
    { icon: Plane, label: "Flight Booking", href: "/flight-booking", gradient: "from-purple-500 to-purple-600" },
    { icon: Bitcoin, label: "Bitcoin Trading", href: "/bitcoin-trading", gradient: "from-orange-500 to-orange-600" },
    { icon: CreditCard, label: "Gift Cards", href: "/cards", gradient: "from-pink-500 to-pink-600" },
    { icon: DollarSign, label: "Virtual Card", href: "/virtual-card", gradient: "from-indigo-500 to-indigo-600" },
    { icon: User, label: "Profile", href: "/profile", gradient: "from-gray-500 to-gray-600" },
  ];

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logout clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Desktop Layout with Enhanced Design */}
      {!isMobile && (
        <div className="flex">
          {/* Desktop Sidebar with Premium Design */}
          <div className={`w-72 bg-white border-r border-gray-200 min-h-screen shadow-2xl transition-all duration-1000 ${animateSidebar ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="p-8 h-full flex flex-col">
              {/* Logo Section with Animation */}
              <div className="flex items-center mb-12">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <img 
                    src="/logo.png" 
                    alt="Bill Station Logo" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-900">Bill Station</h1>
                  <p className="text-sm text-gray-500">Digital Hub</p>
                </div>
              </div>
              {/* Navigation with Enhanced Design */}
              <nav className="space-y-3 flex-1">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex items-center px-6 py-4 rounded-2xl transition-all duration-300 hover:shadow-lg group ${
                        isActive
                          ? `bg-gradient-to-r ${item.gradient} text-white shadow-xl`
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 transition-all duration-300 ${
                        isActive ? "bg-white/20 shadow-lg" : "bg-gray-100 group-hover:bg-gray-200"
                      }`}>
                        <item.icon className="h-6 w-6" />
                      </div>
                      <span className="font-semibold text-lg">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              {/* Logout Section */}
              <div className="pt-8 border-t border-gray-200">
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start text-red-600 hover:bg-red-50 rounded-2xl py-4 transition-all duration-300 hover:shadow-lg"
                >
                  <LogOut className="h-6 w-6 mr-4" />
                  <span className="font-semibold text-lg">Logout</span>
                </Button>
              </div>
            </div>
          </div>
          {/* Main Content with Enhanced Design */}
          <div className="flex-1 min-h-screen">
            <div className="p-8">
              <div className={`transition-all duration-1000 delay-200 ${animateSidebar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}> 
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Mobile Content with Enhanced Design - Only Bottom Nav, No Sidebar/Header */}
      {isMobile && (
        <div className="min-h-screen pb-24">
          <div className={`transition-all duration-1000 delay-400 ${animateSidebar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}> 
            {children}
          </div>
          <Navigation />
        </div>
      )}
    </div>
  );
};

export default DesktopLayout; 