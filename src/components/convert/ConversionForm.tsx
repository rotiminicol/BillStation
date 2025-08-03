import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bitcoin, Smartphone, Wifi, DollarSign, Calculator, Info } from 'lucide-react';

interface AssetType {
  id: string;
  name: string;
  conversionRate: number;
  minAmount: number;
  maxAmount: number;
}

interface ConversionFormProps {
  selectedAsset: AssetType;
  onConvert: (data: any) => void;
  loading: boolean;
}

const ConversionForm: React.FC<ConversionFormProps> = ({
  selectedAsset,
  onConvert,
  loading
}) => {
  const [amount, setAmount] = useState('');
  const [provider, setProvider] = useState('');
  const [cryptoType, setCryptoType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateConversion = () => {
    const numAmount = parseFloat(amount) || 0;
    const convertedAmount = numAmount * selectedAsset.conversionRate;
    const fee = numAmount - convertedAmount;
    return {
      original: numAmount,
      converted: convertedAmount,
      fee: fee,
      rate: selectedAsset.conversionRate
    };
  };

  const conversion = calculateConversion();
  const isValidAmount = conversion.original >= selectedAsset.minAmount && conversion.original <= selectedAsset.maxAmount;

  const cryptoTypes = [
    { value: 'bitcoin', label: 'Bitcoin (BTC)', price: 45000000 },
    { value: 'ethereum', label: 'Ethereum (ETH)', price: 2800000 },
    { value: 'binance', label: 'Binance Coin (BNB)', price: 45000 },
    { value: 'cardano', label: 'Cardano (ADA)', price: 450 }
  ];

  const providers = [
    { value: 'mtn', label: 'MTN Nigeria' },
    { value: 'airtel', label: 'Airtel Nigeria' },
    { value: 'glo', label: 'GLO Nigeria' },
    { value: '9mobile', label: '9mobile Nigeria' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidAmount) return;

    const formData = {
      assetType: selectedAsset.id,
      amount: conversion.original,
      convertedAmount: conversion.converted,
      fee: conversion.fee,
      provider: selectedAsset.id === 'airtime' || selectedAsset.id === 'data' ? provider : undefined,
      cryptoType: selectedAsset.id === 'crypto' ? cryptoType : undefined,
      phoneNumber: selectedAsset.id === 'airtime' || selectedAsset.id === 'data' ? phoneNumber : undefined
    };

    onConvert(formData);
  };

  const getAssetIcon = () => {
    switch (selectedAsset.id) {
      case 'crypto':
        return <Bitcoin className="h-5 w-5" />;
      case 'airtime':
        return <Smartphone className="h-5 w-5" />;
      case 'data':
        return <Wifi className="h-5 w-5" />;
      default:
        return <DollarSign className="h-5 w-5" />;
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#0B63BC]/10 flex items-center justify-center">
            {getAssetIcon()}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Convert {selectedAsset.name}
            </h3>
            <p className="text-sm text-gray-500">
              Get cash for your {selectedAsset.name.toLowerCase()}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Asset-specific fields */}
          {selectedAsset.id === 'crypto' && (
            <div className="space-y-2">
              <Label htmlFor="cryptoType">Select Cryptocurrency</Label>
              <Select value={cryptoType} onValueChange={setCryptoType}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Choose cryptocurrency" />
                </SelectTrigger>
                <SelectContent>
                  {cryptoTypes.map((crypto) => (
                    <SelectItem key={crypto.value} value={crypto.value}>
                      <div className="flex items-center justify-between w-full">
                        <span>{crypto.label}</span>
                        <span className="text-sm text-gray-500">
                          ₦{crypto.price.toLocaleString()}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {(selectedAsset.id === 'airtime' || selectedAsset.id === 'data') && (
            <>
              <div className="space-y-2">
                <Label htmlFor="provider">Network Provider</Label>
                <Select value={provider} onValueChange={setProvider}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your network" />
                  </SelectTrigger>
                  <SelectContent>
                    {providers.map((prov) => (
                      <SelectItem key={prov.value} value={prov.value}>
                        {prov.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="h-12"
                />
              </div>
            </>
          )}

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">
              Amount to Convert (₦)
            </Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-12 pr-20"
                min={selectedAsset.minAmount}
                max={selectedAsset.maxAmount}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Badge variant="secondary" className="text-xs">
                  ₦
                </Badge>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Min: {formatCurrency(selectedAsset.minAmount)} | Max: {formatCurrency(selectedAsset.maxAmount)}
            </p>
          </div>

          {/* Conversion Preview */}
          {amount && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3"
            >
              <div className="flex items-center space-x-2">
                <Calculator className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Conversion Preview</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Original Amount</span>
                  <span className="font-medium">{formatCurrency(conversion.original)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Conversion Rate</span>
                  <span className="font-medium text-[#0B63BC]">
                    {(conversion.rate * 100).toFixed(0)}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Processing Fee</span>
                  <span className="font-medium text-red-600">
                    -{formatCurrency(conversion.fee)}
                  </span>
                </div>
                
                <div className="pt-2 border-t border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-800">You'll Receive</span>
                    <span className="text-lg font-bold text-[#0B63BC]">
                      {formatCurrency(conversion.converted)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Validation Message */}
          {amount && !isValidAmount && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <Info className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-800">
                  Amount must be between {formatCurrency(selectedAsset.minAmount)} and {formatCurrency(selectedAsset.maxAmount)}
                </span>
              </div>
            </motion.div>
          )}

          {/* Convert Button */}
          <motion.button
            type="submit"
            disabled={loading || !isValidAmount || !amount}
            className={`w-full h-12 rounded-lg font-semibold transition-all duration-200 ${
              isValidAmount && amount && !loading
                ? 'bg-[#0B63BC] hover:bg-[#0B63BC]/90 text-white shadow-lg'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={isValidAmount && amount && !loading ? { scale: 1.02 } : {}}
            whileTap={isValidAmount && amount && !loading ? { scale: 0.98 } : {}}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <DollarSign className="h-5 w-5" />
                Convert to Cash
              </div>
            )}
          </motion.button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConversionForm; 