import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowUpDown, 
  Plane, 
  Hotel, 
  Car, 
  CreditCard, 
  Gift, 
  Wifi, 
  Zap, 
  Tv, 
  Ticket, 
  Bitcoin, 
  DollarSign,
  TrendingUp,
  Activity,
  Calendar,
  Filter,
  Search
} from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";

const Transactions = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const transactionCategories = [
    {
      id: "all",
      title: "All Transactions",
      description: "View all your transactions across all services",
      icon: Activity,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      href: "/transactions/all",
      count: 156,
      totalAmount: "₦2,450,000"
    },
    {
      id: "transfer",
      title: "Transfer Transactions",
      description: "Money transfers and payments",
      icon: ArrowUpDown,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      href: "/transactions/transfer",
      count: 45,
      totalAmount: "₦850,000"
    },
    {
      id: "bills",
      title: "Bills Transactions",
      description: "Utility and bill payments",
      icon: Zap,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      href: "/transactions/bills",
      count: 23,
      totalAmount: "₦125,000"
    },
    {
      id: "giftcard",
      title: "Gift Card Transactions",
      description: "Gift card purchases and sales",
      icon: Gift,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      href: "/transactions/giftcard",
      count: 18,
      totalAmount: "₦320,000"
    },
    {
      id: "airtime",
      title: "Airtime Transactions",
      description: "Airtime purchases and swaps",
      icon: Wifi,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
      href: "/transactions/airtime",
      count: 32,
      totalAmount: "₦95,000"
    },
    {
      id: "data",
      title: "Data Transactions",
      description: "Data bundle purchases",
      icon: Wifi,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-600",
      href: "/transactions/data",
      count: 28,
      totalAmount: "₦180,000"
    },
    {
      id: "electricity",
      title: "Electricity Transactions",
      description: "Electricity bill payments",
      icon: Zap,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      href: "/transactions/electricity",
      count: 15,
      totalAmount: "₦75,000"
    },
    {
      id: "cable-tv",
      title: "Cable TV Transactions",
      description: "Cable TV subscription payments",
      icon: Tv,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      href: "/transactions/cable-tv",
      count: 12,
      totalAmount: "₦60,000"
    },
    {
      id: "buy-tickets",
      title: "Buy Tickets Transactions",
      description: "Event and entertainment tickets",
      icon: Ticket,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
      href: "/transactions/buy-tickets",
      count: 8,
      totalAmount: "₦45,000"
    },
    {
      id: "flight-booking",
      title: "Flight Booking Transactions",
      description: "Flight and travel bookings",
      icon: Plane,
      color: "from-sky-500 to-sky-600",
      bgColor: "bg-sky-50",
      iconColor: "text-sky-600",
      href: "/transactions/flight-booking",
      count: 6,
      totalAmount: "₦280,000"
    },
    {
      id: "hotel-booking",
      title: "Hotel Booking Transactions",
      description: "Hotel and accommodation bookings",
      icon: Hotel,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      href: "/transactions/hotel-booking",
      count: 4,
      totalAmount: "₦120,000"
    },
    {
      id: "chauffeur-service",
      title: "Chauffeur Service Transactions",
      description: "Chauffeur and transportation services",
      icon: Car,
      color: "from-violet-500 to-violet-600",
      bgColor: "bg-violet-50",
      iconColor: "text-violet-600",
      href: "/transactions/chauffeur-service",
      count: 3,
      totalAmount: "₦85,000"
    },
    {
      id: "book-ride",
      title: "Book Ride Transactions",
      description: "Ride booking and transportation",
      icon: Car,
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
      href: "/transactions/book-ride",
      count: 7,
      totalAmount: "₦65,000"
    },
    {
      id: "crypto-trading",
      title: "Crypto Trading Transactions",
      description: "Cryptocurrency trading activities",
      icon: Bitcoin,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      href: "/transactions/crypto-trading",
      count: 25,
      totalAmount: "₦450,000"
    },
    {
      id: "convert-asset",
      title: "Convert Asset Transactions",
      description: "Asset conversion and exchange",
      icon: TrendingUp,
      color: "from-lime-500 to-lime-600",
      bgColor: "bg-lime-50",
      iconColor: "text-lime-600",
      href: "/transactions/convert-asset",
      count: 9,
      totalAmount: "₦180,000"
    },
    {
      id: "virtual-card",
      title: "Virtual Card Transactions",
      description: "Virtual card usage and transactions",
      icon: CreditCard,
      color: "from-rose-500 to-rose-600",
      bgColor: "bg-rose-50",
      iconColor: "text-rose-600",
      href: "/transactions/virtual-card",
      count: 14,
      totalAmount: "₦220,000"
    }
  ];

  const TransactionsContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-sm text-gray-600">View and manage all your transaction history</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
          </div>
          
             {/* Transaction Categories Grid */}
       <div className="grid grid-cols-1 gap-4">
         {transactionCategories.map((category, index) => (
           <MobileCard
             key={category.id}
             className={`group cursor-pointer transition-all duration-500 ease-out hover:scale-102 active:scale-98 border-0 bg-white/90 backdrop-blur-sm ${
               selectedCategory === category.id 
                 ? 'ring-2 ring-blue-500 border-blue-500 shadow-lg scale-102' 
                 : 'hover:border-gray-200/50'
             }`}
             style={{
               animationDelay: `${index * 30}ms`
             }}
             onClick={() => setSelectedCategory(category.id)}
           >
             <div className="p-5 relative overflow-hidden">
               {/* Subtle gradient overlay */}
               <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
               
               {/* Icon with enhanced styling */}
               <div className="flex items-center justify-between mb-4">
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${category.bgColor} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                   <category.icon className={`h-6 w-6 ${category.iconColor} group-hover:rotate-12 transition-transform duration-300`} />
                 </div>
                 <div className="text-right">
                   <p className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">{category.count}</p>
                   <p className="text-xs text-gray-500">transactions</p>
          </div>
        </div>

               {/* Content with better spacing */}
        <div className="space-y-3">
                 <h3 className="font-bold text-gray-900 text-base group-hover:text-gray-800 transition-colors">{category.title}</h3>
                 <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
                 <div className="pt-2">
                   <p className="text-lg font-bold text-gray-900 group-hover:text-gray-800 transition-colors">{category.totalAmount}</p>
                   <p className="text-xs text-gray-500 font-medium">Total amount</p>
                        </div>
                      </div>

               {/* Enhanced button */}
               <div className="mt-5 pt-3 border-t border-gray-100/50">
                 <Button 
                   variant="outline" 
                   size="sm" 
                   className="w-full group-hover:bg-gray-50 group-hover:border-gray-300 transition-all duration-300 font-medium"
                   asChild
                 >
                   <Link to={category.href} className="flex items-center justify-center gap-2">
                     View All
                     <ArrowUpDown className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                   </Link>
                 </Button>
                      </div>
                    </div>
                  </MobileCard>
         ))}
            </div>


        </div>
  );

  return (
    <MobileLayout>
      <TransactionsContent />
    </MobileLayout>
  );
};

export default Transactions; 