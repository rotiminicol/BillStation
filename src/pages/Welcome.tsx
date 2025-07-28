import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, CreditCard, Zap, Shield, TrendingUp, Globe, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const Welcome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();

  // Mobile slides data
  const mobileSlides = [
    {
      title: "Bill Payments",
      description: "Settle a wide range of bills, including electricity, rent, school fees, and more.",
    },
    {
      title: "Airtime to Cash Swap",
      description: "Convert your airtime to cash with a few clicks.",
    },
    {
      title: "Cash Transfers",
      description: "Send and receive money swiftly and securely with our reliable cash transfer feature.",
    },
    {
      title: "Flight Booking",
      description: "We provide exclusive flight booking, hotel reservations, and airport transportation services.",
    },
    {
      title: "Bitcoin & Gift Cards",
      description: "Trade and exchange different gift cards with a few clicks.",
    },
    {
      title: "Virtual Card",
      description: "Shop online across borders without limitations, fund your dollar card with naira.",
    }
  ];

  // Desktop slider data
  const desktopSliderData = [
    {
      id: 1,
      title: "Secure Virtual Cards",
      subtitle: "Create and manage unlimited virtual cards for your business needs",
      icon: <CreditCard className="w-8 h-8" />,
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      features: ["Instant activation", "Real-time monitoring", "Custom spending limits"]
    },
    {
      id: 2,
      title: "Smart Bill Payments",
      subtitle: "Pay all your bills automatically with intelligent scheduling",
      icon: <Zap className="w-8 h-8" />,
      color: "from-green-600 to-green-700",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      features: ["Auto-payments", "Payment reminders", "Transaction history"]
    },
    {
      id: 3,
      title: "Advanced Banking",
      subtitle: "Professional banking solutions for modern businesses",
      icon: <Shield className="w-8 h-8" />,
      color: "from-purple-600 to-purple-700",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      features: ["Multi-currency", "Investment tools", "Analytics dashboard"]
    }
  ];

  // Auto-advance slider for desktop
  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % desktopSliderData.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  // Mobile view - simple design like the reference image
  if (isMobile) {
    const handleNext = () => {
      if (currentSlide < mobileSlides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    };

    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <div className="pt-12 px-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
              <img src="/logo.png" alt="Bill Station" className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bill Station</h1>
              <p className="text-sm text-gray-500">Financial Services</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-full max-w-sm mb-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
              {mobileSlides[currentSlide].title}
            </h2>
            <p className="text-gray-600 text-center">
              {mobileSlides[currentSlide].description}
            </p>
          </div>

          {/* Progress dots */}
          <div className="flex gap-2 mb-12">
            {mobileSlides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pb-8 px-6">
          {/* Step indicator */}
          <div className="text-center text-gray-500 text-sm mb-4">
            Step {currentSlide + 1} of {mobileSlides.length}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            {currentSlide < mobileSlides.length - 1 ? (
              <button
                onClick={handleNext}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-md"
              >
                Next
              </button>
            ) : (
              <Link
                to="/signup"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-md text-center"
              >
                Create Account
              </Link>
            )}
            
            <Link
              to="/login"
              className="w-full py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl text-center"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Desktop view - expanded with more features
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,#1E40AF_0%,transparent_50%)] opacity-10"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,#3B82F6_0%,transparent_50%)] opacity-10"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Hero section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-28">
          <div className="flex-1">
            <div className="w-32 h-32 lg:w-40 lg:h-40 mb-8">
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-2xl flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="Bill Station" 
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">Banking</span> Platform
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl">
              Advanced financial services for modern businesses. Secure, reliable, and designed for growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 border border-blue-600"
              >
                Get Started
                <ChevronRight className="h-5 w-5" />
              </Link>
              <Link 
                to="/login" 
                className="px-8 py-4 border-2 border-gray-300 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
          
          {/* Feature showcase */}
          <div className="flex-1 w-full max-w-xl">
            <div className="relative h-[500px] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  className={`absolute inset-0 rounded-3xl overflow-hidden shadow-2xl ${desktopSliderData[currentSlide].bgColor} border border-white/20`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <div className="h-full w-full p-12 flex flex-col">
                    <div className="mb-8">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${desktopSliderData[currentSlide].color} flex items-center justify-center shadow-lg`}>
                        {desktopSliderData[currentSlide].icon}
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {desktopSliderData[currentSlide].title}
                    </h3>
                    
                    <p className="text-lg text-gray-600 mb-8">
                      {desktopSliderData[currentSlide].subtitle}
                    </p>
                    
                    <div className="mt-auto space-y-4">
                      {desktopSliderData[currentSlide].features.map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${desktopSliderData[currentSlide].color}`}></div>
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-28">
          {[
            { value: "2M+", label: "Active Users", icon: <div className="w-6 h-6 bg-blue-600 rounded-full"></div> },
            { value: "₦50B+", label: "Transaction Volume", icon: <div className="w-6 h-6 bg-green-600 rounded-full"></div> },
            { value: "99.9%", label: "Uptime", icon: <div className="w-6 h-6 bg-purple-600 rounded-full"></div> },
            { value: "4.9/5", label: "Customer Rating", icon: <div className="w-6 h-6 bg-orange-600 rounded-full"></div> }
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-28">
          {[
            { 
              title: "Instant Payments", 
              description: "Send and receive money in seconds with real-time processing",
              icon: <Zap className="w-6 h-6" />,
              color: "from-green-600 to-green-700"
            },
            { 
              title: "Global Access", 
              description: "Available anywhere in the world with multi-currency support",
              icon: <Globe className="w-6 h-6" />,
              color: "from-blue-600 to-blue-700"
            },
            { 
              title: "Enterprise Security", 
              description: "Bank-level encryption and advanced fraud protection",
              icon: <Lock className="w-6 h-6" />,
              color: "from-purple-600 to-purple-700"
            },
            { 
              title: "Smart Analytics", 
              description: "Advanced insights and reporting for better decision making",
              icon: <TrendingUp className="w-6 h-6" />,
              color: "from-orange-600 to-orange-700"
            },
            { 
              title: "API Integration", 
              description: "Seamless integration with your existing business systems",
              icon: <CreditCard className="w-6 h-6" />,
              color: "from-indigo-600 to-indigo-700"
            },
            { 
              title: "24/7 Support", 
              description: "Round-the-clock customer support and technical assistance",
              icon: <Shield className="w-6 h-6" />,
              color: "from-teal-600 to-teal-700"
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg mb-6`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* CTA section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to transform your business?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses using our advanced financial platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 border border-white"
              >
                Get Started
                <ChevronRight className="h-5 w-5" />
              </Link>
              <Link 
                to="/login" 
                className="px-8 py-4 border-2 border-white/30 bg-transparent text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;