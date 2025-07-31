
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
  Ticket
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
    { icon: Send, label: "Transfer", href: "/transfer" },
    { icon: Smartphone, label: "Bills", href: "/bills" },
    { icon: CreditCard, label: "Cards", href: "/cards" },
    { icon: Menu, label: "Menu", href: "#", action: () => setShowMenu(true) },
  ];

  const mainItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", color: "from-blue-500 to-blue-600" },
    { icon: Send, label: "Transfer", href: "/transfer", color: "from-green-500 to-green-600" },
    { icon: Smartphone, label: "Bills", href: "/bills", color: "from-purple-500 to-purple-600" },
    { icon: CreditCard, label: "Cards", href: "/cards", color: "from-indigo-500 to-indigo-600" },
    { icon: ArrowUpDown, label: "Transactions", href: "/transactions", color: "from-cyan-500 to-cyan-600" },
  ];

  const serviceItems = [
    { icon: RefreshCw, label: "Airtime Swap", href: "/airtime-swap", color: "from-teal-500 to-teal-600" },
    { icon: Plane, label: "Flight Booking", href: "/flight-booking", color: "from-purple-500 to-purple-600" },
    { icon: Plane, label: "Book Private Jet", href: "/flight-book-private-jet", color: "from-purple-500 to-purple-600" },
    { icon: Bitcoin, label: "Bitcoin Trading", href: "/bitcoin-trading", color: "from-orange-500 to-orange-600" },
    { icon: DollarSign, label: "Convert Asset", href: "/convert-asset", color: "from-orange-500 to-orange-600" },
    { icon: DollarSign, label: "Virtual Card", href: "/virtual-card", color: "from-indigo-500 to-indigo-600" },
    { icon: Gift, label: "Gift Cards", href: "/gift-card", color: "from-pink-500 to-pink-600" },
    { icon: Ticket, label: "Buy Tickets", href: "/buy-tickets", color: "from-pink-500 to-pink-600" },
    { icon: Building2, label: "Hotel Booking", href: "/hotel-booking", color: "from-blue-500 to-blue-600" },
    { icon: Car, label: "Chauffeur Service", href: "/chauffeur-service", color: "from-green-500 to-green-600" },
    { icon: Car, label: "Book Ride", href: "/book-ride", color: "from-green-500 to-green-600" },
  ];

  const accountItems = [
    { icon: User, label: "Profile", href: "/profile", color: "from-gray-500 to-gray-600" },
    { icon: Settings, label: "Settings", href: "/settings", color: "from-slate-500 to-slate-600" },
    { icon: HelpCircle, label: "Help & Support", href: "/help", color: "from-amber-500 to-amber-600" },
    { icon: Users, label: "Onboarding", href: "/onboarding", color: "from-emerald-500 to-emerald-600" },
  ];

  const renderServiceCards = (items: typeof serviceItems, title: string) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, index) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={() => setShowMenu(false)}
            className="block"
          >
            <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer group h-32">
              <CardContent className="p-5 text-center h-full flex flex-col justify-center">
                <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">{item.label}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );

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
              {renderServiceCards(serviceItems, "Services")}
              
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
