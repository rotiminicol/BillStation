import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff, User, Phone, MapPin, Briefcase, Shield, CheckCircle, CreditCard, Globe, Calendar, FileText, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type OnboardingStep = 1 | 2 | 3 | 4 | 5 | 6;

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
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

  const handleNext = async () => {
    if (currentStep === 6) {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        toast({
          title: "Account Setup Complete!",
          description: "Welcome to Bill Station. Your account is ready to use.",
        });
        
        navigate('/dashboard');
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to complete setup. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
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
      if (formData.pin !== formData.confirmPin) {
        toast({
          title: "Error",
          description: "PINs do not match.",
          variant: "destructive"
        });
        return;
      }
      if (formData.pin.length !== 4) {
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

    setCurrentStep(prev => (prev + 1) as OnboardingStep);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1) as OnboardingStep);
  };

  const steps = [
    {
      title: "Personal Information",
      description: "Basic personal details",
      step: 1
    },
    {
      title: "Identity Verification", 
      description: "ID documents and verification",
      step: 2
    },
    {
      title: "Contact & Address",
      description: "Contact details and address",
      step: 3
    },
    {
      title: "Employment & Income",
      description: "Work and income details",
      step: 4
    },
    {
      title: "Financial Profile",
      description: "Banking history and preferences",
      step: 5
    },
    {
      title: "Security & Terms",
      description: "PIN, security questions, and agreements",
      step: 6
    }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name (as on ID)</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="pl-10 py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  className="py-3 border-gray-300 rounded-lg focus:border-[#0B63BC] focus:ring-1 focus:ring-[#0B63BC]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                  <SelectTrigger className="py-3 border-gray-300 rounded-lg focus:border-[#0B63BC] focus:ring-1 focus:ring-[#0B63BC]">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select value={formData.maritalStatus} onValueChange={(value) => setFormData(prev => ({ ...prev, maritalStatus: value }))}>
                  <SelectTrigger className="py-3 border-gray-300 rounded-lg focus:border-[#0B63BC] focus:ring-1 focus:ring-[#0B63BC]">
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  type="text"
                  placeholder="Enter your nationality"
                  value={formData.nationality}
                  onChange={(e) => setFormData(prev => ({ ...prev, nationality: e.target.value }))}
                  className="py-3 border-gray-300 rounded-lg focus:border-[#0B63BC] focus:ring-1 focus:ring-[#0B63BC]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="placeOfBirth">Place of Birth</Label>
                <Input
                  id="placeOfBirth"
                  type="text"
                  placeholder="City, Country"
                  value={formData.placeOfBirth}
                  onChange={(e) => setFormData(prev => ({ ...prev, placeOfBirth: e.target.value }))}
                  className="py-3 border-gray-300 rounded-lg focus:border-[#0B63BC] focus:ring-1 focus:ring-[#0B63BC]"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="idType">ID Type</Label>
                <Select value={formData.idType} onValueChange={(value) => setFormData(prev => ({ ...prev, idType: value }))}>
                  <SelectTrigger className="py-3 border-gray-300 rounded-lg focus:border-[#0B63BC] focus:ring-1 focus:ring-[#0B63BC]">
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number</Label>
                <Input
                  id="idNumber"
                  type="text"
                  placeholder="Enter your ID number"
                  value={formData.idNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, idNumber: e.target.value }))}
                  className="py-3 border-gray-300 rounded-lg focus:border-[#0B63BC] focus:ring-1 focus:ring-[#0B63BC]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idIssuingCountry">Issuing Country</Label>
                <Input
                  id="idIssuingCountry"
                  type="text"
                  placeholder="Country that issued the ID"
                  value={formData.idIssuingCountry}
                  onChange={(e) => setFormData(prev => ({ ...prev, idIssuingCountry: e.target.value }))}
                  className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idExpiryDate">ID Expiry Date</Label>
                <Input
                  id="idExpiryDate"
                  type="date"
                  value={formData.idExpiryDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, idExpiryDate: e.target.value }))}
                  className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="p-4 bg-[#0B63BC]/10 rounded-lg border border-[#0B63BC]/20">
                <p className="text-sm text-[#0B63BC]">
                  <strong>Important:</strong> Please ensure your ID is valid and not expired. We may require additional verification.
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+234 801 234 5678"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    className="pl-10 py-3 border-gray-300 rounded-lg focus:border-[#0B63BC] focus:ring-1 focus:ring-[#0B63BC]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Residential Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter your full residential address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
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
                    className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    type="text"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                    className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                    className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="border-t pt-4">
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
                      className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                      className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactRelationship">Relationship</Label>
                    <Select value={formData.emergencyContactRelationship} onValueChange={(value) => setFormData(prev => ({ ...prev, emergencyContactRelationship: value }))}>
                      <SelectTrigger className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
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
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  type="text"
                  placeholder="e.g., Software Engineer, Business Owner"
                  value={formData.occupation}
                  onChange={(e) => setFormData(prev => ({ ...prev, occupation: e.target.value }))}
                  className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employerName">Employer Name</Label>
                <Input
                  id="employerName"
                  type="text"
                  placeholder="Company or organization name"
                  value={formData.employerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, employerName: e.target.value }))}
                  className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employerAddress">Employer Address</Label>
                <Textarea
                  id="employerAddress"
                  placeholder="Employer's address"
                  value={formData.employerAddress}
                  onChange={(e) => setFormData(prev => ({ ...prev, employerAddress: e.target.value }))}
                  className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type</Label>
                <Select value={formData.employmentType} onValueChange={(value) => setFormData(prev => ({ ...prev, employmentType: value }))}>
                  <SelectTrigger className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full_time">Full-time</SelectItem>
                    <SelectItem value="part_time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="self_employed">Self-employed</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">Monthly Income</Label>
                <Select value={formData.monthlyIncome} onValueChange={(value) => setFormData(prev => ({ ...prev, monthlyIncome: value }))}>
                  <SelectTrigger className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Select income range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under_100k">Under ₦100,000</SelectItem>
                    <SelectItem value="100k_300k">₦100,000 - ₦300,000</SelectItem>
                    <SelectItem value="300k_500k">₦300,000 - ₦500,000</SelectItem>
                    <SelectItem value="500k_1m">₦500,000 - ₦1,000,000</SelectItem>
                    <SelectItem value="1m_2m">₦1,000,000 - ₦2,000,000</SelectItem>
                    <SelectItem value="over_2m">Over ₦2,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sourceOfFunds">Primary Source of Funds</Label>
                <Select value={formData.sourceOfFunds} onValueChange={(value) => setFormData(prev => ({ ...prev, sourceOfFunds: value }))}>
                  <SelectTrigger className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Select source of funds" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salary">Salary/Wages</SelectItem>
                    <SelectItem value="business">Business Income</SelectItem>
                    <SelectItem value="investment">Investment Returns</SelectItem>
                    <SelectItem value="inheritance">Inheritance</SelectItem>
                    <SelectItem value="gift">Gift</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalIncome">Additional Income Sources</Label>
                <Textarea
                  id="additionalIncome"
                  placeholder="Describe any additional income sources"
                  value={formData.additionalIncome}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalIncome: e.target.value }))}
                  className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  rows={2}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bankAccountHistory">Do you have existing bank accounts?</Label>
                <Select value={formData.bankAccountHistory} onValueChange={(value) => setFormData(prev => ({ ...prev, bankAccountHistory: value }))}>
                  <SelectTrigger className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes_current">Yes, I have current accounts</SelectItem>
                    <SelectItem value="yes_savings">Yes, I have savings accounts</SelectItem>
                    <SelectItem value="yes_both">Yes, I have both current and savings</SelectItem>
                    <SelectItem value="no">No, this is my first bank account</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="creditHistory">Credit History</Label>
                <Select value={formData.creditHistory} onValueChange={(value) => setFormData(prev => ({ ...prev, creditHistory: value }))}>
                  <SelectTrigger className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Select your credit history" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent (No late payments)</SelectItem>
                    <SelectItem value="good">Good (1-2 late payments)</SelectItem>
                    <SelectItem value="fair">Fair (3-5 late payments)</SelectItem>
                    <SelectItem value="poor">Poor (Many late payments)</SelectItem>
                    <SelectItem value="no_history">No credit history</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="investmentExperience">Investment Experience</Label>
                <Select value={formData.investmentExperience} onValueChange={(value) => setFormData(prev => ({ ...prev, investmentExperience: value }))}>
                  <SelectTrigger className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No experience</SelectItem>
                    <SelectItem value="beginner">Beginner (1-2 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (3-5 years)</SelectItem>
                    <SelectItem value="advanced">Advanced (5+ years)</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                <Select value={formData.riskTolerance} onValueChange={(value) => setFormData(prev => ({ ...prev, riskTolerance: value }))}>
                  <SelectTrigger className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Select your risk tolerance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative (Low risk)</SelectItem>
                    <SelectItem value="moderate">Moderate (Balanced risk)</SelectItem>
                    <SelectItem value="aggressive">Aggressive (High risk)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedMonthlyTransactions">Expected Monthly Transactions</Label>
                <Select value={formData.expectedMonthlyTransactions} onValueChange={(value) => setFormData(prev => ({ ...prev, expectedMonthlyTransactions: value }))}>
                  <SelectTrigger className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Select expected volume" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under_10">Under 10 transactions</SelectItem>
                    <SelectItem value="10_30">10-30 transactions</SelectItem>
                    <SelectItem value="30_50">30-50 transactions</SelectItem>
                    <SelectItem value="over_50">Over 50 transactions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purposeOfAccount">Primary Purpose of Account</Label>
                <Select value={formData.purposeOfAccount} onValueChange={(value) => setFormData(prev => ({ ...prev, purposeOfAccount: value }))}>
                  <SelectTrigger className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Select primary purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal banking</SelectItem>
                    <SelectItem value="business">Business banking</SelectItem>
                    <SelectItem value="savings">Savings and investment</SelectItem>
                    <SelectItem value="salary">Salary account</SelectItem>
                    <SelectItem value="student">Student account</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pin">Create 4-Digit PIN</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="pin"
                    type={showPin ? "text" : "password"}
                    placeholder="Enter 4-digit PIN"
                    value={formData.pin}
                    onChange={(e) => setFormData(prev => ({ ...prev, pin: e.target.value }))}
                    maxLength={4}
                    className="pl-10 pr-12 py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPin ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPin">Confirm PIN</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="confirmPin"
                    type={showConfirmPin ? "text" : "password"}
                    placeholder="Confirm your PIN"
                    value={formData.confirmPin}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPin: e.target.value }))}
                    maxLength={4}
                    className="pl-10 pr-12 py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPin(!showConfirmPin)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPin ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="securityQuestion1">Security Question 1</Label>
                <Select value={formData.securityQuestion1} onValueChange={(value) => setFormData(prev => ({ ...prev, securityQuestion1: value }))}>
                  <SelectTrigger className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Select a security question" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first_pet">What was the name of your first pet?</SelectItem>
                    <SelectItem value="birth_city">In which city were you born?</SelectItem>
                    <SelectItem value="mother_maiden">What is your mother's maiden name?</SelectItem>
                    <SelectItem value="favorite_teacher">What was the name of your favorite teacher?</SelectItem>
                    <SelectItem value="first_car">What was your first car model?</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="securityAnswer1">Security Answer 1</Label>
                <Input
                  id="securityAnswer1"
                  type="text"
                  placeholder="Enter your answer"
                  value={formData.securityAnswer1}
                  onChange={(e) => setFormData(prev => ({ ...prev, securityAnswer1: e.target.value }))}
                  className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="securityQuestion2">Security Question 2</Label>
                <Select value={formData.securityQuestion2} onValueChange={(value) => setFormData(prev => ({ ...prev, securityQuestion2: value }))}>
                  <SelectTrigger className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Select a security question" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="favorite_color">What is your favorite color?</SelectItem>
                    <SelectItem value="high_school">What high school did you attend?</SelectItem>
                    <SelectItem value="dream_job">What was your dream job as a child?</SelectItem>
                    <SelectItem value="favorite_food">What is your favorite food?</SelectItem>
                    <SelectItem value="vacation_spot">What is your favorite vacation spot?</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="securityAnswer2">Security Answer 2</Label>
                <Input
                  id="securityAnswer2"
                  type="text"
                  placeholder="Enter your answer"
                  value={formData.securityAnswer2}
                  onChange={(e) => setFormData(prev => ({ ...prev, securityAnswer2: e.target.value }))}
                  className="py-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Security Tip:</strong> Choose a PIN that's easy to remember but hard to guess. Never share your PIN or security answers with anyone.
                </p>
              </div>
            </div>

            <div className="space-y-4">
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

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="dataProcessing"
                  checked={formData.agreeToDataProcessing}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToDataProcessing: checked as boolean }))}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label htmlFor="dataProcessing" className="text-sm font-medium">
                    I consent to data processing for account verification
                  </Label>
                  <p className="text-xs text-gray-500">
                    We may process your data for identity verification and regulatory compliance purposes.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#0B63BC]/10 rounded-lg border border-[#0B63BC]/20">
              <p className="text-sm text-[#0B63BC]">
                <strong>Your Privacy:</strong> We take your privacy seriously. Your personal information is encrypted and protected by bank-level security.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#0B63BC] text-white p-6">
        <div className="text-center">
          <div className="mb-4">
            <img 
              src="/logo.png" 
              alt="Bill Station Logo" 
              className="w-16 h-16 mx-auto"
            />
          </div>
          <h1 className="text-xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-[#0B63BC]/80 text-sm">Step {currentStep} of 6</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-[#0B63BC] h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600 text-sm">
              {steps[currentStep - 1].description}
            </p>
          </div>

          {renderStepContent()}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 border-t border-gray-200">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-6 py-3"
          >
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={loading}
            className="px-6 py-3 bg-[#0B63BC] hover:bg-[#0B63BC]/90"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Setting up...</span>
              </div>
            ) : currentStep === 6 ? (
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Complete Setup</span>
              </div>
            ) : (
              <span>Next</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
