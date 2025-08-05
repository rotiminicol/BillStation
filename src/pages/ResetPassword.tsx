import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { authAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (!tokenFromUrl) {
      setError('Invalid reset link. Please request a new password reset.');
      return;
    }
    setToken(tokenFromUrl);
  }, [searchParams]);

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      errors: {
        length: password.length < minLength,
        uppercase: !hasUpperCase,
        lowercase: !hasLowerCase,
        numbers: !hasNumbers,
        special: !hasSpecialChar,
      }
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const validation = validatePassword(newPassword);
    if (!validation.isValid) {
      setError('Password does not meet requirements');
      return;
    }

    setIsLoading(true);
    
    try {
      await authAPI.resetPassword(token, newPassword);
      setIsSuccess(true);
      toast({
        title: "Password Reset Successfully",
        description: "Your password has been updated. You can now log in with your new password.",
      });
    } catch (error) {
      console.error('Password reset error:', error);
      setError(error instanceof Error ? error.message : 'Failed to reset password');
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to reset password',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordValidation = validatePassword(newPassword);

  if (isSuccess) {
    return (
      <div className="h-screen bg-white overflow-hidden">
        {/* Desktop Layout */}
        <div className="hidden lg:flex h-screen">
          {/* Left Side - Success Message */}
          <div className="w-1/2 bg-gradient-to-br from-gray-50 via-white to-[#0B63BC]/10 overflow-y-auto">
            <div className="min-h-screen flex items-center justify-center p-12">
              <div className="w-full max-w-md space-y-6">
                {/* Success Icon */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-900">Password Reset Successfully</h1>
                  <p className="text-gray-600 mt-2">Your password has been updated. You can now log in with your new password.</p>
                </div>

                <Button 
                  onClick={() => navigate('/login')}
                  className="w-full h-12 bg-gradient-to-r from-[#0B63BC] to-[#0B63BC]/90 hover:from-[#0B63BC]/90 hover:to-[#0B63BC] text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Continue to Login
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="w-1/2 relative overflow-hidden">
            <img
              src="/money2.jpg"
              alt="Financial Services"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden min-h-screen flex flex-col bg-white">
          {/* Top Section - Blue Background with Logo */}
          <div className="h-[40vh] bg-[#0B63BC] flex items-center justify-center">
            <div className="text-center px-6">
              <div className="mb-8">
                <img 
                  src="/logo.png" 
                  alt="Bill Station Logo" 
                  className="w-20 h-20 mx-auto"
                />
              </div>
              <h1 className="text-white text-3xl font-bold mb-2">Bill Station</h1>
              <p className="text-blue-100 text-base">Your Financial Partner</p>
            </div>
          </div>

          {/* Bottom Section - Success Message */}
          <div className="h-[60vh] bg-white overflow-y-auto">
            <div className="p-8 -mt-6">
              <div className="max-w-sm mx-auto text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Password Reset Successfully</h2>
                <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                  Your password has been updated. You can now log in with your new password.
                </p>
                
                <Button 
                  onClick={() => navigate('/login')}
                  className="w-full bg-[#0B63BC] hover:bg-[#0B63BC]/90 text-white py-3 rounded-lg font-medium"
                >
                  Continue to Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white overflow-hidden">
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Left Side - Form */}
        <div className="w-1/2 bg-gradient-to-br from-gray-50 via-white to-[#0B63BC]/10 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-12">
            <div className="w-full max-w-md space-y-6">
              {/* Header */}
              <div className="space-y-4">
                <Link to="/login" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back to Login</span>
                </Link>
                
                {/* Company Logo */}
                <div className="flex justify-center mb-4">
                  <img 
                    src="/logo.png" 
                    alt="Bill Station Logo" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
                  <p className="text-gray-600 mt-2">Enter your new password below</p>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-red-900">Error</h4>
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* New Password */}
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="h-12 pl-10 pr-10 border-2 border-gray-200 focus:border-[#0B63BC] transition-colors duration-300"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-12 pl-10 pr-10 border-2 border-gray-200 focus:border-[#0B63BC] transition-colors duration-300"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                {newPassword && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Password Requirements:</h4>
                    <div className="space-y-1 text-sm">
                      <div className={`flex items-center ${passwordValidation.errors.length ? 'text-red-600' : 'text-green-600'}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${passwordValidation.errors.length ? 'bg-red-500' : 'bg-green-500'}`}></div>
                        At least 8 characters
                      </div>
                      <div className={`flex items-center ${passwordValidation.errors.uppercase ? 'text-red-600' : 'text-green-600'}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${passwordValidation.errors.uppercase ? 'bg-red-500' : 'bg-green-500'}`}></div>
                        One uppercase letter
                      </div>
                      <div className={`flex items-center ${passwordValidation.errors.lowercase ? 'text-red-600' : 'text-green-600'}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${passwordValidation.errors.lowercase ? 'bg-red-500' : 'bg-green-500'}`}></div>
                        One lowercase letter
                      </div>
                      <div className={`flex items-center ${passwordValidation.errors.numbers ? 'text-red-600' : 'text-green-600'}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${passwordValidation.errors.numbers ? 'bg-red-500' : 'bg-green-500'}`}></div>
                        One number
                      </div>
                      <div className={`flex items-center ${passwordValidation.errors.special ? 'text-red-600' : 'text-green-600'}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${passwordValidation.errors.special ? 'bg-red-500' : 'bg-green-500'}`}></div>
                        One special character
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-[#0B63BC] to-[#0B63BC]/90 hover:from-[#0B63BC]/90 hover:to-[#0B63BC] text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isLoading || !token}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Resetting...</span>
                    </div>
                  ) : (
                    <span>Reset Password</span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-1/2 relative overflow-hidden">
          <img
            src="/money2.jpg"
            alt="Financial Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen flex flex-col bg-white">
        {/* Top Section - Blue Background with Logo */}
        <div className="h-[40vh] bg-[#0B63BC] flex items-center justify-center">
          <div className="text-center px-6">
            <div className="mb-8">
              <img 
                src="/logo.png" 
                alt="Bill Station Logo" 
                className="w-20 h-20 mx-auto"
              />
            </div>
            <h1 className="text-white text-3xl font-bold mb-2">Bill Station</h1>
            <p className="text-blue-100 text-base">Your Financial Partner</p>
          </div>
        </div>

        {/* Bottom Section - Form */}
        <div className="h-[60vh] bg-white overflow-y-auto">
          <div className="p-8 -mt-6">
            <div className="max-w-sm mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
                <p className="text-gray-600 text-sm">Enter your new password below</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-xs font-medium text-red-900">Error</h4>
                      <p className="text-xs text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password */}
                <div className="space-y-2">
                  <label htmlFor="newPassword-mobile" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="newPassword-mobile"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="pl-10 pr-10 py-3 border-gray-300 rounded-lg focus:border-[#0B63BC] focus:ring-1 focus:ring-[#0B63BC]"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword-mobile" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="confirmPassword-mobile"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      className="pl-10 pr-10 py-3 border-gray-300 rounded-lg focus:border-[#0B63BC] focus:ring-1 focus:ring-[#0B63BC]"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                {newPassword && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="text-xs font-medium text-gray-900 mb-2">Password Requirements:</h4>
                    <div className="space-y-1 text-xs">
                      <div className={`flex items-center ${passwordValidation.errors.length ? 'text-red-600' : 'text-green-600'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-2 ${passwordValidation.errors.length ? 'bg-red-500' : 'bg-green-500'}`}></div>
                        At least 8 characters
                      </div>
                      <div className={`flex items-center ${passwordValidation.errors.uppercase ? 'text-red-600' : 'text-green-600'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-2 ${passwordValidation.errors.uppercase ? 'bg-red-500' : 'bg-green-500'}`}></div>
                        One uppercase letter
                      </div>
                      <div className={`flex items-center ${passwordValidation.errors.lowercase ? 'text-red-600' : 'text-green-600'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-2 ${passwordValidation.errors.lowercase ? 'bg-red-500' : 'bg-green-500'}`}></div>
                        One lowercase letter
                      </div>
                      <div className={`flex items-center ${passwordValidation.errors.numbers ? 'text-red-600' : 'text-green-600'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-2 ${passwordValidation.errors.numbers ? 'bg-red-500' : 'bg-green-500'}`}></div>
                        One number
                      </div>
                      <div className={`flex items-center ${passwordValidation.errors.special ? 'text-red-600' : 'text-green-600'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-2 ${passwordValidation.errors.special ? 'bg-red-500' : 'bg-green-500'}`}></div>
                        One special character
                      </div>
                    </div>
                  </div>
                )}

                {/* Reset Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-[#0B63BC] hover:bg-[#0B63BC]/90 text-white py-3 rounded-lg font-medium"
                  disabled={isLoading || !token}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Resetting...</span>
                    </div>
                  ) : (
                    <span>Reset Password</span>
                  )}
                </Button>

                {/* Back to Login */}
                <div className="text-center pt-6">
                  <Link 
                    to="/login" 
                    className="text-[#0B63BC] hover:text-[#0B63BC]/80 font-medium"
                  >
                    Back to Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 