import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, CreditCard, Building2, Plane, Gift, RefreshCw, Copy, Download, Share2, CheckCircle, Clock, XCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import DesktopLayout from "@/components/DesktopLayout";
import Navigation from "@/components/Navigation";

interface TransactionDetails {
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
  bankName?: string;
  accountNumber?: string;
  narration?: string;
  channel: 'mobile' | 'web' | 'atm' | 'pos';
  location?: string;
  ipAddress?: string;
  deviceInfo?: string;
}

const TransactionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [transaction, setTransaction] = useState<TransactionDetails | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock transaction details data
        const mockTransaction: TransactionDetails = {
          id: id || "1",
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
          balance: 1250.00,
          bankName: "First Bank of Nigeria",
          accountNumber: "1234567890",
          narration: "Payment for services rendered",
          channel: "mobile",
          location: "Lagos, Nigeria",
          ipAddress: "192.168.1.100",
          deviceInfo: "iPhone 14 Pro - iOS 17.2"
        };
        
        setTransaction(mockTransaction);
      } catch (error) {
        console.error('Error fetching transaction details:', error);
        toast({
          title: "Error",
          description: "Failed to load transaction details",
          variant: "destructive"
        });
      }
    };

    fetchTransactionDetails();
  }, [id, toast]);

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'failed':
        return XCircle;
      default:
        return Clock;
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

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const downloadReceipt = () => {
    toast({
      title: "Receipt Downloaded",
      description: "Transaction receipt has been downloaded",
    });
  };

  const shareTransaction = () => {
    toast({
      title: "Shared!",
      description: "Transaction details shared successfully",
    });
  };

  if (!transaction) {
    return (
      <DesktopLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading transaction details...</p>
          </div>
        </div>
      </DesktopLayout>
    );
  }

  const StatusIcon = getStatusIcon(transaction.status);
  const CategoryIcon = getCategoryIcon(transaction.category);

  return (
    <DesktopLayout>
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/transactions">
              <Button variant="ghost" size="sm">
                Back to Transactions
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Transaction Details</h1>
              <p className="text-gray-600 mt-2">Reference: {transaction.reference}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(transaction.reference, "Reference")}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Reference
            </Button>
            <Button variant="outline" size="sm" onClick={downloadReceipt}>
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline" size="sm" onClick={shareTransaction}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Transaction Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className={`bg-blue-100 ${getCategoryColor(transaction.category)}`}>
                      <CategoryIcon className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  Transaction Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className={`text-3xl font-bold ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'} {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                  <Badge className={`text-sm ${getStatusColor(transaction.status)}`}>
                    <StatusIcon className="h-4 w-4 mr-1" />
                    {transaction.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium text-gray-900 capitalize">{transaction.category.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium text-gray-900">{transaction.date} at {transaction.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Reference</p>
                    <p className="font-medium text-gray-900">{transaction.reference}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction Details */}
            <Card>
              <CardHeader>
                <CardTitle>Transaction Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {transaction.recipient && (
                    <div>
                      <p className="text-sm text-gray-500">Recipient</p>
                      <p className="font-medium text-gray-900">{transaction.recipient}</p>
                    </div>
                  )}
                  {transaction.sender && (
                    <div>
                      <p className="text-sm text-gray-500">Sender</p>
                      <p className="font-medium text-gray-900">{transaction.sender}</p>
                    </div>
                  )}
                  {transaction.bankName && (
                    <div>
                      <p className="text-sm text-gray-500">Bank Name</p>
                      <p className="font-medium text-gray-900">{transaction.bankName}</p>
                    </div>
                  )}
                  {transaction.accountNumber && (
                    <div>
                      <p className="text-sm text-gray-500">Account Number</p>
                      <p className="font-medium text-gray-900">{transaction.accountNumber}</p>
                    </div>
                  )}
                  {transaction.narration && (
                    <div>
                      <p className="text-sm text-gray-500">Narration</p>
                      <p className="font-medium text-gray-900">{transaction.narration}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Channel</p>
                    <p className="font-medium text-gray-900 capitalize">{transaction.channel}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Fee Information */}
            <Card>
              <CardHeader>
                <CardTitle>Fee Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Transaction Fee</span>
                  <span className="font-semibold text-gray-900">
                    {transaction.fee ? formatCurrency(transaction.fee) : 'Free'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Balance After</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(transaction.balance)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Security Information */}
            <Card>
              <CardHeader>
                <CardTitle>Security Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {transaction.location && (
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-900">{transaction.location}</p>
                  </div>
                )}
                {transaction.ipAddress && (
                  <div>
                    <p className="text-sm text-gray-500">IP Address</p>
                    <p className="font-medium text-gray-900">{transaction.ipAddress}</p>
                  </div>
                )}
                {transaction.deviceInfo && (
                  <div>
                    <p className="text-sm text-gray-500">Device</p>
                    <p className="font-medium text-gray-900">{transaction.deviceInfo}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
};

export default TransactionDetails; 