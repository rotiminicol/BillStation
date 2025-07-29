
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, DollarSign, TrendingUp, Search, Sparkles, Activity, CheckCircle, ArrowRight, Star, Shield, Clock, Globe, Zap, Users, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";
import BackButton from "@/components/ui/back-button";
import { useToast } from "@/hooks/use-toast";
import { getBankLogo } from "@/lib/bankLogos";

const Cards = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [selectedGiftCard, setSelectedGiftCard] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setAnimateCards(true), 100);
  }, []);

  const giftCards = [
    { id: 'amazon', name: 'Amazon', logo: '🛒', description: 'Online shopping' },
    { id: 'steam', name: 'Steam', logo: '🎮', description: 'Gaming platform' },
    { id: 'apple', name: 'Apple', logo: '🍎', description: 'Tech products' },
    { id: 'google', name: 'Google Play', logo: '▶️', description: 'Apps & games' },
    { id: 'sephora', name: 'Sephora', logo: '💄', description: 'Beauty products' },
    { id: 'nordstrom', name: 'Nordstrom', logo: '👗', description: 'Fashion retail' },
    { id: 'nike', name: 'Nike', logo: '👟', description: 'Sports gear' },
    { id: 'vanilla', name: 'Vanilla Visa', logo: '💳', description: 'Universal gift card' },
  ];

  const handleGiftCardAction = (action: string) => {
    setLoading(true);
    setTimeout(() => {
      toast({
        title: `${action} Successful!`,
        description: `Your gift card ${action.toLowerCase()} has been processed.`,
      });
      setLoading(false);
      setAmount('');
      setSelectedGiftCard('');
    }, 2000);
  };

  const CardsContent = () => (
    <div className="space-y-8">
      {/* Enhanced Header with Animation */}
      <motion.div 
        className="flex items-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <BackButton to="/dashboard" className="mr-4" />
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Gift Cards
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
          { id: 'buy', icon: <Gift className="h-5 w-5" />, label: 'Buy Gift Cards' },
          { id: 'sell', icon: <DollarSign className="h-5 w-5" />, label: 'Sell Gift Cards' }
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
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {activeTab === 'buy' ? (
              /* Enhanced Buy Gift Cards */
              <div>
                <Card className="mb-8 border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-indigo-50/30 opacity-50"></div>
                  <CardHeader className="pb-6 relative z-10">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <motion.div 
                        className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Gift className="h-6 w-6 text-white" />
                      </motion.div>
                      Buy Gift Cards
                    </CardTitle>
                    <p className="text-gray-600 text-lg">Choose from a wide selection of popular gift cards</p>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                      {giftCards.map((card, index) => (
                        <motion.div
                          key={card.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                          whileHover={{ y: -5, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div
                            className={`p-4 lg:p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                              selectedGiftCard === card.id
                                ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl'
                                : 'border-gray-200 hover:border-gray-300 shadow-lg hover:bg-gradient-to-br from-gray-50 to-gray-100'
                            } group overflow-hidden`}
                            onClick={() => setSelectedGiftCard(card.id)}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="text-center relative z-10">
                              <motion.div 
                                className={`w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}
                                whileHover={{ rotate: 5 }}
                              >
                                <div className="text-2xl lg:text-3xl">{card.logo}</div>
                              </motion.div>
                              <h4 className="font-semibold text-gray-900 text-sm lg:text-base group-hover:text-blue-600 transition-colors duration-300">{card.name}</h4>
                              <p className="text-xs text-gray-500 mt-1">{card.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* Enhanced Sell Gift Cards */
              <div>
                <Card className="mb-8 border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-50/30 to-blue-50/30 opacity-50"></div>
                  <CardHeader className="pb-6 relative z-10">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <motion.div 
                        className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <DollarSign className="h-6 w-6 text-white" />
                      </motion.div>
                      Sell Gift Cards
                    </CardTitle>
                    <p className="text-gray-600 text-lg">Convert your unused gift cards to cash instantly</p>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                      {giftCards.map((card, index) => (
                        <motion.div
                          key={card.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                          whileHover={{ y: -5, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div
                            className={`p-4 lg:p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                              selectedGiftCard === card.id
                                ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100 shadow-xl'
                                : 'border-gray-200 hover:border-gray-300 shadow-lg hover:bg-gradient-to-br from-gray-50 to-gray-100'
                            } group overflow-hidden`}
                            onClick={() => setSelectedGiftCard(card.id)}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="text-center relative z-10">
                              <motion.div 
                                className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300"
                                whileHover={{ rotate: 5 }}
                              >
                                <div className="text-2xl lg:text-3xl">{card.logo}</div>
                              </motion.div>
                              <h4 className="font-semibold text-gray-900 text-sm lg:text-base group-hover:text-green-600 transition-colors duration-300">{card.name}</h4>
                              <p className="text-xs text-gray-500 mt-1">{card.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Enhanced Action Form */}
            <AnimatePresence>
              {selectedGiftCard && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-indigo-50/30 opacity-50"></div>
                    <CardContent className="p-8 relative z-10">
                      <motion.div 
                        className="flex items-center gap-3 mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                      >
                        <motion.div 
                          className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shadow-lg"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="text-2xl">{giftCards.find(c => c.id === selectedGiftCard)?.logo}</span>
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {activeTab === 'buy' ? 'Buy' : 'Sell'} {giftCards.find(c => c.id === selectedGiftCard)?.name} Gift Card
                          </h3>
                          <p className="text-gray-600">Enter the amount you want to {activeTab === 'buy' ? 'purchase' : 'sell'}</p>
                        </div>
                      </motion.div>

                      <div className="space-y-4">
                        <motion.div 
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.8 }}
                        >
                          <label className="text-base font-semibold">Amount (₦)</label>
                          <input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300 rounded-lg px-4 text-base"
                          />
                        </motion.div>

                        {/* Enhanced Quick Amounts */}
                        <motion.div 
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.9 }}
                        >
                          <label className="text-base font-semibold">Quick Amounts</label>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {[1000, 2000, 5000, 10000].map((quickAmount, index) => (
                              <motion.div
                                key={quickAmount}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setAmount(quickAmount.toString())}
                                  className="w-full h-12 text-base font-semibold border-2 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
                                >
                                  ₦{quickAmount.toLocaleString()}
                                </Button>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 1.1 }}
                        >
                          <Button
                            onClick={() => handleGiftCardAction(activeTab === 'buy' ? 'Purchase' : 'Sale')}
                            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            disabled={!amount || loading}
                          >
                            {loading ? (
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Processing...
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5" />
                                {activeTab === 'buy' ? 'Buy' : 'Sell'} Gift Card
                              </div>
                            )}
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Enhanced Sidebar */}
        <div className="lg:col-span-1 space-y-6 hidden lg:block">
          {/* Enhanced Benefits */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
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
                  Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  {[
                    { icon: <Zap className="h-5 w-5" />, title: "Instant Delivery", description: "Digital codes sent immediately" },
                    { icon: <Shield className="h-5 w-5" />, title: "Secure Platform", description: "Safe and encrypted transactions" },
                    { icon: <Clock className="h-5 w-5" />, title: "24/7 Service", description: "Available anytime, anywhere" }
                  ].map((benefit, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
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

          {/* Enhanced Popular Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
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
                    <ShoppingBag className="h-5 w-5 text-white" />
                  </motion.div>
                  Popular Cards
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  {giftCards.slice(0, 4).map((card, index) => (
                    <motion.div 
                      key={card.id} 
                      className="flex items-center gap-3 py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 rounded-lg px-2 transition-colors duration-200"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className={`w-8 h-8 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center`}>
                        <span className="text-white text-sm">{card.logo}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">{card.name}</span>
                        <p className="text-xs text-gray-500">{card.description}</p>
                      </div>
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
        transition={{ duration: 0.8, delay: 1 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-500" />
          Gift Card Features
        </h3>
        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: <Zap className="h-6 w-6" />, title: "Instant Delivery", description: "Digital codes sent immediately after purchase", color: "from-green-500 to-green-600" },
            { icon: <Shield className="h-6 w-6" />, title: "Secure Platform", description: "Bank-level security for all transactions", color: "from-blue-500 to-blue-600" },
            { icon: <Users className="h-6 w-6" />, title: "Wide Selection", description: "Hundreds of popular brands available", color: "from-purple-500 to-purple-600" }
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
      <CardsContent />
    </DesktopLayout>
  );
};

export default Cards;
