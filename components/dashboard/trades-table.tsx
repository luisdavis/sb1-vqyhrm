'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { TradeDetailsDialog } from './trade-details-dialog';
import { MOCK_TRADES } from './mock-data';
import Link from 'next/link';
import { DateRangePicker } from '@/components/shared/date-range-picker';

interface TradesTableProps {
  accountId?: string;
  highlightedTradeId?: string | null;
  highlightedRowRef?: React.RefObject<HTMLTableRowElement>;
}

const ITEMS_PER_PAGE = 3;

export function TradesTable({ accountId, highlightedTradeId, highlightedRowRef }: TradesTableProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrade, setSelectedTrade] = useState<(typeof MOCK_TRADES)[0] | null>(null);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // Filter trades based on active tab, accountId, and date range
  const filteredTrades = MOCK_TRADES.filter(trade => {
    if (accountId && trade.account.id !== accountId) return false;
    if (activeTab === 'active' && trade.status !== 'active') return false;
    if (activeTab === 'archived' && trade.status !== 'archived') return false;
    
    if (dateRange.from && dateRange.to) {
      const tradeDate = new Date(trade.date);
      return tradeDate >= dateRange.from && tradeDate <= dateRange.to;
    }
    
    return true;
  });

  const totalPages = Math.ceil(filteredTrades.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleTrades = filteredTrades.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('all')}
              className="text-sm"
            >
              All trades
            </Button>
            <Button
              variant={activeTab === 'active' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('active')}
              className="text-sm"
            >
              Active trades
            </Button>
            <Button
              variant={activeTab === 'archived' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('archived')}
              className="text-sm"
            >
              Archived trades
            </Button>
          </div>

          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
          />
        </div>

        <div className="bg-zinc-900 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Pair</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Trade ID</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Ticker</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Quantity</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Position</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Date</th>
                <th className="text-right p-4 text-sm font-medium text-zinc-400">PNL</th>
              </tr>
            </thead>
            <tbody>
              {visibleTrades.map((trade) => (
                <tr 
                  key={trade.id} 
                  className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedTrade(trade)}
                  ref={trade.id === highlightedTradeId ? highlightedRowRef : null}
                >
                  <td className="p-4 text-sm text-white">{trade.pair}</td>
                  <td className="p-4 text-sm text-white">{trade.tradeId}</td>
                  <td className="p-4 text-sm text-white">{trade.ticker}</td>
                  <td className="p-4 text-sm text-white">{trade.quantity}</td>
                  <td className="p-4 text-sm text-white">{trade.position}</td>
                  <td className="p-4 text-sm text-white">{trade.date}</td>
                  <td className={`p-4 text-sm text-right ${trade.pnl.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {trade.pnl}
                  </td>
                </tr>
              ))}

              {visibleTrades.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-sm text-zinc-400">
                    No trades found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

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

      {selectedTrade && (
        <TradeDetailsDialog
          isOpen={!!selectedTrade}
          onClose={() => setSelectedTrade(null)}
          trade={selectedTrade}
        />
      )}
    </>
  );
}