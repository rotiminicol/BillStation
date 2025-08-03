import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, AlertCircle, XCircle, Gift } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GiftCardPurchase {
  id: string;
  brand: string;
  amount: number;
  recipient: string;
  date: string;
  status: 'delivered' | 'pending' | 'failed';
}

interface PurchaseListProps {
  purchases: GiftCardPurchase[];
  onPurchaseClick?: (purchase: GiftCardPurchase) => void;
}

const PurchaseList: React.FC<PurchaseListProps> = ({
  purchases,
  onPurchaseClick
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBrandColor = (brand: string) => {
    const colors: { [key: string]: string } = {
      'amazon': 'from-orange-500 to-yellow-500',
      'apple': 'from-gray-500 to-gray-700',
      'google-play': 'from-green-500 to-blue-500',
      'steam': 'from-blue-500 to-purple-500',
      'netflix': 'from-red-500 to-pink-500',
      'spotify': 'from-green-500 to-emerald-500'
    };
    return colors[brand] || 'from-blue-500 to-purple-500';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Gift className="w-5 h-5 text-[#0B63BC]" />
          <span>Recent Purchases</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {purchases.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <Gift className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No recent purchases</p>
            <p className="text-gray-400 text-xs">Your gift card purchases will appear here</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {purchases.map((purchase) => (
              <motion.div
                key={purchase.id}
                variants={itemVariants}
                onClick={() => onPurchaseClick?.(purchase)}
                className={`p-3 rounded-lg border border-gray-200 hover:border-[#0B63BC] hover:bg-blue-50 transition-all duration-200 cursor-pointer ${
                  onPurchaseClick ? 'hover:shadow-md' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Brand Icon */}
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getBrandColor(purchase.brand)} flex items-center justify-center flex-shrink-0`}>
                    <Gift className="w-5 h-5 text-white" />
                  </div>

                  {/* Purchase Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900 truncate">
                        {purchase.brand}
                      </h4>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(purchase.status)}
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getStatusColor(purchase.status)}`}
                        >
                          {purchase.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <span className="font-medium">{formatCurrency(purchase.amount)}</span>
                        <span>•</span>
                        <span className="truncate">{purchase.recipient}</span>
                      </div>
                      <span className="text-gray-400 text-xs">
                        {formatDate(purchase.date)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All Button */}
        {purchases.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <button className="w-full text-center text-sm text-[#0B63BC] hover:text-[#0B63BC]/80 font-medium">
              View All Purchases
            </button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default PurchaseList; 