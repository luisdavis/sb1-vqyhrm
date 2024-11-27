'use client';

import { Search, Bell } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { UserNav } from './user-nav';

export function DashboardHeader() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(' ')[0] || 'User';

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <h1 className="text-xl text-white">Welcome back, {firstName}.</h1>
        </div>
        <p className="text-sm text-zinc-400">SigmaAlgo Autoterminal & Copytrader</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Type Search..."
            className="w-64 rounded-md bg-zinc-900 border-zinc-800 pl-9 h-9 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <button className="relative p-2 rounded-full hover:bg-zinc-800">
          <Bell className="h-5 w-5 text-zinc-400" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500" />
        </button>
        
        <UserNav />
      </div>
    </div>
  );
}