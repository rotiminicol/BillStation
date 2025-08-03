import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Bitcoin, Smartphone, Wifi, DollarSign, TrendingUp, TrendingDown, Activity, CheckCircle, ArrowRight, Wallet, BarChart3, RefreshCw, Calculator, Shield, Clock, Globe, Star, Zap, Users, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";
import AssetSelector from "@/components/convert/AssetSelector";
import ConversionForm from "@/components/convert/ConversionForm";
import ConversionSuccessModal from "@/components/convert/ConversionSuccessModal";

import { useToast } from "@/hooks/use-toast";

interface AssetType {
  id: string;
  name: string;
  conversionRate: number;
  minAmount: number;
  maxAmount: number;
}

interface ConversionData {
  assetType: string;
  amount: number;
  convertedAmount: number;
  fee: number;
  provider?: string;
  cryptoType?: string;
  phoneNumber?: string;
}

const ConvertAsset = () => {
  const [selectedAsset, setSelectedAsset] = useState<AssetType | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentConversion, setCurrentConversion] = useState<ConversionData | null>(null);
  const { toast } = useToast();

  // Mock conversion rates data
  const assetTypes: AssetType[] = [
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      conversionRate: 0.98, // 98% of market value
      minAmount: 5000,
      maxAmount: 10000000
    },
    {
      id: 'airtime',
      name: 'Airtime',
      conversionRate: 0.85, // 85% of face value
      minAmount: 100,
      maxAmount: 50000
    },
    {
      id: 'data',
      name: 'Data Bundle',
      conversionRate: 0.75, // 75% of face value
      minAmount: 50,
      maxAmount: 25000
    }
  ];

  // Simulate live rate updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, this would fetch live conversion rates from an API
      console.log('Rate update simulation...');
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleAssetSelect = (assetId: string) => {
    const asset = assetTypes.find(a => a.id === assetId);
    setSelectedAsset(asset || null);
  };

  const handleConversion = (data: ConversionData) => {
    setLoading(true);
    
    // Simulate conversion processing
    setTimeout(() => {
      setCurrentConversion(data);
      setShowSuccessModal(true);
      setLoading(false);
      
      toast({
        title: "Conversion Successful!",
        description: `Successfully converted ${data.amount.toLocaleString()} to cash.`,
      });
    }, 2000);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setCurrentConversion(null);
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your conversion receipt is being downloaded.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Shared!",
      description: "Your conversion details have been shared.",
    });
  };

  const handleViewHistory = () => {
    toast({
      title: "Redirecting...",
      description: "Taking you to conversion history.",
    });
  };

  const ConvertAssetContent = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Convert Assets to Cash
          </h1>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Asset Selection */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-[#0B63BC]" />
                Select Asset to Convert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AssetSelector
                selectedAsset={selectedAsset?.id || ''}
                onSelect={handleAssetSelect}
              />
            </CardContent>
          </Card>

          {/* Conversion Form */}
          {selectedAsset && (
            <ConversionForm
              selectedAsset={selectedAsset}
              onConvert={handleConversion}
              loading={loading}
            />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/transactions" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  View History
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/wallet" className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  My Wallet
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/transfer" className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Send Money
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Conversion Rates */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">Today's Rates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {assetTypes.map((asset) => (
                <div key={asset.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      {asset.id === 'crypto' && <Bitcoin className="h-4 w-4" />}
                      {asset.id === 'airtime' && <Smartphone className="h-4 w-4" />}
                      {asset.id === 'data' && <Wifi className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{asset.name}</p>
                      <p className="text-xs text-gray-500">{(asset.conversionRate * 100).toFixed(0)}% rate</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#0B63BC]">
                      ₦{asset.minAmount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">min</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Instant Conversion</p>
                  <p className="text-xs text-gray-500">Quick cash out</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0B63BC]/10 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-[#0B63BC]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Secure Platform</p>
                  <p className="text-xs text-gray-500">Bank-level security</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Best Rates</p>
                  <p className="text-xs text-gray-500">Competitive pricing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Success Modal */}
      {currentConversion && (
        <ConversionSuccessModal
          conversion={currentConversion}
          isOpen={showSuccessModal}
          onClose={handleSuccessModalClose}
          onDownload={handleDownload}
          onShare={handleShare}
          onViewHistory={handleViewHistory}
        />
      )}
    </div>
  );

  return (
    <DesktopLayout>
      <ConvertAssetContent />
    </DesktopLayout>
  );
};

export default ConvertAsset;