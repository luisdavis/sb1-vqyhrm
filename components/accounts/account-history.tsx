'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AccountHistoryProps {
  accountId: string;
}

const MOCK_HISTORY = [
  {
    id: '1',
    type: 'trade',
    symbol: 'EURUSD',
    action: 'Buy',
    amount: 1000,
    price: 1.0923,
    timestamp: '2024-01-15 14:30:00',
    status: 'completed',
  },
  {
    id: '2',
    type: 'deposit',
    amount: 5000,
    timestamp: '2024-01-14 10:15:00',
    status: 'completed',
  },
  {
    id: '3',
    type: 'trade',
    symbol: 'BTCUSD',
    action: 'Sell',
    amount: 0.5,
    price: 45230,
    timestamp: '2024-01-13 16:45:00',
    status: 'completed',
  },
];

const ITEMS_PER_PAGE = 10;

export function AccountHistory({ accountId }: AccountHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(MOCK_HISTORY.length / ITEMS_PER_PAGE);

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left p-4 text-sm font-medium text-zinc-400">Type</th>
              <th className="text-left p-4 text-sm font-medium text-zinc-400">Details</th>
              <th className="text-left p-4 text-sm font-medium text-zinc-400">Amount</th>
              <th className="text-left p-4 text-sm font-medium text-zinc-400">Date</th>
              <th className="text-left p-4 text-sm font-medium text-zinc-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_HISTORY.map((item) => (
              <tr key={item.id} className="border-b border-zinc-800 last:border-0">
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    item.type === 'trade'
                      ? 'bg-blue-500/10 text-blue-500'
                      : 'bg-green-500/10 text-green-500'
                  }`}>
                    {item.type.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-sm text-white">
                  {item.type === 'trade' ? (
                    <>
                      {item.action} {item.symbol} @ {item.price}
                    </>
                  ) : (
                    'Account Deposit'
                  )}
                </td>
                <td className="p-4 text-sm text-white">
                  ${item.amount.toLocaleString()}
                </td>
                <td className="p-4 text-sm text-white">
                  {item.timestamp}
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'completed'
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {item.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
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
    </Card>
  );
}