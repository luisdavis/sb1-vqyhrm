'use client';

import { NotificationBell } from './notifications/notification-bell';
import { UserNav } from './user-nav';

export function TopBar() {
  return (
    <div className="fixed top-0 right-0 z-50 flex items-center gap-2 p-4">
      <NotificationBell />
      <UserNav />
    </div>
  );
}