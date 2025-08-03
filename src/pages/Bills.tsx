import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  Smartphone, 
  Zap, 
  Tv, 
  GraduationCap, 
  Gamepad2, 
  Home, 
  Wifi, 
  Car, 
  Activity, 
  ArrowRight,
  TrendingUp,
  Shield,
  Clock,
  DollarSign
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DesktopLayout from "@/components/DesktopLayout";
import { useToast } from "@/hooks/use-toast";

const Bills = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    { 
      id: "airtime", 
      name: "Airtime", 
      icon: Smartphone, 
      description: "Recharge any network instantly",
      color: "from-yellow-500 to-orange-500",
      providers: ["MTN", "Airtel", "Glo", "9mobile"],
      image: "/public/money1.jpg"
    },
    { 
      id: "data", 
      name: "Data", 
      icon: Wifi, 
      description: "Internet bundles & packages",
      color: "from-blue-500 to-purple-500",
      providers: ["MTN", "Airtel", "Glo", "9mobile"],
      image: "/public/money2.jpg"
    },
    { 
      id: "electricity", 
      name: "Electricity", 
      icon: Zap, 
      description: "Power bills & meter tokens",
      color: "from-yellow-400 to-red-500",
      providers: ["AEDC", "EKEDC", "IKEDC", "PHEDC", "BEDC", "KEDCO"],
      image: "/public/money3.jpg"
    },
    { 
      id: "tv", 
      name: "Cable TV", 
      icon: Tv, 
      description: "TV subscriptions & packages",
      color: "from-red-500 to-pink-500",
      providers: ["DStv", "GOtv", "StarTimes", "TStv"],
      image: "/public/money4.jpg"
    },
    { 
      id: "education", 
      name: "Education", 
      icon: GraduationCap, 
      description: "School fees & exam payments",
      color: "from-green-500 to-emerald-500",
      providers: ["WAEC", "JAMB", "NECO", "NABTEB"],
      image: "/public/money1.jpg"
    },
    { 
      id: "betting", 
      name: "Betting", 
      icon: Gamepad2, 
      description: "Sports betting & gaming",
      color: "from-purple-500 to-indigo-500",
      providers: ["Bet9ja", "SportyBet", "NairaBet", "BetKing", "1xBet"],
      image: "/public/money2.jpg"
    },
    { 
      id: "rent", 
      name: "Rent", 
      icon: Home, 
      description: "Property & rent payments",
      color: "from-gray-500 to-slate-500",
      providers: ["Property Management", "Landlord", "Real Estate"],
      image: "/public/money3.jpg"
    },
    { 
      id: "transport", 
      name: "Transport", 
      icon: Car, 
      description: "Transport & ride services",
      color: "from-cyan-500 to-blue-500",
      providers: ["Uber", "Bolt", "Taxify", "Public Transport"],
      image: "/public/money4.jpg"
    },
  ];

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/bills/${categoryId}`);
  };

  const BillsContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 p-4 sm:p-6 bg-[#F6F6F8] min-h-screen"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-[#0B63BC] tracking-tight mb-4">
          Bill Payments
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Pay all your bills instantly with secure, fast transactions. Choose from our wide range of services.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
      >
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">₦2.5M</h3>
            <p className="text-sm text-gray-600">Total Paid</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">100%</h3>
            <p className="text-sm text-gray-600">Secure</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">24/7</h3>
            <p className="text-sm text-gray-600">Available</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">₦50</h3>
            <p className="text-sm text-gray-600">Fee</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Categories Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className="cursor-pointer transition-all duration-300 border-0 shadow-lg hover:shadow-xl bg-white rounded-xl overflow-hidden group"
              onClick={() => handleCategorySelect(category.id)}
            >
              <div className="relative overflow-hidden">
                <div className={`h-32 bg-gradient-to-br ${category.color} relative`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-4 right-4">
                    <motion.div
                      className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <category.icon className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <ArrowRight className="h-5 w-5 text-white/80 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                
                <div className="flex flex-wrap gap-1">
                  {category.providers.slice(0, 3).map((provider, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {provider}
                    </span>
                  ))}
                  {category.providers.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{category.providers.length - 3}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12"
      >
        <Card className="bg-gradient-to-r from-[#0B63BC] to-[#0B63BC]/90 text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
            <p className="text-white/90 mb-6">
              Our support team is available 24/7 to help you with any questions about bill payments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="bg-white text-[#0B63BC] hover:bg-white/90">
                Contact Support
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                View FAQ
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );

  return (
    <DesktopLayout>
      <BillsContent />
    </DesktopLayout>
  );
};

export default Bills;