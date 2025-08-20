import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { authAPI } from "@/services/api";
import { useFormPersistence } from "@/hooks/useFormPersistence";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const { formData, updateFormData, clearFormData } = useFormPersistence('signup', {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referralCode: ''
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

    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const [firstName, ...rest] = formData.fullName.trim().split(' ');
      const lastName = rest.join(' ');

      const response = await authAPI.signup({
        firstName: firstName || '',
        lastName: lastName || '',
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      console.log('Signup successful:', response);
      clearFormData();
      navigate('/onboarding');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err instanceof Error ? err.message : 'Signup failed. Please try again.');
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

  return (
    <div className="h-screen overflow-hidden bg-white">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&family=Inter:wght@600&family=Lato:wght@400&display=swap');
          .form-input { font-family: 'Roboto', sans-serif; }
          .slider-header { font-family: 'Inter', sans-serif; }
          .slider-body { font-family: 'Lato', sans-serif; }
          .error-input { color: red !important; }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>
      <div className="hidden lg:flex h-full">
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
        <div className="w-1/2 overflow-y-auto hide-scrollbar">
          <div className="min-h-full flex items-center justify-center p-12">
            <div className="w-full max-w-xl">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#3657A7]">Let's get you Started</h1>
                <p className="text-sm text-gray-500 mt-1">Create an Account</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">First & Last Name</Label>
                  <div className="relative">
                    <Input 
                      id="fullName" 
                      type="text" 
                      placeholder="Enter your name" 
                      value={formData.fullName} 
                      onChange={(e) => handleInputChange('fullName', e.target.value)} 
                      className={`h-12 border-gray-300 focus:border-[#3657A7] form-input ${error ? 'error-input' : ''}`} 
                      required 
                    />
                    {error && <p className="text-sm text-red-700 mt-1">{error}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email address" 
                      value={formData.email} 
                      onChange={(e) => handleInputChange('email', e.target.value)} 
                      className={`h-12 border-gray-300 focus:border-[#3657A7] form-input ${error ? 'error-input' : ''}`} 
                      required 
                    />
                    {error && <p className="text-sm text-red-700 mt-1">{error}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="Enter your phone number" 
                      value={formData.phone} 
                      onChange={(e) => handleInputChange('phone', e.target.value)} 
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
                      placeholder="Create a password" 
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
                  <p className="text-xs text-gray-500">Your password must have at least 8 characters</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input 
                      id="confirmPassword" 
                      type={showConfirmPassword ? 'text' : 'password'} 
                      placeholder="Confirm your password" 
                      value={formData.confirmPassword} 
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)} 
                      className={`h-12 pr-12 border-gray-300 focus:border-[#3657A7] form-input ${error ? 'error-input' : ''}`} 
                      required 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    {error && <p className="text-sm text-red-700 mt-1">{error}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ref">Referral Code (Optional)</Label>
                  <Input 
                    id="ref" 
                    type="text" 
                    placeholder="Referral code (Optional)" 
                    value={formData.referralCode} 
                    onChange={(e) => handleInputChange('referralCode', e.target.value)} 
                    className={`h-12 border-gray-300 focus:border-[#3657A7] form-input ${error ? 'error-input' : ''}`} 
                  />
                  {error && <p className="text-sm text-red-700 mt-1">{error}</p>}
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="terms" 
                    checked={agreedToTerms} 
                    onCheckedChange={(checked) => setAgreedToTerms(checked)} 
                    className="mt-1" 
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-600">
                    By creating an account you agree to the <Link to="/terms" className="text-[#3657A7] underline">Terms & Conditions</Link> and our <Link to="/privacy" className="text-[#3657A7] underline">Privacy Policy</Link>
                  </Label>
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full h-12 bg-[#3657A7] hover:bg-[#2f4d93] text-white rounded-md"
                >
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </Button>
              </form>
              <div className="mt-6">
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
                  <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-500">Or sign up with</span></div>
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
                      <path fill="#1877F2" d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.95 3.61 9.06 8.33 9.93v-7.02H7.9v-2.9h2.29V9.41c0-2.26 1.33-3.5 3.38-3.5.98 0 2 .17 2 .17v2.2h-1.13c-1.11 0-1.46.69-1.46 1.39v1.67h2.49l-.4 2.9h-2.09V22c4.72-.87 8.33-4.98 8.33-9.93z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>
                <p className="mt-6 text-center text-sm text-gray-600">
                  Already have an account? <Link to="/login" className="text-[#3657A7] font-medium">Log In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden h-full">
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
        <div className="h-2/3 overflow-y-auto p-6 hide-scrollbar">
          <div className="mb-4 text-center">
            <h1 className="text-2xl font-bold text-[#3657A7]">Let's get you Started</h1>
            <p className="text-sm text-gray-500">Create an Account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName-m">First & Last Name</Label>
              <Input 
                id="fullName-m" 
                value={formData.fullName} 
                onChange={(e) => handleInputChange('fullName', e.target.value)} 
                placeholder="Enter your name" 
                className={`h-12 border-gray-300 focus:border-[#3657A7] form-input ${error ? 'error-input' : ''}`} 
                required 
              />
              {error && <p className="text-sm text-red-700 mt-1">{error}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-m">Email Address</Label>
              <Input 
                id="email-m" 
                type="email" 
                value={formData.email} 
                onChange={(e) => handleInputChange('email', e.target.value)} 
                placeholder="Enter your email" 
                className={`h-12 border-gray-300 focus:border-[#3657A7] form-input ${error ? 'error-input' : ''}`} 
                required 
              />
              {error && <p className="text-sm text-red-700 mt-1">{error}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone-m">Phone Number</Label>
              <Input 
                id="phone-m" 
                type="tel" 
                value={formData.phone} 
                onChange={(e) => handleInputChange('phone', e.target.value)} 
                placeholder="Enter your phone number" 
                className={`h-12 border-gray-300 focus:border-[#3657A7] form-input ${error ? 'error-input' : ''}`} 
                required 
              />
              {error && <p className="text-sm text-red-700 mt-1">{error}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-m">Password</Label>
              <div className="relative">
                <Input 
                  id="password-m" 
                  type={showPassword ? 'text' : 'password'} 
                  value={formData.password} 
                  onChange={(e) => handleInputChange('password', e.target.value)} 
                  placeholder="Create a password" 
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
              <p className="text-xs text-gray-500">Your password must have at least 8 characters</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-m">Confirm Password</Label>
              <div className="relative">
                <Input 
                  id="confirm-m" 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  value={formData.confirmPassword} 
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)} 
                  placeholder="Confirm your password" 
                  className={`h-12 pr-12 border-gray-300 focus:border-[#3657A7] form-input ${error ? 'error-input' : ''}`} 
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                {error && <p className="text-sm text-red-700 mt-1">{error}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref-m">Referral Code (Optional)</Label>
              <Input 
                id="ref-m" 
                value={formData.referralCode} 
                onChange={(e) => handleInputChange('referralCode', e.target.value)} 
                placeholder="Referral code (Optional)" 
                className={`h-12 border-gray-300 focus:border-[#3657A7] form-input ${error ? 'error-input' : ''}`} 
              />
              {error && <p className="text-sm text-red-700 mt-1">{error}</p>}
            </div>
            <div className="flex items-start gap-3">
              <Checkbox 
                id="terms-m" 
                checked={agreedToTerms} 
                onCheckedChange={(checked) => setAgreedToTerms(checked)} 
                className="mt-1" 
              />
              <Label htmlFor="terms-m" className="text-sm text-gray-600">
                By creating an account you agree to the <Link to="/terms" className="text-[#3657A7] underline">Terms & Conditions</Link> and our <Link to="/privacy" className="text-[#3657A7] underline">Privacy Policy</Link>
              </Label>
            </div>
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full h-12 bg-[#3657A7] hover:bg-[#2f4d93]"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
              <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-500">Or sign up with</span></div>
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
                  <path fill="#1877F2" d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.95 3.61 9.06 8.33 9.93v-7.02H7.9v-2.9h2.29V9.41c0-2.26 1.33-3.5 3.38-3.5.98 0 2 .17 2 .17v2.2h-1.13c-1.11 0-1.46.69-1.46 1.39v1.67h2.49l-.4 2.9h-2.09V22c4.72-.87 8.33-4.98 8.33-9.93z"/>
                </svg>
                Facebook
              </Button>
            </div>
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account? <Link to="/login" className="text-[#3657A7] font-medium">Log In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;