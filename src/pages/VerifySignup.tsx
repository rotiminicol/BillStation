import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, CheckCircle, CreditCard, Users, Smartphone, Zap, BarChart3, Shield } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { mockService } from "@/services/mockData";
import { useToast } from "@/hooks/use-toast";

const VerifySignup = () => {
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);

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

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        goToNextSlide();
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide, isTransitioning]);

  const goToSlide = (index) => {
    if (index === currentSlide || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  const goToNextSlide = () => {
    const nextSlide = (currentSlide + 1) % slides.length;
    goToSlide(nextSlide);
  };

  const slides = [
    { image: '/AUTH5.png', title: 'Verify your email', description: 'Enter the code sent to your email to continue.' },
    { image: '/AUTH6.png', title: 'Secure verification', description: 'We help keep your account safe with email verification.' },
    { image: '/AUTH7.png', title: 'Quick and easy', description: 'Verifying your account only takes a moment.' },
  ];

  const handlePinChange = (index, value) => {
    if (value === '' || /^[0-9]$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
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
    
    if (code.some(digit => digit === '')) {
      setError('Please enter the complete 6-digit verification code');
      return;
    }
    
    setIsLoading(true);

    try {
      const verificationCode = code.join('');
      setIsSubmitted(true);
      toast({
        title: "Success",
        description: "Your email has been verified successfully!",
      });
      navigate('/verify-success', { state: { email: location.state?.email } });
    } catch (error) {
      console.error('Verification error:', error);
      setError('Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
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

  const isCodeComplete = code.every(digit => digit !== '');

  return (
    <div className="h-screen overflow-hidden bg-white">
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
            box-shadow: 0 0 0 3px rgba(54, 87, 167, 0.15);
            border-color: #3657A7;
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

          .mobile-slider-image-container {
            width: 100%;
            height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .mobile-slider-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          .mobile-slider-text-container {
            min-height: 100px;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: relative;
            padding: 0 1rem;
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
        `}
      </style>
      <div className="hidden lg:flex h-full">
        <div className="w-1/2 relative bg-gradient-overlay text-white overflow-hidden">
          <img 
            src="/logo.png" 
            alt="Bill Station Logo" 
            className="absolute top-6 left-6 w-14 h-14 object-contain z-20"
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
          <div className="slider-container">
            <div 
              className="slider-track" 
              ref={sliderRef}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="slider-slide">
                  <div className="slider-image-container">
                    <img 
                      src={slide.image} 
                      onError={(e) => { e.currentTarget.src = '/amico.png'; }} 
                      alt={`Slide ${index + 1}`} 
                      className="slider-image" 
                    />
                  </div>
                  <div className="slider-text-container">
                    <div className="slide-text">
                      <h2 className="text-2xl font-semibold slider-header">{slide.title}</h2>
                      <p className="text-white/90 mt-2 slider-body">{slide.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="slider-dots">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`slider-dot ${index === currentSlide ? 'active glowing-dot' : ''}`}
                  onClick={() => goToSlide(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/2 overflow-y-auto hide-scrollbar bg-gray-50">
          <div className="min-h-full flex items-center justify-center p-8">
            <div className="w-full max-w-md space-y-6">
              <div className="text-left">
                <h1 className="text-3xl font-bold text-gray-900">Verify your Email</h1>
                <p className="text-gray-500 mt-2 text-sm">A verification code has been sent to your email. Enter the code from the email in the field below.</p>
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
                          className={`form-input h-14 w-14 text-center text-2xl ${error ? 'error-input' : 'border-gray-300 focus:border-[#3657A7]'}`}
                          required
                          disabled={isLoading}
                        />
                      ))}
                    </div>
                    {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-[#3657A7] hover:bg-[#2e4a8c] text-white rounded-xl font-medium text-base transition-all duration-200 shadow-md hover:shadow-lg"
                    disabled={isLoading || !isCodeComplete}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Verifying...
                      </span>
                    ) : (
                      <span>Verify Account</span>
                    )}
                  </Button>
                  <div className="text-center">
                    <button 
                      onClick={handleResendCode}
                      className={`text-sm ${canResend ? 'text-[#3657A7] font-medium hover:text-[#2e4a8c]' : 'text-gray-400'}`}
                      disabled={!canResend}
                    >
                      {canResend ? "Didn't get the code? Resend" : `Resend in ${resendTimer}s`}
                    </button>
                  </div>
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
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden h-screen overflow-hidden flex flex-col">
        <div className="h-2/5 bg-gradient-overlay flex items-center justify-center px-6 relative overflow-hidden">
          <img 
            src="/logo.png" 
            alt="Bill Station Logo" 
            className="absolute top-4 left-4 w-10 h-10 object-contain z-20"
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
          <div className="slider-container" style={{height: '100%'}}>
            <div 
              className="slider-track" 
              style={{ transform: `translateX(-${currentSlide * 100}%)`, height: '100%' }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="slider-slide" style={{padding: '0 1rem'}}>
                  <div className="mobile-slider-image-container">
                    <img 
                      src={slide.image} 
                      onError={(e) => { e.currentTarget.src = '/amico.png'; }} 
                      alt={`Slide ${index + 1}`} 
                      className="mobile-slider-image" 
                    />
                  </div>
                  <div className="mobile-slider-text-container">
                    <div className="slide-text">
                      <h2 className="text-xl font-semibold slider-header">{slide.title}</h2>
                      <p className="text-white/90 mt-2 slider-body text-sm">{slide.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="slider-dots">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`slider-dot ${index === currentSlide ? 'active glowing-dot' : ''}`}
                  onClick={() => goToSlide(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-3/5 overflow-y-auto p-5 bg-gray-50">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Verify your Email</h1>
            <p className="text-sm text-gray-500 mt-1">Enter the 6-digit verification code sent to your email.</p>
          </div>
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
                    className={`form-input h-14 w-full text-center text-2xl ${error ? 'error-input' : 'border-gray-300 focus:border-[#3657A7]'}`}
                    required
                    disabled={isLoading}
                  />
                ))}
              </div>
              {error && <p className="text-sm text-red-600 -mt-2 mb-2">{error}</p>}
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 bg-[#3657A7] hover:bg-[#2e4a8c] text-white rounded-xl font-medium mt-2"
              disabled={isLoading || !isCodeComplete}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verifying...
                </span>
              ) : (
                <span>Verify Account</span>
              )}
            </Button>
            <div className="text-center">
              <button 
                onClick={handleResendCode}
                className={`text-sm ${canResend ? 'text-[#3657A7] font-medium hover:text-[#2e4a8c]' : 'text-gray-400'}`}
                disabled={!canResend}
              >
                {canResend ? "Didn't get the code? Resend" : `Resend in ${resendTimer}s`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifySignup;