'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Users, X } from 'lucide-react';
import { RiskSettingsDialog } from './risk-settings-dialog';
import { CashExitDialog } from './cash-exit-dialog';
import { ProfitProtectionDialog } from './profit-protection-dialog';
import { FollowerAccountsList } from './follower-accounts-list';

const MOCK_ACCOUNTS = [
  'Sigma Algo 2024',
  'Sigma Algo Trading Dallion 2024',
  'Sigma Algo Trading Dallion 2025',
];

const MOCK_TICKERS = [
  'MNQ',
  'ES',
  'NQ',
  'RTY',
];

interface EditGroupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string | null;
}

export function EditGroupDialog({ isOpen, onClose, groupId }: EditGroupDialogProps) {
  const [isRiskDialogOpen, setIsRiskDialogOpen] = useState(false);
  const [isCashExitDialogOpen, setIsCashExitDialogOpen] = useState(false);
  const [isProfitProtectionDialogOpen, setIsProfitProtectionDialogOpen] = useState(false);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(true);

  const handleAccountToggle = (account: string) => {
    setSelectedAccounts(prev =>
      prev.includes(account)
        ? prev.filter(a => a !== account)
        : [...prev, account]
    );
  };

  const handleSave = async () => {
    try {
      // Implement save logic here
      console.log('Saving group changes...');
      onClose();
    } catch (error) {
      console.error('Failed to save group:', error);
    }
  };

  const handleDelete = async () => {
    try {
      // Implement delete logic here
      console.log('Deleting group...');
      onClose();
    } catch (error) {
      console.error('Failed to delete group:', error);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-none text-white">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-semibold">Group</DialogTitle>
                  <p className="text-sm text-zinc-400 mt-1">
                    Group name cannot be changed
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-zinc-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Name</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-400">Active</span>
                  <Switch
                    checked={isActive}
                    onCheckedChange={setIsActive}
                  />
                </div>
              </div>
              <Input
                placeholder="Enter group name"
                className="bg-zinc-800 border-none text-white"
                defaultValue="Sigma Algo 2024"
                disabled
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Leader Account</label>
              <Select defaultValue={MOCK_ACCOUNTS[0]}>
                <SelectTrigger className="bg-zinc-800 border-none text-white">
                  <SelectValue placeholder="Select leader account" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-none">
                  {MOCK_ACCOUNTS.map((account) => (
                    <SelectItem key={account} value={account}>
                      {account}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-zinc-500">Select the leader account for the group.</p>
            </div>

            <FollowerAccountsList
              accounts={MOCK_ACCOUNTS}
              selectedAccounts={selectedAccounts}
              onAccountToggle={handleAccountToggle}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">Ticker</label>
              <Select defaultValue={MOCK_TICKERS[0]}>
                <SelectTrigger className="bg-zinc-800 border-none text-white">
                  <SelectValue placeholder="Select ticker" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-none">
                  {MOCK_TICKERS.map((ticker) => (
                    <SelectItem key={ticker} value={ticker}>
                      {ticker}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-zinc-500">Enter the ticker for the group.</p>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Settings</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                  onClick={() => setIsRiskDialogOpen(true)}
                >
                  Risk
                </Button>
                <Button
                  variant="outline"
                  className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                  onClick={() => setIsCashExitDialogOpen(true)}
                >
                  Cash Exit
                </Button>
                <Button
                  variant="outline"
                  className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                  onClick={() => setIsProfitProtectionDialogOpen(true)}
                >
                  Profit Protection
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 bg-red-500/10 text-red-500 hover:bg-red-500/20 border-none"
                onClick={handleDelete}
              >
                Delete my group
              </Button>
              <Button
                className="flex-1 bg-blue-500 hover:bg-blue-600"
                onClick={handleSave}
              >
                Save Changes
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