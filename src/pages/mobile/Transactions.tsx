import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight, ArrowDownLeft, CreditCard, Building2, Plane, Gift, RefreshCw, Filter, Search, ArrowRight } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  category: 'transfer' | 'bills' | 'airtime' | 'crypto' | 'flight' | 'gift-card' | 'hotel' | 'chauffeur';
  amount: number;
  description: string;
  recipient?: string;
  sender?: string;
  date: string;
  time: string;
  status: 'success' | 'pending' | 'failed';
  reference: string;
  fee?: number;
  balance: number;
}

const Transactions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "all");
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "all");
  const [dateFilter, setDateFilter] = useState(searchParams.get("date") || "all");
  const { toast } = useToast();

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "success", label: "Successful" },
    { value: "pending", label: "Pending" },
    { value: "failed", label: "Failed" },
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "transfer", label: "Transfer" },
    { value: "bills", label: "Bills" },
    { value: "airtime", label: "Airtime Swap" },
    { value: "crypto", label: "Crypto Trading" },
    { value: "flight", label: "Flight Booking" },
    { value: "gift-card", label: "Gift Cards" },
    { value: "hotel", label: "Hotel Booking" },
    { value: "chauffeur", label: "Chauffeur Service" },
  ];

  const dateOptions = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "year", label: "This Year" },
  ];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock transactions data
        const mockTransactions: Transaction[] = [
          {
            id: "1",
            type: "debit",
            category: "transfer",
            amount: 250.00,
            description: "Transfer to John Doe",
            recipient: "john.doe@email.com",
            date: "2024-01-15",
            time: "14:30",
            status: "success",
            reference: "TXN-2024-001",
            fee: 2.50,
            balance: 1250.00
          },
          {
            id: "2",
            type: "credit",
            category: "transfer",
            amount: 500.00,
            description: "Received from Jane Smith",
            sender: "jane.smith@email.com",
            date: "2024-01-14",
            time: "09:15",
            status: "success",
            reference: "TXN-2024-002",
            balance: 1500.00
          },
          {
            id: "3",
            type: "debit",
            category: "bills",
            amount: 120.50,
            description: "Electricity Bill Payment",
            recipient: "PHCN",
            date: "2024-01-13",
            time: "16:45",
            status: "success",
            reference: "TXN-2024-003",
            fee: 1.20,
            balance: 1379.50
          },
          {
            id: "4",
            type: "debit",
            category: "airtime",
            amount: 100.00,
            description: "Airtime Swap MTN to Airtel",
            recipient: "08012345678",
            date: "2024-01-12",
            time: "11:20",
            status: "success",
            reference: "TXN-2024-004",
            fee: 5.00,
            balance: 1279.50
          },
          {
            id: "5",
            type: "debit",
            category: "crypto",
            amount: 1000.00,
            description: "Bitcoin Purchase",
            recipient: "BTC Wallet",
            date: "2024-01-11",
            time: "13:10",
            status: "pending",
            reference: "TXN-2024-005",
            fee: 10.00,
            balance: 279.50
          },
          {
            id: "6",
            type: "debit",
            category: "flight",
            amount: 450.00,
            description: "Flight Booking Lagos to Abuja",
            recipient: "Air Nigeria",
            date: "2024-01-10",
            time: "08:30",
            status: "success",
            reference: "TXN-2024-006",
            fee: 4.50,
            balance: 825.00
          },
          {
            id: "7",
            type: "debit",
            category: "gift-card",
            amount: 50.00,
            description: "Amazon Gift Card",
            recipient: "john@example.com",
            date: "2024-01-09",
            time: "15:45",
            status: "success",
            reference: "TXN-2024-007",
            fee: 2.50,
            balance: 775.00
          },
          {
            id: "8",
            type: "debit",
            category: "hotel",
            amount: 200.00,
            description: "Hotel Booking - Lagos",
            recipient: "Sheraton Hotel",
            date: "2024-01-08",
            time: "12:00",
            status: "failed",
            reference: "TXN-2024-008",
            fee: 2.00,
            balance: 575.00
          }
        ];
        
        setTransactions(mockTransactions);
        setFilteredTransactions(mockTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        toast({
          title: "Error",
          description: "Failed to load transactions",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [toast]);

  useEffect(() => {
    let filtered = transactions;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(txn => 
        txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (txn.recipient && txn.recipient.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (txn.sender && txn.sender.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter(txn => txn.status === statusFilter);
    }

    // Apply category filter
    if (categoryFilter && categoryFilter !== 'all') {
      filtered = filtered.filter(txn => txn.category === categoryFilter);
    }

    // Apply date filter
    if (dateFilter && dateFilter !== 'all') {
      const today = new Date();
      const transactionDate = new Date();
      
      filtered = filtered.filter(txn => {
        const txnDate = new Date(txn.date);
        
        switch (dateFilter) {
          case 'today':
            return txnDate.toDateString() === today.toDateString();
          case 'week':
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            return txnDate >= weekAgo;
          case 'month':
            return txnDate.getMonth() === today.getMonth() && txnDate.getFullYear() === today.getFullYear();
          case 'year':
            return txnDate.getFullYear() === today.getFullYear();
          default:
            return true;
        }
      });
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, statusFilter, categoryFilter, dateFilter]);

  // Update URL parameters when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (categoryFilter !== 'all') params.set('category', categoryFilter);
    if (dateFilter !== 'all') params.set('date', dateFilter);
    setSearchParams(params);
  }, [statusFilter, categoryFilter, dateFilter, setSearchParams]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transfer':
        return ArrowUpRight;
      case 'bills':
        return Building2;
      case 'airtime':
        return RefreshCw;
      case 'crypto':
        return CreditCard;
      case 'flight':
        return Plane;
      case 'gift-card':
        return Gift;
      case 'hotel':
        return Building2;
      case 'chauffeur':
        return CreditCard;
      default:
        return CreditCard;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'transfer':
        return 'bg-[#0B63BC]/10 text-[#0B63BC]';
      case 'bills':
        return 'bg-yellow-100 text-yellow-600';
      case 'airtime':
        return 'bg-green-100 text-green-600';
      case 'crypto':
        return 'bg-orange-100 text-orange-600';
      case 'flight':
        return 'bg-purple-100 text-purple-600';
      case 'gift-card':
        return 'bg-pink-100 text-pink-600';
      case 'hotel':
        return 'bg-indigo-100 text-indigo-600';
      case 'chauffeur':
        return 'bg-teal-100 text-teal-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center h-full">
          <Loader text="Loading transactions..." />
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
            <p className="text-sm text-gray-600 mt-1">
              View and manage your transaction history
            </p>
          </div>

          {/* Stats Card */}
          <MobileCard className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
            <div className="text-center mb-4">
              <p className="text-sm text-blue-100 mb-2">Total Transactions</p>
              <h2 className="text-3xl font-bold">{transactions.length}</h2>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-white/20">
              <div>
                <p className="text-xs text-blue-200">This Month</p>
                <p className="text-sm font-medium">{transactions.filter(t => new Date(t.date).getMonth() === new Date().getMonth()).length}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-blue-200">Success Rate</p>
                <p className="text-sm font-medium">
                  {Math.round((transactions.filter(t => t.status === 'success').length / transactions.length) * 100)}%
                </p>
              </div>
            </div>
          </MobileCard>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="text-xs">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="text-xs">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                {dateOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => {
              const CategoryIcon = getCategoryIcon(transaction.category);
              return (
                <Link key={transaction.id} to={`/transactions/${transaction.id}`}>
                  <MobileCard className="hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full ${getCategoryColor(transaction.category)} flex items-center justify-center`}>
                          <CategoryIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-xs text-gray-500">
                            {transaction.date} • {transaction.time} • {transaction.reference}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(transaction.status)}`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </MobileCard>
                </Link>
              );
            })
          ) : (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No transactions found</p>
              <p className="text-gray-400 text-xs mt-1">
                {searchTerm || statusFilter || categoryFilter || dateFilter 
                  ? "Try adjusting your filters" 
                  : "Your transaction history will appear here"
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Transactions; 