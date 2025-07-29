import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Plane, Hotel, Car, Sparkles, Activity, CheckCircle, ArrowRight, Calendar, MapPin, Users, Search, DollarSign, Shield, Clock, Globe, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";

import { useToast } from "@/hooks/use-toast";
import { getBankLogo } from "@/lib/bankLogos";

const FlightBooking = () => {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'transport'>('flights');
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [loading, setLoading] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setAnimateCards(true), 100);
  }, []);

  const popularDestinations = [
    { name: "Lagos", code: "LOS", country: "Nigeria", image: "🌆" },
    { name: "Abuja", code: "ABV", country: "Nigeria", image: "🏛️" },
    { name: "Port Harcourt", code: "PHC", country: "Nigeria", image: "🌊" },
    { name: "Kano", code: "KAN", country: "Nigeria", image: "🏺" },
    { name: "Dubai", code: "DXB", country: "UAE", image: "🏙️" },
    { name: "London", code: "LHR", country: "UK", image: "🇬🇧" },
    { name: "New York", code: "JFK", country: "USA", image: "🗽" },
    { name: "Paris", code: "CDG", country: "France", image: "🗼" },
  ];

  const airlines = [
    { name: "Air Peace", logo: "✈️", rating: 4.5, color: "from-blue-500 to-blue-600", description: "Nigeria's leading airline" },
    { name: "Arik Air", logo: "🛩️", rating: 4.2, color: "from-green-500 to-green-600", description: "Premium domestic flights" },
    { name: "Ethiopian Airlines", logo: "✈️", rating: 4.7, color: "from-yellow-500 to-yellow-600", description: "International connections" },
    { name: "Emirates", logo: "🛫", rating: 4.8, color: "from-red-500 to-red-600", description: "Luxury travel experience" },
    { name: "British Airways", logo: "✈️", rating: 4.6, color: "from-indigo-500 to-indigo-600", description: "European excellence" },
    { name: "Lufthansa", logo: "🛬", rating: 4.4, color: "from-purple-500 to-purple-600", description: "German precision" },
  ];

  const handleSearch = () => {
    if (!fromLocation || !toLocation || !departureDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast({
        title: "Search Complete!",
        description: "Found 15 available options for your trip.",
      });
      setLoading(false);
    }, 2000);
  };

  const FlightBookingContent = () => (
    <div className="space-y-8">
      {/* Enhanced Header with Animation */}
      <motion.div 
        className="flex items-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Travel & Booking
          </h1>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-6 w-6 text-blue-500" />
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Tab Navigation */}
      <motion.div 
        className="flex bg-white rounded-xl p-1 mb-8 shadow-lg max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {[
          { id: 'flights', icon: <Plane className="h-5 w-5" />, label: 'Flights' },
          { id: 'hotels', icon: <Hotel className="h-5 w-5" />, label: 'Hotels' },
          { id: 'transport', icon: <Car className="h-5 w-5" />, label: 'Transport' }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 px-6 rounded-lg text-base font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="inline mr-2">{tab.icon}</span>
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Enhanced Main Content */}
        <div className="lg:col-span-2 space-y-8 pb-20 lg:pb-0">
          {/* Enhanced Search Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-indigo-50/30 opacity-50"></div>
              <CardHeader className="pb-6 relative z-10">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Search className="h-6 w-6 text-white" />
                  </motion.div>
                  {activeTab === 'flights' ? 'Flight Search' : activeTab === 'hotels' ? 'Hotel Search' : 'Transport Search'}
                </CardTitle>
                <p className="text-gray-600 text-lg">Find the best deals for your travel needs</p>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Label htmlFor="from" className="text-base font-semibold">From</Label>
                    <Select value={fromLocation} onValueChange={setFromLocation}>
                      <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300">
                        <SelectValue placeholder="Select departure city" />
                      </SelectTrigger>
                      <SelectContent>
                        {popularDestinations.map((dest) => (
                          <SelectItem key={dest.code} value={dest.code}>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{dest.image}</span>
                              <MapPin className="h-4 w-4" />
                              {dest.name} ({dest.code}) - {dest.country}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <Label htmlFor="to" className="text-base font-semibold">To</Label>
                    <Select value={toLocation} onValueChange={setToLocation}>
                      <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300">
                        <SelectValue placeholder="Select destination city" />
                      </SelectTrigger>
                      <SelectContent>
                        {popularDestinations.map((dest) => (
                          <SelectItem key={dest.code} value={dest.code}>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{dest.image}</span>
                              <MapPin className="h-4 w-4" />
                              {dest.name} ({dest.code}) - {dest.country}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <Label htmlFor="departure" className="text-base font-semibold">Departure Date</Label>
                    <Input
                      id="departure"
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                    />
                  </motion.div>

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <Label htmlFor="return" className="text-base font-semibold">Return Date</Label>
                    <Input
                      id="return"
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                    />
                  </motion.div>

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <Label htmlFor="passengers" className="text-base font-semibold">Passengers</Label>
                    <Select value={passengers} onValueChange={setPassengers}>
                      <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300">
                        <SelectValue placeholder="Number of passengers" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              {num} {num === 1 ? 'Passenger' : 'Passengers'}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <Button
                    onClick={handleSearch}
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Searching...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Search className="h-5 w-5" />
                        Search {activeTab === 'flights' ? 'Flights' : activeTab === 'hotels' ? 'Hotels' : 'Transport'}
                      </div>
                    )}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Popular Airlines */}
          <AnimatePresence>
            {activeTab === 'flights' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30 opacity-50"></div>
                  <CardHeader className="pb-6 relative z-10">
                    <CardTitle className="text-xl flex items-center gap-3">
                      <motion.div 
                        className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Plane className="h-5 w-5 text-white" />
                      </motion.div>
                      Popular Airlines
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                      {airlines.map((airline, index) => (
                        <motion.div
                          key={airline.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                          whileHover={{ y: -5, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="p-4 lg:p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="text-center relative z-10">
                              <motion.div 
                                className={`w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${airline.color} rounded-xl flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}
                                whileHover={{ rotate: 5 }}
                              >
                                <div className="text-2xl lg:text-3xl">{airline.logo}</div>
                              </motion.div>
                              <h4 className="font-semibold text-gray-900 text-sm lg:text-base group-hover:text-blue-600 transition-colors duration-300">{airline.name}</h4>
                              <p className="text-xs text-gray-500 mt-1">{airline.description}</p>
                              <div className="flex items-center justify-center gap-1 mt-2 lg:mt-3">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-xs lg:text-sm font-semibold">{airline.rating}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced Sidebar */}
        <div className="lg:col-span-1 space-y-6 hidden lg:block">
          {/* Enhanced Quick Booking */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 lg:sticky lg:top-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-50/30 to-blue-50/30 opacity-50"></div>
              <CardHeader className="pb-6 relative z-10">
                <CardTitle className="text-xl flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CheckCircle className="h-5 w-5 text-white" />
                  </motion.div>
                  Quick Booking
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  {[
                    { icon: <DollarSign className="h-5 w-5" />, title: "Best Prices", description: "Guaranteed lowest rates" },
                    { icon: <Clock className="h-5 w-5" />, title: "24/7 Support", description: "Round-the-clock assistance" },
                    { icon: <Shield className="h-5 w-5" />, title: "Secure Payment", description: "Safe and encrypted transactions" }
                  ].map((benefit, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="p-1 bg-green-100 rounded-lg">
                        <div className="text-green-600">
                          {benefit.icon}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{benefit.title}</p>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Travel Tips */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-indigo-50/30 opacity-50"></div>
              <CardHeader className="pb-6 relative z-10">
                <CardTitle className="text-xl flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Activity className="h-5 w-5 text-white" />
                  </motion.div>
                  Travel Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  {[
                    { bg: "bg-blue-50", text: "text-blue-800", title: "Best Time to Book", content: "Book flights 2-3 weeks in advance for domestic travel" },
                    { bg: "bg-green-50", text: "text-green-800", title: "Travel Insurance", content: "Consider travel insurance for international trips" },
                    { bg: "bg-yellow-50", text: "text-yellow-800", title: "Documentation", content: "Ensure all travel documents are valid and up-to-date" }
                  ].map((tip, index) => (
                    <motion.div 
                      key={index}
                      className={`p-4 ${tip.bg} rounded-xl`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      <p className={`text-sm ${tip.text}`}>
                        <strong>{tip.title}:</strong> {tip.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* New Premium Features Section */}
      <motion.div 
        className="hidden lg:block"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-500" />
          Travel Features
        </h3>
        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: <TrendingUp className="h-6 w-6" />, title: "Best Deals", description: "Exclusive discounts and promotional offers", color: "from-green-500 to-green-600" },
            { icon: <Shield className="h-6 w-6" />, title: "Secure Booking", description: "Bank-level security for all transactions", color: "from-blue-500 to-blue-600" },
            { icon: <Clock className="h-6 w-6" />, title: "Instant Confirmation", description: "Real-time booking confirmations", color: "from-purple-500 to-purple-600" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              whileHover={{ y: -3 }}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  return (
    <DesktopLayout>
      <FlightBookingContent />
    </DesktopLayout>
  );
};

export default FlightBooking; 