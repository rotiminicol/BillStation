import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Calendar,
  Download,
  Eye,
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
  TrendingUp,
  Activity,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import DesktopLayout from "@/components/DesktopLayout";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  category: string;
  status: 'success' | 'pending' | 'failed';
  date: string;
  reference: string;
  recipient?: string;
  bankName?: string;
}

const TransactionHistory = () => {
  const { category = 'all' } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);

  // Category information
  const categoryInfo = {
    all: { title: "All Transactions", icon: Activity, color: "text-blue-600", bgColor: "bg-blue-50" },
    transfer: { title: "Transfer Transactions", icon: ArrowUpDown, color: "text-green-600", bgColor: "bg-green-50" },
    bills: { title: "Bills Transactions", icon: Zap, color: "text-yellow-600", bgColor: "bg-yellow-50" },
    giftcard: { title: "Gift Card Transactions", icon: Gift, color: "text-purple-600", bgColor: "bg-purple-50" },
    airtime: { title: "Airtime Transactions", icon: Wifi, color: "text-indigo-600", bgColor: "bg-indigo-50" },
    data: { title: "Data Transactions", icon: Wifi, color: "text-cyan-600", bgColor: "bg-cyan-50" },
    electricity: { title: "Electricity Transactions", icon: Zap, color: "text-orange-600", bgColor: "bg-orange-50" },
    'cable-tv': { title: "Cable TV Transactions", icon: Tv, color: "text-red-600", bgColor: "bg-red-50" },
    'buy-tickets': { title: "Buy Tickets Transactions", icon: Ticket, color: "text-pink-600", bgColor: "bg-pink-50" },
    'flight-booking': { title: "Flight Booking Transactions", icon: Plane, color: "text-sky-600", bgColor: "bg-sky-50" },
    'hotel-booking': { title: "Hotel Booking Transactions", icon: Hotel, color: "text-emerald-600", bgColor: "bg-emerald-50" },
    'chauffeur-service': { title: "Chauffeur Service Transactions", icon: Car, color: "text-violet-600", bgColor: "bg-violet-50" },
    'book-ride': { title: "Book Ride Transactions", icon: Car, color: "text-teal-600", bgColor: "bg-teal-50" },
    'crypto-trading': { title: "Crypto Trading Transactions", icon: Bitcoin, color: "text-amber-600", bgColor: "bg-amber-50" },
    'convert-asset': { title: "Convert Asset Transactions", icon: TrendingUp, color: "text-lime-600", bgColor: "bg-lime-50" },
    'virtual-card': { title: "Virtual Card Transactions", icon: CreditCard, color: "text-rose-600", bgColor: "bg-rose-50" }
  };

  const currentCategory = categoryInfo[category as keyof typeof categoryInfo] || categoryInfo.all;

  // Mock transaction data
  const mockTransactions: Transaction[] = [
    {
      id: "1",
      type: "debit",
      amount: 50000,
      description: "Transfer to John Doe",
      category: "transfer",
      status: "success",
      date: "2024-01-15T10:30:00Z",
      reference: "TXN_001",
      recipient: "John Doe"
    },
    {
      id: "2",
      type: "credit",
      amount: 25000,
      description: "Payment received from Jane Smith",
      category: "transfer",
      status: "success",
      date: "2024-01-14T15:45:00Z",
      reference: "TXN_002",
      recipient: "Jane Smith"
    },
    {
      id: "3",
      type: "debit",
      amount: 15000,
      description: "Electricity bill payment",
      category: "electricity",
      status: "success",
      date: "2024-01-13T09:20:00Z",
      reference: "TXN_003"
    },
    {
      id: "4",
      type: "debit",
      amount: 5000,
      description: "Airtime purchase - MTN",
      category: "airtime",
      status: "success",
      date: "2024-01-12T14:15:00Z",
      reference: "TXN_004"
    },
    {
      id: "5",
      type: "debit",
      amount: 8000,
      description: "Data bundle - 5GB",
      category: "data",
      status: "success",
      date: "2024-01-11T11:30:00Z",
      reference: "TXN_005"
    },
    {
      id: "6",
      type: "debit",
      amount: 12000,
      description: "Cable TV subscription",
      category: "cable-tv",
      status: "pending",
      date: "2024-01-10T16:45:00Z",
      reference: "TXN_006"
    },
    {
      id: "7",
      type: "debit",
      amount: 45000,
      description: "Gift card purchase - Amazon",
      category: "giftcard",
      status: "success",
      date: "2024-01-09T13:20:00Z",
      reference: "TXN_007"
    },
    {
      id: "8",
      type: "debit",
      amount: 280000,
      description: "Flight booking - Lagos to London",
      category: "flight-booking",
      status: "success",
      date: "2024-01-08T08:30:00Z",
      reference: "TXN_008"
    },
    {
      id: "9",
      type: "debit",
      amount: 120000,
      description: "Hotel booking - Hilton Hotel",
      category: "hotel-booking",
      status: "success",
      date: "2024-01-07T12:15:00Z",
      reference: "TXN_009"
    },
    {
      id: "10",
      type: "debit",
      amount: 85000,
      description: "Chauffeur service",
      category: "chauffeur-service",
      status: "success",
      date: "2024-01-06T10:45:00Z",
      reference: "TXN_010"
    },
    {
      id: "11",
      type: "debit",
      amount: 65000,
      description: "Ride booking - Uber",
      category: "book-ride",
      status: "success",
      date: "2024-01-05T17:30:00Z",
      reference: "TXN_011"
    },
    {
      id: "12",
      type: "debit",
      amount: 450000,
      description: "Bitcoin purchase",
      category: "crypto-trading",
      status: "success",
      date: "2024-01-04T14:20:00Z",
      reference: "TXN_012"
    },
    {
      id: "13",
      type: "debit",
      amount: 180000,
      description: "Currency conversion - USD to NGN",
      category: "convert-asset",
      status: "success",
      date: "2024-01-03T11:10:00Z",
      reference: "TXN_013"
    },
    {
      id: "14",
      type: "debit",
      amount: 220000,
      description: "Virtual card transaction",
      category: "virtual-card",
      status: "success",
      date: "2024-01-02T09:45:00Z",
      reference: "TXN_014"
    },
    {
      id: "15",
      type: "debit",
      amount: 45000,
      description: "Event ticket - Concert",
      category: "buy-tickets",
      status: "success",
      date: "2024-01-01T20:15:00Z",
      reference: "TXN_015"
    }
  ];

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Filter transactions by category if not "all"
        const filtered = category === 'all' 
          ? mockTransactions 
          : mockTransactions.filter(t => t.category === category);
        
        setTransactions(filtered);
        setFilteredTransactions(filtered);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        toast({
          title: "Error",
          description: "Failed to load transaction history",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [category, toast]);

  // Filter and search transactions
  useEffect(() => {
    let filtered = transactions;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.recipient && t.recipient.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(t => t.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(t => t.type === typeFilter);
    }

    // Sort transactions
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
    });

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, statusFilter, typeFilter, sortBy, sortOrder]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'credit' ? 'text-green-600' : 'text-red-600';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportTransactions = () => {
    // Simulate export functionality
    toast({
      title: "Export Started",
      description: "Your transaction history is being exported...",
    });
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
              onClick={() => navigate('/transactions')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Transactions
            </Button>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${currentCategory.bgColor}`}>
                <currentCategory.icon className={`h-5 w-5 ${currentCategory.color}`} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{currentCategory.title}</h1>
                <p className="text-gray-600 text-sm">{filteredTransactions.length} transactions found</p>
              </div>
            </div>
          </div>
          <Button onClick={exportTransactions} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>

              {/* Sort */}
              <Button
                variant="outline"
                onClick={() => {
                  setSortBy(sortBy === 'date' ? 'amount' : 'date');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
                className="flex items-center gap-2"
              >
                <ArrowUpDown className="h-4 w-4" />
                {sortBy === 'date' ? 'Date' : 'Amount'}
                {sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Status Filter */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">All Status</option>
                      <option value="success">Success</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>

                  {/* Type Filter */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Type</label>
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">All Types</option>
                      <option value="credit">Credit</option>
                      <option value="debit">Debit</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Transactions List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading transactions...</p>
            </div>
          ) : filteredTransactions.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                <Button onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setTypeFilter('all');
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          transaction.type === 'credit' ? 'bg-green-50' : 'bg-red-50'
                        }`}>
                          <ArrowUpDown className={`h-6 w-6 ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{transaction.description}</h3>
                          <p className="text-sm text-gray-500">Ref: {transaction.reference}</p>
                          {transaction.recipient && (
                            <p className="text-sm text-gray-500">To: {transaction.recipient}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`text-lg font-bold ${getTypeColor(transaction.type)}`}>
                          {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                        <Badge className={`mt-2 ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </DesktopLayout>
  );
};

export default TransactionHistory; 