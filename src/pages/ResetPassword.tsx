import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, CheckCircle, CreditCard, Users, Smartphone, Zap, BarChart3, Shield } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { mockService } from "@/services/mockData";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);

  const slides = [
    { image: '/AUTH5.png', title: 'Create a new password', description: 'Choose a strong password to secure your account.' },
    { image: '/AUTH6.png', title: 'Security matters', description: 'Your account is protected with strong encryption.' },
    { image: '/AUTH7.png', title: 'You’re almost there', description: 'Finish resetting your password to continue.' },
  ];

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

  const validatePassword = (password) => {
    const requirements = [
      { regex: /[A-Z]/, message: 'At least one uppercase letter' },
      { regex: /[a-z]/, message: 'At least one lowercase letter' },
      { regex: /[0-9]/, message: 'At least one number' },
      { regex: /[^A-Za-z0-9]/, message: 'At least one symbol' },
      { regex: /^.{8,}$/, message: 'At least 8 characters long' }
    ];

    const failedRequirements = requirements.filter(req => !req.regex.test(password));
    return {
      isValid: failedRequirements.length === 0,
      messages: failedRequirements.map(req => req.message)
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.messages[0]);
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      await mockService.resetPassword('mock-token', password);
      setIsSubmitted(true);
      toast({
        title: "Password Reset",
        description: "Your password has been successfully reset.",
      });
      navigate('/reset-successful');
    } catch (error) {
      console.error('Password reset error:', error);
      setError('An error occurred. Please try again.');
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

  const passwordValidation = validatePassword(password);
  const passwordsMatch = password === confirmPassword && password !== '';

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
                <h1 className="text-3xl font-bold text-gray-900">Reset your password</h1>
                <p className="text-gray-500 mt-2 text-sm">Enter the new password for your account.</p>
              </div>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`form-input h-12 ${error ? 'error-input' : 'border-gray-300 focus:border-[#3657A7]'}`}
                        required
                        disabled={isLoading}
                      />
                      {password && (
                        <div className="mt-2 space-y-1">
                          {[
                            'At least 8 characters long',
                            'At least one uppercase letter',
                            'At least one lowercase letter',
                            'At least one number',
                            'At least one symbol'
                          ].map((requirement, index) => {
                            const isMet = !passwordValidation.messages.includes(requirement);
                            return (
                              <div 
                                key={index} 
                                className={`flex items-center text-sm ${isMet ? 'text-green-600' : 'text-gray-500'}`}
                              >
                                <CheckCircle 
                                  className={`h-4 w-4 mr-2 ${isMet ? 'text-green-600' : 'text-gray-400'}`} 
                                  fill={isMet ? 'currentColor' : 'none'} 
                                />
                                {requirement}
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`form-input h-12 ${error ? 'error-input' : passwordsMatch && confirmPassword ? 'border-green-500' : 'border-gray-300 focus:border-[#3657A7]'}`}
                        required
                        disabled={isLoading}
                      />
                      {passwordsMatch && confirmPassword && (
                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                      )}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-[#3657A7] hover:bg-[#2a4580] text-white font-medium rounded-lg transition-colors duration-200"
                    disabled={!passwordValidation.isValid || !passwordsMatch || isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </span>
                    ) : (
                      <span>Done</span>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-green-900">Password Reset</h4>
                        <p className="text-sm text-green-700">
                          Your password has been successfully reset. You can now sign in with your new password.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <Link to="/login" className="text-[#3657A7] font-medium hover:text-[#2e4a8c]">Back to Sign In</Link>
                  </div>
                </div>
              )}
              <div className="text-center">
                <p className="text-gray-600">
                  <Link to="/login" className="text-[#3657A7] font-medium Hover:text-[#2e4a8c]">
                    Back to Sign In
                  </Link>
                </p>
              </div>
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
            <h1 className="text-2xl font-bold text-gray-900">Reset your password</h1>
            <p className="text-sm text-gray-500 mt-1">Enter the new password for your account.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password-m">New Password</Label>
              <div className="relative">
                <Input 
                  id="password-m" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your new password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className={`form-input h-12 ${error ? 'error-input' : 'border-gray-300 focus:border-[#3657A7]'}`} 
                  required 
                  disabled={isLoading} 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                <p>Password must contain:</p>
                <ul className="list-disc list-inside">
                  <li>At least one uppercase letter</li>
                  <li>At least one lowercase letter</li>
                  <li>At least one number</li>
                  <li>At least one symbol</li>
                  <li>At least 8 characters long</li>
                </ul>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password-m">Confirm Password</Label>
              <div className="relative">
                <Input 
                  id="confirm-password-m" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Confirm your new password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  className={`form-input h-12 ${error ? 'error-input' : 'border-gray-300 focus:border-[#3657A7]'}`} 
                  required 
                  disabled={isLoading} 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
            <Button 
              type="submit" 
              className="w-full h-12 bg-[#3657A7] hover:bg-[#2e4a8c] text-white rounded-xl font-medium mt-2"
              disabled={isLoading || !passwordValidation.isValid}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </span>
              ) : (
                <span>Done</span>
              )}
            </Button>
          </form>
          <div className="mt-4">
            <Link to="/login" className="text-sm text-[#3657A7] hover:text-[#2e4a8c]">Back to Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;