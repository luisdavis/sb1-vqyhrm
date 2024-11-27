'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

interface ClosePositionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  trade: {
    id: string;
    pair: string;
    tradeId: string;
    quantity: number;
    position: string;
    currentPrice?: number;
  };
}

export function ClosePositionDialog({
  isOpen,
  onClose,
  trade,
}: ClosePositionDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = async () => {
    setIsLoading(true);
    try {
      // Implement API call to close position
      console.log('Closing position:', trade);
      
      toast({
        title: 'Position Closed',
        description: 'Your position has been closed successfully.',
      });
      onClose();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to close position. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <DialogTitle>Close Position</DialogTitle>
              <DialogDescription>
                Are you sure you want to close this position?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-zinc-800 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-zinc-400">Trade ID</span>
                <span className="text-sm text-white">{trade.tradeId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-zinc-400">Pair</span>
                <span className="text-sm text-white">{trade.pair}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-zinc-400">Position</span>
                <span className="text-sm text-white">{trade.position}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-zinc-400">Quantity</span>
                <span className="text-sm text-white">{trade.quantity}</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 text-yellow-500 rounded-lg p-4 text-sm">
            <p className="font-medium mb-2">Market Execution Warning</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Position will be closed at the current market price</li>
              <li>Final execution price may differ due to slippage</li>
              <li>This action cannot be undone</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 bg-transparent border-zinc-700 hover:bg-zinc-800"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleClose}
              disabled={isLoading}
            >
              {isLoading ? 'Closing...' : 'Close Position'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}