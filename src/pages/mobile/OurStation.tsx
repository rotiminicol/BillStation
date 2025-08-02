import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Plane, 
  Hotel, 
  Car, 
  Bitcoin, 
  RefreshCw, 
  Store,
  ChevronRight
} from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";

const OurStation = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const stationServices = [
    {
      id: "flight-booking",
      title: "Flight Booking",
      description: "Book domestic, international & private jets",
      icon: Plane,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      href: "/flight-booking",
      badge: null
    },
    {
      id: "crypto-trading",
      title: "Crypto Trading",
      description: "Trade cryptocurrencies with real-time market data",
      icon: Bitcoin,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      href: "/bitcoin-trading",
      badge: null
    },
    {
      id: "convert-asset",
      title: "Convert Asset",
      description: "Convert between different currencies and assets",
      icon: RefreshCw,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      href: "/convert-asset",
      badge: null
    },
    {
      id: "hotel-booking",
      title: "Hotel Booking",
      description: "Find and book hotels worldwide",
      icon: Hotel,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      href: "/hotel-booking",
      badge: null
    },
    {
      id: "chauffeur-service",
      title: "Chauffeur Service",
      description: "Book professional chauffeur services",
      icon: Car,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
      href: "/chauffeur-service",
      badge: null
    },
    {
      id: "book-ride",
      title: "Book Ride",
      description: "Book rides for transportation and delivery",
      icon: Car,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-600",
      href: "/book-ride",
      badge: null
    }
  ];

  const OurStationContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Our Station</h1>
          <p className="text-sm text-gray-600">Explore our premium services and experiences</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Store className="h-4 w-4" />
            Quick Book
          </Button>
        </div>
      </div>

      {/* Station Services Grid */}
      <div className="grid grid-cols-1 gap-4">
        {stationServices.map((service, index) => (
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
      <OurStationContent />
    </MobileLayout>
  );
};

export default OurStation; 