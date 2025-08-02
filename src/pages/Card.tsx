import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { 
  Gift, 
  CreditCard, 
  CreditCard as CardsIcon,
  ChevronRight,
  CreditCard as CardIcon
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DesktopLayout from "@/components/DesktopLayout";

const CardPage = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const cardServices = [
    {
      id: "gift-cards",
      title: "Gift Cards",
      description: "Buy and sell gift cards for popular brands and retailers worldwide",
      icon: Gift,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      href: "/gift-card",
      badge: null,
      buttonText: "Buy Gift Cards"
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
      badge: null,
      buttonText: "Create Virtual Card"
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
      badge: null,
      buttonText: "Manage Cards"
    }
  ];

  const carouselImages = [
    "/mycard1.png",
    "/mycard2.png", 
    "/mycard3.png",
    "/mycard4.png"
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
    <div className="space-y-8">
      {/* Modern Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Cards</h1>
            <p className="text-gray-500 text-lg">Manage your cards and gift cards</p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="lg" 
              className="flex items-center gap-2 border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <CardIcon className="h-5 w-5" />
              Quick Card
            </Button>
          </div>
        </div>
      </div>

      {/* Card Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardServices.map((service, index) => (
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

      {/* Featured Carousel Section */}
      <div className="mt-12">
        <div className="space-y-4">
          {/* Carousel */}
          <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {carouselImages.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img 
                    src={image} 
                    alt={`Featured card ${index + 1}`}
                    className="w-full h-96 object-fill"
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
    <DesktopLayout>
      <CardPageContent />
    </DesktopLayout>
  );
};

export default CardPage; 