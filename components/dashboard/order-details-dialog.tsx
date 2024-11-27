'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowDownUp, ChevronDown, ChevronUp, Clock, DollarSign, Hash } from 'lucide-react';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { CancelOrderDialog } from './cancel-order-dialog';
import Link from 'next/link';

interface OrderFill {
  id: string;
  price: number;
  quantity: number;
  timestamp: string;
  executionId: string;
}

interface Order {
  id: string;
  pair: string;
  tradeId: string;
  ticker: string;
  quantity: number;
  position: string;
  date: string;
  pnl: string;
  orderType?: 'market' | 'limit' | 'stop';
  status?: 'pending' | 'filled' | 'cancelled' | 'partially_filled';
  limitPrice?: number;
  stopPrice?: number;
  timeInForce?: string;
  expiryDate?: string;
  group?: string;
  account?: {
    id: string;
    name: string;
  };
  fills?: OrderFill[];
  filledQuantity?: number;
  remainingQuantity?: number;
  averagePrice?: number;
}

interface OrderDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

export function OrderDetailsDialog({
  isOpen,
  onClose,
  order,
}: OrderDetailsDialogProps) {
  const [isFillsOpen, setIsFillsOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const isPartiallyFilled = order.status === 'partially_filled';
  const isFilled = order.status === 'filled';
  const isPending = order.status === 'pending';
  const hasOrderFills = order.fills && order.fills.length > 0;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <ArrowDownUp className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold">Order Details</DialogTitle>
                <p className="text-sm text-zinc-400 mt-1">
                  {order.pair} • {order.position} • {order.date}
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Order Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-800 rounded-lg p-4">
                <div className="flex items-center gap-2 text-zinc-400 mb-2">
                  <Hash className="h-4 w-4" />
                  <span className="text-sm">Order ID</span>
                </div>
                <p className="text-lg font-medium">{order.tradeId}</p>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4">
                <div className="flex items-center gap-2 text-zinc-400 mb-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Status</span>
                </div>
                <p className={`text-lg font-medium ${
                  isFilled ? 'text-green-500' : 
                  order.status === 'cancelled' ? 'text-red-500' : 
                  isPartiallyFilled ? 'text-yellow-500' :
                  'text-blue-500'
                }`}>
                  {order.status ? order.status.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ') : 'N/A'}
                </p>
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-zinc-800 rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Order Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-zinc-400">Order Type</p>
                  <p className="text-white capitalize">{order.orderType || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Total Quantity</p>
                  <p className="text-white">{order.quantity}</p>
                </div>
                {(isPartiallyFilled || isFilled) && (
                  <>
                    <div>
                      <p className="text-sm text-zinc-400">Filled Quantity</p>
                      <p className="text-white">{order.filledQuantity || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Remaining Quantity</p>
                      <p className="text-white">{order.remainingQuantity || 0}</p>
                    </div>
                  </>
                )}
                <div>
                  <p className="text-sm text-zinc-400">Limit Price</p>
                  <p className="text-white">{order.limitPrice || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Stop Price</p>
                  <p className="text-white">{order.stopPrice || 'N/A'}</p>
                </div>
                {(isPartiallyFilled || isFilled) && (
                  <div>
                    <p className="text-sm text-zinc-400">Average Fill Price</p>
                    <p className="text-white">{order.averagePrice || 'N/A'}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-zinc-400">Time in Force</p>
                  <p className="text-white">{order.timeInForce || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Expiry Date</p>
                  <p className="text-white">{order.expiryDate || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Order Fills */}
            {hasOrderFills && (
              <Collapsible
                open={isFillsOpen}
                onOpenChange={setIsFillsOpen}
                className="bg-zinc-800 rounded-lg"
              >
                <div className="p-4">
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full flex items-center justify-between p-0 hover:bg-transparent"
                    >
                      <h3 className="font-medium">Order Fills</h3>
                      {isFillsOpen ? (
                        <ChevronUp className="h-4 w-4 text-zinc-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-zinc-400" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent>
                  <div className="px-4 pb-4">
                    <div className="overflow-hidden rounded-lg border border-zinc-700">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-zinc-700 bg-zinc-800/50">
                            <th className="px-4 py-2 text-left text-sm font-medium text-zinc-400">Time</th>
                            <th className="px-4 py-2 text-right text-sm font-medium text-zinc-400">Price</th>
                            <th className="px-4 py-2 text-right text-sm font-medium text-zinc-400">Quantity</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-zinc-400">Execution ID</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.fills.map((fill) => (
                            <tr key={fill.id} className="border-b border-zinc-700 last:border-0">
                              <td className="px-4 py-2 text-sm text-white">{fill.timestamp}</td>
                              <td className="px-4 py-2 text-sm text-white text-right">{fill.price}</td>
                              <td className="px-4 py-2 text-sm text-white text-right">{fill.quantity}</td>
                              <td className="px-4 py-2 text-sm text-white">{fill.executionId}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Additional Information */}
            <div className="bg-zinc-800 rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Additional Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-zinc-400">Group</p>
                  <p className="text-white">{order.group || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Account</p>
                  {order.account ? (
                    <Link 
                      href={`/accounts/${order.account.id}?tab=orders&orderId=${order.id}`}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      onClick={onClose}
                    >
                      {order.account.name}
                    </Link>
                  ) : (
                    <p className="text-white">N/A</p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 bg-zinc-800 border-none hover:bg-zinc-700"
                onClick={onClose}
              >
                Close
              </Button>
              {isPending && (
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => setIsCancelDialogOpen(true)}
                >
                  Cancel Order
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {isPending && (
        <CancelOrderDialog
          isOpen={isCancelDialogOpen}
          onClose={() => setIsCancelDialogOpen(false)}
          order={order}
        />
      )}
    </>
  );
}