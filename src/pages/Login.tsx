import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, CreditCard, Users, Smartphone, Zap, BarChart3, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { mockService } from "@/services/mockData";
import { useFormPersistence } from "@/hooks/useFormPersistence";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const { formData, updateFormData } = useFormPersistence('login', {
    email: '',
    password: ''
  });

  const slides = [
    { image: '/AUTH1.png', title: 'Instant Access to Essential Services', description: 'Top up your phone, pay bills, and even indulge in some leisure activities, all from one app.' },
    { image: '/AUTH2.png', title: 'Cash in on Unused Airtime Credits', description: 'Convert your unused airtime credits into cash quickly and easily.' },
    { image: '/AUTH3.png', title: 'Buy and Sell Gift Cards for Quick Cash', description: 'Trade gift cards for instant cash or purchase new ones with ease.' },
    { image: '/AUTH4.png', title: 'Secure and Reliable Platform', description: 'Your transactions are protected with top-tier security measures.' }
  ];

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simple navigation - no validation needed for UI flow
      await mockService.login(formData.email, formData.password);
      console.log('Login successful');
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      // Even if there's an error, still navigate for UI flow
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

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
    <div className="h-screen bg-white overflow-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&family=Inter:wght@600&family=Lato:wght@400&display=swap');
          .form-input { font-family: 'Roboto', sans-serif; }
          .slider-header { font-family: 'Inter', sans-serif; }
          .slider-body { font-family: 'Lato', sans-serif; }
          .error-input { color: red !important; }
          
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

          .slider-image {
            max-height: 400px;
            width: auto;
            margin: 0 auto;
            display: block;
          }

          .mobile-slider-image {
            max-height: 200px;
            width: auto;
            margin: 0 auto;
            display: block;
          }

          .slider-text-container {
            min-height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: relative;
          }

          .mobile-slider-text-container {
            min-height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: relative;
          }

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

      <div className="hidden lg:flex h-screen">
        <div className="w-1/2 relative bg-gradient-overlay text-white overflow-hidden">
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
          <div className="relative h-full flex items-center justify-center p-12 z-10">
            <div className="max-w-md text-center">
              <img src={slides[currentSlide].image} onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/auth.png'; }} alt="Auth" className="slider-image" />
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
        <div className="w-1/2 overflow-y-auto">
          <div className="min-h-full flex items-center justify-center p-12">
            <div className="w-full max-w-xl space-y-6">
              <div className="text-left">
                <h1 className="text-3xl font-bold text-[#3657A7] flex items-center gap-2">
                  Welcome back
                  <span className="text-2xl">👋</span>
                </h1>
                <p className="text-[#333333] text-base mt-2">Resume managing your bills and utilities seamlessly with BillStation. Let's get Started.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      value={formData.email} 
                      onChange={(e) => handleInputChange('email', e.target.value)} 
                      className={`h-12 border-gray-300 focus:border-[#3657A7] form-input ${error ? 'error-input' : ''}`} 
                      required 
                    />
                    {error && <p className="text-sm text-red-700 mt-1">{error}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Enter your password" 
                      value={formData.password} 
                      onChange={(e) => handleInputChange('password', e.target.value)} 
                      className={`h-12 pr-12 border-gray-300 focus:border-[#3657A7] form-input ${error ? 'error-input' : ''}`} 
                      required 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    {error && <p className="text-sm text-red-700 mt-1">{error}</p>}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="remember" 
                      checked={rememberMe} 
                      onChange={(e) => setRememberMe(e.target.checked)} 
                      className="rounded border-gray-300 text-[#3657A7]" 
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600">Remember me</Label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-[#3657A7]">Forgot password?</Link>
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full h-12 bg-[#3657A7] hover:bg-[#2f4d93]"
                >
                  {isLoading ? 'Signing In...' : 'Login'}
                </Button>
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
                <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-500">Or sign in with</span></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full border border-gray-300 hover:bg-gray-50 rounded-xl py-2.5">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full border border-gray-300 hover:bg-gray-50 rounded-xl py-2.5">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4267B2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account? <Link to="/signup" className="text-[#3657A7] font-semibold">Sign up</Link>
                </p>
              </div>
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
            <img src={slides[currentSlide].image} onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/auth.png'; }} alt="Auth" className="mobile-slider-image" />
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
            <h1 className="text-2xl font-bold text-[#3657A7] flex items-center justify-center gap-2">
              Welcome back
              <span className="text-2xl">👋</span>
            </h1>
            <p className="text-[#333333] text-base mt-2">Resume managing your bills and utilities seamlessly with BillStation. Let's get Started.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-m">Email</Label>
              <div className="relative">
                <Input 
                  id="email-m" 
                  type="email" 
                  placeholder="Enter your email" 
                  value={formData.email} 
                  onChange={(e) => handleInputChange('email', e.target.value)} 
                  className={`h-12 border-gray-300 focus:border-[#3657A7] form-input ${error ? 'error-input' : ''}`} 
                  required 
                />
                {error && <p className="text-sm text-red-700 mt-1">{error}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-m">Password</Label>
              <div className="relative">
                <Input 
                  id="password-m" 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Enter your password" 
                  value={formData.password} 
                  onChange={(e) => handleInputChange('password', e.target.value)} 
                  className={`h-12 pr-12 border-gray-300 focus:border-[#3657A7] form-input ${error ? 'error-input' : ''}`} 
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                {error && <p className="text-sm text-red-700 mt-1">{error}</p>}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="remember-m" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)} 
                  className="rounded border-gray-300 text-[#3657A7]" 
                />
                <Label htmlFor="remember-m" className="text-sm text-gray-600">Remember me</Label>
              </div>
              <Link to="/forgot-password" className="text-sm text-[#3657A7]">Forgot password?</Link>
            </div>
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full h-12 bg-[#3657A7] hover:bg-[#2f4d93]"
            >
              {isLoading ? 'Signing In...' : 'Login'}
            </Button>
          </form>
          <div className="mt-6">
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
              <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-500">Or sign in with</span></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full border border-gray-300 hover:bg-gray-50 rounded-xl py-2.5">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button variant="outline" className="w-full border border-gray-300 hover:bg-gray-50 rounded-xl py-2.5">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4267B2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account? <Link to="/signup" className="text-[#3657A7] font-semibold">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;