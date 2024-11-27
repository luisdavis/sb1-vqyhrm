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

interface CancelOrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  order: {
    id: string;
    pair: string;
    tradeId: string;
    quantity: number;
    position: string;
  };
}

export function CancelOrderDialog({
  isOpen,
  onClose,
  order,
}: CancelOrderDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      // Implement API call to cancel order
      console.log('Cancelling order:', order);
      
      toast({
        title: 'Order Cancelled',
        description: 'Your order has been cancelled successfully.',
      });
      onClose();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to cancel order. Please try again.',
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
              <DialogTitle>Cancel Order</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel this order?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-zinc-800 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-zinc-400">Order ID</span>
                <span className="text-sm text-white">{order.tradeId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-zinc-400">Pair</span>
                <span className="text-sm text-white">{order.pair}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-zinc-400">Position</span>
                <span className="text-sm text-white">{order.position}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-zinc-400">Quantity</span>
                <span className="text-sm text-white">{order.quantity}</span>
              </div>
            </div>
          </div>

          <div className="bg-red-500/10 text-red-500 rounded-lg p-4 text-sm">
            <p>This action will:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Cancel the pending order immediately</li>
              <li>Remove the order from your active orders list</li>
              <li>Release any reserved margin</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 bg-transparent border-zinc-700 hover:bg-zinc-800"
              onClick={onClose}
            >
              Keep Order
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleCancel}
              disabled={isLoading}
            >
              {isLoading ? 'Cancelling...' : 'Cancel Order'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}