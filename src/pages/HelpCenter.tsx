import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  ChevronDown,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Shield,
  CreditCard,
  Smartphone,
  Zap,
  Gift,
  Plane,
  Hotel,
  Car,
  Bitcoin,
  TrendingUp,
  Users,
  Settings,
  Lock,
  Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DesktopLayout from "@/components/DesktopLayout";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface SupportCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  articleCount: number;
}

const HelpCenter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const supportCategories: SupportCategory[] = [
    {
      id: "account",
      title: "Account & Security",
      description: "Account management, security, and authentication",
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      articleCount: 12
    },
    {
      id: "payments",
      title: "Payments & Transfers",
      description: "Money transfers, payments, and transaction issues",
      icon: CreditCard,
      color: "text-green-600",
      bgColor: "bg-green-50",
      articleCount: 18
    },
    {
      id: "bills",
      title: "Bills & Utilities",
      description: "Bill payments, airtime, data, and utilities",
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      articleCount: 15
    },
    {
      id: "giftcards",
      title: "Gift Cards",
      description: "Gift card purchases and redemption",
      icon: Gift,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      articleCount: 8
    },
    {
      id: "travel",
      title: "Travel Services",
      description: "Flight bookings, hotels, and travel assistance",
      icon: Plane,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      articleCount: 14
    },
    {
      id: "crypto",
      title: "Crypto & Trading",
      description: "Cryptocurrency trading and asset conversion",
      icon: Bitcoin,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      articleCount: 10
    },
    {
      id: "cards",
      title: "Virtual Cards",
      description: "Virtual card creation and management",
      icon: CreditCard,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      articleCount: 9
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "App notifications and alerts",
      icon: Bell,
      color: "text-red-600",
      bgColor: "bg-red-50",
      articleCount: 6
    }
  ];

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How do I reset my password?",
      answer: "To reset your password, go to the login page and click 'Forgot Password'. Enter your email address and follow the instructions sent to your email. You can also reset your password from the Settings page in your account.",
      category: "account"
    },
    {
      id: "2",
      question: "How long do transfers take to complete?",
      answer: "Most transfers are completed instantly. Bank transfers typically take 1-3 business days depending on the bank. International transfers may take 2-5 business days. You'll receive a notification once the transfer is completed.",
      category: "payments"
    },
    {
      id: "3",
      question: "What are the transfer limits?",
      answer: "Transfer limits depend on your account tier. Tier 1 users can transfer up to ₦50,000 daily, Tier 2 up to ₦100,000, and Tier 3 up to ₦500,000. You can upgrade your tier from the Account page.",
      category: "payments"
    },
    {
      id: "4",
      question: "How do I enable two-factor authentication?",
      answer: "Go to Settings > Security Settings and toggle on 'Two-Factor Authentication'. You'll need to download an authenticator app like Google Authenticator and scan the QR code to complete setup.",
      category: "account"
    },
    {
      id: "5",
      question: "Can I cancel a transaction?",
      answer: "You can only cancel pending transactions. Once a transaction is completed, it cannot be cancelled. To cancel a pending transaction, go to Transactions and click on the transaction, then select 'Cancel'.",
      category: "payments"
    },
    {
      id: "6",
      question: "How do I buy airtime or data?",
      answer: "Go to the Payment page and select 'Buy Airtime' or 'Buy Data'. Choose your network provider, enter the phone number, select the amount or data plan, and confirm the purchase.",
      category: "bills"
    },
    {
      id: "7",
      question: "What payment methods are accepted?",
      answer: "We accept bank transfers, debit cards, and credit cards. You can also fund your wallet using our supported payment gateways. All payments are processed securely.",
      category: "payments"
    },
    {
      id: "8",
      question: "How do I create a virtual card?",
      answer: "Go to the Cards page and select 'Create Virtual Card'. Choose your card type, set your spending limit, and confirm. Your virtual card will be generated instantly and can be used for online purchases.",
      category: "cards"
    },
    {
      id: "9",
      question: "How do I book a flight?",
      answer: "Go to Our Station > Flight Booking. Enter your departure and destination cities, select your travel dates, choose your flight, and complete the booking with your payment method.",
      category: "travel"
    },
    {
      id: "10",
      question: "How do I contact customer support?",
      answer: "You can contact us through live chat, email at support@billstation.com, or call us at +234 800 123 4567. Our support team is available 24/7 to assist you.",
      category: "account"
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactSupport = (method: string) => {
    toast({
      title: "Contact Support",
      description: `Redirecting you to ${method} support...`,
    });
  };

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <DesktopLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/account')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Account
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <HelpCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Help Center</h1>
                <p className="text-gray-600 text-sm">Find answers to your questions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleContactSupport('Live Chat')}>
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Live Chat</h3>
                <p className="text-sm text-gray-600">Chat with our support team</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleContactSupport('Phone')}>
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                <p className="text-sm text-gray-600">+234 800 123 4567</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleContactSupport('Email')}>
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Email Support</h3>
                <p className="text-sm text-gray-600">support@billstation.com</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Support Categories */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Help Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer hover:shadow-md transition-all duration-300 ${
                    selectedCategory === category.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.bgColor}`}>
                        <category.icon className={`h-5 w-5 ${category.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{category.title}</h3>
                        <p className="text-xs text-gray-500">{category.articleCount} articles</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            {selectedCategory && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                Clear Filter
              </Button>
            )}
          </div>
          
          <div className="space-y-3">
            {filteredFAQs.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search terms or category filter</p>
                  <Button onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                  }}>
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => toggleFAQ(faq.id)}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                          {expandedFAQ === faq.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-gray-600 text-sm leading-relaxed"
                            >
                              {faq.answer}
                            </motion.div>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" className="ml-4">
                          {expandedFAQ === faq.id ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Additional Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Additional Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <FileText className="h-6 w-6 text-gray-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">User Guide</h3>
                  <p className="text-sm text-gray-600">Complete guide to using our platform</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
              </div>
              
              <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <Shield className="h-6 w-6 text-gray-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Security Guide</h3>
                  <p className="text-sm text-gray-600">Tips for keeping your account secure</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DesktopLayout>
  );
};

export default HelpCenter; 