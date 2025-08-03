import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { 
  Send, 
  Receipt, 
  Gift, 
  Phone, 
  Wifi, 
  Zap, 
  Tv, 
  Ticket,
  ChevronRight,
  CreditCard,
  X,
  Search,
  User,
  ArrowRight,
  Plus,
  Loader2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DesktopLayout from "@/components/DesktopLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Mock data for recent transactions and saved billers
const recentRecipients = [
  { id: 1, name: 'John Doe', type: 'User', lastPaid: '2h ago', amount: '₦25,000', avatar: 'JD' },
  { id: 2, name: 'MTN Airtime', type: 'Airtime', lastPaid: '1d ago', amount: '₦1,000', avatar: 'MT' },
  { id: 3, name: 'IKEDC', type: 'Electricity', lastPaid: '1w ago', amount: '₦15,750', avatar: 'IK' },
];

const savedBillers = [
  { id: 1, name: 'DSTV Subscription', type: 'Cable TV', icon: Tv, color: 'text-red-500 bg-red-50' },
  { id: 2, name: 'Lagos Water', type: 'Utility', icon: Zap, color: 'text-blue-500 bg-blue-50' },
  { id: 3, name: 'Netflix', type: 'Subscription', icon: Tv, color: 'text-red-500 bg-red-50' },
];

const Payment = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showQuickPay, setShowQuickPay] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('recent');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const paymentServices = [
    {
      id: "send-money",
      title: "Send Money",
      description: "Transfer money to friends, family, or businesses instantly",
      icon: Send,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      href: "/transfer",
      badge: null,
      buttonText: "Send Money"
    },
    {
      id: "bills",
      title: "Bills",
      description: "Pay your utility bills, rent, and other recurring payments",
      icon: Receipt,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      href: "/bills",
      badge: null,
      buttonText: "Pay Bills"
    },
    {
      id: "giftcard",
      title: "Gift Cards",
      description: "Buy and sell gift cards for popular brands and retailers",
      icon: Gift,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      href: "/gift-card",
      badge: null,
      buttonText: "Buy Gift Cards"
    },
    {
      id: "airtime",
      title: "Airtime",
      description: "Purchase airtime for all major mobile networks",
      icon: Phone,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      href: "/airtime-swap",
      badge: null,
      buttonText: "Buy Airtime"
    },
    {
      id: "data",
      title: "Data",
      description: "Buy data bundles for internet connectivity",
      icon: Wifi,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-600",
      href: "/airtime-swap",
      badge: null,
      buttonText: "Buy Data"
    },
    {
      id: "electricity",
      title: "Electricity",
      description: "Pay electricity bills for your home or business",
      icon: Zap,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      href: "/bills",
      badge: null,
      buttonText: "Pay Electricity"
    },
    {
      id: "cable-tv",
      title: "Cable TV",
      description: "Pay for cable TV and satellite subscriptions",
      icon: Tv,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      href: "/bills",
      badge: null,
      buttonText: "Pay Cable TV"
    },
    {
      id: "buy-tickets",
      title: "Buy Tickets",
      description: "Purchase tickets for events, movies, and transportation",
      icon: Ticket,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
      href: "/buy-tickets",
      badge: null,
      buttonText: "Buy Tickets"
    }
  ];

  const handleQuickPay = (recipient: any) => {
    setSelectedRecipient(recipient);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount.replace(/[^0-9.]/g, '')))) return;
    
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setShowQuickPay(false);
      setSelectedRecipient(null);
      setAmount('');
      // Show success message
      alert(`Successfully sent ₦${amount} to ${selectedRecipient?.name || 'recipient'}`);
    }, 1500);
  };

  const filteredRecipients = recentRecipients.filter(recipient => 
    recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipient.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBillers = savedBillers.filter(biller => 
    biller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    biller.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const PaymentContent = () => (
    <div className="space-y-8">
      {/* Elevated Header */}
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Payments</h1>
              <p className="text-blue-100 text-lg">Fast, secure, and convenient payment solutions</p>
            </div>
            <Button 
              onClick={() => setShowQuickPay(true)}
              className="bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 px-6 py-6 text-base font-medium"
              size="lg"
            >
              <CreditCard className="h-6 w-6" />
              Quick Pay
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
          

        </div>
      </div>

      {/* Payment Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paymentServices.map((service, index) => (
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
    </div>
  );

  // Quick Pay Modal
  const QuickPayModal = () => (
    <Dialog open={showQuickPay} onOpenChange={setShowQuickPay}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">Quick Pay</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                setShowQuickPay(false);
                setSelectedRecipient(null);
                setAmount('');
              }}
              className="rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <DialogDescription>
            {!selectedRecipient 
              ? "Select a recent recipient or saved biller to pay quickly" 
              : `Paying ${selectedRecipient.name}`}
          </DialogDescription>
        </DialogHeader>

        {!selectedRecipient ? (
          <>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search recipients or billers..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex border-b mt-4">
              <button
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'recent' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('recent')}
              >
                Recent
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'saved' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('saved')}
              >
                Saved Billers
              </button>
            </div>

            <div className="mt-4 max-h-80 overflow-y-auto">
              {activeTab === 'recent' ? (
                filteredRecipients.length > 0 ? (
                  <div className="space-y-3">
                    {filteredRecipients.map((recipient) => (
                      <div 
                        key={recipient.id}
                        onClick={() => handleQuickPay(recipient)}
                        className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-medium">
                          {recipient.avatar}
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="font-medium text-gray-900">{recipient.name}</p>
                          <p className="text-xs text-gray-500">{recipient.type} • {recipient.lastPaid}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{recipient.amount}</p>
                          <p className="text-xs text-green-600">Pay again</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No recent recipients found</p>
                  </div>
                )
              ) : filteredBillers.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {filteredBillers.map((biller) => (
                    <div 
                      key={biller.id}
                      onClick={() => handleQuickPay(biller)}
                      className="flex items-center p-3 rounded-lg border hover:border-blue-300 cursor-pointer transition-colors"
                    >
                      <div className={`p-2 rounded-lg ${biller.color} mr-3`}>
                        <biller.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{biller.name}</p>
                        <p className="text-xs text-gray-500">{biller.type}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No saved billers found</p>
                  <Button variant="outline" className="mt-2" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Biller
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmitPayment}>
            <div className="space-y-6">
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 font-medium text-lg mr-3">
                  {selectedRecipient.avatar || selectedRecipient.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{selectedRecipient.name}</p>
                  <p className="text-sm text-gray-500">{selectedRecipient.type}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₦)</Label>
                <Input
                  id="amount"
                  type="text"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.]/g, '');
                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                      setAmount(value);
                    }
                  }}
                  className="text-lg font-medium py-6 px-4 text-right"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[1000, 2000, 5000, 10000].map((amt) => (
                  <Button
                    key={amt}
                    type="button"
                    variant="outline"
                    className="py-2"
                    onClick={() => setAmount(amt.toString())}
                  >
                    ₦{amt.toLocaleString()}
                  </Button>
                ))}
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full py-6" 
                  disabled={!amount || isProcessing || isNaN(Number(amount))}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ₦${amount ? Number(amount).toLocaleString() : '0.00'}`
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-full mt-2"
                  onClick={() => setSelectedRecipient(null)}
                >
                  Back to list
                </Button>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <DesktopLayout>
      <PaymentContent />
      <QuickPayModal />
    </DesktopLayout>
  );
};

export default Payment;