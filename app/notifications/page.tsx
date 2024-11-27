'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Bell } from 'lucide-react';
import { AppLayout } from '@/components/layout/app-layout';

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'New Trade Alert',
    description: 'EURUSD position opened at 1.0923',
    timestamp: '5 minutes ago',
    read: false,
    link: '/dashboard',
  },
  {
    id: '2',
    title: 'Account Connected',
    description: 'Your Tradovate account has been successfully connected',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    title: 'Take Profit Hit',
    description: 'BTCUSD take profit target reached at $45,230',
    timestamp: '2 hours ago',
    read: true,
    link: '/dashboard',
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Bell className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Notifications</h1>
              <p className="text-sm text-zinc-400">Stay updated with your trading activities</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            className="bg-zinc-800 border-none text-white hover:bg-zinc-700"
            onClick={handleMarkAllAsRead}
          >
            <Check className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-zinc-900 rounded-lg p-4 ${
                notification.read ? 'opacity-60' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="font-medium text-white">{notification.title}</p>
                  <p className="text-sm text-zinc-400">{notification.description}</p>
                  <p className="text-xs text-zinc-500">{notification.timestamp}</p>
                </div>
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-zinc-400 hover:text-white"
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Mark as read
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}