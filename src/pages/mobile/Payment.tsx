import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Send, 
  Receipt, 
  Gift, 
  Phone, 
  Wifi, 
  Zap, 
  Tv, 
  Ticket,
  ChevronRight,
  CreditCard
} from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";

const Payment = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const paymentServices = [
    {
      id: "send-money",
      title: "Send Money",
      description: "Transfer money to friends, family, or businesses instantly",
      icon: Send,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      href: "/transfer",
      badge: null
    },
    {
      id: "bills",
      title: "Bills",
      description: "Pay your utility bills, rent, and other recurring payments",
      icon: Receipt,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      href: "/bills",
      badge: null
    },
    {
      id: "giftcard",
      title: "Gift Cards",
      description: "Buy and sell gift cards for popular brands and retailers",
      icon: Gift,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      href: "/giftcard",
      badge: null
    },
    {
      id: "airtime",
      title: "Airtime",
      description: "Purchase airtime for all major mobile networks",
      icon: Phone,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      href: "/airtime-swap",
      badge: null
    },
    {
      id: "data",
      title: "Data",
      description: "Buy data bundles for internet connectivity",
      icon: Wifi,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-600",
      href: "/airtime-swap",
      badge: null
    },
    {
      id: "electricity",
      title: "Electricity",
      description: "Pay electricity bills for your home or business",
      icon: Zap,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      href: "/bills",
      badge: null
    },
    {
      id: "cable-tv",
      title: "Cable TV",
      description: "Pay for cable TV and satellite subscriptions",
      icon: Tv,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      href: "/bills",
      badge: null
    },
    {
      id: "buy-tickets",
      title: "Buy Tickets",
      description: "Purchase tickets for events, movies, and transportation",
      icon: Ticket,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
      href: "/buy-tickets",
      badge: null
    }
  ];

  const PaymentContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-sm text-gray-600">Choose your payment service and get started</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <CreditCard className="h-4 w-4" />
            Quick Pay
          </Button>
        </div>
      </div>

      {/* Payment Services Grid */}
      <div className="grid grid-cols-1 gap-4">
        {paymentServices.map((service, index) => (
          <MobileCard
            key={service.id}
            className={`group cursor-pointer transition-all duration-500 ease-out hover:scale-102 active:scale-98 border-0 bg-white/90 backdrop-blur-sm ${
              selectedService === service.id 
                ? 'ring-2 ring-blue-500 border-blue-500 shadow-lg scale-102' 
                : 'hover:border-gray-200/50'
            }`}
            style={{
              animationDelay: `${index * 30}ms`
            }}
            onClick={() => setSelectedService(service.id)}
          >
            <div className="p-5 relative overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Icon with enhanced styling */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.bgColor} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <service.icon className={`h-6 w-6 ${service.iconColor} group-hover:rotate-12 transition-transform duration-300`} />
                </div>
                <div className="text-right">
                  {service.badge && (
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      service.badge === 'Premium' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {service.badge}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Content with better spacing */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 text-base group-hover:text-gray-800 transition-colors">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
              </div>

              {/* Enhanced button */}
              <div className="mt-5 pt-3 border-t border-gray-100/50">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group-hover:bg-gray-50 group-hover:border-gray-300 transition-all duration-300 font-medium"
                  asChild
                >
                  <Link to={service.href} className="flex items-center justify-center gap-2">
                    Get Started
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
      <PaymentContent />
    </MobileLayout>
  );
};

export default Payment; 