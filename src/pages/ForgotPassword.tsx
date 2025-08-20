import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Mail, CheckCircle, AlertCircle, CreditCard, Users, Smartphone, Zap, BarChart3, Shield } from "lucide-react";
import { useState } from "react";
import { authAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authAPI.forgotPassword(email);
      setIsSubmitted(true);
      toast({
        title: "Email Sent",
        description: "Check your email for a link to reset your password.",
      });
    } catch (error) {
      console.error('Password reset error:', error);
      setError(error instanceof Error ? error.message : 'Failed to send reset email');
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to send reset email',
        variant: "destructive",
      });
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
            margin: 0 auto;
            display: block;
          }

          /* Mobile image styling */
          .mobile-slider-image {
            max-height: 200px; /* Smaller for mobile */
            width: auto;
            margin: 0 auto;
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
                <h1 className="text-3xl font-bold text-[#3657A7]">Reset your password</h1>
                <p className="text-gray-600 mt-2">Enter the email address associated with your account and we will send you a link to reset your password.</p>
              </div>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`h-12 border-2 border-gray-200 focus:border-[#3657A7] transition-colors duration-300 form-input ${error ? 'error-input' : ''}`}
                        required
                        disabled={isLoading}
                      />
                      {error && <p className="text-sm text-red-700 mt-1">{error}</p>}
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
                      <span>Continue</span>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-green-900">Check Your Email</h4>
                        <p className="text-sm text-green-700">
                          We've sent a password reset link to <strong>{email}</strong>. 
                          Please check your inbox and follow the instructions to reset your password.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Didn't receive the email?{' '}
                    <button onClick={() => { setIsSubmitted(false); setError(''); }} className="text-[#3657A7] font-medium">Try again</button>
                  </div>
                </div>
              )}
              <div className="text-center">
                <p className="text-gray-600">
                  <Link to="/login" className="text-[#0B63BC] hover:text-[#0B63BC]/80 font-semibold transition-colors">
                    Back to Sign In
                  </Link>
                </p>
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
            <img src="/fpass.png" alt="Forgot Password" className="slider-image" />
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
            <img src="/fpass.png" alt="Forgot Password" className="mobile-slider-image" />
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
            <h1 className="text-2xl font-bold text-[#3657A7]">Reset your password</h1>
            <p className="text-sm text-gray-500">Enter the email associated with your account and we'll send a reset link.</p>
          </div>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-m">Email</Label>
                <div className="relative">
                  <Input 
                    id="email-m" 
                    type="email" 
                    placeholder="Enter your email address" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className={`h-12 border-gray-300 focus:border-[#3657A7] form-input ${error ? 'error-input' : ''}`} 
                    required 
                    disabled={isLoading} 
                  />
                  {error && <p className="text-sm text-red-700 mt-1">{error}</p>}
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 bg-[#3657A7] hover:bg-[#2f4d93]" 
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Continue'}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-700">
                  We've sent a reset link to <strong>{email}</strong>.
                </p>
              </div>
              <div className="text-sm text-gray-600">
                Didn't receive the email? <button onClick={() => { setIsSubmitted(false); setError(''); }} className="text-[#3657A7] font-medium">Try again</button>
              </div>
            </div>
          )}
          <div className="mt-4">
            <Link to="/login" className="text-sm text-[#3657A7]">Back to Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
