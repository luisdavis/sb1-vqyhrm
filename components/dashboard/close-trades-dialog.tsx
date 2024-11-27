'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function CloseTradesDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const handleConfirm = async () => {
    try {
      // Implement the API call to close all trades
      console.log('Closing all trades...');
      onClose();
    } catch (error) {
      console.error('Failed to close trades:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-none text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Are you sure?</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-zinc-400">
            You are trying to close all open trades across all groups.
            This action cannot be undone.
          </p>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 bg-transparent border-zinc-700 text-white hover:bg-zinc-800 hover:text-white"
              onClick={onClose}
            >
              No! Nevermind
            </Button>
            <Button
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
              onClick={handleConfirm}
            >
              Yes, close all trades
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}