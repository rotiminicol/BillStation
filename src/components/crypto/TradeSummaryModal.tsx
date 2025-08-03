import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Bitcoin, TrendingUp, TrendingDown, Download, Share2, X, Wallet, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TradeSummary {
  id: string;
  type: 'buy' | 'sell';
  crypto: {
    name: string;
    symbol: string;
    logo: string;
  };
  amountCrypto: string;
  amountNaira: number;
  price: number;
  timestamp: string;
  transactionId: string;
  status: 'completed' | 'pending' | 'failed';
  profitLoss?: number;
  originalPrice?: number;
}

interface TradeSummaryModalProps {
  trade: TradeSummary;
  isOpen: boolean;
  onClose: () => void;
  onViewWallet: () => void;
  onViewHistory: () => void;
  onDownload: () => void;
  onShare: () => void;
}

const TradeSummaryModal: React.FC<TradeSummaryModalProps> = ({
  trade,
  isOpen,
  onClose,
  onViewWallet,
  onViewHistory,
  onDownload,
  onShare
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCryptoIcon = (symbol: string) => {
    switch (symbol.toUpperCase()) {
      case 'BTC':
        return <Bitcoin className="h-6 w-6" />;
      case 'ETH':
        return <span className="text-2xl">Ξ</span>;
      case 'BNB':
        return <span className="text-2xl">🟡</span>;
      case 'ADA':
        return <span className="text-2xl">₳</span>;
      default:
        return <Bitcoin className="h-6 w-6" />;
    }
  };

  const getProfitLossDisplay = () => {
    if (!trade.profitLoss || !trade.originalPrice) return null;

    const isProfit = trade.profitLoss > 0;
    const percentage = ((trade.profitLoss / trade.originalPrice) * 100).toFixed(2);

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-3 p-4 rounded-lg ${
          isProfit ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}
      >
        {isProfit ? (
          <TrendingUp className="h-5 w-5 text-green-600" />
        ) : (
          <TrendingDown className="h-5 w-5 text-red-600" />
        )}
        <div>
          <p className={`text-sm font-medium ${
            isProfit ? 'text-green-800' : 'text-red-800'
          }`}>
            {isProfit ? '+' : ''}{formatCurrency(trade.profitLoss)} {isProfit ? 'Profit' : 'Loss'}
          </p>
          <p className={`text-xs ${
            isProfit ? 'text-green-600' : 'text-red-600'
          }`}>
            {isProfit ? '+' : ''}{percentage}% return
          </p>
        </div>
      </motion.div>
    );
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Header */}
        <div className="relative p-6 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
          
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [0, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4"
          >
            <CheckCircle className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Trade Successful!
          </h2>
          <p className="text-gray-600">
            Your {trade.type} order has been completed
          </p>
        </div>

        {/* Trade Details */}
        <Card className="mx-6 mb-6 border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white">
                  {getCryptoIcon(trade.crypto.symbol)}
                </div>
                <span>Trade Summary</span>
              </span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {trade.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Type</span>
              <span className="font-medium capitalize">{trade.type}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Cryptocurrency</span>
              <span className="font-medium">{trade.crypto.name} ({trade.crypto.symbol})</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Amount</span>
              <span className="font-medium">{trade.amountCrypto} {trade.crypto.symbol}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Total Value</span>
              <span className="font-semibold text-lg text-[#0B63BC]">
                {formatCurrency(trade.amountNaira)}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Price per {trade.crypto.symbol}</span>
              <span className="font-medium">{formatCurrency(trade.price)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Transaction ID</span>
              <span className="font-mono text-sm text-gray-500">{trade.transactionId}</span>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Date & Time</span>
              <span className="font-medium">{trade.timestamp}</span>
            </div>

            {/* Profit/Loss Display */}
            {trade.type === 'sell' && getProfitLossDisplay()}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="p-6 space-y-3">
          <Button
            onClick={onViewWallet}
            className="w-full bg-[#0B63BC] hover:bg-[#0B63BC]/90"
          >
            <Wallet className="w-4 h-4 mr-2" />
            View in Wallet
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={onViewHistory}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
            >
              <Activity className="w-4 h-4 mr-2" />
              History
            </Button>
            
            <Button
              onClick={onDownload}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
          
          <Button
            onClick={onShare}
            variant="outline"
            className="w-full border-gray-300 hover:bg-gray-50"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Receipt
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TradeSummaryModal; 