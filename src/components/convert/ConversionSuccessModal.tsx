import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Bitcoin, Smartphone, Wifi, DollarSign, Download, Share2, X, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ConversionData {
  assetType: string;
  amount: number;
  convertedAmount: number;
  fee: number;
  provider?: string;
  cryptoType?: string;
  phoneNumber?: string;
}

interface ConversionSuccessModalProps {
  conversion: ConversionData;
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  onShare: () => void;
  onViewHistory: () => void;
}

const ConversionSuccessModal: React.FC<ConversionSuccessModalProps> = ({
  conversion,
  isOpen,
  onClose,
  onDownload,
  onShare,
  onViewHistory
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getAssetIcon = (assetType: string) => {
    switch (assetType) {
      case 'crypto':
        return <Bitcoin className="h-6 w-6" />;
      case 'airtime':
        return <Smartphone className="h-6 w-6" />;
      case 'data':
        return <Wifi className="h-6 w-6" />;
      default:
        return <DollarSign className="h-6 w-6" />;
    }
  };

  const getAssetName = (assetType: string) => {
    switch (assetType) {
      case 'crypto':
        return 'Cryptocurrency';
      case 'airtime':
        return 'Airtime';
      case 'data':
        return 'Data Bundle';
      default:
        return 'Asset';
    }
  };

  const getAssetColor = (assetType: string) => {
    switch (assetType) {
      case 'crypto':
        return 'from-orange-500 to-orange-600';
      case 'airtime':
        return 'from-blue-500 to-blue-600';
      case 'data':
        return 'from-green-500 to-green-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
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
            Conversion Successful!
          </h2>
          <p className="text-gray-600">
            Your {getAssetName(conversion.assetType)} has been converted to cash
          </p>
        </div>

        {/* Conversion Details */}
        <Card className="mx-6 mb-6 border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getAssetColor(conversion.assetType)} flex items-center justify-center text-white`}>
                  {getAssetIcon(conversion.assetType)}
                </div>
                <span>Conversion Summary</span>
              </span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Completed
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Asset Type</span>
              <span className="font-medium">{getAssetName(conversion.assetType)}</span>
            </div>
            
            {conversion.cryptoType && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Cryptocurrency</span>
                <span className="font-medium capitalize">{conversion.cryptoType}</span>
              </div>
            )}
            
            {conversion.provider && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Network</span>
                <span className="font-medium capitalize">{conversion.provider}</span>
              </div>
            )}
            
            {conversion.phoneNumber && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Phone Number</span>
                <span className="font-medium">{conversion.phoneNumber}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Original Amount</span>
              <span className="font-medium">{formatCurrency(conversion.amount)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Processing Fee</span>
              <span className="font-medium text-red-600">-{formatCurrency(conversion.fee)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">You'll Receive</span>
              <span className="font-semibold text-lg text-[#0B63BC]">
                {formatCurrency(conversion.convertedAmount)}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Processing Time</span>
              <span className="font-medium">2-5 minutes</span>
            </div>
          </CardContent>
        </Card>

        {/* Processing Status */}
        <div className="mx-6 mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-800">Processing Your Conversion</p>
              <p className="text-xs text-blue-600">Funds will be credited to your wallet shortly</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 space-y-3">
          <Button
            onClick={onViewHistory}
            className="w-full bg-[#0B63BC] hover:bg-[#0B63BC]/90"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            View Conversion History
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={onDownload}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            
            <Button
              onClick={onShare}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConversionSuccessModal; 