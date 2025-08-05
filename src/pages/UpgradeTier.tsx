import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Crown, 
  Star, 
  Zap, 
  Shield, 
  Users, 
  CreditCard, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Lock,
  Globe,
  Smartphone,
  Monitor,
  Gift,
  Award,
  Sparkles,
  Diamond,
  Trophy,
  Target,
  BarChart3
} from "lucide-react";
import DesktopLayout from "@/components/DesktopLayout";
import { useToast } from "@/hooks/use-toast";

const UpgradeTier = () => {
  const { toast } = useToast();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const tiers = [
    {
      id: "tier1",
      name: "Basic",
      current: true,
      price: "Free",
      limit: "₦50,000",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      icon: Crown,
      features: [
        "Daily transfer limit: ₦50,000",
        "Basic customer support",
        "Standard transaction fees",
        "Basic security features",
        "Email notifications"
      ],
      benefits: [
        "Free account creation",
        "Basic transaction history",
        "Standard app features"
      ]
    },
    {
      id: "tier2",
      name: "Premium",
      current: false,
      price: "₦5,000",
      limit: "₦500,000",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      icon: Star,
      popular: true,
      features: [
        "Daily transfer limit: ₦500,000",
        "Priority customer support",
        "Reduced transaction fees",
        "Advanced security features",
        "Push & SMS notifications",
        "Virtual card access",
        "Crypto trading access",
        "Travel booking features"
      ],
      benefits: [
        "10% fee reduction",
        "Priority support queue",
        "Advanced analytics",
        "Exclusive promotions"
      ]
    },
    {
      id: "tier3",
      name: "VIP",
      current: false,
      price: "₦25,000",
      limit: "₦5,000,000",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      icon: Diamond,
      features: [
        "Daily transfer limit: ₦5,000,000",
        "24/7 dedicated support",
        "Zero transaction fees",
        "Premium security features",
        "All notification types",
        "Multiple virtual cards",
        "Advanced crypto features",
        "Luxury travel services",
        "Personal account manager",
        "Exclusive VIP events"
      ],
      benefits: [
        "100% fee waiver",
        "Dedicated account manager",
        "Exclusive VIP events",
        "Premium partner benefits"
      ]
    }
  ];

  const handleUpgrade = async (tierId: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Upgrade Successful!",
        description: `You have been upgraded to ${tiers.find(t => t.id === tierId)?.name} tier.`,
      });
      
      setSelectedTier(tierId);
    } catch (error) {
      toast({
        title: "Upgrade Failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const currentTier = tiers.find(t => t.current);
  const nextTier = tiers.find(t => !t.current);

  return (
    <DesktopLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Upgrade Your Tier</h1>
              <p className="text-gray-600 text-sm">Unlock premium features and higher limits</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <Sparkles className="h-3 w-3 mr-1" />
            Upgrade Available
          </Badge>
        </div>

        {/* Current Tier Status */}
        {currentTier && (
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <currentTier.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Current Tier: {currentTier.name}</h3>
                    <p className="text-gray-600">Daily limit: {currentTier.limit}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Next tier available</p>
                  <p className="text-lg font-semibold text-gray-900">{nextTier?.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tier Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <Card 
              key={tier.id} 
              className={`border-0 shadow-lg transition-all duration-300 hover:shadow-xl ${
                tier.current ? 'ring-2 ring-blue-500' : ''
              } ${tier.popular ? 'ring-2 ring-purple-500 relative' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${tier.color} rounded-full flex items-center justify-center`}>
                    <tier.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">{tier.name}</CardTitle>
                <div className="space-y-2">
                  <p className="text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                    {tier.price}
                  </p>
                  <p className="text-sm text-gray-500">Daily Limit: {tier.limit}</p>
                </div>
                {tier.current && (
                  <Badge className="bg-blue-100 text-blue-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Current Plan
                  </Badge>
                )}
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Gift className="h-4 w-4 text-purple-500" />
                    Benefits
                  </h4>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <Award className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  {tier.current ? (
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      disabled
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Current Plan
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleUpgrade(tier.id)}
                      disabled={loading}
                      className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90`}
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      ) : (
                        <ArrowRight className="h-4 w-4 mr-2" />
                      )}
                      Upgrade to {tier.name}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Detailed Feature Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Feature</th>
                    {tiers.map((tier) => (
                      <th key={tier.id} className="text-center py-3 px-4 font-semibold text-gray-900">
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium text-gray-700">Daily Transfer Limit</td>
                    {tiers.map((tier) => (
                      <td key={tier.id} className="text-center py-3 px-4">
                        <span className="font-semibold text-gray-900">{tier.limit}</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium text-gray-700">Transaction Fees</td>
                    <td className="text-center py-3 px-4">
                      <span className="text-red-600 font-semibold">2.5%</span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="text-green-600 font-semibold">1.5%</span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="text-green-600 font-semibold">0%</span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium text-gray-700">Customer Support</td>
                    <td className="text-center py-3 px-4">Basic</td>
                    <td className="text-center py-3 px-4">Priority</td>
                    <td className="text-center py-3 px-4">24/7 Dedicated</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium text-gray-700">Virtual Cards</td>
                    <td className="text-center py-3 px-4">
                      <span className="text-red-500">✗</span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="text-green-500">✓</span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="text-green-500">✓ Multiple</span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium text-gray-700">Crypto Trading</td>
                    <td className="text-center py-3 px-4">
                      <span className="text-red-500">✗</span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="text-green-500">✓</span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="text-green-500">✓ Advanced</span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium text-gray-700">Travel Services</td>
                    <td className="text-center py-3 px-4">
                      <span className="text-red-500">✗</span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="text-green-500">✓</span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="text-green-500">✓ Luxury</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-700">Account Manager</td>
                    <td className="text-center py-3 px-4">
                      <span className="text-red-500">✗</span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="text-red-500">✗</span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="text-green-500">✓ Personal</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Upgrade Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Higher Limits</h3>
              <p className="text-sm text-gray-600">Increase your daily transaction limits</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Better Security</h3>
              <p className="text-sm text-gray-600">Advanced security features and protection</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Priority Support</h3>
              <p className="text-sm text-gray-600">Get faster, dedicated customer support</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-50 to-yellow-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Exclusive Benefits</h3>
              <p className="text-sm text-gray-600">Access to premium features and promotions</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-blue-600" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">How do I upgrade my tier?</h4>
                <p className="text-gray-600 text-sm">Simply click the "Upgrade" button on your desired tier plan. You'll be guided through the payment process.</p>
              </div>
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Can I downgrade my tier?</h4>
                <p className="text-gray-600 text-sm">Yes, you can downgrade at any time. However, you'll lose access to premium features immediately.</p>
              </div>
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Are there any hidden fees?</h4>
                <p className="text-gray-600 text-sm">No hidden fees. All charges are clearly displayed and you'll be notified before any payment is processed.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">What happens to my current balance?</h4>
                <p className="text-gray-600 text-sm">Your current balance remains unchanged. You'll have immediate access to your new tier limits.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DesktopLayout>
  );
};

export default UpgradeTier; 