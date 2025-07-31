import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight, ArrowDownLeft, CreditCard, Building2, Plane, Gift, RefreshCw, Filter, Search, ArrowRight, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import DesktopLayout from "@/components/DesktopLayout";
import Navigation from "@/components/Navigation";

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
        await new Promise(resolve => setTimeout(resolve, 1000));
        
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
            amount: 100.00,
            description: "Electricity Bill Payment",
            date: "2024-01-13",
            time: "16:45",
            status: "success",
            reference: "TXN-2024-003",
            fee: 1.00,
            balance: 1400.00
          },
          {
            id: "4",
            type: "debit",
            category: "airtime",
            amount: 50.00,
            description: "Airtime Purchase - MTN",
            date: "2024-01-12",
            time: "11:20",
            status: "success",
            reference: "TXN-2024-004",
            fee: 0.50,
            balance: 1350.00
          },
          {
            id: "5",
            type: "credit",
            category: "crypto",
            amount: 750.00,
            description: "Bitcoin Sale",
            date: "2024-01-11",
            time: "13:10",
            status: "success",
            reference: "TXN-2024-005",
            balance: 1400.00
          },
          {
            id: "6",
            type: "debit",
            category: "flight",
            amount: 1200.00,
            description: "Flight Booking - Lagos to Abuja",
            date: "2024-01-10",
            time: "08:30",
            status: "success",
            reference: "TXN-2024-006",
            fee: 12.00,
            balance: 200.00
          },
          {
            id: "7",
            type: "debit",
            category: "gift-card",
            amount: 200.00,
            description: "Amazon Gift Card Purchase",
            date: "2024-01-09",
            time: "15:45",
            status: "success",
            reference: "TXN-2024-007",
            fee: 2.00,
            balance: 0.00
          },
          {
            id: "8",
            type: "debit",
            category: "hotel",
            amount: 800.00,
            description: "Hotel Booking - Sheraton Lagos",
            date: "2024-01-08",
            time: "10:15",
            status: "success",
            reference: "TXN-2024-008",
            fee: 8.00,
            balance: -800.00
          },
          {
            id: "9",
            type: "debit",
            category: "chauffeur",
            amount: 150.00,
            description: "Chauffeur Service - Airport Transfer",
            date: "2024-01-07",
            time: "07:00",
            status: "success",
            reference: "TXN-2024-009",
            fee: 1.50,
            balance: -950.00
          },
          {
            id: "10",
            type: "credit",
            category: "transfer",
            amount: 1000.00,
            description: "Salary Credit",
            sender: "company@email.com",
            date: "2024-01-06",
            time: "09:00",
            status: "success",
            reference: "TXN-2024-010",
            balance: 50.00
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
      }
    };

    fetchTransactions();
  }, [toast]);

  useEffect(() => {
    let filtered = transactions;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (transaction.recipient && transaction.recipient.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (transaction.sender && transaction.sender.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(transaction => transaction.status === statusFilter);
    }

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter(transaction => transaction.category === categoryFilter);
    }

    // Filter by date
    if (dateFilter !== "all") {
      const today = new Date();
      const transactionDate = new Date();
      
      filtered = filtered.filter(transaction => {
        transactionDate.setTime(Date.parse(transaction.date));
        
        switch (dateFilter) {
          case "today":
            return transactionDate.toDateString() === today.toDateString();
          case "week": {
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            return transactionDate >= weekAgo;
          }
          case "month":
            return transactionDate.getMonth() === today.getMonth() && 
                   transactionDate.getFullYear() === today.getFullYear();
          case "year":
            return transactionDate.getFullYear() === today.getFullYear();
          default:
            return true;
        }
      });
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, statusFilter, categoryFilter, dateFilter]);

  const handleFilterChange = (filterType: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (value === "all") {
      newSearchParams.delete(filterType);
    } else {
      newSearchParams.set(filterType, value);
    }
    
    setSearchParams(newSearchParams);
    
    switch (filterType) {
      case "status":
        setStatusFilter(value);
        break;
      case "category":
        setCategoryFilter(value);
        break;
      case "date":
        setDateFilter(value);
        break;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
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
        return <ArrowUpRight className="h-4 w-4" />;
      case 'bills':
        return <Building2 className="h-4 w-4" />;
      case 'airtime':
        return <CreditCard className="h-4 w-4" />;
      case 'crypto':
        return <TrendingUp className="h-4 w-4" />;
      case 'flight':
        return <Plane className="h-4 w-4" />;
      case 'gift-card':
        return <Gift className="h-4 w-4" />;
      case 'hotel':
        return <Building2 className="h-4 w-4" />;
      case 'chauffeur':
        return <CreditCard className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'transfer':
        return 'bg-[#0B63BC]/10 text-[#0B63BC]';
      case 'bills':
        return 'bg-green-100 text-green-800';
      case 'airtime':
        return 'bg-purple-100 text-purple-800';
      case 'crypto':
        return 'bg-orange-100 text-orange-800';
      case 'flight':
        return 'bg-indigo-100 text-indigo-800';
      case 'gift-card':
        return 'bg-pink-100 text-pink-800';
      case 'hotel':
        return 'bg-teal-100 text-teal-800';
      case 'chauffeur':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const TransactionsContent = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-1">View and manage your transaction history</p>
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg bg-white">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={(value) => handleFilterChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Date Filter */}
            <Select value={dateFilter} onValueChange={(value) => handleFilterChange("date", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by date" />
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
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">
            Transaction History ({filteredTransactions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <Link
                  key={transaction.id}
                  to={`/transactions/${transaction.id}`}
                  className="block"
                >
                  <div
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-[#0B63BC]/30 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <ArrowDownLeft className="h-5 w-5 text-green-600" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{transaction.description}</h4>
                          <Badge className={getCategoryColor(transaction.category)}>
                            <div className="flex items-center gap-1">
                              {getCategoryIcon(transaction.category)}
                              {transaction.category}
                            </div>
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{transaction.date} at {transaction.time}</span>
                          <span>Ref: {transaction.reference}</span>
                          {transaction.recipient && <span>To: {transaction.recipient}</span>}
                          {transaction.sender && <span>From: {transaction.sender}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold text-lg ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </div>
                      <Badge className={`mt-1 ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </Badge>
                      {transaction.fee && (
                        <div className="text-xs text-gray-500 mt-1">
                          Fee: {formatCurrency(transaction.fee)}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <DesktopLayout>
      <TransactionsContent />
    </DesktopLayout>
  );
};

export default Transactions; 