
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Clock, CheckCircle, Activity, DollarSign, ArrowRight, Shield, Users, Globe, Zap, AlertCircle, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";

import { useToast } from "@/hooks/use-toast";
import { paystackService, Bank } from "@/services/paystack";
import { transactionAPI, authAPI } from "@/services/api";
import { getBankLogo } from "@/lib/bankLogos";
import { User, Transaction } from "@/types";
import ViewAllButton from "@/components/ui/view-all-button";

const Transfer = () => {
  const [transferType, setTransferType] = useState("billstation");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [accountName, setAccountName] = useState("");
  const [verifyingAccount, setVerifyingAccount] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userData, setUserData] = useState<User | null>(null);
  const { toast } = useToast();

  // Fetch banks and user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [banksData, userResponse, transactionsResponse] = await Promise.all([
          paystackService.getBanks(),
          authAPI.getMe(),
          transactionAPI.getAll().catch(() => [])
        ]);
        
        setBanks(banksData);
        setUserData(userResponse);
        setTransactions(transactionsResponse);
        console.log('Transfer data loaded:', { banks: banksData.length, user: userResponse });
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load transfer data",
          variant: "destructive"
        });
      }
    };

    fetchData();
  }, [toast]);

  // Verify account when account number and bank are provided
  useEffect(() => {
    const verifyAccount = async () => {
      if (transferType !== "billstation" && recipient.length === 10 && selectedBank) {
        setVerifyingAccount(true);
        try {
          const bankData = banks.find(bank => bank.code === selectedBank);
          if (bankData) {
            const verification = await paystackService.verifyAccount(recipient, selectedBank);
            setAccountName(verification.account_name);
            toast({
              title: "Account Verified",
              description: `${verification.account_name} - ${bankData.name}`,
            });
          }
        } catch (error) {
          console.error('Account verification failed:', error);
          setAccountName("");
          toast({
            title: "Verification Failed",
            description: "Could not verify account details",
            variant: "destructive"
          });
        } finally {
          setVerifyingAccount(false);
        }
      }
    };

    verifyAccount();
  }, [recipient, selectedBank, transferType, banks, toast]);

  const handleTransfer = async () => {
    if (!amount || !recipient) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const transferAmount = parseFloat(amount);
    
    if (transferAmount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount.",
        variant: "destructive"
      });
      return;
    }

    if (userData?.balance < transferAmount) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough balance for this transfer.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Create transaction record
      const transactionData = {
        type: 'debit' as const,
        amount: transferAmount,
        description: description || `Transfer to ${accountName || recipient}`,
        recipient: accountName || recipient,
        reference: `TXN_${Date.now()}`
      };

      await transactionAPI.create(transactionData);
      
      // Update user balance
      const newBalance = userData.balance - transferAmount;
      await authAPI.updateBalance(newBalance);
      
      // Update local state
      setUserData(prev => prev ? { ...prev, balance: newBalance } : null);
      
      toast({
        title: "Transfer Successful",
        description: `₦${transferAmount.toLocaleString()} transferred successfully`,
      });
      
      // Reset form
      setAmount("");
      setRecipient("");
      setDescription("");
      setAccountName("");
      setSelectedBank("");
      
    } catch (error) {
      console.error('Transfer failed:', error);
      toast({
        title: "Transfer Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const TransferContent = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Send Money
          </h1>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Balance Display */}
          {userData && (
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-600 to-green-700 text-white">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <DollarSign className="h-6 w-6 text-green-100" />
                    <p className="text-green-100 text-lg font-medium">Available Balance</p>
                  </div>
                  <p className="text-4xl font-bold tracking-tight">
                    ₦{userData.balance?.toLocaleString() || '0'}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Transfer Type Selector */}
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={transferType === "billstation" ? "default" : "outline"}
                  size="lg"
                  onClick={() => setTransferType("billstation")}
                  className={`h-16 text-lg font-semibold ${
                    transferType === "billstation" 
                      ? "bg-[#0B63BC] hover:bg-[#0B63BC]/90" 
                      : "border-2 hover:border-[#0B63BC] hover:bg-[#0B63BC]/10"
                  }`}
                >
                  <Shield className="h-5 w-5 mr-2" />
                  Bill Station
                </Button>
                <Button
                  variant={transferType === "bank" ? "default" : "outline"}
                  size="lg"
                  onClick={() => setTransferType("bank")}
                  className={`h-16 text-lg font-semibold ${
                    transferType === "bank" 
                      ? "bg-[#0B63BC] hover:bg-[#0B63BC]/90" 
                      : "border-2 hover:border-[#0B63BC] hover:bg-[#0B63BC]/10"
                  }`}
                >
                  <Globe className="h-5 w-5 mr-2" />
                  Bank Transfer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transfer Form */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Transfer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₦)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>

              {/* Recipient */}
              <div className="space-y-2">
                <Label htmlFor="recipient">
                  {transferType === "billstation" ? "Phone Number" : "Account Number"}
                </Label>
                <Input
                  id="recipient"
                  type="text"
                  placeholder={transferType === "billstation" ? "Enter phone number" : "Enter account number"}
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="h-12"
                />
              </div>

              {/* Bank Selection (for bank transfers) */}
              {transferType === "bank" && (
                <div className="space-y-2">
                  <Label htmlFor="bank">Select Bank</Label>
                  <Select value={selectedBank} onValueChange={setSelectedBank}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choose a bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank.code} value={bank.code}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Account Name Display */}
              {accountName && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">Account Name: {accountName}</p>
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-12"
                />
              </div>

              {/* Transfer Button */}
              <Button
                onClick={handleTransfer}
                disabled={loading || verifyingAccount}
                className="w-full h-12 bg-[#0B63BC] hover:bg-[#0B63BC]/90 text-lg font-semibold"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Send Money
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Transactions */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#0B63BC]" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CreditCard className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">No transactions yet</p>
                  </div>
                ) : (
                  transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                          <img
                            src={getBankLogo({ code: transaction.bankCode, name: transaction.bankName || transaction.description })}
                            alt="Bank"
                            className="w-6 h-6 object-contain"
                            onError={e => { e.currentTarget.src = '/placeholder.svg'; }}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{transaction.created_at ? new Date(transaction.created_at).toLocaleDateString() : 'Recently'}</p>
                        </div>
                      </div>
                      <p className={`font-bold text-sm ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'credit' ? '+' : '-'}₦{(transaction.amount || 0).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-4">
                <ViewAllButton className="w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/bills" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Pay Bills
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/cards" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Manage Cards
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/transactions" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  View History
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <DesktopLayout>
      <TransferContent />
    </DesktopLayout>
  );
};

export default Transfer;
