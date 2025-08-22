import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, CreditCard, Users, Smartphone, Zap, BarChart3, Shield, ArrowRight, Check, CheckCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { mockService } from "@/services/mockData";
import { useFormPersistence } from "@/hooks/useFormPersistence";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: ''
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);
  const { formData, updateFormData, clearFormData } = useFormPersistence('signup', {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
    country: 'NG'
  });

  const countries = [
    { name: 'Nigeria', code: 'NG', dialCode: '+234', flag: '/nigeria.png' },
  ];

  const selectedCountry = countries[0];

  const slides = [
    {
      title: "Instant Access to Essential Services",
      description: "Top up your phone, pay bills, and even indulge in some leisure activities, all from one app."
    },
    {
      title: "Cash in on Unused Airtime Credits",
      description: "Convert your unused airtime credits into cash quickly and easily."
    },
    {
      title: "Buy and Sell Gift Cards for Quick Cash",
      description: "Trade gift cards for instant cash or purchase new ones with ease."
    }
  ];

  const authImages = [
    '/AUTH1.png',
    '/AUTH2.png',
    '/AUTH3.png',
    '/AUTH4.png',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        goToNextSlide();
      }
    }, 5000);
    
    return () => clearInterval(timer);
  }, [currentSlide, isTransitioning]);

  const validateField = (field, value) => {
    switch (field) {
      case 'fullName': {
        if (!value.trim()) return 'Full name is required';
        if (value.trim().split(' ').length < 2) return 'Please enter your first and last name';
        return '';
      }
      case 'email': {
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      }
      case 'phone': {
        const digits = String(value || '').replace(/\D/g, '');
        if (!digits) return 'Phone number is required';
        if (digits.length < 6) return 'Please enter a valid phone number';
        return '';
      }
      case 'password': {
        if (!value) return 'Password is required';
        const requirements = [
          { regex: /[A-Z]/, message: 'At least one uppercase letter' },
          { regex: /[a-z]/, message: 'At least one lowercase letter' },
          { regex: /[0-9]/, message: 'At least one number' },
          { regex: /[^A-Za-z0-9]/, message: 'At least one symbol' },
          { regex: /^.{8,}$/, message: 'At least 8 characters long' }
        ];
        const failedRequirements = requirements.filter(req => !req.regex.test(value));
        return failedRequirements.length > 0 ? failedRequirements[0].message : '';
      }
      case 'confirmPassword': {
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      }
      default:
        return '';
    }
  };

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleEmailBlur = () => {
    const emailError = validateField('email', formData.email);
    setErrors(prev => ({ ...prev, email: emailError }));
  };

  const isFormValid = () => {
    return (
      formData.fullName && 
      formData.email && 
      formData.phone && 
      formData.password && 
      formData.confirmPassword &&
      agreedToTerms &&
      !validateField('fullName', formData.fullName) &&
      !validateField('email', formData.email) &&
      !validateField('phone', formData.phone) &&
      !validateField('password', formData.password) &&
      !validateField('confirmPassword', formData.confirmPassword)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {
      fullName: validateField('fullName', formData.fullName),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      password: validateField('password', formData.password),
      confirmPassword: validateField('confirmPassword', formData.confirmPassword),
      terms: agreedToTerms ? '' : 'Please agree to the Terms of Service and Privacy Policy'
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) {
      return;
    }

    setIsLoading(true);

    try {
      const [firstName, ...rest] = formData.fullName.trim().split(' ');
      const lastName = rest.join(' ');
      
      await mockService.signup({
        firstName: firstName || '',
        lastName: lastName || '',
        email: formData.email,
        phone: `${selectedCountry.dialCode}${String(formData.phone || '')
          .replace(/\D/g, '')
          .replace(/^0+/, '')}`,
        password: formData.password,
      });
      
      console.log('Signup successful');
      clearFormData();
      navigate('/verify-signup', { state: { email: formData.email } });
    } catch (err) {
      console.error('Signup error:', err);
      navigate('/onboarding');
    } finally {
      setIsLoading(false);
    }
  };

  const goToSlide = (index) => {
    if (index === currentSlide || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  const goToNextSlide = () => {
    const nextSlide = (currentSlide + 1) % authImages.length;
    goToSlide(nextSlide);
  };

  const FloatingIcon = ({ icon: Icon, className, delay = 0 }) => (
    <div 
      className={`absolute opacity-10 animate-pulse ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: '3s'
      }}
    >
      <Icon size={24} className="text-white" />
    </div>
  );

  const GeometricShape = ({ type, className, delay = 0 }) => {
    const baseClasses = "absolute opacity-10 animate-bounce";
    const shapeClasses = type === 'circle' 
      ? "rounded-full bg-white/20 w-4 h-4" 
      : "bg-white/20 w-6 h-6 transform rotate-45";
    
    return (
      <div 
        className={`${baseClasses} ${shapeClasses} ${className}`}
        style={{
          animationDelay: `${delay}s`,
          animationDuration: '4s'
        }}
      />
    );
  };

  return (
    <div className="min-h-screen h-screen overflow-hidden bg-white flex">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          
          * {
            font-family: 'Inter', sans-serif;
          }
          
          .form-input { 
            border-radius: 10px;
            padding: 0.875rem 1rem;
            font-size: 0.9375rem;
            transition: all 0.2s ease;
          }
          
          .form-input:focus {
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
          }
          
          .slider-header { 
            font-weight: 600;
            font-size: 1.5rem;
            line-height: 1.3;
          }
          
          .slider-body { 
            font-weight: 400;
            font-size: 1rem;
            line-height: 1.5;
          }
          
          .error-input { 
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
          }
          
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          .floating-element {
            animation: float 6s ease-in-out infinite;
          }
          
          .bg-gradient-overlay {
            background: linear-gradient(135deg, #3657A7 0%, #4a6bc7 50%, #3657A7 100%);
          }

          .slider-container {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .slider-track {
            display: flex;
            transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
            height: 100%;
          }

          .slider-slide {
            flex: 0 0 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            height: 100vh;
            overflow: hidden;
          }

          .slider-image-container {
            width: 100%;
            height: 400px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }

          .slider-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            transition: opacity 0.8s ease-in-out;
          }

          .slider-text-container {
            min-height: 120px;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: relative;
            padding: 0 2rem;
          }

          .slider-dots {
            position: absolute;
            bottom: 30px;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            gap: 8px;
            z-index: 10;
          }

          .slider-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .slider-dot.active {
            background-color: white;
            transform: scale(1.2);
          }

          .slider-dot:hover {
            background-color: rgba(255, 255, 255, 0.8);
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .slide-text {
            animation: fadeIn 0.8s ease-out forwards;
          }

          @keyframes glow {
            0%, 100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
            50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.8); }
          }

          .glowing-dot {
            animation: glow 2s infinite;
          }
          
          .custom-checkbox {
            border-radius: 6px;
          }
          
          .custom-checkbox[data-state="checked"] {
            background-color: #3657A7;
            border-color: #3657A7;
          }
          
          .social-button {
            border-radius: 10px;
            padding: 0.75rem 1rem;
            transition: all 0.2s ease;
          }
          
          .social-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>

      <div className="flex h-screen overflow-hidden fixed w-full">
        <div className="w-1/2 bg-gradient-overlay text-white relative flex items-center justify-center" style={{ height: '100vh', overflow: 'hidden' }}>
          <img 
            src="/logo.png" 
            alt="Bill Station Logo" 
            className="absolute top-6 left-6 w-14 h-14 object-contain z-20"
          />
          <div className="relative z-0 min-h-full p-8">
            <FloatingIcon icon={CreditCard} className="top-16 left-12 floating-element" delay={0} />
            <FloatingIcon icon={Smartphone} className="top-32 right-20 floating-element" delay={1} />
            <FloatingIcon icon={Users} className="top-48 left-8 floating-element" delay={2} />
            <FloatingIcon icon={Zap} className="bottom-48 right-16 floating-element" delay={0.5} />
            <FloatingIcon icon={BarChart3} className="bottom-32 left-16 floating-element" delay={1.5} />
            <FloatingIcon icon={Shield} className="top-64 right-8 floating-element" delay={2.5} />
            <FloatingIcon icon={CreditCard} className="bottom-64 right-32 floating-element" delay={3} />
            <FloatingIcon icon={Smartphone} className="bottom-16 left-32 floating-element" delay={0.8} />
            <GeometricShape type="circle" className="top-20 right-12" delay={0} />
            <GeometricShape type="square" className="top-40 left-20" delay={1} />
            <GeometricShape type="circle" className="bottom-40 right-8" delay={2} />
            <GeometricShape type="square" className="bottom-20 right-24" delay={0.5} />
            <GeometricShape type="circle" className="top-72 left-4" delay={1.5} />
            <GeometricShape type="square" className="bottom-60 left-8" delay={2.5} />
            <div className="absolute top-28 right-28 w-8 h-8 border-2 border-white/20 rounded-full animate-spin" style={{animationDuration: '8s'}} />
            <div className="absolute bottom-28 left-20 w-6 h-6 border-2 border-white/20 animate-spin" style={{animationDuration: '6s'}} />
            <div className="absolute top-56 left-32 w-4 h-4 bg-white/10 transform rotate-45 animate-pulse" />
          </div>
          
          <div className="slider-container" style={{ height: '100%', overflow: 'hidden' }}>
            <div 
              className="slider-track" 
              ref={sliderRef}
              style={{ transform: `translateX(-${currentSlide * 100}%)`, height: '100%' }}
            >
              {authImages.map((image, index) => (
                <div key={index} className="slider-slide">
                  <div className="slider-image-container">
                    <img 
                      src={image} 
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/auth.png'; }} 
                      alt={`Slide ${index + 1}`} 
                      className="slider-image" 
                    />
                  </div>
                  <div className="slider-text-container">
                    <div className="slide-text">
                      <h2 className="text-2xl font-semibold slider-header">{slides[index % slides.length]?.title}</h2>
                      <p className="text-white/90 mt-2 slider-body">{slides[index % slides.length]?.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="sticky bottom-0 left-0 right-0 z-10 pb-6 pt-4 flex justify-center gap-2 bg-gradient-to-t from-[#3657A7] to-transparent">
              {authImages.map((_, index) => (
                <div
                  key={index}
                  className={`slider-dot ${index === currentSlide ? 'active glowing-dot' : ''}`}
                  onClick={() => goToSlide(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="w-1/2 bg-gray-50 flex items-start justify-center p-0 overflow-hidden h-screen">
          <div className="w-full max-w-md py-8 px-6 overflow-y-auto hide-scrollbar" style={{ height: '100vh' }}>
            <div className="mb-6 text-center pt-6">
              <h1 className="text-3xl font-bold text-[#3657A7]">Let’s get you Started</h1>
              <p className="text-gray-500 mt-2">Create an Account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</Label>
                <Input 
                  id="fullName" 
                  type="text" 
                  placeholder="Enter your first and last name" 
                  value={formData.fullName} 
                  onChange={(e) => handleInputChange('fullName', e.target.value)} 
                  className={`form-input ${errors.fullName ? 'error-input' : 'border-gray-300 focus:border-blue-500'}`} 
                  required 
                />
                {errors.fullName && <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={formData.email} 
                  onChange={(e) => handleInputChange('email', e.target.value)} 
                  onBlur={handleEmailBlur}
                  className={`form-input ${errors.email ? 'error-input' : 'border-gray-300 focus:border-blue-500'}`} 
                  required 
                />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                <div className="relative flex items-center">
                  <div className="absolute left-0 flex items-center h-full pl-3 pr-2 border-r border-gray-200">
                    <img src={selectedCountry.flag} alt="Nigeria flag" className="w-6 h-4 mr-2" />
                    <span className="text-gray-500 text-sm font-medium">{selectedCountry.dialCode}</span>
                  </div>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="123 456 7890" 
                    value={formData.phone} 
                    onChange={(e) => handleInputChange('phone', e.target.value.replace(/[^0-9]/g, ''))}
                    className={`pl-24 h-12 text-base ${errors.phone ? 'error-input' : 'border-gray-300 focus:border-blue-500'}`} 
                    required 
                  />
                </div>
                {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Create a secure password" 
                    value={formData.password} 
                    onChange={(e) => handleInputChange('password', e.target.value)} 
                    className={`form-input pr-12 ${errors.password ? 'error-input' : 'border-gray-300 focus:border-blue-500'}`} 
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    {[
                      'At least 8 characters long',
                      'At least one uppercase letter',
                      'At least one lowercase letter',
                      'At least one number',
                      'At least one symbol'
                    ].map((requirement, index) => {
                      const isMet = !validateField('password', formData.password).includes(requirement);
                      return (
                        <div 
                          key={index} 
                          className={`flex items-center text-xs ${isMet ? 'text-green-500' : 'text-gray-500'}`}
                        >
                          <CheckCircle 
                            className={`h-3 w-3 mr-1 ${isMet ? 'text-green-500' : 'text-gray-400'}`} 
                            fill={isMet ? 'currentColor' : 'none'} 
                          />
                          {requirement}
                        </div>
                      );
                    })}
                  </div>
                )}
                {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</Label>
                <div className="relative">
                  <Input 
                    id="confirmPassword" 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    placeholder="Confirm your password" 
                    value={formData.confirmPassword} 
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)} 
                    className={`form-input pr-12 ${errors.confirmPassword ? 'error-input' : 'border-gray-300 focus:border-blue-500'}`} 
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ref" className="text-sm font-medium text-gray-700">Referral Code (Optional)</Label>
                <Input 
                  id="ref" 
                  type="text" 
                  placeholder="Enter referral code if you have one" 
                  value={formData.referralCode} 
                  onChange={(e) => handleInputChange('referralCode', e.target.value)} 
                  className="form-input border-gray-300 focus:border-blue-500" 
                />
              </div>
              
              <div className="flex items-start gap-3 pt-2">
                <Checkbox 
                  id="terms" 
                  checked={agreedToTerms} 
                  onCheckedChange={(checked) => {
                    const isChecked = checked === true;
                    setAgreedToTerms(isChecked);
                    if (isChecked) {
                      setErrors(prev => ({ ...prev, terms: '' }));
                    }
                  }} 
                  className="custom-checkbox mt-0.5 border-gray-300" 
                />
                <Label htmlFor="terms" className="text-sm text-gray-600 leading-tight">
                  I agree to the <Link to="/terms" className="text-[#3657A7] hover:underline font-medium">Terms of Service</Link> and <Link to="/privacy" className="text-[#3657A7] hover:underline font-medium">Privacy Policy</Link>
                </Label>
              </div>
              {errors.terms && <p className="text-sm text-red-600 mt-1">{errors.terms}</p>}
              
              <Button 
                type="submit" 
                disabled={!isFormValid() || isLoading || errors.email}
                className={`w-full h-12 rounded-xl font-medium text-base transition-all duration-200 shadow-md hover:shadow-lg ${
                  isFormValid() && !errors.email 
                    ? 'bg-[#3657A7] hover:bg-[#2a4585] text-white' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Create Account <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                )}
              </Button>
            </form>
            
            <div className="p-6">
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-gray-50 text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="social-button h-11 border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                
                <Button variant="outline" className="social-button h-11 border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                  <img src="/microsoft.png" alt="Microsoft" className="w-5 h-5 mr-2" />
                  Microsoft
                </Button>
              </div>
              
              <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-[#3657A7] font-medium hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;