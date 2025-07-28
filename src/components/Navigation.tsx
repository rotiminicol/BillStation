
import { Link, useLocation } from "react-router-dom";
import { Home, Send, Smartphone, CreditCard, Menu, RefreshCw, Plane, Bitcoin, DollarSign, X } from "lucide-react";
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
    { icon: Plane, label: "Flight Booking", href: "/flight-booking", color: "from-purple-500 to-purple-600" },
    { icon: Bitcoin, label: "Bitcoin Trading", href: "/bitcoin-trading", color: "from-orange-500 to-orange-600" },
    { icon: DollarSign, label: "Virtual Card", href: "/virtual-card", color: "from-indigo-500 to-indigo-600" },
  ];

  return (
    <>
      {/* Modern Floating Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] w-[95vw] max-w-md rounded-2xl bg-white/90 shadow-2xl border border-gray-200 px-4 py-2 flex items-center justify-around backdrop-blur-md transition-all duration-300">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          if (item.action) {
            return (
              <button
                key={item.href}
                onClick={item.action}
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-all duration-300",
                  isActive
                    ? "text-blue-600 bg-blue-100 shadow-md"
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                )}
              >
                <item.icon className="h-7 w-7 mb-1" />
                <span className="text-xs font-semibold tracking-wide">{item.label}</span>
              </button>
            );
          } else {
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-all duration-300",
                  isActive
                    ? "text-blue-600 bg-blue-100 shadow-md"
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                )}
              >
                <item.icon className="h-7 w-7 mb-1" />
                <span className="text-xs font-semibold tracking-wide">{item.label}</span>
              </Link>
            );
          }
        })}
      </nav>
      {/* Mobile Menu Overlay */}
      {showMenu && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-[10000] flex items-end">
          <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-hidden animate-in slide-in-from-bottom duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Menu</h2>
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
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                      <CardContent className="p-4 text-center">
                        <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <item.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm">{item.label}</h3>
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
