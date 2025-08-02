
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Send, 
  Smartphone, 
  CreditCard, 
  Menu, 
  RefreshCw, 
  Plane, 
  Bitcoin, 
  DollarSign, 
  X, 
  Building2, 
  Car, 
  Gift, 
  User,
  ArrowUpDown,
  Settings,
  HelpCircle,
  LogOut,
  Users,
  Ticket,
  Store
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Navigation = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const navItems = [
    { icon: Home, label: "Home", href: "/dashboard" },
          { icon: CreditCard, label: "Payments", href: "/payment" },
      { icon: CreditCard, label: "Cards", href: "/card" },
      { icon: Store, label: "Station", href: "/our-station" },
      { icon: ArrowUpDown, label: "Transactions", href: "/transactions" },
      { icon: User, label: "Account", href: "/account" },
      { icon: Menu, label: "Menu", href: "#", action: () => setShowMenu(true) },
  ];

  const mainItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", color: "from-blue-500 to-blue-600" },
    { icon: CreditCard, label: "Payments", href: "/payment", color: "from-green-500 to-green-600" },
    { icon: CreditCard, label: "Cards", href: "/card", color: "from-indigo-500 to-indigo-600" },
    { icon: Store, label: "Our Station", href: "/our-station", color: "from-purple-500 to-purple-600" },
    { icon: ArrowUpDown, label: "Transactions", href: "/transactions", color: "from-cyan-500 to-cyan-600" },
  ];



  const accountItems = [
    { icon: Settings, label: "Settings", href: "/settings", color: "from-slate-500 to-slate-600" },
    { icon: HelpCircle, label: "Help & Support", href: "/help", color: "from-amber-500 to-amber-600" },
    { icon: Users, label: "Onboarding", href: "/onboarding", color: "from-emerald-500 to-emerald-600" },
  ];


    

  return (
    <>
      {/* Classic Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            if (item.action) {
              return (
                <button
                  key={item.href}
                  onClick={item.action}
                  className={cn(
                    "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-[60px]",
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  )}
                >
                  <item.icon className="h-6 w-6 mb-1" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            } else {
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-[60px]",
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  )}
                >
                  <item.icon className="h-6 w-6 mb-1" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      </nav>

      {/* Enhanced Mobile Menu Overlay */}
      {showMenu && (
        <div className="lg:hidden fixed inset-0 bg-black/60 z-[10000] flex items-end">
          <div className="bg-white rounded-t-3xl w-full max-h-[85vh] overflow-hidden">
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-60px)]">
              {/* Header with Logo */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden mr-3">
                    <img 
                      src="/logo.png" 
                      alt="Bill Station Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Bill Station</h2>
                    <p className="text-xs text-gray-500">Financial Services</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMenu(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Main Navigation */}
              {renderServiceCards(mainItems, "Main Navigation")}
              
              {/* Services */}

              
              {/* Account */}
              {renderServiceCards(accountItems, "Account")}

              {/* Logout Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="w-full flex items-center justify-center py-3 px-4 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors">
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
