import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Send, 
  Smartphone, 
  CreditCard, 
  User, 
  Menu,
  X,
  LogOut,
  Sparkles,
  Activity,
  Shield,
  TrendingUp,
  RefreshCw,
  Plane,
  Bitcoin,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface DesktopLayoutProps {
  children: ReactNode;
}

const DesktopLayout = ({ children }: DesktopLayoutProps) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [animateSidebar, setAnimateSidebar] = useState(false);

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
      {/* Mobile Header with Enhanced Design */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Bill Station Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="ml-2 font-bold text-gray-900">Bill Station</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-gray-100 rounded-full p-2 transition-all duration-300 hover:scale-110"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay with Enhanced Design */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300">
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <img 
                    src="/logo.png" 
                    alt="Bill Station Logo" 
                    className="w-8 h-8 object-contain"
                  />
                  <span className="ml-2 font-bold text-gray-900">Bill Station</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="hover:bg-gray-100 rounded-full p-2 transition-all duration-300 hover:scale-110"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <nav className="space-y-2 flex-1">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center px-4 py-4 rounded-2xl transition-all duration-300 hover:shadow-lg ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3 ${
                        isActive ? "bg-white/20" : "bg-gray-100"
                      }`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="font-semibold">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-6 border-t border-gray-200">
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start text-red-600 hover:bg-red-50 rounded-2xl py-4"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  <span className="font-semibold">Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Layout with Enhanced Design */}
      <div className="hidden lg:flex">
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

      {/* Mobile Content with Enhanced Design */}
      <div className="lg:hidden">
        <div className={`transition-all duration-1000 delay-400 ${animateSidebar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DesktopLayout; 