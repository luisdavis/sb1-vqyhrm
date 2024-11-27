'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';
import { BillingHistoryDialog } from './billing-history-dialog';
import { PlanDetailsDialog } from './plan-details-dialog';
import { CancelSubscriptionDialog } from './cancel-subscription-dialog';

interface SubscriptionInfo {
  status: 'active' | 'expired' | 'free';
  planName?: string;
  renewalDate?: string;
}

export function SubscriptionSection() {
  const [subscription] = useState<SubscriptionInfo>({
    status: 'active',
    planName: 'Premium Plan',
    renewalDate: '2024-12-31',
  });

  const [isBillingHistoryOpen, setBillingHistoryOpen] = useState(false);
  const [isPlanDetailsOpen, setPlanDetailsOpen] = useState(false);
  const [isCancelDialogOpen, setCancelDialogOpen] = useState(false);

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <CreditCard className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <CardTitle className="text-xl text-white">Subscription</CardTitle>
            <CardDescription>Manage your subscription and billing</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-zinc-800 rounded-lg p-6">
          {subscription.status === 'active' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-500">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Active Subscription</span>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-white">{subscription.planName}</h3>
                <p className="text-sm text-zinc-400">
                  Your subscription will renew on {subscription.renewalDate}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className="bg-zinc-700 border-none hover:bg-zinc-600"
                  onClick={() => setPlanDetailsOpen(true)}
                >
                  View Plan Details
                </Button>
                <Button
                  variant="outline"
                  className="bg-zinc-700 border-none hover:bg-zinc-600"
                  onClick={() => setBillingHistoryOpen(true)}
                >
                  Billing History
                </Button>
                <Button
                  variant="outline"
                  className="bg-red-500/10 text-red-500 border-none hover:bg-red-500/20"
                  onClick={() => setCancelDialogOpen(true)}
                >
                  Cancel Subscription
                </Button>
              </div>
            </div>
          )}

          {subscription.status === 'expired' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">Subscription Expired</span>
              </div>
              
              <p className="text-sm text-zinc-400">
                Your subscription has expired. Renew now to continue accessing premium features.
              </p>

              <Button className="bg-blue-500 hover:bg-blue-600">
                Renew Subscription
              </Button>
            </div>
          )}

          {subscription.status === 'free' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-500">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Free Plan</span>
              </div>
              
              <p className="text-sm text-zinc-400">
                You are currently on the Free Plan. Upgrade to access premium features.
              </p>

              <Button className="bg-blue-500 hover:bg-blue-600">
                Upgrade to Premium
              </Button>
            </div>
          )}
        </div>

        <div className="bg-zinc-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Plan Features</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-zinc-400">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Feature 1 description</span>
            </li>
            <li className="flex items-center gap-2 text-zinc-400">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Feature 2 description</span>
            </li>
            <li className="flex items-center gap-2 text-zinc-400">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Feature 3 description</span>
            </li>
          </ul>
        </div>
      </CardContent>

      <BillingHistoryDialog
        isOpen={isBillingHistoryOpen}
        onClose={() => setBillingHistoryOpen(false)}
      />

      <PlanDetailsDialog
        isOpen={isPlanDetailsOpen}
        onClose={() => setPlanDetailsOpen(false)}
      />

      <CancelSubscriptionDialog
        isOpen={isCancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
      />
    </Card>
  );
}