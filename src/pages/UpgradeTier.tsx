import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Star, Zap, Shield, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import DesktopLayout from "@/components/DesktopLayout";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface TierInfo {
  id: string;
  name: string;
  limit: number;
  color: string;
  bgColor: string;
  icon: any;
  features: string[];
  price?: string;
  popular?: boolean;
}

const UpgradeTier = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const tiers: TierInfo[] = [
    {
      id: 'tier1',
      name: 'Tier 1',
      limit: 50000,
      color: 'text-gray-700',
      bgColor: 'bg-gray-50',
      icon: Star,
      features: [
        'Daily transaction limit: ₦50,000',
        'Basic account features',
        'Email support',
        'Standard processing times'
      ]
    },
    {
      id: 'tier2',
      name: 'Tier 2',
      limit: 100000,
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      icon: Zap,
      features: [
        'Daily transaction limit: ₦100,000',
        'Priority customer support',
        'Faster processing times',
        'Advanced security features',
        'Transaction history export'
      ],
      popular: true
    },
    {
      id: 'tier3',
      name: 'Tier 3',
      limit: 500000,
      color: 'text-purple-700',
      bgColor: 'bg-purple-50',
      icon: Crown,
      features: [
        'Daily transaction limit: ₦500,000',
        'VIP customer support',
        'Instant processing',
        'Premium security features',
        'Dedicated account manager',
        'Custom transaction limits',
        'Priority queue for all services'
      ]
    }
  ];

  const currentTier = user?.tier || 'tier1';
  const currentTierInfo = tiers.find(tier => tier.id === currentTier);

  const handleUpgrade = async (tierId: string) => {
    if (tierId === currentTier) {
      toast({
        title: "Already at this tier",
        description: "You are already subscribed to this tier level.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Here you would typically make an API call to upgrade the tier
      // For now, we'll just show a success message
      toast({
        title: "Tier Upgrade Requested",
        description: `Your request to upgrade to ${tiers.find(t => t.id === tierId)?.name} has been submitted.`,
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Upgrade Successful",
        description: `You have been upgraded to ${tiers.find(t => t.id === tierId)?.name}!`,
      });
    } catch (error) {
      toast({
        title: "Upgrade Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <DesktopLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Upgrade Your Tier</h1>
            <p className="text-gray-600">Unlock higher transaction limits and premium features</p>
          </div>
        </div>

        {/* Current Tier Status */}
        <Card className="bg-gradient-to-r from-[#0B63BC]/5 to-[#0B63BC]/10 border-[#0B63BC]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${currentTierInfo?.bgColor}`}>
                  {currentTierInfo?.icon && React.createElement(currentTierInfo.icon, {
                    className: `h-6 w-6 ${currentTierInfo.color}`
                  })}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Current Tier: {currentTierInfo?.name}</h3>
                  <p className="text-gray-600">Daily limit: ₦{currentTierInfo?.limit.toLocaleString()}</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-[#0B63BC] text-white">
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Tier Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, index) => {
            const isCurrentTier = tier.id === currentTier;
            const isUpgradeable = tier.id !== currentTier;
            
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedTier === tier.id ? 'ring-2 ring-[#0B63BC] shadow-lg' : ''
                  } ${isCurrentTier ? 'border-[#0B63BC]/30 bg-[#0B63BC]/5' : ''}`}
                  onClick={() => setSelectedTier(tier.id)}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                                     <CardHeader className="text-center pb-4">
                     <div className={`w-16 h-16 ${tier.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                       {React.createElement(tier.icon, {
                         className: `h-8 w-8 ${tier.color}`
                       })}
                     </div>
                    <CardTitle className={`text-xl ${tier.color}`}>{tier.name}</CardTitle>
                    <p className="text-2xl font-bold text-gray-900">₦{tier.limit.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Daily transaction limit</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4">
                      {isCurrentTier ? (
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          disabled
                        >
                          Current Tier
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => handleUpgrade(tier.id)}
                          className={`w-full ${
                            tier.id === 'tier3' 
                              ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800' 
                              : 'bg-[#0B63BC] hover:bg-[#0B63BC]/90'
                          }`}
                        >
                          {isUpgradeable ? 'Upgrade Now' : 'Current Tier'}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Information */}
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tier Upgrade Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">How it works:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Tier upgrades are processed within 24 hours</li>
                  <li>• Higher tiers unlock increased daily transaction limits</li>
                  <li>• Premium features become available immediately after upgrade</li>
                  <li>• You can upgrade at any time</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Security & Compliance:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• All tiers include advanced security features</li>
                  <li>• Tier 2+ includes enhanced fraud protection</li>
                  <li>• Tier 3 includes dedicated security monitoring</li>
                  <li>• All transactions are encrypted and secure</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DesktopLayout>
  );
};

export default UpgradeTier; 