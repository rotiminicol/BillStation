import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  change: number;
  color: string;
  description: string;
}

interface TradeInputProps {
  crypto: CryptoCurrency;
  tradeType: 'buy' | 'sell';
  onAmountChange: (amount: number, type: 'naira' | 'crypto') => void;
  onTrade: () => void;
  loading: boolean;
  profitLoss?: number;
  originalPrice?: number;
}

const TradeInput: React.FC<TradeInputProps> = ({
  crypto,
  tradeType,
  onAmountChange,
  onTrade,
  loading,
  profitLoss,
  originalPrice
}) => {
  const [inputMode, setInputMode] = useState<'naira' | 'crypto'>('naira');
  const [nairaAmount, setNairaAmount] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCrypto = (amount: number, symbol: string) => {
    return `${amount.toFixed(8)} ${symbol}`;
  };

  const calculateCryptoAmount = (naira: number) => {
    return naira / crypto.price;
  };

  const calculateNairaAmount = (cryptoAmount: number) => {
    return cryptoAmount * crypto.price;
  };

  const handleNairaChange = (value: string) => {
    setNairaAmount(value);
    const numValue = parseFloat(value) || 0;
    const cryptoValue = calculateCryptoAmount(numValue);
    setCryptoAmount(cryptoValue.toFixed(8));
    onAmountChange(numValue, 'naira');
  };

  const handleCryptoChange = (value: string) => {
    setCryptoAmount(value);
    const numValue = parseFloat(value) || 0;
    const nairaValue = calculateNairaAmount(numValue);
    setNairaAmount(nairaValue.toFixed(0));
    onAmountChange(numValue, 'crypto');
  };

  const handleRefreshPrice = () => {
    setIsRefreshing(true);
    // Simulate price refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const getCurrentAmount = () => {
    if (inputMode === 'naira') {
      return parseFloat(nairaAmount) || 0;
    }
    return parseFloat(cryptoAmount) || 0;
  };

  const isAmountValid = () => {
    const amount = getCurrentAmount();
    return amount > 0;
  };

  const getProfitLossDisplay = () => {
    if (!profitLoss || !originalPrice) return null;

    const isProfit = profitLoss > 0;
    const percentage = ((profitLoss / originalPrice) * 100).toFixed(2);

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-2 p-3 rounded-lg ${
          isProfit ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}
      >
        {isProfit ? (
          <TrendingUp className="h-4 w-4 text-green-600" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-600" />
        )}
        <div>
          <p className={`text-sm font-medium ${
            isProfit ? 'text-green-800' : 'text-red-800'
          }`}>
            {isProfit ? '+' : ''}{formatCurrency(profitLoss)} {isProfit ? 'Profit' : 'Loss'}
          </p>
          <p className={`text-xs ${
            isProfit ? 'text-green-600' : 'text-red-600'
          }`}>
            {isProfit ? '+' : ''}{percentage}%
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardContent className="p-6 space-y-6">
        {/* Header with Price Info */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {tradeType === 'buy' ? 'Buy' : 'Sell'} {crypto.name}
            </h3>
            <p className="text-sm text-gray-500">{crypto.description}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                {formatCurrency(crypto.price)}
              </span>
              <button
                onClick={handleRefreshPrice}
                disabled={isRefreshing}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <RefreshCw className={`h-4 w-4 text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              crypto.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {crypto.change >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{crypto.change >= 0 ? '+' : ''}{crypto.change}%</span>
            </div>
          </div>
        </div>

        {/* Input Mode Toggle */}
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-gray-700">Input Mode</Label>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">₦ Naira</span>
            <Switch
              checked={inputMode === 'crypto'}
              onCheckedChange={(checked) => setInputMode(checked ? 'crypto' : 'naira')}
            />
            <span className="text-sm text-gray-600">{crypto.symbol}</span>
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">
              {inputMode === 'naira' ? 'Amount in Naira (₦)' : `Amount in ${crypto.symbol}`}
            </Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                placeholder={`Enter amount in ${inputMode === 'naira' ? 'Naira' : crypto.symbol}`}
                value={inputMode === 'naira' ? nairaAmount : cryptoAmount}
                onChange={(e) => {
                  if (inputMode === 'naira') {
                    handleNairaChange(e.target.value);
                  } else {
                    handleCryptoChange(e.target.value);
                  }
                }}
                className="h-12 pr-20"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Badge variant="secondary" className="text-xs">
                  {inputMode === 'naira' ? '₦' : crypto.symbol}
                </Badge>
              </div>
            </div>
          </div>

          {/* Conversion Display */}
          {getCurrentAmount() > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-800">
                  {tradeType === 'buy' ? 'You will receive:' : 'You will get:'}
                </span>
                <span className="text-sm font-bold text-blue-900">
                  {inputMode === 'naira' 
                    ? formatCrypto(calculateCryptoAmount(getCurrentAmount()), crypto.symbol)
                    : formatCurrency(calculateNairaAmount(getCurrentAmount()))
                  }
                </span>
              </div>
            </motion.div>
          )}

          {/* Profit/Loss Display for Sell Mode */}
          {tradeType === 'sell' && getProfitLossDisplay()}
        </div>

        {/* Trade Button */}
        <motion.button
          onClick={onTrade}
          disabled={loading || !isAmountValid()}
          className={`w-full h-12 rounded-lg font-semibold transition-all duration-200 ${
            isAmountValid() && !loading
              ? 'bg-[#0B63BC] hover:bg-[#0B63BC]/90 text-white shadow-lg'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          whileHover={isAmountValid() && !loading ? { scale: 1.02 } : {}}
          whileTap={isAmountValid() && !loading ? { scale: 0.98 } : {}}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <span>{tradeType === 'buy' ? 'Buy' : 'Sell'} {crypto.symbol}</span>
            </div>
          )}
        </motion.button>
      </CardContent>
    </Card>
  );
};

export default TradeInput; 