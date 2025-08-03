import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Bitcoin, Smartphone, Wifi, DollarSign, TrendingUp, TrendingDown, Activity, CheckCircle, ArrowRight, Wallet, BarChart3, RefreshCw, Calculator, Shield, Clock, Globe, Star, Zap, Users, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
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

const MobileConvertAsset = () => {
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
    }, 30000);

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

  return (
    <MobileLayout>
      <div className="min-h-screen bg-[#F6F6F8]">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/dashboard" className="p-2">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Convert Assets
                </h1>
                <p className="text-sm text-gray-500">Convert to cash instantly</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Asset Selection */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-[#0B63BC]" />
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

          {/* Conversion Rates */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">Today's Rates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
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

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg bg-white mb-20">
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
    </MobileLayout>
  );
};

export default MobileConvertAsset;