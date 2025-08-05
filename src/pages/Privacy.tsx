import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  Eye, 
  Lock, 
  Users, 
  FileText, 
  CheckCircle,
  AlertTriangle,
  Info,
  Download,
  Mail,
  Phone,
  Globe,
  Smartphone,
  Database,
  Key,
  Fingerprint,
  BarChart3,
  Settings,
  User,
  Bell,
  Camera,
  MapPin,
  Calendar,
  CreditCard,
  Building,
  Home,
  Briefcase,
  GraduationCap,
  Heart,
  Star,
  Clock,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Plus,
  Minus,
  Trash2
} from "lucide-react";
import DesktopLayout from "@/components/DesktopLayout";
import { useToast } from "@/hooks/use-toast";

const Privacy = () => {
  const { toast } = useToast();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "private",
    dataSharing: false,
    analyticsTracking: true,
    marketingEmails: false,
    thirdPartySharing: false,
    locationSharing: false,
    biometricData: false,
    transactionHistory: "private",
    socialFeatures: false,
    personalizedAds: false
  });

  const privacyPolicies = [
    {
      id: "data-collection",
      title: "Data Collection",
      icon: Database,
      color: "from-blue-500 to-blue-600",
      content: [
        {
          subtitle: "Personal Information",
          items: [
            "Name, email address, and phone number",
            "Date of birth and identification documents",
            "Address and location information",
            "Employment and financial information"
          ]
        },
        {
          subtitle: "Usage Information",
          items: [
            "Transaction history and patterns",
            "App usage and feature interactions",
            "Device information and IP addresses",
            "Cookies and tracking technologies"
          ]
        },
        {
          subtitle: "Financial Information",
          items: [
            "Bank account details and balances",
            "Transaction amounts and recipients",
            "Payment method information",
            "Credit and debit card details"
          ]
        }
      ]
    },
    {
      id: "data-usage",
      title: "How We Use Your Data",
      icon: BarChart3,
      color: "from-green-500 to-green-600",
      content: [
        {
          subtitle: "Service Provision",
          items: [
            "Process transactions and payments",
            "Verify your identity and prevent fraud",
            "Provide customer support",
            "Send important account notifications"
          ]
        },
        {
          subtitle: "Improvement & Analytics",
          items: [
            "Improve our services and user experience",
            "Analyze usage patterns and trends",
            "Develop new features and products",
            "Conduct research and surveys"
          ]
        },
        {
          subtitle: "Legal & Compliance",
          items: [
            "Comply with legal obligations",
            "Prevent money laundering and fraud",
            "Respond to law enforcement requests",
            "Protect our rights and property"
          ]
        }
      ]
    },
    {
      id: "data-sharing",
      title: "Data Sharing",
      icon: Users,
      color: "from-purple-500 to-purple-600",
      content: [
        {
          subtitle: "Service Providers",
          items: [
            "Payment processors and banks",
            "Cloud storage and hosting services",
            "Customer support platforms",
            "Analytics and monitoring tools"
          ]
        },
        {
          subtitle: "Legal Requirements",
          items: [
            "Government authorities when required by law",
            "Regulatory bodies for compliance",
            "Law enforcement with proper warrants",
            "Court orders and legal proceedings"
          ]
        },
        {
          subtitle: "Business Partners",
          items: [
            "Financial institutions for transactions",
            "Travel partners for booking services",
            "Crypto exchanges for trading",
            "Marketing partners (with consent)"
          ]
        }
      ]
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      color: "from-red-500 to-red-600",
      content: [
        {
          subtitle: "Encryption",
          items: [
            "End-to-end encryption for all data",
            "256-bit SSL encryption for transfers",
            "Encrypted storage at rest",
            "Secure key management systems"
          ]
        },
        {
          subtitle: "Access Controls",
          items: [
            "Multi-factor authentication",
            "Role-based access controls",
            "Regular security audits",
            "Employee background checks"
          ]
        },
        {
          subtitle: "Monitoring",
          items: [
            "24/7 security monitoring",
            "Fraud detection systems",
            "Anomaly detection algorithms",
            "Real-time threat response"
          ]
        }
      ]
    },
    {
      id: "your-rights",
      title: "Your Rights",
      icon: User,
      color: "from-yellow-500 to-yellow-600",
      content: [
        {
          subtitle: "Access & Control",
          items: [
            "Access your personal data",
            "Correct inaccurate information",
            "Delete your account and data",
            "Export your data in portable format"
          ]
        },
        {
          subtitle: "Consent Management",
          items: [
            "Withdraw consent at any time",
            "Opt-out of marketing communications",
            "Control data sharing preferences",
            "Manage privacy settings"
          ]
        },
        {
          subtitle: "Complaints",
          items: [
            "File privacy complaints",
            "Contact our Data Protection Officer",
            "Appeal data processing decisions",
            "Seek legal remedies if needed"
          ]
        }
      ]
    }
  ];

  const dataCategories = [
    {
      id: "personal",
      title: "Personal Information",
      icon: User,
      color: "from-blue-500 to-blue-600",
      description: "Basic personal details like name, email, phone",
      examples: ["Full name", "Email address", "Phone number", "Date of birth"],
      retention: "7 years after account closure"
    },
    {
      id: "financial",
      title: "Financial Data",
      icon: CreditCard,
      color: "from-green-500 to-green-600",
      description: "Banking and transaction information",
      examples: ["Account balances", "Transaction history", "Payment methods", "Transfer limits"],
      retention: "10 years for regulatory compliance"
    },
    {
      id: "location",
      title: "Location Data",
      icon: MapPin,
      color: "from-purple-500 to-purple-600",
      description: "Geographic location information",
      examples: ["IP addresses", "Device location", "Transaction locations", "Travel bookings"],
      retention: "2 years for fraud prevention"
    },
    {
      id: "behavioral",
      title: "Behavioral Data",
      icon: BarChart3,
      color: "from-yellow-500 to-yellow-600",
      description: "How you use our services",
      examples: ["App usage patterns", "Feature preferences", "Search history", "Click behavior"],
      retention: "3 years for service improvement"
    },
    {
      id: "biometric",
      title: "Biometric Data",
      icon: Fingerprint,
      color: "from-red-500 to-red-600",
      description: "Fingerprint and facial recognition data",
      examples: ["Fingerprint scans", "Face ID data", "Voice patterns", "Gait analysis"],
      retention: "Until account deletion"
    }
  ];

  const handlePrivacySettingChange = (key: string, value: any) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast({
      title: "Privacy Setting Updated",
      description: `Your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} setting has been updated.`,
    });
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const downloadPrivacyPolicy = () => {
    toast({
      title: "Download Started",
      description: "Privacy policy PDF is being downloaded...",
    });
  };

  const requestDataExport = () => {
    toast({
      title: "Data Export Requested",
      description: "We'll prepare your data export and email it to you within 30 days.",
    });
  };

  const deleteAccount = () => {
    toast({
      title: "Account Deletion",
      description: "This action cannot be undone. Please contact support for account deletion.",
      variant: "destructive"
    });
  };

  return (
    <DesktopLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Privacy & Data Protection</h1>
              <p className="text-gray-600 text-sm">Control your data and privacy settings</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            GDPR Compliant
          </Badge>
        </div>

        {/* Privacy Settings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="h-5 w-5 text-blue-600" />
              Privacy Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Profile & Visibility</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Eye className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Profile Visibility</p>
                        <p className="text-sm text-gray-500">Who can see your profile</p>
                      </div>
                    </div>
                    <select
                      value={privacySettings.profileVisibility}
                      onChange={(e) => handlePrivacySettingChange('profileVisibility', e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-1"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="friends">Friends Only</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Data Sharing</p>
                        <p className="text-sm text-gray-500">Share data with partners</p>
                      </div>
                    </div>
                    <Switch
                      checked={privacySettings.dataSharing}
                      onCheckedChange={(checked) => handlePrivacySettingChange('dataSharing', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Analytics Tracking</p>
                        <p className="text-sm text-gray-500">Help improve our services</p>
                      </div>
                    </div>
                    <Switch
                      checked={privacySettings.analyticsTracking}
                      onCheckedChange={(checked) => handlePrivacySettingChange('analyticsTracking', checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Communications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Mail className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Marketing Emails</p>
                        <p className="text-sm text-gray-500">Receive promotional content</p>
                      </div>
                    </div>
                    <Switch
                      checked={privacySettings.marketingEmails}
                      onCheckedChange={(checked) => handlePrivacySettingChange('marketingEmails', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <Globe className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Third-Party Sharing</p>
                        <p className="text-sm text-gray-500">Share with external services</p>
                      </div>
                    </div>
                    <Switch
                      checked={privacySettings.thirdPartySharing}
                      onCheckedChange={(checked) => handlePrivacySettingChange('thirdPartySharing', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Location Sharing</p>
                        <p className="text-sm text-gray-500">Share your location data</p>
                      </div>
                    </div>
                    <Switch
                      checked={privacySettings.locationSharing}
                      onCheckedChange={(checked) => handlePrivacySettingChange('locationSharing', checked)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Categories */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Data We Collect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataCategories.map((category) => (
              <Card key={category.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}>
                      <category.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{category.title}</h3>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm mb-2">Examples:</h4>
                      <ul className="space-y-1">
                        {category.examples.map((example, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-3 border-t">
                      <p className="text-xs text-gray-500">
                        <strong>Retention:</strong> {category.retention}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Privacy Policy Sections */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Privacy Policy</h2>
          {privacyPolicies.map((policy) => (
            <Card key={policy.id} className="border-0 shadow-lg">
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleSection(policy.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${policy.color} rounded-lg flex items-center justify-center`}>
                      <policy.icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">{policy.title}</CardTitle>
                  </div>
                  {expandedSection === policy.id ? (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </CardHeader>
              
              {expandedSection === policy.id && (
                <CardContent className="pt-0">
                  <div className="space-y-6">
                    {policy.content.map((section, index) => (
                      <div key={index} className="space-y-3">
                        <h4 className="font-semibold text-gray-900">{section.subtitle}</h4>
                        <ul className="space-y-2">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Data Rights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Download Policy</h3>
              <p className="text-sm text-gray-600 mb-4">Get a copy of our privacy policy</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={downloadPrivacyPolicy}
              >
                Download PDF
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Export Data</h3>
              <p className="text-sm text-gray-600 mb-4">Request a copy of your data</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={requestDataExport}
              >
                Request Export
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-red-50 to-red-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trash2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Delete Account</h3>
              <p className="text-sm text-gray-600 mb-4">Permanently delete your account</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-red-600 border-red-300 hover:bg-red-50"
                onClick={deleteAccount}
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-50 to-gray-100">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions About Privacy?</h3>
              <p className="text-gray-600 mb-6">
                Our Data Protection Officer is here to help with any privacy concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact DPO
                </Button>
                <Button 
                  variant="outline"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Privacy FAQ
                </Button>
                <Button 
                  variant="outline"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Legal Portal
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DesktopLayout>
  );
};

export default Privacy; 