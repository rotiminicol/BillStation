import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  change: number;
  color: string;
  bgColor: string;
  description: string;
  marketCap?: string;
  volume24h?: string;
}

interface CryptoCardProps {
  crypto: CryptoCurrency;
  isSelected: boolean;
  onSelect: (cryptoId: string) => void;
  index: number;
}

const CryptoCard: React.FC<CryptoCardProps> = ({
  crypto,
  isSelected,
  onSelect,
  index
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const isPositiveChange = crypto.change >= 0;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      <Card
        className={`cursor-pointer transition-all duration-200 overflow-hidden ${
          isSelected
            ? "border-[#0B63BC] bg-blue-50 shadow-lg"
            : "border-gray-200 hover:border-[#0B63BC]/30 hover:shadow-lg"
        }`}
        onClick={() => onSelect(crypto.id)}
      >
        {/* Header with gradient */}
        <div className={`h-1 bg-gradient-to-r ${crypto.color}`}></div>
        
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isSelected ? 'bg-[#0B63BC] text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                <span className="text-xl">{crypto.logo}</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">{crypto.name}</h4>
                <p className="text-xs text-gray-500">{crypto.symbol}</p>
              </div>
            </div>
            
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Badge className="bg-[#0B63BC] text-white text-xs">
                  Selected
                </Badge>
              </motion.div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                {formatCurrency(crypto.price)}
              </span>
              <div className={`flex items-center gap-1 ${
                isPositiveChange ? 'text-green-600' : 'text-red-600'
              }`}>
                {isPositiveChange ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span className="text-xs font-medium">
                  {isPositiveChange ? '+' : ''}{crypto.change}%
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-500">{crypto.description}</p>

            {crypto.marketCap && (
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Market Cap</span>
                <span>{crypto.marketCap}</span>
              </div>
            )}

            {crypto.volume24h && (
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>24h Volume</span>
                <span>{crypto.volume24h}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CryptoCard; 