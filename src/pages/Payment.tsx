import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import DesktopLayout from "@/components/DesktopLayout";

const Payment = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const navigate = useNavigate();

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
      badge: null,
      buttonText: "Send Money"
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
      badge: null,
      buttonText: "Pay Bills"
    },
    {
      id: "giftcard",
      title: "Gift Cards",
      description: "Buy and sell gift cards for popular brands and retailers",
      icon: Gift,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      href: "/gift-card",
      badge: null,
      buttonText: "Buy Gift Cards"
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
      badge: null,
      buttonText: "Buy Airtime"
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
      badge: null,
      buttonText: "Buy Data"
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
      badge: null,
      buttonText: "Pay Electricity"
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
      badge: null,
      buttonText: "Pay Cable TV"
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
      badge: null,
      buttonText: "Buy Tickets"
    }
  ];

  const PaymentContent = () => (
    <div className="space-y-8">
      {/* Modern Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Payments</h1>
            <p className="text-gray-500 text-lg">Choose your payment service and get started</p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="lg" 
              className="flex items-center gap-2 border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <CreditCard className="h-5 w-5" />
              Quick Pay
            </Button>
          </div>
        </div>
      </div>

      {/* Payment Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paymentServices.map((service, index) => (
          <Card
            key={service.id}
            className={`group cursor-pointer transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:bg-white/95 ${
              selectedService === service.id 
                ? 'ring-2 ring-blue-500 border-blue-500 shadow-xl scale-105' 
                : 'hover:border-gray-200/50'
            }`}
            style={{
              animationDelay: `${index * 50}ms`,
              transform: selectedService === service.id ? 'scale(1.05)' : 'scale(1)'
            }}
            onClick={() => {
              setSelectedService(service.id);
              navigate(service.href);
            }}
          >
            <CardContent className="p-6 relative overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Icon with enhanced styling */}
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${service.bgColor} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <service.icon className={`h-7 w-7 ${service.iconColor} group-hover:rotate-12 transition-transform duration-300`} />
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
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-gray-800 transition-colors">{service.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{service.description}</p>
              </div>

              {/* Enhanced button */}
              <div className="mt-6 pt-4 border-t border-gray-100/50">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group-hover:bg-gray-50 group-hover:border-gray-300 transition-all duration-300 font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(service.href);
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    {service.buttonText}
                    <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <DesktopLayout>
      <PaymentContent />
    </DesktopLayout>
  );
};

export default Payment; 