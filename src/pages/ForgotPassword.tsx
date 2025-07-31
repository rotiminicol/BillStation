import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
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
                  <p className="text-gray-600 mt-2">Enter your email to receive reset instructions</p>
                </div>
              </div>

              {/* Form */}
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 pl-10 border-2 border-gray-200 focus:border-[#0B63BC] transition-colors duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full h-12 bg-gradient-to-r from-[#0B63BC] to-[#0B63BC]/90 hover:from-[#0B63BC]/90 hover:to-[#0B63BC] text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Send Reset Link
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  {/* Success Message */}
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

                  {/* Resend Link */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Didn't receive the email?{" "}
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="text-[#0B63BC] hover:text-[#0B63BC]/80 font-medium"
                      >
                        Try again
                      </button>
                    </p>
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Social Buttons */}
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
                    <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Apple
                </Button>
              </div>

              {/* Back to Login */}
              <div className="text-center">
                <p className="text-gray-600">
                  Remember your password?{" "}
                  <Link to="/login" className="text-[#0B63BC] hover:text-[#0B63BC]/80 font-semibold transition-colors">
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
              <img 
                src="/logo.png" 
                alt="Bill Station Logo" 
                className="w-12 h-12 object-contain"
              />
            </div>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
              <p className="text-gray-600">Enter your email for reset instructions</p>
            </div>
          </div>

          {/* Mobile Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email-mobile" className="text-sm">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email-mobile"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 pl-10 border-2 border-gray-200 focus:border-[#0B63BC] transition-colors duration-300"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full h-12 bg-gradient-to-r from-[#0B63BC] to-[#0B63BC]/90 hover:from-[#0B63BC]/90 hover:to-[#0B63BC] text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Success Message */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
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
                    className="text-[#0B63BC] hover:text-[#0B63BC]/80 font-medium"
                  >
                    Try again
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-4">
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
                <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Apple
            </Button>
          </div>

          {/* Back to Login */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link to="/login" className="text-[#0B63BC] hover:text-[#0B63BC]/80 font-semibold transition-colors">
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