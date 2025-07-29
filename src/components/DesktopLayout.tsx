import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Building2, 
  CreditCard, 
  ArrowUpDown, 
  CreditCard as CardsIcon,
  FileText,
  Users,
  ChevronDown,
  ArrowRight
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
    { icon: Home, label: "Home", href: "/dashboard" },
    { icon: Building2, label: "Accounts", href: "/accounts" },
    { icon: CreditCard, label: "Payments", href: "/payments" },
    { icon: ArrowUpDown, label: "Transactions", href: "/transactions" },
    { icon: CardsIcon, label: "Cards", href: "/cards" },
    { icon: FileText, label: "Reports & Statements", href: "/reports" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      {!isMobile && (
        <div className="flex">
          {/* Clean White Sidebar */}
          <div className={`w-64 bg-white border-r border-gray-100 min-h-screen ${animateSidebar ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'} transition-all duration-500`}>
            <div className="p-6 h-full flex flex-col">
              {/* Logo Section */}
              <div className="flex items-center mb-8">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">BS</span>
                </div>
                <div className="ml-3">
                  <h1 className="text-lg font-bold text-gray-900">BILL STATION</h1>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2 flex-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Community Section */}
              <div className="pt-6 border-t border-gray-100">
                <Link
                  to="/community"
                  className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
                >
                  <Users className="h-5 w-5 mr-3" />
                  <span className="font-medium">Community</span>
                </Link>
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