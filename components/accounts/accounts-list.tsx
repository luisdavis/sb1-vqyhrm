'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Pencil } from 'lucide-react';
import { RenameAccountDialog } from './rename-account-dialog';

interface Account {
  id: string;
  name: string;
  broker: string;
  type: 'live' | 'demo';
  status: 'active' | 'inactive' | 'suspended';
  balance: number;
  equity: number;
  margin: number;
  profitLoss: number;
  trades: number;
}

const MOCK_ACCOUNTS: Account[] = [
  {
    id: '1',
    name: 'Main Trading Account',
    broker: 'Tradovate',
    type: 'live',
    status: 'active',
    balance: 10000,
    equity: 10500,
    margin: 2000,
    profitLoss: 500,
    trades: 25,
  },
  {
    id: '2',
    name: 'Demo Account',
    broker: 'DX Trade',
    type: 'demo',
    status: 'active',
    balance: 50000,
    equity: 48000,
    margin: 5000,
    profitLoss: -2000,
    trades: 15,
  },
  // Add more mock accounts as needed
];

const ITEMS_PER_PAGE = 5;

interface AccountsListProps {
  filters: {
    broker: string;
    status: string;
    type: string;
  };
}

export function AccountsList({ filters }: AccountsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);

  const filteredAccounts = MOCK_ACCOUNTS.filter(account => {
    if (filters.broker !== 'all' && account.broker.toLowerCase() !== filters.broker) return false;
    if (filters.status !== 'all' && account.status !== filters.status) return false;
    if (filters.type !== 'all' && account.type !== filters.type) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredAccounts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleAccounts = filteredAccounts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <div className="bg-zinc-900 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Account Name</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Broker</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Type</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Status</th>
                <th className="text-right p-4 text-sm font-medium text-zinc-400">Balance</th>
                <th className="text-right p-4 text-sm font-medium text-zinc-400">Equity</th>
                <th className="text-right p-4 text-sm font-medium text-zinc-400">P/L</th>
                <th className="text-right p-4 text-sm font-medium text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleAccounts.map((account) => (
                <tr key={account.id} className="border-b border-zinc-800 last:border-0">
                  <td className="p-4">
                    <Link 
                      href={`/accounts/${account.id}`}
                      className="text-sm text-white hover:text-blue-400 transition-colors"
                    >
                      {account.name}
                    </Link>
                  </td>
                  <td className="p-4 text-sm text-white">{account.broker}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      account.type === 'live'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {account.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      account.status === 'active'
                        ? 'bg-green-500/10 text-green-500'
                        : account.status === 'inactive'
                        ? 'bg-yellow-500/10 text-yellow-500'
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      {account.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-right text-white">
                    ${account.balance.toLocaleString()}
                  </td>
                  <td className="p-4 text-sm text-right text-white">
                    ${account.equity.toLocaleString()}
                  </td>
                  <td className={`p-4 text-sm text-right ${
                    account.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {account.profitLoss >= 0 ? '+' : ''}${account.profitLoss.toLocaleString()}
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedAccount(account);
                        setIsRenameDialogOpen(true);
                      }}
                      className="h-8 px-2 text-zinc-400 hover:text-white"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}

              {visibleAccounts.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-sm text-zinc-400">
                    No accounts found matching the selected filters
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

      <RenameAccountDialog
        isOpen={isRenameDialogOpen}
        onClose={() => {
          setIsRenameDialogOpen(false);
          setSelectedAccount(null);
        }}
        account={selectedAccount}
      />
    </>
  );
}