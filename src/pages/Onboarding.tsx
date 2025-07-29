
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, CheckCircle, ArrowLeft, ArrowRight, Shield, CreditCard, Smartphone, Globe, Settings, User, Sparkles, Clock, Zap, Lock, Star, Phone, Briefcase } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    fullName: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    nationality: '',
    placeOfBirth: '',
    
    // Step 2: Identity Verification
    idType: '',
    idNumber: '',
    idIssuingCountry: '',
    idExpiryDate: '',
    
    // Step 3: Contact & Address
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    
    // Step 4: Employment & Income
    occupation: '',
    employerName: '',
    employerAddress: '',
    employmentType: '',
    monthlyIncome: '',
    sourceOfFunds: '',
    additionalIncome: '',
    
    // Step 5: Financial Profile
    bankAccountHistory: '',
    creditHistory: '',
    investmentExperience: '',
    riskTolerance: '',
    expectedMonthlyTransactions: '',
    purposeOfAccount: '',
    
    // Step 6: Security & Terms
    pin: '',
    confirmPin: '',
    securityQuestion1: '',
    securityAnswer1: '',
    securityQuestion2: '',
    securityAnswer2: '',
    agreeToTerms: false,
    agreeToMarketing: false,
    agreeToDataProcessing: false
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const steps = [
    {
      title: "Personal Information",
      description: "Basic personal details",
      icon: <User className="h-8 w-8" />,
      content: (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Label htmlFor="fullName">Full Name (as on ID)</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              required
              className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
            />
          </motion.div>
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
              required
              className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
            />
          </motion.div>
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Label htmlFor="gender">Gender</Label>
            <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
              <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Label htmlFor="maritalStatus">Marital Status</Label>
            <Select value={formData.maritalStatus} onValueChange={(value) => setFormData(prev => ({ ...prev, maritalStatus: value }))}>
              <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300">
                <SelectValue placeholder="Select marital status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
                <SelectItem value="divorced">Divorced</SelectItem>
                <SelectItem value="widowed">Widowed</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Label htmlFor="nationality">Nationality</Label>
            <Input
              id="nationality"
              type="text"
              placeholder="Enter your nationality"
              value={formData.nationality}
              onChange={(e) => setFormData(prev => ({ ...prev, nationality: e.target.value }))}
              required
              className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
            />
          </motion.div>
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Label htmlFor="placeOfBirth">Place of Birth</Label>
            <Input
              id="placeOfBirth"
              type="text"
              placeholder="City, Country"
              value={formData.placeOfBirth}
              onChange={(e) => setFormData(prev => ({ ...prev, placeOfBirth: e.target.value }))}
              className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
            />
          </motion.div>
        </motion.div>
      )
    },
    {
      title: "Identity Verification",
      description: "ID documents and verification",
      icon: <Shield className="h-8 w-8" />,
      content: (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Label htmlFor="idType">ID Type</Label>
            <Select value={formData.idType} onValueChange={(value) => setFormData(prev => ({ ...prev, idType: value }))}>
              <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300">
                <SelectValue placeholder="Select ID type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="national_id">National ID</SelectItem>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="drivers_license">Driver's License</SelectItem>
                <SelectItem value="voters_card">Voter's Card</SelectItem>
                <SelectItem value="nin">NIN</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Label htmlFor="idNumber">ID Number</Label>
            <Input
              id="idNumber"
              type="text"
              placeholder="Enter your ID number"
              value={formData.idNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, idNumber: e.target.value }))}
              required
              className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
            />
          </motion.div>
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Label htmlFor="idIssuingCountry">Issuing Country</Label>
            <Input
              id="idIssuingCountry"
              type="text"
              placeholder="Country that issued the ID"
              value={formData.idIssuingCountry}
              onChange={(e) => setFormData(prev => ({ ...prev, idIssuingCountry: e.target.value }))}
              required
              className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
            />
          </motion.div>
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Label htmlFor="idExpiryDate">ID Expiry Date</Label>
            <Input
              id="idExpiryDate"
              type="date"
              value={formData.idExpiryDate}
              onChange={(e) => setFormData(prev => ({ ...prev, idExpiryDate: e.target.value }))}
              required
              className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
            />
          </motion.div>
          <motion.div 
            className="p-4 bg-blue-50 rounded-lg border border-blue-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-sm text-blue-700">
              <strong>Important:</strong> Please ensure your ID is valid and not expired. We may require additional verification.
            </p>
          </motion.div>
        </motion.div>
      )
    },
    {
      title: "Contact & Address",
      description: "Contact details and address",
      icon: <Phone className="h-8 w-8" />,
      content: (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+234 801 234 5678"
              value={formData.phoneNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
              required
              className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
            />
          </motion.div>
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
            />
          </motion.div>
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Label htmlFor="address">Residential Address</Label>
            <Textarea
              id="address"
              placeholder="Enter your full residential address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
              rows={3}
              required
            />
          </motion.div>
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                required
                className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                type="text"
                placeholder="State"
                value={formData.state}
                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                required
                className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
              />
            </div>
          </motion.div>
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                type="text"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                type="text"
                placeholder="Country"
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                required
                className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
              />
            </div>
          </motion.div>
          <motion.div 
            className="border-t pt-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h4 className="font-medium text-gray-900 mb-3">Emergency Contact</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                <Input
                  id="emergencyContactName"
                  type="text"
                  placeholder="Full name of emergency contact"
                  value={formData.emergencyContactName}
                  onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactName: e.target.value }))}
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyContactPhone"
                  type="tel"
                  placeholder="+234 801 234 5678"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactPhone: e.target.value }))}
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactRelationship">Relationship</Label>
                <Select value={formData.emergencyContactRelationship} onValueChange={(value) => setFormData(prev => ({ ...prev, emergencyContactRelationship: value }))}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )
    },
    {
      title: "Employment & Income",
      description: "Work and income details",
      icon: <Briefcase className="h-8 w-8" />,
      content: (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))}
                className="mt-1"
              />
              <div className="space-y-1">
                <Label htmlFor="terms" className="text-sm font-medium">
                  I agree to the Terms of Service and Privacy Policy
                </Label>
                <p className="text-xs text-gray-500">
                  By checking this box, you acknowledge that you have read and agree to our terms of service and privacy policy.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="marketing"
                checked={formData.agreeToMarketing}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToMarketing: checked as boolean }))}
                className="mt-1"
              />
              <div className="space-y-1">
                <Label htmlFor="marketing" className="text-sm font-medium">
                  I agree to receive marketing communications
                </Label>
                <p className="text-xs text-gray-500">
                  Receive updates about new features, promotions, and financial tips. You can unsubscribe anytime.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="p-4 bg-blue-50 rounded-lg border border-blue-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-sm text-blue-700">
              <strong>Your Privacy:</strong> We take your privacy seriously. Your personal information is encrypted and protected by bank-level security.
            </p>
          </motion.div>
        </motion.div>
      )
    },
    {
      title: "Setup Complete!",
      description: "Your account is ready to use",
      icon: <CheckCircle className="h-8 w-8" />,
      content: (
        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <CheckCircle className="h-10 w-10 text-white" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Welcome to Bill Station!</h3>
            <p className="text-gray-600">Your account has been successfully created. You can now enjoy all our services.</p>
          </div>
          <motion.div 
            className="bg-green-50 p-4 rounded-lg border border-green-200"
            whileHover={{ y: -2 }}
          >
            <p className="text-sm text-green-700">
              <strong>Next Steps:</strong> Complete your profile, add funds, and start using our services.
            </p>
          </motion.div>
        </motion.div>
      )
    }
  ];

  const handleNext = async () => {
    if (currentStep === 6) {
      setLoading(true);
      setTimeout(() => {
        toast({
          title: "Account Created!",
          description: "Welcome to Bill Station. Your account is ready to use.",
        });
        setLoading(false);
        navigate('/dashboard');
      }, 2000);
      return;
    }

    // Validation for each step
    if (currentStep === 1) {
      if (!formData.fullName || !formData.dateOfBirth || !formData.gender || !formData.nationality) {
        toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.idType || !formData.idNumber || !formData.idIssuingCountry || !formData.idExpiryDate) {
        toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.phoneNumber || !formData.address || !formData.city || !formData.state || !formData.country) {
        toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }
    } else if (currentStep === 4) {
      if (!formData.occupation || !formData.employerName || !formData.monthlyIncome || !formData.sourceOfFunds) {
        toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }
    } else if (currentStep === 5) {
      if (!formData.bankAccountHistory || !formData.creditHistory || !formData.riskTolerance || !formData.purposeOfAccount) {
        toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }
    } else if (currentStep === 6) {
      if (!pin || !confirmPin) {
        toast({
          title: "Error",
          description: "Please create and confirm your PIN.",
          variant: "destructive"
        });
        return;
      }
      if (pin !== confirmPin) {
        toast({
          title: "Error",
          description: "PINs do not match. Please try again.",
          variant: "destructive"
        });
        return;
      }
      if (pin.length !== 4) {
        toast({
          title: "Error",
          description: "PIN must be exactly 4 digits.",
          variant: "destructive"
        });
        return;
      }
      if (!formData.agreeToTerms) {
        toast({
          title: "Error",
          description: "You must agree to the terms of service to continue.",
          variant: "destructive"
        });
        return;
      }
    }

    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <Sparkles className="h-8 w-8 text-blue-500" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Bill Station
          </h1>
          <p className="text-gray-600 mt-2">Complete your account setup</p>
        </motion.div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Enhanced Main Content */}
          <div className="lg:col-span-2">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-indigo-50/30 opacity-50"></div>
                <CardHeader className="pb-6 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {steps[currentStep].icon}
                    </motion.div>
                    <div>
                      <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
                      <CardDescription className="text-lg">{steps[currentStep].description}</CardDescription>
                    </div>
                  </div>
                  
                  {/* Enhanced Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentStep / 6) * 100}%` }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Step {currentStep} of 6
                  </p>
                </CardHeader>
                <CardContent className="relative z-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {steps[currentStep].content}
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced Navigation Buttons */}
            <motion.div 
              className="flex justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="h-12 px-6 border-2 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleNext}
                  disabled={loading}
                  className="h-12 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {currentStep === 6 ? (
                        <>
                          <CheckCircle className="h-5 w-5" />
                          Complete Setup
                        </>
                      ) : (
                        <>
                          Next
                          <ArrowRight className="h-5 w-5" />
                        </>
                      )}
                    </div>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1 space-y-6 hidden lg:block">
            {/* Enhanced Features */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 lg:sticky lg:top-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-50/30 to-blue-50/30 opacity-50"></div>
                <CardHeader className="pb-6 relative z-10">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <motion.div 
                      className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Star className="h-5 w-5 text-white" />
                    </motion.div>
                    Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-4">
                    {[
                      { icon: <Shield className="h-5 w-5" />, title: "Bank-Level Security", description: "256-bit encryption" },
                      { icon: <Zap className="h-5 w-5" />, title: "Instant Setup", description: "Ready in minutes" },
                      { icon: <Globe className="h-5 w-5" />, title: "Global Access", description: "Use anywhere" }
                    ].map((feature, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="p-1 bg-green-100 rounded-lg">
                          <div className="text-green-600">
                            {feature.icon}
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{feature.title}</p>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced Progress */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30 opacity-50"></div>
                <CardHeader className="pb-6 relative z-10">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <motion.div 
                      className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Clock className="h-5 w-5 text-white" />
                    </motion.div>
                    Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-4">
                    {steps.map((step, index) => (
                      <motion.div 
                        key={index}
                        className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-colors duration-200 ${
                          index <= currentStep ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                        }`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                          index < currentStep 
                            ? 'bg-green-500 text-white' 
                            : index === currentStep 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {index < currentStep ? <CheckCircle className="h-3 w-3" /> : index + 1}
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${
                            index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {step.title}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
