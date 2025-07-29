
import { Link, useLocation } from "react-router-dom";
import { Home, Send, Smartphone, CreditCard, Menu, RefreshCw, Plane, Bitcoin, DollarSign, X, Building2, Car, Gift, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Navigation = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const navItems = [
    { icon: Home, label: "Home", href: "/dashboard" },
    { icon: Send, label: "Payment", href: "/transfer" },
    { icon: Smartphone, label: "Bills", href: "/bills" },
    { icon: CreditCard, label: "Cards", href: "/cards" },
    { icon: Menu, label: "Menu", href: "#", action: () => setShowMenu(true) },
  ];

  const menuItems = [
    { icon: RefreshCw, label: "Airtime Swap", href: "/airtime-swap", color: "from-teal-500 to-teal-600" },
    { icon: Plane, label: "Flight Booking", href: "/flight-book", color: "from-purple-500 to-purple-600" },
    { icon: Bitcoin, label: "Crypto Trading", href: "/bitcoin-trading", color: "from-orange-500 to-orange-600" },
    { icon: DollarSign, label: "Virtual Card", href: "/virtual-card", color: "from-indigo-500 to-indigo-600" },
    { icon: Gift, label: "Gift Cards", href: "/gift-card", color: "from-pink-500 to-pink-600" },
    { icon: Building2, label: "Hotel & Shortlet", href: "/hotel-booking", color: "from-blue-500 to-blue-600" },
    { icon: Car, label: "Chauffeur Service", href: "/chauffeur-service", color: "from-green-500 to-green-600" },
    { icon: CreditCard, label: "Transactions", href: "/transactions", color: "from-cyan-500 to-cyan-600" },
    { icon: User, label: "Profile", href: "/profile", color: "from-gray-500 to-gray-600" },
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
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Services</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMenu(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {menuItems.map((item, index) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setShowMenu(false)}
                    className="block"
                  >
                    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer group h-32">
                      <CardContent className="p-5 text-center h-full flex flex-col justify-center">
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <item.icon className="h-7 w-7 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight">{item.label}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
