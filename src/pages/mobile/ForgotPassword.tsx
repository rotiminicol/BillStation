import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { mockService } from "@/services/mockData";
import { useFormPersistence } from "@/hooks/useFormPersistence";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  const { formData, updateFormData, clearFormData } = useFormPersistence('forgotPassword', {
    email: ""
  });
  
  const { email } = formData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      await mockService.forgotPassword(email);
      setEmailSent(true);
      
      toast({
        title: "Email Sent",
        description: "Check your email for a link to reset your password.",
      });
    } catch (error) {
      console.error("Password reset error:", error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send reset email';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        {/* Top Section - Blue Background with Logo (40% of screen) */}
        <div className="h-[40vh] bg-[#0B63BC] flex items-center justify-center">
          <div className="text-center px-6">
            {/* Logo */}
            <div className="mb-8">
              <img 
                src="/logo.png" 
                alt="Bill Station Logo" 
                className="w-20 h-20 mx-auto"
              />
            </div>
            
            {/* Brand Name */}
            <h1 className="text-white text-3xl font-bold mb-2">
              Bill Station
            </h1>
            
            {/* Tagline */}
            <p className="text-blue-100 text-base">Your Financial Partner</p>
          </div>
        </div>

        {/* Bottom Section - White Background with Success Message (60% of screen) */}
        <div className="h-[60vh] bg-white overflow-y-auto">
          <div className="p-8 -mt-6">
            <div className="max-w-sm mx-auto text-center">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              
              {/* Success Message */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Check Your Email
              </h2>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                We've sent a password reset link to{" "}
                <span className="font-semibold text-gray-900">{email}</span>.
                <br />
                The link will expire in 1 hour.
              </p>
              
              {/* Action Buttons */}
              <div className="space-y-4">
                <Button 
                  onClick={() => {
                    setEmailSent(false);
                    setError('');
                    clearFormData();
                  }}
                  className="w-full bg-[#0B63BC] hover:bg-[#0B63BC]/90 text-white py-3 rounded-lg font-medium"
                >
                  Resend Email
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/verify-email')}
                  className="w-full py-3 rounded-lg font-medium border-gray-300 hover:border-gray-400"
                >
                  Continue to Verify Email
                </Button>
              </div>
              
              {/* Additional Help */}
              <p className="text-sm text-gray-500 mt-8">
                Didn't receive the email? Check your spam folder or{" "}
                <button 
                  onClick={() => {
                    setEmailSent(false);
                    setError('');
                    clearFormData();
                  }}
                  className="text-[#0B63BC] hover:text-[#0B63BC]/80 hover:underline font-medium"
                >
                  try another email address
                </button>.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Section - Blue Background with Logo (40% of screen) */}
      <div className="h-[40vh] bg-[#0B63BC] flex items-center justify-center">
        <div className="text-center px-6">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/logo.png" 
              alt="Bill Station Logo" 
              className="w-20 h-20 mx-auto"
            />
          </div>
          
          {/* Brand Name */}
          <h1 className="text-white text-3xl font-bold mb-2">
            Bill Station
          </h1>
          
          {/* Tagline */}
          <p className="text-blue-100 text-base">Your Financial Partner</p>
        </div>
      </div>

      {/* Bottom Section - White Background with Form (60% of screen) */}
      <div className="h-[60vh] bg-white overflow-y-auto">
        <div className="p-8 -mt-6">
          <div className="max-w-sm mx-auto">
            {/* Forgot Password Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Forgot Password?
              </h2>
              <p className="text-gray-600 text-sm">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10 pr-4 py-3 border-gray-300 rounded-lg focus:border-[#0B63BC] focus:ring-1 focus:ring-[#0B63BC]"
                    value={email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-xs font-medium text-red-900">Error</h4>
                      <p className="text-xs text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Send Reset Link Button */}
              <Button 
                type="submit" 
                className="w-full bg-[#0B63BC] hover:bg-[#0B63BC]/90 text-white py-3 rounded-lg font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <span>Send Reset Link</span>
                )}
              </Button>

              {/* Login Link */}
              <div className="text-center pt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Remember your password?</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link 
                    to="/login" 
                    className="text-[#0B63BC] hover:text-[#0B63BC]/80 font-medium"
                  >
                    Sign in to your account
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
