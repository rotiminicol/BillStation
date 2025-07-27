import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Shield, CreditCard, Gift, CheckCircle, 
  Star, Users, Zap, DollarSign, TrendingUp, Lock, 
  Smartphone, Globe, Sparkles, ChevronRight, ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

// Brand colors
const brandColors = {
  primary: "#0057FF",
  secondary: "#00BFFF",
  dark: "#0F172A",
  light: "#F8FAFC"
};

// Custom animated financial icons
const AnimatedIcon = ({ icon, color, size = 24 }) => {
  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.2, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        animate={{ 
          y: [0, -5, 0],
          opacity: [0.9, 1, 0.9]
        }}
        transition={{
          duration: 2 + Math.random(),
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ color }}
      >
        {icon}
      </motion.div>
      <motion.div
        className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 1.5 + Math.random(),
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

// Feature cards data
const features = [
  {
    title: "Smart Payments",
    description: "AI-powered bill management with automatic scheduling and reminders",
    icon: <AnimatedIcon icon={<CreditCard size={32} />} color={brandColors.primary} />,
    bg: "bg-gradient-to-br from-blue-50 to-white",
    border: "border-blue-100",
    stats: [
      { value: "99.9%", label: "Success Rate" },
      { value: "Instant", label: "Processing" }
    ]
  },
  {
    title: "Digital Trading",
    description: "Trade gift cards and cryptocurrencies with real-time market data",
    icon: <AnimatedIcon icon={<TrendingUp size={32} />} color="#8B5CF6" />,
    bg: "bg-gradient-to-br from-purple-50 to-white",
    border: "border-purple-100",
    stats: [
      { value: "0.1%", label: "Fees" },
      { value: "24/7", label: "Trading" }
    ]
  },
  {
    title: "Bank Security",
    description: "Military-grade encryption and biometric authentication",
    icon: <AnimatedIcon icon={<Shield size={32} />} color="#10B981" />,
    bg: "bg-gradient-to-br from-green-50 to-white",
    border: "border-green-100",
    stats: [
      { value: "256-bit", label: "Encryption" },
      { value: "Zero", label: "Fraud" }
    ]
  }
];

const Welcome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="min-h-screen bg-white overflow-hidden"
      ref={containerRef}
    >
      {/* Floating background elements */}
      <motion.div 
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{ y: y1 }}
      >
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 bg-blue-50 rounded-full opacity-30 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Hero section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-28">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="w-32 h-32 lg:w-40 lg:h-40 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="/logo.png" 
                alt="Bill Station" 
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </motion.div>
            
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Finance</span> Platform
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-10 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Pay bills, trade assets, and manage your finances with Africa's most advanced digital platform.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                to="/login" 
                className="px-8 py-4 border-2 border-blue-100 bg-white text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-all duration-300"
              >
                Sign In
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Feature showcase */}
          <motion.div 
            className="flex-1 w-full max-w-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-[400px] lg:h-[500px] w-full">
              <AnimatePresence mode="wait">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`absolute inset-0 rounded-3xl overflow-hidden shadow-2xl ${feature.bg} ${feature.border} border-2`}
                    initial={{ 
                      scale: 0.95, 
                      opacity: 0,
                      x: 100
                    }}
                    animate={{
                      scale: currentSlide === index ? 1 : 0.95,
                      opacity: currentSlide === index ? 1 : 0,
                      x: currentSlide === index ? 0 : 100
                    }}
                    exit={{ 
                      scale: 0.95, 
                      opacity: 0,
                      x: -100
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 25
                    }}
                  >
                    <div className="h-full w-full p-8 lg:p-12 flex flex-col">
                      <div className="mb-8">
                        {feature.icon}
                      </div>
                      
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                        {feature.title}
                      </h3>
                      
                      <p className="text-lg text-gray-600 mb-8">
                        {feature.description}
                      </p>
                      
                      <div className="mt-auto grid grid-cols-2 gap-4">
                        {feature.stats.map((stat, i) => (
                          <div key={i} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow">
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-sm text-gray-500">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Enhanced slider controls */}
            <div className="flex justify-between items-center mt-8">
              <button 
                onClick={() => setCurrentSlide(prev => (prev - 1 + features.length) % features.length)}
                className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-all"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
              
              <div className="flex gap-2">
                {features.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2 rounded-full transition-all ${currentSlide === i ? 'w-8 bg-blue-600' : 'w-4 bg-gray-300'}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={() => setCurrentSlide(prev => (prev + 1) % features.length)}
                className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-all"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Stats section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-28"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {[
            { value: "2M+", label: "Users", icon: <Users size={24} /> },
            { value: "₦50B+", label: "Volume", icon: <DollarSign size={24} /> },
            { value: "99.9%", label: "Uptime", icon: <CheckCircle size={24} /> },
            { value: "4.9/5", label: "Rating", icon: <Star size={24} /> }
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-500">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Features grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-28"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {[
            { 
              title: "Instant Payments", 
              description: "Send and receive money in seconds",
              icon: <Zap size={24} /> 
            },
            { 
              title: "Global Access", 
              description: "Available anywhere in the world",
              icon: <Globe size={24} /> 
            },
            { 
              title: "Mobile First", 
              description: "Optimized for all devices",
              icon: <Smartphone size={24} /> 
            },
            { 
              title: "Secure", 
              description: "Bank-level encryption",
              icon: <Lock size={24} /> 
            },
            { 
              title: "Rewards", 
              description: "Earn with every transaction",
              icon: <Gift size={24} /> 
            },
            { 
              title: "Innovative", 
              description: "Cutting-edge technology",
              icon: <Sparkles size={24} /> 
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                <AnimatedIcon icon={feature.icon} color={brandColors.primary} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA section */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-12 text-center text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          </div>
          
          <motion.div 
            className="relative z-10"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to transform your finances?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join millions of users enjoying seamless financial services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-white text-blue-600 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                to="/login" 
                className="px-8 py-4 border-2 border-white/30 bg-transparent text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Mobile bottom navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20 shadow-lg">
          <div className="flex justify-between items-center max-w-md mx-auto">
            <Link 
              to="/signup" 
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg shadow flex items-center gap-2"
            >
              <ArrowRight className="h-4 w-4" />
              Get Started
            </Link>
            <Link 
              to="/login" 
              className="px-6 py-3 text-blue-600 font-medium rounded-lg border border-blue-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;