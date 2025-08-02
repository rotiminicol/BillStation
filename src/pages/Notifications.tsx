import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  ArrowLeft, 
  Bell, 
  Check, 
  X, 
  Settings, 
  Mail, 
  Smartphone, 
  MessageCircle,
  CreditCard,
  Shield,
  Zap,
  Gift,
  Plane,
  Hotel,
  Car,
  Bitcoin,
  TrendingUp,
  Users,
  Clock,
  Star,
  AlertCircle,
  CheckCircle,
  Info
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DesktopLayout from "@/components/DesktopLayout";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import React from "react";

interface Notification {
  id: string;
  type: 'transaction' | 'security' | 'promotional' | 'system' | 'payment' | 'bills' | 'travel' | 'crypto';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  action?: string;
  actionUrl?: string;
}

const Notifications = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Notification preferences
  const [preferences, setPreferences] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    transactionAlerts: true,
    securityAlerts: true,
    promotionalNotifications: false,
    systemNotifications: true,
    quietHours: false,
    quietHoursStart: "22:00",
    quietHoursEnd: "08:00"
  });

  // Mock notifications data
  const mockNotifications: Notification[] = [
    {
      id: "1",
      type: "transaction",
      title: "Transfer Successful",
      message: "Your transfer of ₦50,000 to John Doe has been completed successfully.",
      timestamp: "2024-01-15T10:30:00Z",
      read: false,
      priority: "high",
      action: "View Details",
      actionUrl: "/transactions/1"
    },
    {
      id: "2",
      type: "security",
      title: "New Login Detected",
      message: "A new login was detected from Lagos, Nigeria. If this wasn't you, please secure your account.",
      timestamp: "2024-01-15T09:15:00Z",
      read: false,
      priority: "high",
      action: "Review Activity",
      actionUrl: "/account"
    },
    {
      id: "3",
      type: "payment",
      title: "Payment Received",
      message: "You received ₦25,000 from Jane Smith. Your balance has been updated.",
      timestamp: "2024-01-15T08:45:00Z",
      read: true,
      priority: "medium",
      action: "View Transaction",
      actionUrl: "/transactions/2"
    },
    {
      id: "4",
      type: "bills",
      title: "Airtime Purchase",
      message: "Your airtime purchase of ₦1,000 for 08012345678 was successful.",
      timestamp: "2024-01-14T16:20:00Z",
      read: true,
      priority: "low",
      action: "View Receipt",
      actionUrl: "/transactions/3"
    },
    {
      id: "5",
      type: "travel",
      title: "Flight Booking Confirmed",
      message: "Your flight booking from Lagos to London has been confirmed. Check your email for details.",
      timestamp: "2024-01-14T14:30:00Z",
      read: false,
      priority: "medium",
      action: "View Booking",
      actionUrl: "/flight-booking"
    },
    {
      id: "6",
      type: "crypto",
      title: "Bitcoin Purchase",
      message: "Your Bitcoin purchase of ₦450,000 has been processed. Your crypto wallet has been updated.",
      timestamp: "2024-01-14T12:15:00Z",
      read: true,
      priority: "medium",
      action: "View Portfolio",
      actionUrl: "/bitcoin-trading"
    },
    {
      id: "7",
      type: "promotional",
      title: "Special Offer",
      message: "Get 10% off on all gift card purchases this weekend. Use code WEEKEND10.",
      timestamp: "2024-01-14T10:00:00Z",
      read: false,
      priority: "low",
      action: "Shop Now",
      actionUrl: "/gift-card"
    },
    {
      id: "8",
      type: "system",
      title: "App Update Available",
      message: "A new version of the app is available. Update now for the latest features and security improvements.",
      timestamp: "2024-01-13T18:45:00Z",
      read: true,
      priority: "low",
      action: "Update Now",
      actionUrl: "#"
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'transaction':
      case 'payment':
        return CreditCard;
      case 'security':
        return Shield;
      case 'bills':
        return Zap;
      case 'travel':
        return Plane;
      case 'crypto':
        return Bitcoin;
      case 'promotional':
        return Gift;
      case 'system':
        return Settings;
      default:
        return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'transaction':
      case 'payment':
        return 'text-green-600 bg-green-50';
      case 'security':
        return 'text-red-600 bg-red-50';
      case 'bills':
        return 'text-yellow-600 bg-yellow-50';
      case 'travel':
        return 'text-blue-600 bg-blue-50';
      case 'crypto':
        return 'text-orange-600 bg-orange-50';
      case 'promotional':
        return 'text-purple-600 bg-purple-50';
      case 'system':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !notification.read) ||
                         (filter === 'read' && notification.read);
    const matchesType = !selectedType || notification.type === selectedType;
    return matchesFilter && matchesType;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
    toast({
      title: "Marked as Read",
      description: "Notification marked as read",
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast({
      title: "All Marked as Read",
      description: "All notifications marked as read",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast({
      title: "Notification Deleted",
      description: "Notification has been removed",
    });
  };

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
    toast({
      title: "Preference Updated",
      description: "Your notification preference has been updated",
    });
  };

  const handleNotificationAction = (notification: Notification) => {
    if (notification.actionUrl && notification.actionUrl !== '#') {
      navigate(notification.actionUrl);
    }
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  return (
    <DesktopLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/account')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Account
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Bell className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600 text-sm">{unreadCount} unread notifications</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Notification Preferences */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-gray-600" />
                  Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Push Notifications</Label>
                      <p className="text-xs text-gray-500">Receive push notifications</p>
                    </div>
                    <Switch
                      checked={preferences.pushNotifications}
                      onCheckedChange={(checked) => handlePreferenceChange('pushNotifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Email Notifications</Label>
                      <p className="text-xs text-gray-500">Receive email notifications</p>
                    </div>
                    <Switch
                      checked={preferences.emailNotifications}
                      onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">SMS Notifications</Label>
                      <p className="text-xs text-gray-500">Receive SMS notifications</p>
                    </div>
                    <Switch
                      checked={preferences.smsNotifications}
                      onCheckedChange={(checked) => handlePreferenceChange('smsNotifications', checked)}
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Transaction Alerts</Label>
                      <p className="text-xs text-gray-500">Get notified about transactions</p>
                    </div>
                    <Switch
                      checked={preferences.transactionAlerts}
                      onCheckedChange={(checked) => handlePreferenceChange('transactionAlerts', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Security Alerts</Label>
                      <p className="text-xs text-gray-500">Get notified about security events</p>
                    </div>
                    <Switch
                      checked={preferences.securityAlerts}
                      onCheckedChange={(checked) => handlePreferenceChange('securityAlerts', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Promotional Notifications</Label>
                      <p className="text-xs text-gray-500">Receive promotional content</p>
                    </div>
                    <Switch
                      checked={preferences.promotionalNotifications}
                      onCheckedChange={(checked) => handlePreferenceChange('promotionalNotifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">System Notifications</Label>
                      <p className="text-xs text-gray-500">Receive system updates</p>
                    </div>
                    <Switch
                      checked={preferences.systemNotifications}
                      onCheckedChange={(checked) => handlePreferenceChange('systemNotifications', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Notifications</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={filter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter('all')}
                    >
                      All
                    </Button>
                    <Button
                      variant={filter === 'unread' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter('unread')}
                    >
                      Unread
                    </Button>
                    <Button
                      variant={filter === 'read' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter('read')}
                    >
                      Read
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredNotifications.length === 0 ? (
                    <div className="text-center py-12">
                      <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
                      <p className="text-gray-600">You're all caught up!</p>
                    </div>
                  ) : (
                    filteredNotifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className={`cursor-pointer hover:shadow-md transition-all duration-300 ${
                          !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/50' : ''
                        }`}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(notification.type)}`}>
                                {React.createElement(getTypeIcon(notification.type), { className: "h-5 w-5" })}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                    <Badge className={`text-xs ${getPriorityColor(notification.priority)}`}>
                                      {notification.priority}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        markAsRead(notification.id);
                                      }}
                                    >
                                      <Check className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteNotification(notification.id);
                                      }}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                
                                <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {formatTimestamp(notification.timestamp)}
                                    </span>
                                  </div>
                                  
                                  {notification.action && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleNotificationAction(notification);
                                      }}
                                    >
                                      {notification.action}
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DesktopLayout>
  );
};

export default Notifications; 