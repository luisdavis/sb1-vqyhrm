'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AddAccountDialog } from './add-account-dialog';

interface Account {
  id: string;
  name: string;
  multiplierType: string;
  multiplierValue: number;
}

export function AdditionalAccounts() {
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const handleAddAccount = (account: Account) => {
    setAccounts(prev => [...prev, account]);
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-white">Additional Accounts</h3>
          <p className="text-sm text-zinc-400">Add more accounts to copy this alert</p>
        </div>
        <Button
          onClick={() => setIsAddAccountOpen(true)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Account
        </Button>
      </div>

      <div className="space-y-4">
        {accounts.length === 0 ? (
          <div className="text-sm text-zinc-500 text-center py-8 bg-zinc-800/50 rounded-lg">
            No additional accounts added yet
          </div>
        ) : (
          accounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg"
            >
              <div>
                <p className="font-medium text-white">{account.name}</p>
                <p className="text-sm text-zinc-400">
                  {account.multiplierType}: {account.multiplierValue}x
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                onClick={() => setAccounts(prev => prev.filter(a => a.id !== account.id))}
              >
                Remove
              </Button>
            </div>
          ))
        )}
      </div>

      <AddAccountDialog 
        isOpen={isAddAccountOpen}
        onClose={() => setIsAddAccountOpen(false)}
        onAdd={handleAddAccount}
      />
    </div>
  );
}