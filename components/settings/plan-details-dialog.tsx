'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircle2, Package } from 'lucide-react';

interface PlanDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const PLAN_FEATURES = [
  'Access to all premium features',
  'Unlimited trading groups',
  'Advanced risk management',
  'Priority support',
  'Real-time market data',
  'Custom alerts and notifications',
  'Detailed analytics and reporting',
  'API access',
];

export function PlanDetailsDialog({ isOpen, onClose }: PlanDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Package className="h-5 w-5 text-blue-500" />
            </div>
            <DialogTitle>Premium Plan Details</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">$49.99/month</h3>
            <p className="text-zinc-400">
              Get access to all premium features and take your trading to the next level.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Included Features</h4>
            <ul className="space-y-3">
              {PLAN_FEATURES.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}