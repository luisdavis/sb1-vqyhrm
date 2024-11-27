'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowDownUp, Clock, DollarSign, Hash } from 'lucide-react';
import { useState } from 'react';
import { ClosePositionDialog } from './close-position-dialog';
import Link from 'next/link';

interface Trade {
  id: string;
  pair: string;
  tradeId: string;
  ticker: string;
  quantity: number;
  position: string;
  date: string;
  pnl: string;
  entryPrice?: number;
  currentPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  commission?: number;
  swap?: number;
  group?: string;
  account?: {
    id: string;
    name: string;
  };
  duration?: string;
}

interface TradeDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  trade: Trade;
}

export function TradeDetailsDialog({
  isOpen,
  onClose,
  trade,
}: TradeDetailsDialogProps) {
  const [isClosePositionOpen, setIsClosePositionOpen] = useState(false);
  const isProfit = trade.pnl.startsWith('+');

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
                <DialogTitle className="text-xl font-semibold">Trade Details</DialogTitle>
                <p className="text-sm text-zinc-400 mt-1">
                  {trade.pair} • {trade.position} • {trade.date}
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Trade Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-800 rounded-lg p-4">
                <div className="flex items-center gap-2 text-zinc-400 mb-2">
                  <Hash className="h-4 w-4" />
                  <span className="text-sm">Trade ID</span>
                </div>
                <p className="text-lg font-medium">{trade.tradeId}</p>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4">
                <div className="flex items-center gap-2 text-zinc-400 mb-2">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm">P&L</span>
                </div>
                <p className={`text-lg font-medium ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
                  {trade.pnl}
                </p>
              </div>
            </div>

            {/* Trade Details */}
            <div className="bg-zinc-800 rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Trade Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-zinc-400">Entry Price</p>
                  <p className="text-white">{trade.entryPrice || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Current Price</p>
                  <p className="text-white">{trade.currentPrice || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Stop Loss</p>
                  <p className="text-white">{trade.stopLoss || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Take Profit</p>
                  <p className="text-white">{trade.takeProfit || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Commission</p>
                  <p className="text-white">${trade.commission?.toFixed(2) || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Swap</p>
                  <p className="text-white">${trade.swap?.toFixed(2) || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-zinc-800 rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Additional Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-zinc-400">Group</p>
                  <p className="text-white">{trade.group || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Account</p>
                  {trade.account ? (
                    <Link 
                      href={`/accounts/${trade.account.id}?tab=trades&tradeId=${trade.id}`}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      onClick={onClose}
                    >
                      {trade.account.name}
                    </Link>
                  ) : (
                    <p className="text-white">N/A</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Duration</p>
                  <p className="text-white">{trade.duration || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Quantity</p>
                  <p className="text-white">{trade.quantity}</p>
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
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => setIsClosePositionOpen(true)}
              >
                Close Position
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ClosePositionDialog
        isOpen={isClosePositionOpen}
        onClose={() => setIsClosePositionOpen(false)}
        trade={trade}
      />
    </>
  );
}