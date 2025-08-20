import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, CheckCircle, AlertCircle, CreditCard, Users, Smartphone, Zap, BarChart3, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { mockService } from "@/services/mockData";
import { useToast } from "@/hooks/use-toast";

const VerifyEmail = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
  // Initialize the resend timer on component mount
  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

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

  const handlePinChange = (index, value) => {
    if (value === '' || /^[0-9]$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Move to next input
      if (value !== '' && index < 5) {
        const nextInput = document.getElementById(`pin-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    
    setResendTimer(30);
    setCanResend(false);
    
    // Start countdown
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    try {
      // Call your API to resend the code here
      // await authAPI.resendVerificationCode(email);
      toast({
        title: "Code Sent",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error) {
      console.error('Error resending code:', error);
      toast({
        title: "Error",
        description: "Failed to resend verification code. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate if all digits are entered
    if (code.some(digit => digit === '')) {
      setError('Please enter the 6-digit verification code');
      return;
    }
    
    setIsLoading(true);

    try {
      const verificationCode = code.join('');
      // Simple navigation - no validation needed for UI flow
      setIsSubmitted(true);
      toast({
        title: "Success",
        description: "Your email has been verified successfully!",
      });
      // Navigate to reset password page for UI flow
      navigate('/reset-password', { state: { email: location.state?.email } });
    } catch (error) {
      console.error('Verification error:', error);
      // Even if there's an error, still navigate for UI flow
      navigate('/reset-password', { state: { email: location.state?.email } });
    } finally {
      setIsLoading(false);
    }
  };

  useState(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Floating background icons component
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

  // Background geometric shapes component
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
    <div className="h-screen bg-white overflow-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&family=Inter:wght@600&family=Lato:wght@400&display=swap');
          .form-input { font-family: 'Roboto', sans-serif; }
          .slider-header { font-family: 'Inter', sans-serif; }
          .slider-body { font-family: 'Lato', sans-serif; }
          .error-input { color: red !important; }
          
          /* Custom floating animation */
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          .floating-element {
            animation: float 6s ease-in-out infinite;
          }
          
          /* Gradient overlay for depth */
          .bg-gradient-overlay {
            background: linear-gradient(135deg, #3657A7 0%, #4a6bc7 50%, #3657A7 100%);
          }

          /* Image styling for larger, centered display */
          .slider-image {
            max-height: 400px; /* Larger for desktop */
            width: auto;
            margin: 0 auto 2rem auto; /* Added bottom margin */
            display: block;
          }

          /* Mobile image styling */
          .mobile-slider-image {
            max-height: 200px; /* Smaller for mobile */
            width: auto;
            margin: 0 auto 1.5rem auto; /* Added bottom margin */
            display: block;
          }

          /* Fixed height for slider text container to prevent layout shifts */
          .slider-text-container {
            min-height: 120px; /* Adjust based on longest slide content */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: relative;
          }

          /* Mobile slider text container */
          .mobile-slider-text-container {
            min-height: 100px; /* Smaller for mobile */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: relative;
          }

          /* Smooth transition for slide content */
          .slide-content {
            position: absolute;
            width: 100%;
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
          }

          .slide-content.active {
            opacity: 1;
          }
        `}
      </style>
      <div className="hidden lg:flex h-screen flex-row-reverse">
        <div className="w-1/2 bg-white overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-12">
            <div className="w-full max-w-md space-y-6">
              <div className="text-left">
                <h1 className="text-3xl font-bold text-[#1F1F1F] font-['Inter']">Verify your Email</h1>
                <p className="text-gray-600 mt-2 text-sm">A verification code has been sent to your email. Enter the code from the email in the field below.</p>
              </div>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Verification Code</Label>
                    <div className="flex justify-between space-x-2">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <Input
                          key={index}
                          id={`pin-${index}`}
                          type="text"
                          maxLength={1}
                          value={code[index]}
                          onChange={(e) => handlePinChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          className={`h-14 w-14 text-center text-2xl border-2 ${
                            error ? 'border-red-500' : 'border-gray-200 focus:border-[#3657A7]'
                          } transition-colors duration-300 form-input`}
                          required
                          disabled={isLoading}
                        />
                      ))}
                    </div>
                    {error && <p className="text-sm text-red-700 mt-1">{error}</p>}
                    <div className="text-right mt-2">
                      <button
                        type="button"
                        onClick={handleResendCode}
                        className={`text-sm ${canResend ? 'text-[#3657A7] font-medium' : 'text-gray-400'} hover:underline`}
                        disabled={!canResend}
                      >
                        {canResend ? 'Resend code' : `Resend in ${resendTimer}s`}
                      </button>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-[#3657A7] hover:bg-[#2f4d93] text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <span>Verify Account</span>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-green-900">Email Verified Successfully!</h4>
                        <p className="text-sm text-green-700">
                          Your email has been verified. You can now proceed to set a new password.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="text-center">
                <button 
                  onClick={handleResendCode}
                  className={`text-sm ${canResend ? 'text-[#0B63BC]' : 'text-gray-400'} font-medium hover:underline`}
                  disabled={!canResend}
                >
                  {canResend ? "Didn't get the code? Resend" : `Resend in ${resendTimer}s`}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 relative bg-gradient-overlay text-white flex items-center justify-center p-12 overflow-hidden">
          <img 
            src="/logo.png" 
            alt="Bill Station Logo" 
            className="absolute top-4 left-4 w-12 h-12 object-contain z-20"
          />
          <div className="absolute inset-0 z-0">
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
          <div className="relative max-w-md text-center z-10">
            <img src="/amico.png" alt="Verification" className="slider-image" />
            <div className="slider-text-container">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`slide-content ${index === currentSlide ? 'active' : ''}`}
                >
                  <h2 className="text-2xl font-semibold slider-header">{slide.title}</h2>
                  <p className="text-white/90 mt-2 slider-body">{slide.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-1">
              {slides.map((_, index) => (
                <span 
                  key={index} 
                  className={`h-1.5 w-1.5 rounded-full cursor-pointer transition-all ${index === currentSlide ? 'bg-white' : 'bg-white/60'}`}
                  onClick={() => setCurrentSlide(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden h-screen">
        <div className="h-1/3 bg-gradient-overlay flex items-center justify-center px-6 relative overflow-hidden">
          <img 
            src="/logo.png" 
            alt="Bill Station Logo" 
            className="absolute top-4 left-4 w-12 h-12 object-contain z-20"
          />
          <div className="absolute inset-0 z-0">
            <FloatingIcon icon={CreditCard} className="top-8 left-8 floating-element" delay={0} />
            <FloatingIcon icon={Smartphone} className="top-16 right-8 floating-element" delay={1} />
            <FloatingIcon icon={Users} className="bottom-16 left-12 floating-element" delay={2} />
            <FloatingIcon icon={Zap} className="bottom-8 right-12 floating-element" delay={0.5} />
            <GeometricShape type="circle" className="top-12 right-16" delay={0} />
            <GeometricShape type="square" className="bottom-12 left-16" delay={1} />
            <div className="absolute top-20 right-20 w-6 h-6 border-2 border-white/20 rounded-full animate-spin" style={{animationDuration: '6s'}} />
          </div>
          <div className="max-w-sm text-white text-center relative z-10">
            <img src="/amico.png" alt="Verification" className="mobile-slider-image" />
            <div className="mobile-slider-text-container">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`slide-content ${index === currentSlide ? 'active' : ''}`}
                >
                  <h2 className="text-xl font-semibold slider-header">{slide.title}</h2>
                  <p className="text-white/90 mt-2 slider-body">{slide.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-1">
              {slides.map((_, index) => (
                <span 
                  key={index} 
                  className={`h-1.5 w-1.5 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/60'}`}
                  onClick={() => setCurrentSlide(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
        <div className="h-2/3 overflow-y-auto p-6">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-[#3657A7]">Verify your Email</h1>
            <p className="text-sm text-gray-500">Enter the 6-digit verification code sent to your email.</p>
          </div>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Verification Code</Label>
                <div className="grid grid-cols-6 gap-2 mb-2">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <Input
                      key={index}
                      id={`pin-m-${index}`}
                      type="text"
                      maxLength={1}
                      value={code[index]}
                      onChange={(e) => handlePinChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className={`h-14 w-full text-center text-2xl border-2 ${
                        error ? 'border-red-500' : 'border-gray-200 focus:border-[#3657A7]'
                      } transition-colors duration-300 form-input`}
                      required
                      disabled={isLoading}
                    />
                  ))}
                </div>
                {error && <p className="text-sm text-red-700 -mt-2 mb-2">{error}</p>}
                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className={`text-sm ${canResend ? 'text-[#3657A7] font-medium' : 'text-gray-400'} hover:underline`}
                    disabled={!canResend}
                  >
                    {canResend ? 'Resend code' : `Resend in ${resendTimer}s`}
                  </button>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 bg-[#3657A7] hover:bg-[#2f4d93]" 
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify Account'}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-green-700">
                    Your email has been verified successfully!
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="mt-4 text-center">
            <button 
              onClick={handleResendCode}
              className={`text-sm ${canResend ? 'text-[#3657A7]' : 'text-gray-400'} font-medium`}
              disabled={!canResend}
            >
              {canResend ? "Didn't get the code? Resend" : `Resend in ${resendTimer}s`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
