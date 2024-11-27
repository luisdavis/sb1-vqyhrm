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

interface Account {
  id: string;
  name: string;
  status: 'active' | 'disconnected';
}

interface DisconnectAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  account: Account;
  broker: string;
}

export function DisconnectAccountDialog({
  isOpen,
  onClose,
  account,
  broker,
}: DisconnectAccountDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDisconnect = async () => {
    setIsLoading(true);
    try {
      // Implement API call to disconnect account
      console.log('Disconnecting account:', account);
      toast({
        title: 'Account Disconnected',
        description: 'Your trading account has been successfully disconnected.',
      });
      onClose();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to disconnect account. Please try again.',
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
              <DialogTitle>Disconnect Account</DialogTitle>
              <DialogDescription>
                Are you sure you want to disconnect this account?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-zinc-800 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-zinc-400">Account ID</span>
                <span className="text-sm text-white">{account.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-zinc-400">Account Name</span>
                <span className="text-sm text-white">{account.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-zinc-400">Broker</span>
                <span className="text-sm text-white capitalize">{broker}</span>
              </div>
            </div>
          </div>

          <div className="bg-red-500/10 text-red-500 rounded-lg p-4 text-sm">
            <p>This action will:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Remove the account from your Sigma Algo dashboard</li>
              <li>Stop all active trading operations for this account</li>
              <li>Revoke API access permissions</li>
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
              onClick={handleDisconnect}
              disabled={isLoading}
            >
              {isLoading ? 'Disconnecting...' : 'Disconnect Account'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}