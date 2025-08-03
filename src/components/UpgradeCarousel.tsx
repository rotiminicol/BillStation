import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plane, Ticket, CreditCard, Bitcoin, Crown } from "lucide-react";

const UpgradeCarousel = () => {
  const [currentCard, setCurrentCard] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      id: 1,
      title: "Book Private Jet",
      description: "Experience luxury travel with our private jet services. Fly in style with exclusive access to premium aircraft and personalized service.",
      buttonText: "Book Now",
      image: "/Frame.png",
      gradient: "from-blue-500 to-blue-600",
      border: "hover:border-blue-200"
    },
    {
      id: 2,
      title: "Shows & Concerts",
      description: "Get tickets to the hottest events worldwide. Never miss out on your favorite artists and performances with priority booking.",
      buttonText: "Buy Tickets",
      image: "/card1.jpg",
      gradient: "from-purple-500 to-pink-500",
      border: "hover:border-purple-200"
    },
    {
      id: 3,
      title: "Pay Your Bills",
      description: "Quick and secure bill payments in seconds. Manage all your utilities, subscriptions, and services in one convenient platform.",
      buttonText: "Pay Now",
      image: "/money1.jpg",
      gradient: "from-green-500 to-teal-500",
      border: "hover:border-green-200"
    },
    {
      id: 4,
      title: "Crypto to Cash",
      description: "Convert your crypto to cash instantly. Trade with confidence using our secure and lightning-fast exchange platform.",
      buttonText: "Trade Now",
      image: "/stock.jpg",
      gradient: "from-yellow-500 to-orange-500",
      border: "hover:border-yellow-200"
    },
    {
      id: 5,
      title: "Premium Tier",
      description: "Unlock exclusive benefits and higher limits. Enjoy VIP treatment with priority support, exclusive offers, and enhanced features.",
      buttonText: "Upgrade Now",
      image: "/mycard1.png",
      gradient: "from-red-500 to-pink-500",
      border: "hover:border-red-200",
      isPremium: true
    }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Upgrade Your Experience</h3>
      <div className="relative bg-white rounded-2xl shadow-lg h-[300px] overflow-hidden">
        {cards.map((item, index) => (
          <AnimatePresence key={item.id}>
            {currentCard === index && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.6, ease: "easeOut" }
                }}
                exit={{ 
                  opacity: 0, 
                  x: -50,
                  transition: { duration: 0.6, ease: "easeIn" }
                }}
                className={`absolute inset-0 bg-white rounded-2xl border border-gray-200 overflow-hidden ${item.border} transition-all duration-300 flex`}
              >
                {/* Text Content Side */}
                <div className="flex-1 p-8 flex flex-col justify-center">
                  <div className="max-w-md">
                    <h4 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h4>
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">{item.description}</p>
                    <Button 
                      className={`${item.isPremium ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-lg' : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg'} px-8 py-3 text-base font-semibold`}
                      size="lg"
                    >
                      {item.buttonText}
                    </Button>
                  </div>
                </div>

                {/* Image Side */}
                <div className="w-1/2 h-full relative overflow-hidden">
                  <div className={`absolute inset-0 ${item.gradient} opacity-10`}></div>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/20"></div>
                  
                  {/* Decorative overlay */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-16 h-16 ${item.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                      {item.id === 1 && <Plane className="h-8 w-8 text-white" />}
                      {item.id === 2 && <Ticket className="h-8 w-8 text-white" />}
                      {item.id === 3 && <CreditCard className="h-8 w-8 text-white" />}
                      {item.id === 4 && <Bitcoin className="h-8 w-8 text-white" />}
                      {item.id === 5 && <Crown className="h-8 w-8 text-white" />}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
        

      </div>
    </div>
  );
};

export default React.memo(UpgradeCarousel);
