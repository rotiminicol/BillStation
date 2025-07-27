import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Users, CreditCard, FileText } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link to="/signup" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Sign Up</span>
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          </div>
          <p className="text-gray-600">Last updated: December 2024</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to Bill Station ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our 
              digital financial platform and services. By accessing or using Bill Station, you agree to be bound by these Terms.
            </p>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Bill Station provides the following services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Digital bill payment processing</li>
              <li>Gift card trading and management</li>
              <li>Financial transaction services</li>
              <li>Digital asset trading</li>
              <li>Enterprise security solutions</li>
            </ul>
          </section>

          {/* Account Registration */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Account Registration</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To use our services, you must:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Be at least 18 years old</li>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Use our services only for lawful purposes</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Not interfere with the proper functioning of our platform</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Maintain the confidentiality of your account information</li>
            </ul>
          </section>

          {/* Privacy and Data Protection */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Privacy and Data Protection</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your privacy is important to us. We collect, use, and protect your personal information in accordance with our 
              Privacy Policy. By using our services, you consent to our data practices as described in our Privacy Policy.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900">Data Security</h4>
                  <p className="text-xs text-blue-700">
                    We implement bank-level encryption and security measures to protect your financial data and personal information.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Financial Services */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Financial Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our financial services are subject to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Applicable banking and financial regulations</li>
              <li>Transaction limits and processing times</li>
              <li>Fees and charges as disclosed in our fee schedule</li>
              <li>Risk disclosure requirements for trading services</li>
            </ul>
          </section>

          {/* Prohibited Activities */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Prohibited Activities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may not use our services to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Engage in money laundering or terrorist financing</li>
              <li>Process fraudulent transactions</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit malware or harmful code</li>
            </ul>
          </section>

          {/* Fees and Payments */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Fees and Payments</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may charge fees for certain services. All fees are clearly disclosed before you complete a transaction. 
              You are responsible for all fees associated with your use of our services.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may terminate or suspend your account at any time for violation of these Terms. You may close your account 
              at any time by contacting our support team.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To the maximum extent permitted by law, Bill Station shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages arising from your use of our services.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Dispute Resolution</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Any disputes arising from these Terms or your use of our services shall be resolved through binding arbitration 
              in accordance with the laws of Nigeria.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update these Terms from time to time. We will notify you of any material changes by posting the new 
              Terms on our platform and updating the "Last updated" date.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700">
                <strong>Email:</strong> legal@billstation.com<br />
                <strong>Address:</strong> Bill Station Legal Department<br />
                <strong>Phone:</strong> +234 800 BILL STATION
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600">
                © 2024 Bill Station. All rights reserved.
              </p>
              <div className="flex gap-4">
                <Link to="/privacy" className="text-sm text-blue-600 hover:text-blue-700">
                  Privacy Policy
                </Link>
                <Link to="/signup" className="text-sm text-blue-600 hover:text-blue-700">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms; 