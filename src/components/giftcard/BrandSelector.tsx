import React from 'react';
import { motion } from 'framer-motion';
import { Gift, ShoppingBag, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GiftCardBrand {
  icon: any;
  label: string;
  value: string;
  color: string;
  discount: string;
  description?: string;
}

interface BrandSelectorProps {
  brands: GiftCardBrand[];
  selectedBrand: string;
  onBrandSelect: (brand: string) => void;
}

const BrandSelector: React.FC<BrandSelectorProps> = ({
  brands,
  selectedBrand,
  onBrandSelect
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
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
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Gift Card Brand</h2>
        <p className="text-gray-600">Choose from our wide selection of popular brands</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {brands.map((brand, index) => (
          <motion.div
            key={brand.value}
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => onBrandSelect(brand.value)}
            className="cursor-pointer"
          >
            <Card
              className={`relative overflow-hidden border-2 transition-all duration-300 ${
                selectedBrand === brand.value
                  ? 'border-[#0B63BC] shadow-lg shadow-[#0B63BC]/20'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`h-32 bg-gradient-to-br ${brand.color} relative`}>
                <div className="absolute inset-0 bg-black/10"></div>
                
                {/* Discount Badge */}
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Star className="w-3 h-3 mr-1" />
                    {brand.discount} OFF
                  </Badge>
                </div>

                {/* Brand Icon */}
                <div className="absolute top-4 left-4">
                  <motion.div
                    className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <brand.icon className="h-6 w-6 text-white" />
                  </motion.div>
                </div>

                {/* Selection Indicator */}
                {selectedBrand === brand.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute bottom-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                  >
                    <div className="w-3 h-3 bg-[#0B63BC] rounded-full"></div>
                  </motion.div>
                )}
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{brand.label}</h3>
                {brand.description && (
                  <p className="text-sm text-gray-600">{brand.description}</p>
                )}
                
                {/* Popular Tag */}
                {index < 3 && (
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-xs">
                      <ShoppingBag className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200"
      >
        <div className="flex items-start space-x-3">
          <Gift className="w-5 h-5 text-[#0B63BC] mt-0.5" />
          <div>
            <h4 className="font-medium text-[#0B63BC] mb-1">Gift Card Tips</h4>
            <p className="text-sm text-gray-600">
              Gift cards are delivered instantly via email. Make sure the recipient's email address is correct.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BrandSelector; 