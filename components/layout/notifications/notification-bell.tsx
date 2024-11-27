'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NotificationList } from './notification-list';
import { Button } from '@/components/ui/button';

export function NotificationBell() {
  const [hasUnread, setHasUnread] = useState(true);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative p-2 rounded-full hover:bg-zinc-800"
        >
          <Bell className="h-5 w-5 text-zinc-400" />
          {hasUnread && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[380px] bg-zinc-900 border-zinc-800 p-0"
      >
        <NotificationList onMarkAllRead={() => setHasUnread(false)} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}