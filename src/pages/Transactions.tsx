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
            amount: 150.00,
            description: "Electricity Bill Payment",
            date: "2024-01-13",
            time: "16:45",
            status: "success",
            reference: "TXN-2024-003",
            fee: 1.50,
            balance: 1350.00
          },
          {
            id: "4",
            type: "debit",
            category: "airtime",
            amount: 100.00,
            description: "Airtime Swap - MTN",
            date: "2024-01-12",
            time: "11:20",
            status: "success",
            reference: "TXN-2024-004",
            fee: 1.00,
            balance: 1450.00
          },
          {
            id: "5",
            type: "debit",
            category: "crypto",
            amount: 200.00,
            description: "Bitcoin Purchase",
            date: "2024-01-11",
            time: "13:10",
            status: "pending",
            reference: "TXN-2024-005",
            fee: 2.00,
            balance: 1550.00
          },
          {
            id: "6",
            type: "debit",
            category: "flight",
            amount: 500.00,
            description: "Flight Booking - Lagos to Abuja",
            date: "2024-01-10",
            time: "10:30",
            status: "success",
            reference: "TXN-2024-006",
            fee: 5.00,
            balance: 2050.00
          },
          {
            id: "7",
            type: "debit",
            category: "gift-card",
            amount: 75.00,
            description: "Amazon Gift Card",
            date: "2024-01-09",
            time: "15:45",
            status: "success",
            reference: "TXN-2024-007",
            fee: 0.75,
            balance: 2125.00
          },
          {
            id: "8",
            type: "debit",
            category: "hotel",
            amount: 300.00,
            description: "Hotel Booking - Lagos",
            date: "2024-01-08",
            time: "12:00",
            status: "success",
            reference: "TXN-2024-008",
            fee: 3.00,
            balance: 2425.00
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
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const startOfYear = new Date(today.getFullYear(), 0, 1);

      filtered = filtered.filter(txn => {
        const txnDate = new Date(txn.date);
        switch (dateFilter) {
          case 'today':
            return txnDate >= startOfDay;
          case 'week':
            return txnDate >= startOfWeek;
          case 'month':
            return txnDate >= startOfMonth;
          case 'year':
            return txnDate >= startOfYear;
          default:
            return true;
        }
      });
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, statusFilter, categoryFilter, dateFilter]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (categoryFilter !== 'all') params.set('category', categoryFilter);
    if (dateFilter !== 'all') params.set('date', dateFilter);
    setSearchParams(params);
  }, [statusFilter, categoryFilter, dateFilter, setSearchParams]);

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
        return ArrowUpRight;
      case 'bills':
        return Building2;
      case 'airtime':
        return CreditCard;
      case 'crypto':
        return TrendingUp;
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
        return 'text-blue-600';
      case 'bills':
        return 'text-green-600';
      case 'airtime':
        return 'text-purple-600';
      case 'crypto':
        return 'text-orange-600';
      case 'flight':
        return 'text-indigo-600';
      case 'gift-card':
        return 'text-pink-600';
      case 'hotel':
        return 'text-teal-600';
      case 'chauffeur':
        return 'text-cyan-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <DesktopLayout>
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
            <p className="text-gray-600 mt-2">View and manage your transaction history</p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
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
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Date Range</label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue />
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
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Transaction History
            </CardTitle>
            <CardDescription>
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => {
                const CategoryIcon = getCategoryIcon(transaction.category);
                return (
                  <div key={transaction.id} className="flex items-center gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className={`bg-blue-100 ${getCategoryColor(transaction.category)}`}>
                        <CategoryIcon className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-sm text-gray-500">
                            {transaction.recipient && `To: ${transaction.recipient}`}
                            {transaction.sender && `From: ${transaction.sender}`}
                          </p>
                          <p className="text-xs text-gray-400">
                            {transaction.date} at {transaction.time} • {transaction.reference}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold text-lg ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'credit' ? '+' : '-'} {formatCurrency(transaction.amount)}
                          </p>
                          {transaction.fee && (
                            <p className="text-xs text-gray-500">Fee: {formatCurrency(transaction.fee)}</p>
                          )}
                          <Badge className={`mt-2 ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DesktopLayout>
  );
};

export default Transactions; 