'use client';

import { useState } from 'react';
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

interface CancelSubscriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CancelSubscriptionDialog({ isOpen, onClose }: CancelSubscriptionDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      // Implement subscription cancellation API call here
      console.log('Cancelling subscription...');
      toast({
        title: 'Subscription Cancelled',
        description: 'Your subscription has been cancelled successfully.',
      });
      onClose();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to cancel subscription. Please try again.',
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
              <DialogTitle>Cancel Subscription</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel your subscription?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-zinc-800 rounded-lg p-4 text-sm text-zinc-400">
            <p>By cancelling your subscription:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>You will lose access to premium features</li>
              <li>Your subscription will remain active until the end of the current billing period</li>
              <li>You can reactivate your subscription at any time</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 bg-transparent border-zinc-700 hover:bg-zinc-800"
              onClick={onClose}
            >
              Keep Subscription
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleCancel}
              disabled={isLoading}
            >
              {isLoading ? 'Cancelling...' : 'Yes, Cancel'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}