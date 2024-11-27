'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X, ChevronLeft, ChevronRight, Settings, Power } from 'lucide-react';
import { DisconnectAccountDialog } from './disconnect-account-dialog';
import { ManageAccountDialog } from './manage-account-dialog';

interface Account {
  id: string;
  name: string;
  status: 'active' | 'disconnected';
}

interface BrokerAccountsTableProps {
  accounts: Account[];
  broker: string;
}

const ITEMS_PER_PAGE = 5;

export function BrokerAccountsTable({ accounts, broker }: BrokerAccountsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isDisconnectOpen, setIsDisconnectOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);

  const filteredAccounts = accounts.filter(account =>
    account.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAccounts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleAccounts = filteredAccounts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDisconnect = (account: Account) => {
    setSelectedAccount(account);
    setIsDisconnectOpen(true);
  };

  const handleManage = (account: Account) => {
    setSelectedAccount(account);
    setIsManageOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
            <Input
              placeholder="Search accounts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-zinc-800 border-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-zinc-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Account ID</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Account Name</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Broker</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Status</th>
                  <th className="text-right p-4 text-sm font-medium text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleAccounts.map((account) => (
                  <tr key={account.id} className="border-b border-zinc-800 last:border-0">
                    <td className="p-4 text-sm text-white">{account.id}</td>
                    <td className="p-4 text-sm text-white">{account.name}</td>
                    <td className="p-4 text-sm text-white capitalize">{broker}</td>
                    <td className="p-4 text-sm">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        account.status === 'active'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {account.status === 'active' ? 'Active' : 'Disconnected'}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleManage(account)}
                          className="h-8 px-2 text-zinc-400 hover:text-white"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDisconnect(account)}
                          className="h-8 px-2 text-zinc-400 hover:text-white"
                        >
                          <Power className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}

                {visibleAccounts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-sm text-zinc-400">
                      No accounts found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-800">
              <div className="text-sm text-zinc-400">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="bg-zinc-800 border-none text-white hover:bg-zinc-700"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="bg-zinc-800 border-none text-white hover:bg-zinc-700"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedAccount && (
        <>
          <DisconnectAccountDialog
            isOpen={isDisconnectOpen}
            onClose={() => setIsDisconnectOpen(false)}
            account={selectedAccount}
            broker={broker}
          />
          <ManageAccountDialog
            isOpen={isManageOpen}
            onClose={() => setIsManageOpen(false)}
            account={selectedAccount}
            broker={broker}
          />
        </>
      )}
    </>
  );
}