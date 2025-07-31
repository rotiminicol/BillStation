import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, UserPlus, ArrowRight, Banknote, User as UserIcon, Send, CreditCard, Building2, Phone, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import MobileLayout from "@/components/MobileLayout";
import MobileHeader from "@/components/MobileHeader";
import { MobileCard } from "@/components/ui/mobile-card";
import { paystackService, Bank } from "@/services/paystack";
import { transactionAPI, authAPI } from "@/services/api";
import { User, Transaction } from "@/types";
import Loader from "@/components/Loader";

const Transfer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [description, setDescription] = useState("");
  const [transferType, setTransferType] = useState("billstation");
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [accountName, setAccountName] = useState("");
  const [verifyingAccount, setVerifyingAccount] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch banks and user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [banksData, userResponse] = await Promise.all([
          paystackService.getBanks(),
          authAPI.getMe()
        ]);
        
        setBanks(banksData);
        setUserData(userResponse);
        console.log('Transfer data loaded:', { banks: banksData.length, user: userResponse });
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load transfer data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
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

    setIsProcessing(true);
    
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

      toast({
        title: "Transfer Successful!",
        description: `₦${transferAmount.toLocaleString()} sent successfully.`,
      });

      // Reset form
      setAmount("");
      setRecipient("");
      setDescription("");
      setAccountName("");
      setSelectedBank("");

      // Refresh user data
      const updatedUser = await authAPI.getMe();
      setUserData(updatedUser);

      // Navigate back to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error('Transfer failed:', error);
      toast({
        title: "Transfer Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const transferTypes = [
    { id: "billstation", label: "Bill Station", icon: Building2, color: "bg-[#0B63BC]/10 text-[#0B63BC]" },
    { id: "bank", label: "Other Banks", icon: CreditCard, color: "bg-green-50 text-green-600" },
  ];

  const recentRecipients = [
    { name: "John Doe", account: "1234567890", bank: "First Bank", type: "bank" },
    { name: "Jane Smith", account: "0987654321", bank: "GT Bank", type: "bank" },
    { name: "Mike Johnson", account: "mike@email.com", bank: "Email", type: "email" },
  ];

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center h-full">
          <Loader text="Loading transfer..." />
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">
              Send Money
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Transfer money to anyone, anywhere
            </p>
          </div>

          {/* Transfer Type Selection */}
          <div className="grid grid-cols-2 gap-3">
            {transferTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  setTransferType(type.id);
                  setRecipient("");
                  setAccountName("");
                  setSelectedBank("");
                }}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  transferType === type.id
                    ? "border-[#0B63BC] bg-[#0B63BC]/10"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={`w-10 h-10 rounded-full ${type.color} flex items-center justify-center`}>
                    <type.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">
                    {type.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Card */}
        <MobileCard className="bg-gradient-to-r from-[#0B63BC] to-[#0B63BC]/80 text-white p-6">
          <div className="text-center mb-6">
                            <p className="text-sm text-[#0B63BC]/80 mb-2">Transfer Amount</p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                  <Banknote className="h-5 w-5 text-[#0B63BC]/60" />
              </div>
              <Input
                type="number"
                placeholder="0.00"
                                  className="pl-10 text-3xl font-bold text-center bg-transparent border-white/20 text-white placeholder:text-[#0B63BC]/60 focus:border-white/40"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </MobileCard>

        {/* Recipient Details */}
        <MobileCard>
          <MobileCard.Header>
            <MobileCard.Title>Recipient Details</MobileCard.Title>
          </MobileCard.Header>
          
          <MobileCard.Content className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="recipient" className="text-sm font-medium">
                  {transferType === "billstation" ? "Phone Number or Email" : "Account Number"}
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="recipient"
                    placeholder={transferType === "billstation" ? "080XXXXXXXX or email" : "Enter account number"}
                    className="pl-10"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                </div>
              </div>

              {transferType !== "billstation" && (
                <div className="space-y-2">
                  <Label htmlFor="bank" className="text-sm font-medium">Bank</Label>
                  <Select value={selectedBank} onValueChange={setSelectedBank}>
                    <SelectTrigger className="border-gray-200 focus:border-blue-500">
                      <SelectValue placeholder="Select bank" />
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

              {/* Account Verification Status */}
              {accountName && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">{accountName}</span>
                  </div>
                </div>
              )}

              {verifyingAccount && (
                <div className="p-3 bg-[#0B63BC]/10 border border-[#0B63BC]/20 rounded-lg">
                  <div className="flex items-center gap-2">
                                          <div className="w-4 h-4 border-2 border-[#0B63BC] border-t-transparent rounded-full animate-spin"></div>
                                          <span className="text-sm text-[#0B63BC]">Verifying account...</span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">Description (Optional)</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="description"
                    placeholder="What's this for?"
                    className="pl-10"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button 
                              className="w-full py-3 text-base font-medium bg-[#0B63BC] hover:bg-[#0B63BC]/90"
              onClick={handleTransfer}
              disabled={isProcessing || verifyingAccount}
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send ₦{amount || "0"}
                </>
              )}
            </Button>
          </MobileCard.Content>
        </MobileCard>

        {/* Recent Recipients */}
        <MobileCard>
          <MobileCard.Header>
            <MobileCard.Title>Recent Recipients</MobileCard.Title>
            <Button 
              variant="ghost" 
              size="sm"
                              className="text-[#0B63BC] hover:text-[#0B63BC]/80"
              onClick={() => navigate('/add-recipient')}
            >
              <UserPlus className="h-4 w-4 mr-1" />
              Add New
            </Button>
          </MobileCard.Header>
          
          <MobileCard.Content className="space-y-3">
            {recentRecipients.map((recipient, index) => (
              <button
                key={index}
                onClick={() => {
                  setRecipient(recipient.account);
                  setAccountName(recipient.name);
                }}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#0B63BC]/10 rounded-full flex items-center justify-center">
                                          <UserIcon className="h-5 w-5 text-[#0B63BC]" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{recipient.name}</p>
                    <p className="text-xs text-gray-500">{recipient.account}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{recipient.bank}</p>
                </div>
              </button>
            ))}
          </MobileCard.Content>
        </MobileCard>
      </div>
    </MobileLayout>
  );
};

export default Transfer;
