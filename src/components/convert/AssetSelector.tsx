import React from 'react';
import { motion } from 'framer-motion';
import { Bitcoin, Smartphone, Wifi, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AssetType {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  conversionRate: number;
  rateChange: number;
  color: string;
  bgColor: string;
  features: string[];
  minAmount: number;
  maxAmount: number;
}

interface AssetSelectorProps {
  selectedAsset: string;
  onSelect: (assetId: string) => void;
}

const AssetSelector: React.FC<AssetSelectorProps> = ({
  selectedAsset,
  onSelect
}) => {
  const assetTypes: AssetType[] = [
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: <Bitcoin className="h-6 w-6" />,
      description: 'Convert BTC, ETH, BNB, ADA to cash',
      conversionRate: 0.98, // 98% of market value
      rateChange: 2.5,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
      features: ['Instant conversion', 'Best rates', 'Multiple coins'],
      minAmount: 5000,
      maxAmount: 10000000
    },
    {
      id: 'airtime',
      name: 'Airtime',
      icon: <Smartphone className="h-6 w-6" />,
      description: 'Convert airtime credit to cash',
      conversionRate: 0.85, // 85% of face value
      rateChange: -1.2,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      features: ['All networks', 'Quick payout', 'No expiry'],
      minAmount: 100,
      maxAmount: 50000
    },
    {
      id: 'data',
      name: 'Data Bundle',
      icon: <Wifi className="h-6 w-6" />,
      description: 'Convert unused data to cash',
      conversionRate: 0.75, // 75% of face value
      rateChange: 0.8,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      features: ['Unused data', 'Network credit', 'Flexible amounts'],
      minAmount: 50,
      maxAmount: 25000
    }
  ];

  const formatRate = (rate: number) => {
    return `${(rate * 100).toFixed(0)}%`;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {assetTypes.map((asset, index) => (
        <motion.div
          key={asset.id}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * 0.1 }}
          whileHover="hover"
          whileTap="tap"
        >
          <Card
            className={`cursor-pointer transition-all duration-200 overflow-hidden ${
              selectedAsset === asset.id
                ? "border-[#0B63BC] bg-blue-50 shadow-lg"
                : "border-gray-200 hover:border-[#0B63BC]/30 hover:shadow-lg"
            }`}
            onClick={() => onSelect(asset.id)}
          >
            {/* Header with gradient */}
            <div className={`h-2 bg-gradient-to-r ${asset.color}`}></div>
            
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedAsset === asset.id ? 'bg-[#0B63BC] text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {asset.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                    <p className="text-sm text-gray-500">{asset.description}</p>
                  </div>
                </div>
                
                {selectedAsset === asset.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge className="bg-[#0B63BC] text-white">
                      Selected
                    </Badge>
                  </motion.div>
                )}
              </div>

              <div className="space-y-3">
                {/* Conversion Rate */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Conversion Rate</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-[#0B63BC]">
                      {formatRate(asset.conversionRate)}
                    </span>
                    <div className={`flex items-center gap-1 text-xs ${
                      asset.rateChange >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {asset.rateChange >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span>{asset.rateChange >= 0 ? '+' : ''}{asset.rateChange}%</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-1">
                  {asset.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-[#0B63BC] rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Amount Range */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Min: ₦{asset.minAmount.toLocaleString()}</span>
                    <span>Max: ₦{asset.maxAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default AssetSelector; 