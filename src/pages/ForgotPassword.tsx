import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Shield, CheckCircle } from "lucide-react";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log('Forgot password for:', email);
    setIsSubmitted(true);
  };

  return (
    <div className="h-screen bg-white overflow-hidden">
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Left Side - Form (Scrollable) */}
        <div className="w-1/2 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-y-auto scrollbar-hide">
          <div className="min-h-screen flex items-center justify-center p-12">
            <div className="w-full max-w-md space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <Link to="/login" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back to Login</span>
                </Link>
                
                {/* Company Logo */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16">
                    <img 
                      src="/logo.png" 
                      alt="Bill Station Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
                  <p className="text-gray-600">Enter your email to receive reset instructions</p>
                </div>
              </div>

              {/* Form */}
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg py-3 rounded-xl shadow-lg">
                    Send Reset Link
                  </Button>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Success Message */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-green-900">Check Your Email</h4>
                        <p className="text-sm text-green-700">
                          We've sent a password reset link to <strong>{email}</strong>. 
                          Please check your inbox and follow the instructions to reset your password.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Resend Link */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Didn't receive the email?{" "}
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Try again
                      </button>
                    </p>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-blue-900">Secure Process</h4>
                    <p className="text-xs text-blue-700">
                      Your password reset link will expire in 1 hour for security reasons.
                    </p>
                  </div>
                </div>
              </div>

              {/* Back to Login */}
              <div className="text-center">
                <p className="text-gray-600">
                  Remember your password?{" "}
                  <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Image (Fixed) */}
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
      <div className="lg:hidden min-h-screen relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/money2.jpg"
            alt="Financial Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
        </div>

        {/* Thick White Fading Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95"></div>

        {/* Mobile Form Content */}
        <div className="relative z-10 min-h-screen flex flex-col justify-center p-6">
          {/* Header */}
          <div className="space-y-4 mb-8">
            <Link to="/login" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </Link>
            
            {/* Company Logo */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12">
                <img 
                  src="/logo.png" 
                  alt="Bill Station Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
              <p className="text-gray-600">Enter your email for reset instructions</p>
            </div>
          </div>

          {/* Mobile Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-1">
                <Label htmlFor="email-mobile" className="text-sm">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email-mobile"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-3 rounded-xl shadow-lg mt-4">
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Success Message */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-green-900">Check Your Email</h4>
                    <p className="text-xs text-green-700">
                      We've sent a password reset link to <strong>{email}</strong>. 
                      Please check your inbox.
                    </p>
                  </div>
                </div>
              </div>

              {/* Resend Link */}
              <div className="text-center">
                <p className="text-xs text-gray-600">
                  Didn't receive the email?{" "}
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Try again
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mt-4">
            <div className="flex items-start space-x-2">
              <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-medium text-blue-900">Secure Process</h4>
                <p className="text-xs text-blue-700">
                  Reset link expires in 1 hour for security.
                </p>
              </div>
            </div>
          </div>

          {/* Back to Login */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 