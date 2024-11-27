'use client';

import { Card } from '@/components/ui/card';
import { LineChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface AccountDetailsProps {
  accountId: string;
}

const MOCK_ACCOUNT = {
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
  marginLevel: 525,
  freeMargin: 8500,
};

export function AccountDetails({ accountId }: AccountDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-zinc-900 border-zinc-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-400">Balance</p>
            <p className="text-xl font-semibold text-white mt-1">
              ${MOCK_ACCOUNT.balance.toLocaleString()}
            </p>
          </div>
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <LineChart className="h-5 w-5 text-blue-500" />
          </div>
        </div>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-400">Equity</p>
            <p className="text-xl font-semibold text-white mt-1">
              ${MOCK_ACCOUNT.equity.toLocaleString()}
            </p>
          </div>
          <div className={`p-2 rounded-lg ${
            MOCK_ACCOUNT.equity >= MOCK_ACCOUNT.balance
              ? 'bg-green-500/20'
              : 'bg-red-500/20'
          }`}>
            {MOCK_ACCOUNT.equity >= MOCK_ACCOUNT.balance ? (
              <ArrowUpRight className="h-5 w-5 text-green-500" />
            ) : (
              <ArrowDownRight className="h-5 w-5 text-red-500" />
            )}
          </div>
        </div>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-400">Margin Level</p>
            <p className="text-xl font-semibold text-white mt-1">
              {MOCK_ACCOUNT.marginLevel}%
            </p>
          </div>
          <div className="p-2 bg-zinc-800 rounded-lg">
            <p className="text-sm font-medium text-zinc-400">Used</p>
            <p className="text-sm font-medium text-white">${MOCK_ACCOUNT.margin}</p>
          </div>
        </div>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-400">Free Margin</p>
            <p className="text-xl font-semibold text-white mt-1">
              ${MOCK_ACCOUNT.freeMargin.toLocaleString()}
            </p>
          </div>
          <div className="p-2 bg-zinc-800 rounded-lg">
            <p className="text-sm font-medium text-zinc-400">Available</p>
            <p className="text-sm font-medium text-white">85%</p>
          </div>
        </div>
      </Card>
    </div>
  );
}