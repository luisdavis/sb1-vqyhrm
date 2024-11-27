'use client';

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { FollowerAccountItem } from './follower-account-item';

interface FollowerAccountsListProps {
  accounts: string[];
  selectedAccounts: string[];
  onAccountToggle: (account: string) => void;
}

export function FollowerAccountsList({
  accounts,
  selectedAccounts,
  onAccountToggle,
}: FollowerAccountsListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAccounts = accounts.filter(account =>
    account.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Follower Accounts</label>
        <div className="relative w-[180px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search accounts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9 bg-zinc-800 border-none text-white text-sm"
          />
        </div>
      </div>
      
      <ScrollArea className="h-32 rounded-md border border-zinc-800 bg-zinc-900 p-2">
        {filteredAccounts.map((account) => (
          <FollowerAccountItem
            key={account}
            account={account}
            isChecked={selectedAccounts.includes(account)}
            onCheckChange={() => onAccountToggle(account)}
          />
        ))}
        {filteredAccounts.length === 0 && (
          <p className="text-sm text-zinc-400 p-2">No accounts found</p>
        )}
      </ScrollArea>
      <p className="text-xs text-zinc-500">Select the follower accounts for the group.</p>
    </div>
  );
}