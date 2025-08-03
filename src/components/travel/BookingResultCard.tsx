import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Hotel, Car, Crown, Star, Clock, MapPin, Users, Building, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BookingResult {
  id: string;
  name: string;
  logo: string;
  rating: number;
  price: number;
  originalPrice?: number;
  duration?: string;
  departureTime?: string;
  arrivalTime?: string;
  stops?: number;
  type: 'flight' | 'hotel' | 'transport' | 'private-jet';
  features: string[];
  description: string;
  color: string;
}

interface BookingResultCardProps {
  result: BookingResult;
  onBook: (result: BookingResult) => void;
  index: number;
}

const BookingResultCard: React.FC<BookingResultCardProps> = ({
  result,
  onBook,
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

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return <Plane className="h-5 w-5" />;
      case 'hotel':
        return <Hotel className="h-5 w-5" />;
      case 'transport':
        return <Car className="h-5 w-5" />;
      case 'private-jet':
        return <Crown className="h-5 w-5" />;
      default:
        return <Plane className="h-5 w-5" />;
    }
  };

  const getServiceLabel = (type: string) => {
    switch (type) {
      case 'flight':
        return 'Flight';
      case 'hotel':
        return 'Hotel';
      case 'transport':
        return 'Transport';
      case 'private-jet':
        return 'Private Jet';
      default:
        return 'Service';
    }
  };

  const discountPercentage = result.originalPrice 
    ? Math.round(((result.originalPrice - result.price) / result.originalPrice) * 100)
    : 0;

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

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Header with gradient */}
        <div className={`h-2 bg-gradient-to-r ${result.color}`}></div>
        
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${result.color} flex items-center justify-center text-white`}>
                {getServiceIcon(result.type)}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">{result.name}</h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {getServiceLabel(result.type)}
                  </Badge>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(result.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">
                      {result.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-2">
                {discountPercentage > 0 && (
                  <Badge className="bg-red-500 text-white text-xs">
                    {discountPercentage}% OFF
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Service-specific details */}
          {result.type === 'flight' && (
            <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">{result.departureTime}</p>
                  <p className="text-xs text-gray-600">Departure</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                  <Plane className="w-4 h-4 text-gray-400" />
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">{result.arrivalTime}</p>
                  <p className="text-xs text-gray-600">Arrival</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">{result.duration}</p>
                <p className="text-xs text-gray-600">
                  {result.stops === 0 ? 'Direct' : `${result.stops} stop${result.stops > 1 ? 's' : ''}`}
                </p>
              </div>
            </div>
          )}

          {result.type === 'hotel' && (
            <div className="flex items-center space-x-4 mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{result.description}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">2 guests</span>
              </div>
            </div>
          )}

          {result.type === 'transport' && (
            <div className="flex items-center space-x-4 mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Car className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{result.description}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{result.duration}</span>
              </div>
            </div>
          )}

          {result.type === 'private-jet' && (
            <div className="flex items-center space-x-4 mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{result.description}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Up to {result.features[0]}</span>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {result.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center space-x-1 text-xs text-gray-600">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
            {result.features.length > 3 && (
              <span className="text-xs text-gray-500">
                +{result.features.length - 3} more
              </span>
            )}
          </div>

          {/* Price and Book Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-[#0B63BC]">
                {formatCurrency(result.price)}
              </span>
              {result.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatCurrency(result.originalPrice)}
                </span>
              )}
            </div>
            
            <Button
              onClick={() => onBook(result)}
              className="bg-[#0B63BC] hover:bg-[#0B63BC]/90"
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BookingResultCard; 