import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  BookOpen,
  FileText,
  Video,
  Users,
  Shield,
  CreditCard,
  Smartphone,
  Globe,
  Zap,
  Star,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  Headphones,
  AlertCircle,
  CheckCircle,
  Info,
  Lightbulb,
  Settings,
  User,
  Lock,
  Bell,
  Camera,
  Download,
  Upload,
  Trash2,
  Edit,
  Plus,
  Minus
} from "lucide-react";
import DesktopLayout from "@/components/DesktopLayout";
import { useToast } from "@/hooks/use-toast";

const HelpCenter = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const categories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      articles: [
        {
          id: "create-account",
          title: "How to create an account",
          description: "Step-by-step guide to create your Bill Station account",
          readTime: "3 min read"
        },
        {
          id: "verify-account",
          title: "Account verification process",
          description: "Complete guide to verifying your account",
          readTime: "5 min read"
        },
        {
          id: "first-transfer",
          title: "Making your first transfer",
          description: "Learn how to make your first money transfer",
          readTime: "4 min read"
        }
      ]
    },
    {
      id: "security",
      title: "Security & Privacy",
      icon: Shield,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      articles: [
        {
          id: "two-factor-auth",
          title: "Setting up two-factor authentication",
          description: "Secure your account with 2FA",
          readTime: "4 min read"
        },
        {
          id: "password-security",
          title: "Password security best practices",
          description: "Keep your account safe with strong passwords",
          readTime: "3 min read"
        },
        {
          id: "suspicious-activity",
          title: "Reporting suspicious activity",
          description: "What to do if you notice suspicious activity",
          readTime: "2 min read"
        }
      ]
    },
    {
      id: "transactions",
      title: "Transactions & Payments",
      icon: CreditCard,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      articles: [
        {
          id: "transfer-limits",
          title: "Understanding transfer limits",
          description: "Learn about daily and monthly transfer limits",
          readTime: "3 min read"
        },
        {
          id: "failed-transactions",
          title: "Failed transaction troubleshooting",
          description: "Common reasons for failed transactions",
          readTime: "4 min read"
        },
        {
          id: "transaction-fees",
          title: "Transaction fees explained",
          description: "Understanding our fee structure",
          readTime: "3 min read"
        }
      ]
    },
    {
      id: "features",
      title: "Features & Services",
      icon: Zap,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      articles: [
        {
          id: "virtual-cards",
          title: "Using virtual cards",
          description: "Create and manage virtual cards",
          readTime: "5 min read"
        },
        {
          id: "crypto-trading",
          title: "Crypto trading guide",
          description: "How to buy and sell cryptocurrencies",
          readTime: "6 min read"
        },
        {
          id: "travel-services",
          title: "Travel booking services",
          description: "Book flights, hotels, and more",
          readTime: "4 min read"
        }
      ]
    }
  ];

  const faqs = [
    {
      id: "faq1",
      question: "How do I reset my password?",
      answer: "To reset your password, go to the login page and click 'Forgot Password'. Enter your email address and follow the instructions sent to your email. Make sure to check your spam folder if you don't receive the email immediately."
    },
    {
      id: "faq2",
      question: "What are the transfer limits?",
      answer: "Transfer limits depend on your account tier. Basic tier allows ₦50,000 daily, Premium tier allows ₦500,000 daily, and VIP tier allows ₦5,000,000 daily. You can upgrade your tier anytime from the account settings."
    },
    {
      id: "faq3",
      question: "How long do transfers take?",
      answer: "Most transfers are processed instantly. However, some transfers may take 1-3 business days depending on the recipient bank and transfer method. International transfers typically take 2-5 business days."
    },
    {
      id: "faq4",
      question: "Is my money safe?",
      answer: "Yes, your money is completely safe. We use bank-level security encryption and are regulated by financial authorities. All funds are held in secure accounts and protected by multiple security layers."
    },
    {
      id: "faq5",
      question: "Can I cancel a transfer?",
      answer: "Transfers can only be cancelled if they haven't been processed yet. Once a transfer is completed, it cannot be cancelled. Contact our support team immediately if you need to cancel a pending transfer."
    },
    {
      id: "faq6",
      question: "How do I contact customer support?",
      answer: "You can contact our support team through multiple channels: Live chat (available 24/7), email at support@billstation.com, or phone at +234 800 BILL STATION. Response times vary by channel and your account tier."
    }
  ];

  const supportChannels = [
    {
      id: "live-chat",
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      color: "from-blue-500 to-blue-600",
      available: true,
      responseTime: "Instant",
      hours: "24/7"
    },
    {
      id: "phone",
      title: "Phone Support",
      description: "Speak directly with our support team",
      icon: Phone,
      color: "from-green-500 to-green-600",
      available: true,
      responseTime: "Immediate",
      hours: "8AM - 8PM (WAT)"
    },
    {
      id: "email",
      title: "Email Support",
      description: "Send us a detailed message",
      icon: Mail,
      color: "from-purple-500 to-purple-600",
      available: true,
      responseTime: "Within 24 hours",
      hours: "24/7"
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, this would filter articles and FAQs
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const handleContactSupport = (channel: string) => {
    toast({
      title: "Contact Support",
      description: `Connecting you to ${channel} support...`,
    });
  };

  return (
    <DesktopLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <HelpCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Help Center</h1>
              <p className="text-gray-600 text-sm">Find answers to your questions and get support</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Support Available
          </Badge>
        </div>

        {/* Search Bar */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-gray-200 focus:border-blue-500"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-500">Popular searches:</span>
              {["password reset", "transfer limits", "account verification", "fees"].map((term) => (
                <Button
                  key={term}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSearch(term)}
                  className="text-xs"
                >
                  {term}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportChannels.map((channel) => (
            <Card 
              key={channel.id} 
              className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleContactSupport(channel.title)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 bg-gradient-to-r ${channel.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <channel.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{channel.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{channel.description}</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>Response: {channel.responseTime}</p>
                  <p>Hours: {channel.hours}</p>
                </div>
                <Button 
                  className={`mt-4 w-full bg-gradient-to-r ${channel.color} hover:opacity-90`}
                >
                  Contact {channel.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Categories */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Help Categories</h2>
          {categories.map((category) => (
            <Card key={category.id} className="border-0 shadow-lg">
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}>
                      <category.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <p className="text-sm text-gray-500">{category.articles.length} articles</p>
                    </div>
                  </div>
                  {expandedCategory === category.id ? (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </CardHeader>
              
              {expandedCategory === category.id && (
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.articles.map((article) => (
                      <div 
                        key={article.id}
                        className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
                      >
                        <h4 className="font-semibold text-gray-900 mb-2">{article.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{article.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{article.readTime}</span>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                            Read Article
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Frequently Asked Questions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-blue-600" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg">
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                      {expandedFAQ === faq.id ? (
                        <Minus className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Plus className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  {expandedFAQ === faq.id && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Video className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Video Tutorials</h3>
              <p className="text-sm text-gray-600 mb-4">Learn with step-by-step video guides</p>
              <Button variant="outline" size="sm" className="w-full">
                Watch Videos
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Community Forum</h3>
              <p className="text-sm text-gray-600 mb-4">Connect with other users</p>
              <Button variant="outline" size="sm" className="w-full">
                Join Forum
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Training Sessions</h3>
              <p className="text-sm text-gray-600 mb-4">Attend live training sessions</p>
              <Button variant="outline" size="sm" className="w-full">
                Book Session
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-50 to-yellow-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Tips & Tricks</h3>
              <p className="text-sm text-gray-600 mb-4">Discover useful tips and tricks</p>
              <Button variant="outline" size="sm" className="w-full">
                Read Tips
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-50 to-gray-100">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Still Need Help?</h3>
              <p className="text-gray-600 mb-6">
                Our support team is here to help you 24/7. Don't hesitate to reach out!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90"
                  onClick={() => handleContactSupport("Live Chat")}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start Live Chat
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleContactSupport("Email")}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleContactSupport("Phone")}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Us
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DesktopLayout>
  );
};

export default HelpCenter; 