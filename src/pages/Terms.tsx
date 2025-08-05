import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  CheckCircle,
  AlertTriangle,
  Info,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Shield,
  Lock,
  Users,
  CreditCard,
  Smartphone,
  Globe,
  Calendar,
  Clock,
  Mail,
  Phone,
  Building,
  Scale,
  Gavel,
  BookOpen,
  Eye,
  Handshake,
  Zap,
  Star,
  Award,
  Target,
  BarChart3,
  Settings,
  User,
  Bell,
  Camera,
  MapPin,
  Home,
  Briefcase,
  GraduationCap,
  Heart,
  Plus,
  Minus
} from "lucide-react";
import DesktopLayout from "@/components/DesktopLayout";
import { useToast } from "@/hooks/use-toast";

const Terms = () => {
  const { toast } = useToast();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const termsSections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      content: [
        {
          subtitle: "Agreement to Terms",
          text: "By accessing and using Bill Station's services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services."
        },
        {
          subtitle: "Modifications",
          text: "We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through the app. Continued use after changes constitutes acceptance of the new terms."
        },
        {
          subtitle: "Eligibility",
          text: "You must be at least 18 years old and have the legal capacity to enter into contracts. You must provide accurate and complete information when creating your account."
        }
      ]
    },
    {
      id: "services",
      title: "Services Description",
      icon: Zap,
      color: "from-blue-500 to-blue-600",
      content: [
        {
          subtitle: "Financial Services",
          text: "Bill Station provides digital financial services including money transfers, bill payments, airtime purchases, gift card services, cryptocurrency trading, and travel bookings."
        },
        {
          subtitle: "Service Availability",
          text: "Services are subject to availability and may be limited based on your location, account tier, and regulatory requirements. We do not guarantee uninterrupted service."
        },
        {
          subtitle: "Third-Party Services",
          text: "Some services are provided by third-party partners. We are not responsible for the quality, accuracy, or availability of third-party services."
        }
      ]
    },
    {
      id: "account",
      title: "Account Terms",
      icon: User,
      color: "from-purple-500 to-purple-600",
      content: [
        {
          subtitle: "Account Creation",
          text: "You must provide accurate, current, and complete information when creating your account. You are responsible for maintaining the security of your account credentials."
        },
        {
          subtitle: "Account Security",
          text: "You are responsible for all activities under your account. Notify us immediately of any unauthorized use or security breaches. We may suspend accounts for security reasons."
        },
        {
          subtitle: "Account Termination",
          text: "You may close your account at any time. We may terminate accounts for violations of these terms, fraud, or other reasons as determined by our policies."
        }
      ]
    },
    {
      id: "transactions",
      title: "Transaction Terms",
      icon: CreditCard,
      color: "from-yellow-500 to-yellow-600",
      content: [
        {
          subtitle: "Transaction Limits",
          text: "Transaction limits are set based on your account tier and verification level. Limits may be adjusted based on risk assessment and regulatory requirements."
        },
        {
          subtitle: "Transaction Processing",
          text: "Transactions are processed subject to available funds, account limits, and regulatory compliance. We are not liable for delays caused by third-party systems."
        },
        {
          subtitle: "Transaction Reversals",
          text: "Completed transactions cannot be reversed except in cases of fraud or error. You must verify all transaction details before confirming."
        }
      ]
    },
    {
      id: "fees",
      title: "Fees and Charges",
      icon: BarChart3,
      color: "from-red-500 to-red-600",
      content: [
        {
          subtitle: "Service Fees",
          text: "Fees are charged for various services as outlined in our fee schedule. Fees may vary based on account tier, transaction type, and market conditions."
        },
        {
          subtitle: "Fee Changes",
          text: "We may change fees with 30 days' notice. Fee changes will be communicated through the app, email, or other appropriate channels."
        },
        {
          subtitle: "Taxes",
          text: "You are responsible for any taxes related to your use of our services. We may be required to collect and remit taxes in certain jurisdictions."
        }
      ]
    },
    {
      id: "prohibited",
      title: "Prohibited Activities",
      icon: AlertTriangle,
      color: "from-orange-500 to-orange-600",
      content: [
        {
          subtitle: "Illegal Activities",
          text: "You may not use our services for any illegal purpose, including money laundering, fraud, terrorism financing, or other criminal activities."
        },
        {
          subtitle: "Unauthorized Use",
          text: "You may not attempt to gain unauthorized access to our systems, interfere with service operation, or use automated tools without permission."
        },
        {
          subtitle: "Violations",
          text: "Violations may result in account suspension, legal action, and reporting to relevant authorities. We cooperate with law enforcement investigations."
        }
      ]
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: Shield,
      color: "from-indigo-500 to-indigo-600",
      content: [
        {
          subtitle: "Service Limitations",
          text: "Our liability is limited to the amount of fees paid in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages."
        },
        {
          subtitle: "Force Majeure",
          text: "We are not liable for service interruptions caused by events beyond our control, including natural disasters, government actions, or technical failures."
        },
        {
          subtitle: "Third-Party Liability",
          text: "We are not liable for actions or omissions of third-party service providers, banks, or other financial institutions."
        }
      ]
    },
    {
      id: "disputes",
      title: "Dispute Resolution",
      icon: Scale,
      color: "from-pink-500 to-pink-600",
      content: [
        {
          subtitle: "Governing Law",
          text: "These terms are governed by the laws of Nigeria. Any disputes will be resolved in Nigerian courts, subject to applicable international law."
        },
        {
          subtitle: "Arbitration",
          text: "Disputes may be resolved through binding arbitration. Arbitration will be conducted in accordance with Nigerian arbitration laws."
        },
        {
          subtitle: "Class Action Waiver",
          text: "You waive any right to participate in class action lawsuits. Disputes must be resolved individually, not as part of a class."
        }
      ]
    }
  ];

  const keyTerms = [
    {
      term: "Bill Station",
      definition: "The digital financial services platform operated by Bill Station Limited"
    },
    {
      term: "Account",
      definition: "Your user profile and associated financial services access"
    },
    {
      term: "Transaction",
      definition: "Any financial operation including transfers, payments, or purchases"
    },
    {
      term: "Tier",
      definition: "Account level determining limits and features available"
    },
    {
      term: "Verification",
      definition: "Process of confirming user identity and account details"
    },
    {
      term: "Service Provider",
      definition: "Third-party companies providing specific services through our platform"
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const downloadTerms = () => {
    toast({
      title: "Download Started",
      description: "Terms and Conditions PDF is being downloaded...",
    });
  };

  const contactLegal = () => {
    toast({
      title: "Contact Legal Team",
      description: "Redirecting you to our legal department...",
    });
  };

  return (
    <DesktopLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Terms & Conditions</h1>
              <p className="text-gray-600 text-sm">Read and understand our service terms</p>
            </div>
          </div>
          <Badge className="bg-blue-100 text-blue-800">
            <Info className="h-3 w-3 mr-1" />
            Last Updated: Dec 2024
          </Badge>
        </div>

        {/* Important Notice */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Important Notice</h3>
                <p className="text-gray-700 text-sm">
                  By using Bill Station's services, you agree to be bound by these Terms and Conditions. 
                  Please read them carefully before proceeding. These terms constitute a legally binding 
                  agreement between you and Bill Station Limited.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Terms */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Key Terms & Definitions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keyTerms.map((item, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">{item.term}</h4>
                  <p className="text-sm text-gray-600">{item.definition}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Terms Sections */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Terms & Conditions</h2>
          {termsSections.map((section) => (
            <Card key={section.id} className="border-0 shadow-lg">
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center`}>
                      <section.icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </div>
                  {expandedSection === section.id ? (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </CardHeader>
              
              {expandedSection === section.id && (
                <CardContent className="pt-0">
                  <div className="space-y-6">
                    {section.content.map((item, index) => (
                      <div key={index} className="space-y-3">
                        <h4 className="font-semibold text-gray-900">{item.subtitle}</h4>
                        <p className="text-gray-600 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Compliance & Regulations */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gavel className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Regulatory Compliance</h3>
              <p className="text-gray-700 mb-6">
                Bill Station operates under the supervision of the Central Bank of Nigeria (CBN) and 
                complies with all applicable financial regulations, including anti-money laundering (AML) 
                and know-your-customer (KYC) requirements.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-white rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">CBN Licensed</h4>
                  <p className="text-gray-600">Licensed by Central Bank of Nigeria</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">AML Compliant</h4>
                  <p className="text-gray-600">Anti-money laundering compliance</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">KYC Verified</h4>
                  <p className="text-gray-600">Know-your-customer verification</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Download Terms</h3>
              <p className="text-sm text-gray-600 mb-4">Get a copy of our terms and conditions</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={downloadTerms}
              >
                Download PDF
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Legal Questions</h3>
              <p className="text-sm text-gray-600 mb-4">Contact our legal department</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={contactLegal}
              >
                Contact Legal
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Handshake className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Accept Terms</h3>
              <p className="text-sm text-gray-600 mb-4">Confirm you accept our terms</p>
              <Button 
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90"
              >
                I Accept
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-50 to-gray-100">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions About Terms?</h3>
              <p className="text-gray-600 mb-6">
                Our legal team is available to clarify any terms or conditions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90"
                  onClick={contactLegal}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Legal Team
                </Button>
                <Button 
                  variant="outline"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Privacy Policy
                </Button>
                <Button 
                  variant="outline"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Regulatory Info
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DesktopLayout>
  );
};

export default Terms; 