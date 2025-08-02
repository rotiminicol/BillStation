import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Gift, 
  CreditCard, 
  CreditCard as CardsIcon,
  ChevronRight,
  CreditCard as CardIcon
} from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";

const CardPage = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const cardServices = [
    {
      id: "gift-cards",
      title: "Gift Cards",
      description: "Buy and sell gift cards for popular brands and retailers worldwide",
      icon: Gift,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      href: "/giftcard",
      badge: null
    },
    {
      id: "virtual-cards",
      title: "Virtual Cards",
      description: "Create and manage virtual cards for online transactions",
      icon: CreditCard,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      href: "/virtual-card",
      badge: null
    },
    {
      id: "cards",
      title: "Cards",
      description: "Manage your physical and digital cards in one place",
      icon: CardsIcon,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      href: "/cards",
      badge: null
    }
  ];

  const carouselImages = [
    "/money1.jpg",
    "/money2.jpg", 
    "/money3.jpg",
    "/money4.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const CardPageContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Cards</h1>
          <p className="text-sm text-gray-600">Manage your cards and gift cards</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <CardIcon className="h-4 w-4" />
            Quick Card
          </Button>
        </div>
      </div>

      {/* Card Services Grid */}
      <div className="grid grid-cols-1 gap-4">
        {cardServices.map((service, index) => (
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

      {/* Featured Carousel Section */}
      <div className="mt-8">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Featured</h2>
            <p className="text-sm text-gray-600">Discover our latest card offerings</p>
          </div>
          
          {/* Carousel */}
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {carouselImages.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img 
                    src={image} 
                    alt={`Featured card ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <MobileLayout>
      <CardPageContent />
    </MobileLayout>
  );
};

export default CardPage; 