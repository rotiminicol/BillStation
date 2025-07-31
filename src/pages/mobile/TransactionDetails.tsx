import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, CreditCard, Building2, Plane, Gift, RefreshCw, Copy, Download, Share2, CheckCircle, Clock, XCircle } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";

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
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState<TransactionDetails | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
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
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetails();
  }, [id, toast]);

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

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const downloadReceipt = () => {
    toast({
      title: "Download Started",
      description: "Receipt download will begin shortly",
    });
  };

  const shareTransaction = () => {
    toast({
      title: "Share",
      description: "Transaction details shared successfully",
    });
  };

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center h-full">
          <Loader text="Loading transaction details..." />
        </div>
      </MobileLayout>
    );
  }

  if (!transaction) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Transaction not found</p>
            <Link to="/transactions" className="text-[#0B63BC] text-sm mt-2 block">
              Back to Transactions
            </Link>
          </div>
        </div>
      </MobileLayout>
    );
  }

  const StatusIcon = getStatusIcon(transaction.status);
  const CategoryIcon = getCategoryIcon(transaction.category);

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link to="/transactions" className="flex items-center text-gray-600">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Link>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(transaction.reference, "Reference")}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadReceipt}
            >
              <Download className="h-4 w-4 mr-1" />
              Receipt
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={shareTransaction}
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>

        {/* Transaction Summary Card */}
        <MobileCard className="bg-gradient-to-r from-[#0B63BC] to-[#0B63BC]/90 text-white p-6">
          <div className="text-center mb-6">
            <div className={`w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4`}>
              <CategoryIcon className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold mb-2">{transaction.description}</h1>
            <p className={`text-lg font-medium ${
              transaction.type === 'credit' ? 'text-green-300' : 'text-red-300'
            }`}>
              {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
            </p>
          </div>
          
          <div className="flex items-center justify-center mb-4">
            <StatusIcon className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </span>
          </div>
          
          <div className="text-center text-sm text-[#0B63BC]/80">
            <p>{transaction.date} at {transaction.time}</p>
            <p>Reference: {transaction.reference}</p>
          </div>
        </MobileCard>

        {/* Transaction Details */}
        <div className="space-y-4">
          {/* Basic Details */}
          <MobileCard>
            <MobileCard.Header>
              <MobileCard.Title>Transaction Details</MobileCard.Title>
            </MobileCard.Header>
            
            <MobileCard.Content className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Type</p>
                  <p className="text-sm font-medium text-gray-900">
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Category</p>
                  <p className="text-sm font-medium text-gray-900">
                    {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Amount</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Fee</p>
                  <p className="text-sm font-medium text-gray-900">
                    {transaction.fee ? formatCurrency(transaction.fee) : 'N/A'}
                  </p>
                </div>
              </div>
              
              {transaction.narration && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Narration</p>
                  <p className="text-sm font-medium text-gray-900">{transaction.narration}</p>
                </div>
              )}
            </MobileCard.Content>
          </MobileCard>

          {/* Account Details */}
          <MobileCard>
            <MobileCard.Header>
              <MobileCard.Title>Account Information</MobileCard.Title>
            </MobileCard.Header>
            
            <MobileCard.Content className="space-y-4">
              {transaction.recipient && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Recipient</p>
                  <p className="text-sm font-medium text-gray-900">{transaction.recipient}</p>
                </div>
              )}
              
              {transaction.sender && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Sender</p>
                  <p className="text-sm font-medium text-gray-900">{transaction.sender}</p>
                </div>
              )}
              
              {transaction.bankName && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Bank</p>
                  <p className="text-sm font-medium text-gray-900">{transaction.bankName}</p>
                </div>
              )}
              
              {transaction.accountNumber && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Account Number</p>
                  <p className="text-sm font-medium text-gray-900">{transaction.accountNumber}</p>
                </div>
              )}
              
              <div>
                <p className="text-xs text-gray-500 mb-1">Balance After Transaction</p>
                <p className="text-sm font-medium text-gray-900">{formatCurrency(transaction.balance)}</p>
              </div>
            </MobileCard.Content>
          </MobileCard>

          {/* Technical Details */}
          <MobileCard>
            <MobileCard.Header>
              <MobileCard.Title>Technical Information</MobileCard.Title>
            </MobileCard.Header>
            
            <MobileCard.Content className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Channel</p>
                  <p className="text-sm font-medium text-gray-900">
                    {transaction.channel.charAt(0).toUpperCase() + transaction.channel.slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <p className="text-sm font-medium text-gray-900">
                    {transaction.location || 'N/A'}
                  </p>
                </div>
              </div>
              
              {transaction.ipAddress && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">IP Address</p>
                  <p className="text-sm font-medium text-gray-900">{transaction.ipAddress}</p>
                </div>
              )}
              
              {transaction.deviceInfo && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Device</p>
                  <p className="text-sm font-medium text-gray-900">{transaction.deviceInfo}</p>
                </div>
              )}
            </MobileCard.Content>
          </MobileCard>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full" onClick={() => copyToClipboard(transaction.reference, "Reference")}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Reference
          </Button>
          
          <Button variant="outline" className="w-full" onClick={downloadReceipt}>
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
          
          <Button variant="outline" className="w-full" onClick={shareTransaction}>
            <Share2 className="h-4 w-4 mr-2" />
            Share Transaction
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default TransactionDetails; 