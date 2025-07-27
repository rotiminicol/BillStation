
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, CheckCircle, ArrowLeft, ArrowRight, Shield, CreditCard, Smartphone, Globe, Settings, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    occupation: '',
    sourceOfFunds: '',
    monthlyIncome: '',
    agreeToTerms: false,
    agreeToMarketing: false
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const steps = [
    {
      title: "Welcome to Bill Station!",
      description: "Let's set up your account in a few simple steps",
      icon: <User className="h-8 w-8" />,
      content: (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto">
            <img 
              src="/logo.png" 
              alt="Bill Station Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">You're almost ready!</h3>
            <p className="text-gray-600">We'll help you complete your profile and set up security features for a seamless experience.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>What you'll need:</strong> Basic personal information and a few minutes of your time.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Personal Information",
      description: "Tell us a bit about yourself",
      icon: <User className="h-8 w-8" />,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name (as on ID)</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+234 801 234 5678"
              value={formData.phoneNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Residential Address</Label>
            <Input
              id="address"
              type="text"
              placeholder="Enter your current address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              required
            />
          </div>
        </div>
      )
    },
    {
      title: "Employment Details",
      description: "Help us understand your financial profile",
      icon: <Settings className="h-8 w-8" />,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="occupation">Occupation</Label>
            <Input
              id="occupation"
              type="text"
              placeholder="e.g., Software Engineer, Business Owner"
              value={formData.occupation}
              onChange={(e) => setFormData(prev => ({ ...prev, occupation: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sourceOfFunds">Source of Funds</Label>
            <Input
              id="sourceOfFunds"
              type="text"
              placeholder="e.g., Salary, Business, Investment"
              value={formData.sourceOfFunds}
              onChange={(e) => setFormData(prev => ({ ...prev, sourceOfFunds: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthlyIncome">Monthly Income Range</Label>
            <select
              id="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={(e) => setFormData(prev => ({ ...prev, monthlyIncome: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select income range</option>
              <option value="0-50000">₦0 - ₦50,000</option>
              <option value="50000-200000">₦50,000 - ₦200,000</option>
              <option value="200000-500000">₦200,000 - ₦500,000</option>
              <option value="500000-1000000">₦500,000 - ₦1,000,000</option>
              <option value="1000000+">₦1,000,000+</option>
            </select>
          </div>
        </div>
      )
    },
    {
      title: "Set Your Transaction PIN",
      description: "Create a secure 4-digit PIN for your transactions",
      icon: <Shield className="h-8 w-8" />,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pin">Transaction PIN</Label>
              <div className="relative">
                <Input
                  id="pin"
                  type={showPin ? "text" : "password"}
                  placeholder="Enter 4-digit PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength={4}
                  className="text-center text-lg tracking-widest"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPin(!showPin)}
                >
                  {showPin ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPin">Confirm PIN</Label>
              <div className="relative">
                <Input
                  id="confirmPin"
                  type={showConfirmPin ? "text" : "password"}
                  placeholder="Confirm 4-digit PIN"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength={4}
                  className="text-center text-lg tracking-widest"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPin(!showConfirmPin)}
                >
                  {showConfirmPin ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Security Tip:</strong> Don't share your PIN with anyone. Bill Station will never ask for your PIN.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Terms & Preferences",
      description: "Review and accept our terms of service",
      icon: <Globe className="h-8 w-8" />,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))}
                className="mt-1"
              />
              <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                I agree to the{" "}
                <Link to="/terms" className="text-blue-600 hover:text-blue-700 underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="agreeToMarketing"
                checked={formData.agreeToMarketing}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToMarketing: checked as boolean }))}
                className="mt-1"
              />
              <Label htmlFor="agreeToMarketing" className="text-sm leading-relaxed">
                I agree to receive marketing communications and updates about new features
              </Label>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-700">
              <strong>Almost done!</strong> Just one more step to complete your setup.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "All Set!",
      description: "Your account is ready for secure transactions",
      icon: <CheckCircle className="h-8 w-8" />,
      content: (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Setup Complete!</h3>
            <p className="text-gray-600">You can now start using your Bill Station account to send money, pay bills, trade gift cards, and more.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700 font-medium">Your account number will be generated shortly</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg">
              <CreditCard className="h-5 w-5 text-blue-600 mx-auto mb-1" />
              <p className="font-medium">Send Money</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <Smartphone className="h-5 w-5 text-green-600 mx-auto mb-1" />
              <p className="font-medium">Pay Bills</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = async () => {
    // Validation for step 1 (Personal Information)
    if (currentStep === 1) {
      if (!formData.fullName || !formData.phoneNumber || !formData.address) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
    }

    // Validation for step 2 (Employment Details)
    if (currentStep === 2) {
      if (!formData.occupation || !formData.sourceOfFunds || !formData.monthlyIncome) {
        toast({
          title: "Missing Information",
          description: "Please fill in all employment details",
          variant: "destructive"
        });
        return;
      }
    }

    // Validation for step 3 (PIN)
    if (currentStep === 3) {
      if (pin.length !== 4) {
        toast({
          title: "Invalid PIN",
          description: "Please enter a 4-digit PIN",
          variant: "destructive"
        });
        return;
      }
      if (pin !== confirmPin) {
        toast({
          title: "PINs don't match",
          description: "Please make sure both PINs are the same",
          variant: "destructive"
        });
        return;
      }
    }

    // Validation for step 4 (Terms)
    if (currentStep === 4) {
      if (!formData.agreeToTerms) {
        toast({
          title: "Terms Required",
          description: "Please agree to the Terms of Service and Privacy Policy",
          variant: "destructive"
        });
        return;
      }
    }

    if (currentStep === steps.length - 1) {
      setLoading(true);
      setTimeout(() => {
        toast({
          title: "Setup complete!",
          description: "Your Bill Station account is ready to use.",
        });
        navigate("/dashboard");
      }, 1000);
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Left Side - Image */}
        <div className="w-1/2 relative overflow-hidden">
          <img
            src="/money2.jpg"
            alt="Financial Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <img 
                  src="/logo.png" 
                  alt="Bill Station Logo" 
                  className="w-10 h-10 object-contain"
                />
                <span className="text-xl font-bold">Bill Station</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">Welcome to Financial Freedom</h2>
                <p className="text-lg text-gray-200 leading-relaxed">
                  Complete your setup and unlock a world of seamless financial services. 
                  Send money, pay bills, and manage your finances with ease.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span>Secure transactions with bank-level encryption</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span>Instant money transfers and bill payments</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span>24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 bg-white overflow-y-auto">
          <div className="w-full max-w-2xl mx-auto p-12">
            {/* Header */}
            <div className="flex items-center justify-center mb-8">
              <img 
                src="/logo.png" 
                alt="Bill Station Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="ml-2 font-semibold text-gray-900">Bill Station</span>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</span>
                <span className="text-sm font-medium text-blue-600">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <Card className="border-0 shadow-none bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    {currentStepData.icon}
                  </div>
                </div>
                <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
                <CardDescription>{currentStepData.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentStepData.content}
                
                <div className="flex gap-3 pt-4">
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="flex-1"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    className="flex-1"
                    disabled={loading}
                  >
                    {loading ? "Setting up..." : currentStep === steps.length - 1 ? "Get Started" : "Continue"}
                    {!loading && currentStep < steps.length - 1 && <ArrowRight className="h-4 w-4 ml-2" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/money2.jpg"
            alt="Financial Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
        </div>

        {/* Thick White Fading Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95"></div>

        {/* Mobile Form Content */}
        <div className="relative z-10 min-h-screen p-6">
          {/* Header */}
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/logo.png" 
              alt="Bill Station Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="ml-2 font-semibold text-gray-900">Bill Station</span>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</span>
              <span className="text-sm font-medium text-blue-600">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <Card className="border-0 shadow-none bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  {currentStepData.icon}
                </div>
              </div>
              <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
              <CardDescription>{currentStepData.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStepData.content}
              
              <div className="flex gap-3 pt-4">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? "Setting up..." : currentStep === steps.length - 1 ? "Get Started" : "Continue"}
                  {!loading && currentStep < steps.length - 1 && <ArrowRight className="h-4 w-4 ml-2" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
