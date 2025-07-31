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
  Ticket
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
  const navigate = useNavigate();
  const [animateSidebar, setAnimateSidebar] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    main: true,
    services: true,
    account: true
  });
  const isMobile = useIsMobile();

  useEffect(() => {
    // Trigger sidebar animations after component mounts
    setTimeout(() => setAnimateSidebar(true), 100);
  }, []);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    // Navigate to login page
    navigate('/login');
  };

  const mainNavItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Send, label: "Transfer", href: "/transfer" },
    { icon: Smartphone, label: "Bills", href: "/bills" },
    { icon: CreditCard, label: "Cards", href: "/cards" },
    { icon: ArrowUpDown, label: "Transactions", href: "/transactions" },
  ];

  const serviceItems = [
    { icon: RefreshCw, label: "Airtime Swap", href: "/airtime-swap" },
    { icon: Plane, label: "Flight Booking", href: "/flight-booking" },
    { icon: Plane, label: "Book Private Jet", href: "/flight-book-private-jet" },
    { icon: Bitcoin, label: "Bitcoin Trading", href: "/bitcoin-trading" },
    { icon: DollarSign, label: "Convert Asset", href: "/convert-asset" },
    { icon: DollarSign, label: "Virtual Card", href: "/virtual-card" },
    { icon: Gift, label: "Gift Cards", href: "/gift-card" },
    { icon: Ticket, label: "Buy Tickets", href: "/buy-tickets" },
    { icon: Building2, label: "Hotel Booking", href: "/hotel-booking" },
    { icon: Car, label: "Chauffeur Service", href: "/chauffeur-service" },
    { icon: Car, label: "Book Ride", href: "/book-ride" },
  ];

  const accountItems = [
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      {!isMobile && (
        <div className="flex">
          {/* Enhanced Sidebar */}
          <div className={`w-64 bg-white border-r border-gray-100 min-h-screen ${animateSidebar ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'} transition-all duration-500 flex flex-col`}>
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
            <nav className="flex-1 overflow-y-auto px-6">
              <div className="space-y-6">
                {/* Main Navigation */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Main</h3>
                    <button
                      onClick={() => toggleSection('main')}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${expandedSections.main ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  {expandedSections.main && (
                    <div className="space-y-2">
                      {mainNavItems.map((item) => {
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
                  )}
                </div>

                {/* Services */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Services</h3>
                    <button
                      onClick={() => toggleSection('services')}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${expandedSections.services ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  {expandedSections.services && (
                    <div className="space-y-2">
                      {serviceItems.map((item) => {
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
                  )}
                </div>

                {/* Account */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Account</h3>
                    <button
                      onClick={() => toggleSection('account')}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${expandedSections.account ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  {expandedSections.account && (
                    <div className="space-y-2">
                      {accountItems.map((item) => {
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
                  )}
                </div>
              </div>
            </nav>

            {/* Bottom Section - Fixed */}
            <div className="p-6 flex-shrink-0 border-t border-gray-100">
              <div className="space-y-2">
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
          <div className="flex-1 min-h-screen bg-gray-50">
            <div className="p-8">
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