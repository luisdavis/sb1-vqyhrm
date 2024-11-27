'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Receipt } from 'lucide-react';

interface BillingHistoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_BILLING_HISTORY = [
  {
    id: 1,
    date: '2024-01-01',
    amount: '$49.99',
    status: 'Paid',
    description: 'Premium Plan - Monthly',
  },
  {
    id: 2,
    date: '2023-12-01',
    amount: '$49.99',
    status: 'Paid',
    description: 'Premium Plan - Monthly',
  },
  {
    id: 3,
    date: '2023-11-01',
    amount: '$49.99',
    status: 'Paid',
    description: 'Premium Plan - Monthly',
  },
];

export function BillingHistoryDialog({ isOpen, onClose }: BillingHistoryDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Receipt className="h-5 w-5 text-blue-500" />
            </div>
            <DialogTitle>Billing History</DialogTitle>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {MOCK_BILLING_HISTORY.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-800 rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-white">{item.description}</p>
                  <p className="text-sm text-zinc-400">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">{item.amount}</p>
                  <p className="text-sm text-green-500">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}