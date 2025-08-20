import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { authAPI } from "@/services/api";
import { useIsMobile } from "@/hooks/use-mobile";
import { useFormPersistence } from "@/hooks/useFormPersistence";

const Login = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
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

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authAPI.login(formData.email, formData.password);
      console.log('Login successful:', response);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Invalid email or password. Please try again.');
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

  if (isMobile) {
    return (
      <div className="min-h-screen bg-white overflow-hidden">
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&family=Inter:wght@600&family=Lato:wght@400&display=swap');
            .form-input { font-family: 'Roboto', sans-serif; }
            .slider-header { font-family: 'Inter', sans-serif; }
            .slider-body { font-family: 'Lato', sans-serif; }
            .error-input { color: red !important; }
          `}
        </style>
        <div className="h-1/3 bg-[#3657A7] flex items-center justify-center px-6 relative">
          <img 
            src="/logo.png" 
            alt="Bill Station Logo" 
            className="absolute top-4 left-4 w-12 h-12 object-contain"
          />
          <div className="max-w-sm text-white text-center">
            <img src="/auth.png" alt="Auth" className="w-full h-auto mb-6" />
            <h2 className="text-xl font-semibold slider-header">{slides[currentSlide].title}</h2>
            <p className="text-white/90 mt-2 slider-body">{slides[currentSlide].description}</p>
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
          <div className="mb-4 text-center">
            <h1 className="text-2xl font-bold text-[#3657A7] flex items-center justify-center gap-2">
              Welcome back
              <span className="text-2xl">👋</span>
            </h1>
            <p className="text-sm text-gray-500">Resume managing your bills and utilities</p>
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
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
            <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-500">Or sign in with</span></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full border border-gray-300 hover:bg-gray-50 rounded-xl py-2.5 transition-all duration-200 hover:shadow-md group">
              <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" className="w-full border border-gray-300 hover:bg-gray-50 rounded-xl py-2.5 transition-all duration-200 hover:shadow-md group">
              <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path fill="#4267B2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </Button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account? <Link to="/signup" className="text-[#3657A7] font-medium">Sign Up</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white overflow-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&family=Inter:wght@600&family=Lato:wght@400&display=swap');
          .form-input { font-family: 'Roboto', sans-serif; }
          .slider-header { font-family: 'Inter', sans-serif; }
          .slider-body { font-family: 'Lato', sans-serif; }
          .error-input { color: red !important; }
        `}
      </style>
      <div className="hidden lg:flex h-screen">
        <div className="w-1/2 relative bg-[#3657A7] text-white">
          <img 
            src="/logo.png" 
            alt="Bill Station Logo" 
            className="absolute top-4 left-4 w-12 h-12 object-contain"
          />
          <div className="relative h-full flex items-center justify-center p-12">
            <div className="max-w-md">
              <img src="/auth.png" alt="Auth" className="w-full h-auto mb-8" />
              <h2 className="text-2xl font-semibold slider-header">{slides[currentSlide].title}</h2>
              <p className="text-white/90 mt-3 leading-relaxed slider-body">{slides[currentSlide].description}</p>
              <div className="mt-6 flex items-center justify-center gap-1">
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
        </div>
        <div className="w-1/2 overflow-y-auto">
          <div className="min-h-full flex items-center justify-center p-12">
            <div className="w-full max-w-xl space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-[#3657A7] flex items-center justify-center gap-2">
                  Welcome back
                  <span className="text-2xl">👋</span>
                </h1>
                <p className="text-gray-600 mt-2">Resume managing your bills and utilities seamlessly</p>
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
                <Button variant="outline" className="w-full border border-gray-300 hover:bg-gray-50 rounded-xl py-2.5 transition-all duration-200 hover:shadow-md group">
                  <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full border border-gray-300 hover:bg-gray-50 rounded-xl py-2.5 transition-all duration-200 hover:shadow-md group">
                  <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path fill="#4267B2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
              </div>
              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account? <Link to="/signup" className="text-[#3657A7] font-semibold">Sign up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;