import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Bell, 
  CheckCircle,
  AlertTriangle,
  Info,
  Mail,
  MessageSquare,
  Smartphone,
  Settings,
  Trash2,
  Archive,
  Filter,
  Search,
  Clock,
  Star,
  Zap,
  Shield,
  CreditCard,
  User,
  Globe,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  EyeOff,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Plus,
  Minus,
  ExternalLink,
  Download,
  Upload,
  RefreshCw,
  X,
  Check,
  XCircle
} from "lucide-react";
import DesktopLayout from "@/components/DesktopLayout";
import { useToast } from "@/hooks/use-toast";

const Notifications = () => {
  const { toast } = useToast();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showRead, setShowRead] = useState(true);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    transactionAlerts: true,
    securityAlerts: true,
    marketingEmails: false,
    promotionalOffers: false,
    systemUpdates: true,
    accountUpdates: true,
    tierUpgrades: true
  });

  const notifications = [
    {
      id: "1",
      type: "transaction",
      title: "Transaction Successful",
      message: "Your transfer of ₦50,000 to John Doe has been completed successfully.",
      time: "2 minutes ago",
      read: false,
      priority: "high",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      id: "2",
      type: "security",
      title: "New Login Detected",
      message: "A new device logged into your account from Lagos, Nigeria.",
      time: "1 hour ago",
      read: false,
      priority: "high",
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      id: "3",
      type: "account",
      title: "Account Verification Complete",
      message: "Your account has been fully verified. You now have access to all features.",
      time: "3 hours ago",
      read: true,
      priority: "medium",
      icon: User,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      id: "4",
      type: "promotional",
      title: "Special Offer Available",
      message: "Get 50% off on your next airtime purchase. Limited time offer!",
      time: "5 hours ago",
      read: true,
      priority: "low",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      id: "5",
      type: "system",
      title: "System Maintenance",
      message: "Scheduled maintenance will occur tonight from 2-4 AM. Services may be temporarily unavailable.",
      time: "1 day ago",
      read: true,
      priority: "medium",
      icon: Settings,
      color: "text-gray-600",
      bgColor: "bg-gray-100"
    },
    {
      id: "6",
      type: "tier",
      title: "Tier Upgrade Available",
      message: "You're eligible for a Premium tier upgrade. Unlock higher limits and exclusive features.",
      time: "2 days ago",
      read: true,
      priority: "medium",
      icon: TrendingUp,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    }
  ];

  const notificationTypes = [
    {
      id: "all",
      label: "All Notifications",
      count: notifications.length,
      icon: Bell
    },
    {
      id: "transaction",
      label: "Transactions",
      count: notifications.filter(n => n.type === "transaction").length,
      icon: CreditCard
    },
    {
      id: "security",
      label: "Security",
      count: notifications.filter(n => n.type === "security").length,
      icon: Shield
    },
    {
      id: "account",
      label: "Account",
      count: notifications.filter(n => n.type === "account").length,
      icon: User
    },
    {
      id: "promotional",
      label: "Promotional",
      count: notifications.filter(n => n.type === "promotional").length,
      icon: Star
    },
    {
      id: "system",
      label: "System",
      count: notifications.filter(n => n.type === "system").length,
      icon: Settings
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = selectedFilter === "all" || notification.type === selectedFilter;
    const matchesReadStatus = showRead || !notification.read;
    return matchesFilter && matchesReadStatus;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationSettingChange = (key: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast({
      title: "Setting Updated",
      description: `Notification setting has been updated.`,
    });
  };

  const markAsRead = (id: string) => {
    toast({
      title: "Marked as Read",
      description: "Notification marked as read.",
    });
  };

  const markAllAsRead = () => {
    toast({
      title: "All Marked as Read",
      description: "All notifications have been marked as read.",
    });
  };

  const deleteNotification = (id: string) => {
    toast({
      title: "Notification Deleted",
      description: "Notification has been deleted.",
    });
  };

  const clearAll = () => {
    toast({
      title: "All Cleared",
      description: "All notifications have been cleared.",
    });
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 text-xs">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Medium</Badge>;
      case "low":
        return <Badge className="bg-gray-100 text-gray-800 text-xs">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <DesktopLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Bell className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 text-sm">Stay updated with your account activity</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <Badge className="bg-red-100 text-red-800">
                {unreadCount} unread
              </Badge>
            )}
            <Button 
              variant="outline" 
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearAll}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Notification Settings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="h-5 w-5 text-blue-600" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Notification Channels</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Mail className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationSettingChange('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">SMS Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => handleNotificationSettingChange('smsNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Smartphone className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Push Notifications</p>
                        <p className="text-sm text-gray-500">Receive push notifications</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => handleNotificationSettingChange('pushNotifications', checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Notification Types</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Transaction Alerts</p>
                        <p className="text-sm text-gray-500">Get notified about transactions</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.transactionAlerts}
                      onCheckedChange={(checked) => handleNotificationSettingChange('transactionAlerts', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <Shield className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Security Alerts</p>
                        <p className="text-sm text-gray-500">Get notified about security events</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.securityAlerts}
                      onCheckedChange={(checked) => handleNotificationSettingChange('securityAlerts', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Star className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Marketing Emails</p>
                        <p className="text-sm text-gray-500">Receive promotional content</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={(checked) => handleNotificationSettingChange('marketingEmails', checked)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {notificationTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedFilter === type.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(type.id)}
                className="flex items-center gap-2"
              >
                <type.icon className="h-4 w-4" />
                {type.label}
                <Badge variant="secondary" className="ml-1">
                  {type.count}
                </Badge>
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Switch
                checked={showRead}
                onCheckedChange={setShowRead}
              />
              <span className="text-sm text-gray-600">Show read</span>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Notifications</h3>
                <p className="text-gray-600">You're all caught up! No new notifications to show.</p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`border-0 shadow-lg transition-all duration-200 hover:shadow-xl ${
                  !notification.read ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${notification.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <notification.icon className={`h-5 w-5 ${notification.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                            {getPriorityBadge(notification.priority)}
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{notification.message}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {notification.time}
                            </span>
                            <span className="capitalize">{notification.type}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Notification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{notifications.length}</h3>
              <p className="text-sm text-gray-600">Total Notifications</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-red-50 to-red-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{unreadCount}</h3>
              <p className="text-sm text-gray-600">Unread</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{notifications.filter(n => n.read).length}</h3>
              <p className="text-sm text-gray-600">Read</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{notifications.filter(n => n.priority === 'high').length}</h3>
              <p className="text-sm text-gray-600">High Priority</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DesktopLayout>
  );
};

export default Notifications; 