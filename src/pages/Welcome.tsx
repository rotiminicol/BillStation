import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, CheckCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const Welcome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();

  // Mobile slides data with images
  const mobileSlides = [
    {
      title: "Bill Payments",
      description: "Settle a wide range of bills, including electricity, rent, school fees, and more.",
      image: "/money1.jpg"
    },
    {
      title: "Airtime to Cash Swap",
      description: "Convert your airtime to cash with a few clicks.",
      image: "/money2.jpg"
    },
    {
      title: "Cash Transfers",
      description: "Send and receive money swiftly and securely with our reliable cash transfer feature.",
      image: "/money3.jpg"
    },
    {
      title: "Flight Booking",
      description: "We provide exclusive flight booking, hotel reservations, and airport transportation services.",
      image: "/money4.jpg"
    },
    {
      title: "Crypto Trading",
      description: "Trade and exchange different cryptocurrencies with a few clicks.",
      image: "/stock.jpg"
    },
    {
      title: "Virtual Card",
      description: "Shop online across borders without limitations, fund your dollar card with naira.",
      image: "/Card.jpg"
    }
  ];

  // Desktop slider data with enhanced content
  const desktopSliderData = [
    {
      id: 1,
      title: "Enterprise Virtual Cards",
      subtitle: "Create unlimited virtual cards with advanced spending controls and real-time monitoring",
      icon: "💳",
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      features: ["Instant activation", "Real-time monitoring", "Custom spending limits", "Multi-currency support"],
      stats: { cards: "50K+", transactions: "₦2.5B+", users: "10K+" }
    },
    {
      id: 2,
      title: "Intelligent Bill Management",
      subtitle: "Automate all your bill payments with smart scheduling and payment reminders",
      icon: "💰",
      color: "from-green-600 to-green-700",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      features: ["Auto-payments", "Payment reminders", "Transaction history", "Multi-vendor support"],
      stats: { bills: "100K+", savings: "₦500M+", vendors: "500+" }
    },
    {
      id: 3,
      title: "Advanced Financial Platform",
      subtitle: "Professional banking solutions with multi-currency accounts and investment tools",
      icon: "🏦",
      color: "from-purple-600 to-purple-700",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      features: ["Multi-currency", "Investment tools", "Analytics dashboard", "API integration"],
      stats: { accounts: "25K+", volume: "₦10B+", currencies: "15+" }
    }
  ];

  // Auto-advance slider for desktop (no pause/play)
  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % desktopSliderData.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  // Mobile view - elevated design
  if (isMobile) {
    const handleNext = () => {
      if (currentSlide < mobileSlides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    };


    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex flex-col relative overflow-hidden">
        {/* Floating shapes background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-20 blur-2xl"
              style={{
                width: `${48 + Math.random() * 48}px`,
                height: `${48 + Math.random() * 48}px`,
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 90}%`,
                background: `linear-gradient(135deg, #3B82F6 60%, #6366F1 100%)`,
              }}
              animate={{
                y: [0, 20, 0],
                opacity: [0.18, 0.28, 0.18],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Header */}
        <div className="pt-10 px-6 z-10 relative">
          <div className="flex flex-col items-center justify-center mb-6">
            <motion.img
              src="/logo.png"
              alt="Bill Station"
              className="w-16 h-16 mb-2 drop-shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ background: 'none', borderRadius: 0 }}
            />
            <motion.h1
              className="text-3xl font-extrabold text-gray-900 tracking-tight text-center drop-shadow-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Bill Station
            </motion.h1>
            <motion.p
              className="text-base text-blue-600 font-medium text-center mt-1"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Financial Services
            </motion.p>
          </div>
        </div>

        {/* Main Content with Enhanced Mobile Slider */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 z-10 relative">
          <div className="w-full max-w-xs mb-4">
            {/* Mobile-Optimized Image Slider */}
            <div className="relative h-80 rounded-3xl overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0, scale: 1.08, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -30 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  style={{ zIndex: 2 }}
                >
                  <div className="relative w-full h-full rounded-3xl shadow-2xl border border-blue-100 bg-white/80 backdrop-blur-lg overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={mobileSlides[currentSlide].image}
                        alt={mobileSlides[currentSlide].title}
                        className="w-full h-full object-cover"
                        style={{ filter: "brightness(0.9) contrast(1.1)" }}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    </div>
                    
                    
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <motion.h2 
                        className="text-2xl font-bold mb-3 text-center drop-shadow-lg"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {mobileSlides[currentSlide].title}
                      </motion.h2>
                      <motion.p 
                        className="text-white/90 text-center leading-relaxed text-sm"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        {mobileSlides[currentSlide].description}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Sticky Footer for Actions */}
        <div className="sticky bottom-0 left-0 w-full z-20 bg-gradient-to-t from-white/95 via-white/80 to-transparent px-6 pt-2 pb-6 shadow-[0_-8px_24px_-8px_rgba(59,130,246,0.08)]">
          {/* Animated progress bar for step indicator */}
          <div className="flex items-center justify-center mb-3">
            <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-2 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentSlide + 1) / mobileSlides.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <div className="text-center text-gray-500 text-xs mb-3 font-medium tracking-wide">
            Step {currentSlide + 1} of {mobileSlides.length}
          </div>
          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            {currentSlide < mobileSlides.length - 1 ? (
              <motion.button
                onClick={handleNext}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg flex items-center justify-center gap-2 text-base active:scale-95 transition-transform"
                whileTap={{ scale: 0.97 }}
              >
                Next <ChevronRight className="w-5 h-5" />
              </motion.button>
            ) : (
              <Link
                to="/signup"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg text-center flex items-center justify-center gap-2 text-base hover:scale-105 transition-transform"
              >
                Create Account <ArrowRight className="w-5 h-5" />
              </Link>
            )}
            <Link
              to="/login"
              className="w-full py-3 border-2 border-blue-200 text-blue-700 font-semibold rounded-xl text-center bg-white/90 shadow-sm hover:bg-blue-50 transition-all"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Desktop view - Premium banking platform design
  console.log('Rendering desktop view');
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,#1E40AF_0%,transparent_50%)] opacity-10 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,#3B82F6_0%,transparent_50%)] opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-5 blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-5 blur-3xl animate-float-medium"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Hero section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-28">
          <div className="flex-1">
            {/* Logo and branding - no background */}
            <motion.div 
              className="w-32 h-32 lg:w-40 lg:h-40 mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img 
                src="/logo.png" 
                alt="Bill Station" 
                className="w-full h-full object-contain"
              />
            </motion.div>
            
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">Banking</span> Platform
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-10 max-w-2xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Advanced financial services for modern businesses. Secure, reliable, and designed for growth with enterprise-grade features.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link 
                to="/signup" 
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 border border-blue-600 hover:scale-105"
              >
                Get Started
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/login" 
                className="px-8 py-4 border-2 border-gray-300 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-blue-300 transition-all duration-300 hover:scale-105"
              >
                Sign In
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              className="flex items-center gap-6 mt-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.9/5 rating</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">👥</span>
                <span className="text-sm text-gray-600">2M+ users</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 text-lg">🔒</span>
                <span className="text-sm text-gray-600">Bank-level security</span>
              </div>
            </motion.div>
          </div>
          
          {/* Interactive feature showcase */}
          <div className="flex-1 w-full max-w-xl">
            <div className="relative h-[600px] w-full">
              {/* Slide indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                {desktopSliderData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? 'bg-blue-600 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  className={`absolute inset-0 rounded-3xl overflow-hidden shadow-2xl ${desktopSliderData[currentSlide].bgColor} border border-white/20 backdrop-blur-sm`}
                  initial={{ opacity: 0, scale: 0.95, rotateY: -15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.95, rotateY: 15 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <div className="h-full w-full p-12 flex flex-col relative">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,currentColor_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    </div>

                    <div className="relative z-10">
                      <motion.div 
                        className="mb-8"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <div className="text-6xl">
                          {desktopSliderData[currentSlide].icon}
                        </div>
                      </motion.div>
                      
                      <motion.h3 
                        className="text-3xl font-bold text-gray-900 mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        {desktopSliderData[currentSlide].title}
                      </motion.h3>
                      
                      <motion.p 
                        className="text-lg text-gray-600 mb-8"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        {desktopSliderData[currentSlide].subtitle}
                      </motion.p>
                      
                      <div className="mt-auto space-y-4">
                        {desktopSliderData[currentSlide].features.map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                          >
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${desktopSliderData[currentSlide].color}`}></div>
                            <span className="text-gray-700 font-medium">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Stats section */}
                      <motion.div 
                        className="mt-8 pt-6 border-t border-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                      >
                        <div className="grid grid-cols-3 gap-4">
                          {Object.entries(desktopSliderData[currentSlide].stats).map(([key, value], index) => (
                            <div key={key} className="text-center">
                              <div className="text-xl font-bold text-gray-900">{value}</div>
                              <div className="text-xs text-gray-500 capitalize">{key}</div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* Enhanced stats section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-28"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { value: "2M+", label: "Active Users", icon: "👥", color: "text-blue-600" },
            { value: "₦50B+", label: "Transaction Volume", icon: "💵", color: "text-green-600" },
            { value: "99.9%", label: "Uptime", icon: "🔒", color: "text-purple-600" },
            { value: "4.9/5", label: "Customer Rating", icon: "⭐", color: "text-orange-600" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Enhanced features grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-28"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { 
              title: "Instant Payments", 
              description: "Send and receive money in seconds with real-time processing and instant notifications",
              icon: "⚡",
              color: "text-green-600",
              features: ["Real-time processing", "Instant notifications", "Multi-currency support"]
            },
            { 
              title: "Global Access", 
              description: "Available anywhere in the world with comprehensive multi-currency support and local compliance",
              icon: "🌍",
              color: "text-blue-600",
              features: ["15+ currencies", "Local compliance", "Global coverage"]
            },
            { 
              title: "Enterprise Security", 
              description: "Bank-level encryption, advanced fraud protection, and comprehensive audit trails",
              icon: "🔐",
              color: "text-purple-600",
              features: ["256-bit encryption", "Fraud protection", "Audit trails"]
            },
            { 
              title: "Smart Analytics", 
              description: "Advanced insights and reporting with AI-powered recommendations for better decision making",
              icon: "📊",
              color: "text-orange-600",
              features: ["AI insights", "Custom reports", "Predictive analytics"]
            },
            { 
              title: "API Integration", 
              description: "Seamless integration with your existing business systems and third-party applications",
              icon: "🔗",
              color: "text-indigo-600",
              features: ["RESTful APIs", "Webhooks", "SDK support"]
            },
            { 
              title: "24/7 Support", 
              description: "Round-the-clock customer support with dedicated account managers and technical assistance",
              icon: "🛡️",
              color: "text-teal-600",
              features: ["Live chat", "Dedicated managers", "Technical support"]
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <div className="space-y-2">
                {feature.features.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Enhanced CTA section */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to transform your business?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses using our advanced financial platform for secure, efficient, and scalable operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup" 
                className="group px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 border border-white hover:scale-105"
              >
                Get Started
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/login" 
                className="px-8 py-4 border-2 border-white/30 bg-transparent text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                Sign In
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;