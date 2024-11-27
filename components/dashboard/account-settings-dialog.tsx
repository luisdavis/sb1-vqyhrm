'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pencil, Users } from 'lucide-react';
import { RiskSettingsDialog } from './risk-settings-dialog';
import { CashExitDialog } from './cash-exit-dialog';
import { ProfitProtectionDialog } from './profit-protection-dialog';

interface AccountSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  accountName: string;
}

export function AccountSettingsDialog({
  isOpen,
  onClose,
  accountName,
}: AccountSettingsDialogProps) {
  const [isRiskDialogOpen, setIsRiskDialogOpen] = useState(false);
  const [isCashExitDialogOpen, setIsCashExitDialogOpen] = useState(false);
  const [isProfitProtectionDialogOpen, setIsProfitProtectionDialogOpen] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-none text-white">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold">Account Settings</DialogTitle>
                <p className="text-sm text-zinc-400 mt-1">{accountName}</p>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            <p className="text-sm text-zinc-400">
              Configure individual settings for this follower account. These settings will override the group settings.
            </p>

            <div className="grid grid-cols-1 gap-3">
              <Button 
                variant="outline" 
                className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 justify-start"
                onClick={() => setIsRiskDialogOpen(true)}
              >
                Risk Settings
              </Button>
              <Button 
                variant="outline" 
                className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 justify-start"
                onClick={() => setIsCashExitDialogOpen(true)}
              >
                Cash Exit
              </Button>
              <Button 
                variant="outline" 
                className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 justify-start"
                onClick={() => setIsProfitProtectionDialogOpen(true)}
              >
                Profit Protection
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <RiskSettingsDialog 
        isOpen={isRiskDialogOpen}
        onClose={() => setIsRiskDialogOpen(false)}
      />

      <CashExitDialog
        isOpen={isCashExitDialogOpen}
        onClose={() => setIsCashExitDialogOpen(false)}
      />

      <ProfitProtectionDialog
        isOpen={isProfitProtectionDialogOpen}
        onClose={() => setIsProfitProtectionDialogOpen(false)}
      />
    </>
  );
}