'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OrderDetailsDialog } from './order-details-dialog';
import { CancelOrderDialog } from './cancel-order-dialog';
import { MOCK_ORDERS } from './mock-data';
import Link from 'next/link';
import { DateRangePicker } from '@/components/shared/date-range-picker';

interface OrdersTableProps {
  accountId?: string;
  highlightedOrderId?: string | null;
  highlightedRowRef?: React.RefObject<HTMLTableRowElement>;
}

const ITEMS_PER_PAGE = 3;

export function OrdersTable({ accountId, highlightedOrderId, highlightedRowRef }: OrdersTableProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<(typeof MOCK_ORDERS)[0] | null>(null);
  const [orderToCancel, setOrderToCancel] = useState<(typeof MOCK_ORDERS)[0] | null>(null);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // Filter orders based on active tab, accountId, and date range
  const filteredOrders = MOCK_ORDERS.filter(order => {
    if (accountId && order.account.id !== accountId) return false;
    if (activeTab === 'filled' && order.status !== 'filled') return false;
    if (activeTab === 'pending' && order.status !== 'pending') return false;
    
    if (dateRange.from && dateRange.to) {
      const orderDate = new Date(order.date);
      return orderDate >= dateRange.from && orderDate <= dateRange.to;
    }
    
    return true;
  });

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
              All orders
            </Button>
            <Button
              variant={activeTab === 'filled' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('filled')}
              className="text-sm"
            >
              Filled Orders
            </Button>
            <Button
              variant={activeTab === 'pending' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('pending')}
              className="text-sm"
            >
              Pending orders
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
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Order ID</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Ticker</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Quantity</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Position</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Date</th>
                <th className="text-right p-4 text-sm font-medium text-zinc-400">Status</th>
                <th className="text-right p-4 text-sm font-medium text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedOrder(order)}
                  ref={order.id === highlightedOrderId ? highlightedRowRef : null}
                >
                  <td className="p-4 text-sm text-white">{order.pair}</td>
                  <td className="p-4 text-sm text-white">{order.tradeId}</td>
                  <td className="p-4 text-sm text-white">{order.ticker}</td>
                  <td className="p-4 text-sm text-white">{order.quantity}</td>
                  <td className="p-4 text-sm text-white">{order.position}</td>
                  <td className="p-4 text-sm text-white">{order.date}</td>
                  <td className="p-4 text-sm text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'filled' ? 'bg-green-500/10 text-green-500' :
                      order.status === 'partially_filled' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-blue-500/10 text-blue-500'
                    }`}>
                      {order.status?.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-right">
                    {order.status === 'pending' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOrderToCancel(order);
                        }}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        Cancel
                      </Button>
                    )}
                  </td>
                </tr>
              ))}

              {visibleOrders.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-sm text-zinc-400">
                    No orders found
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

      {selectedOrder && (
        <OrderDetailsDialog
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          order={selectedOrder}
        />
      )}

      {orderToCancel && (
        <CancelOrderDialog
          isOpen={!!orderToCancel}
          onClose={() => setOrderToCancel(null)}
          order={orderToCancel}
        />
      )}
    </>
  );
}