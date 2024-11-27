'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, ExternalLink } from 'lucide-react';
import Link from 'next/link';

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

interface NotificationListProps {
  onMarkAllRead: () => void;
}

export function NotificationList({ onMarkAllRead }: NotificationListProps) {
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
    onMarkAllRead();
  };

  return (
    <div className="py-2">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
        <h2 className="text-lg font-semibold text-white">Notifications</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-zinc-400 hover:text-white"
          onClick={handleMarkAllAsRead}
        >
          <Check className="h-4 w-4 mr-2" />
          Mark all as read
        </Button>
      </div>

      <ScrollArea className="h-[300px]">
        <div className="divide-y divide-zinc-800">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-zinc-800/50 transition-colors ${
                notification.read ? 'opacity-60' : ''
              }`}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">
                    {notification.title}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {notification.description}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {notification.timestamp}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-zinc-400 hover:text-white"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  {notification.link && (
                    <Link href={notification.link}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-zinc-400 hover:text-white"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-zinc-800">
        <Link
          href="/notifications"
          className="block text-sm text-center text-blue-500 hover:text-blue-400"
        >
          See All Notifications
        </Link>
      </div>
    </div>
  );
}