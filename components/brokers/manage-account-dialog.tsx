'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface Account {
  id: string;
  name: string;
  status: 'active' | 'disconnected';
}

interface ManageAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  account: Account;
  broker: string;
}

export function ManageAccountDialog({
  isOpen,
  onClose,
  account,
  broker,
}: ManageAccountDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    notifications: true,
    autoTrade: true,
    riskLimit: '1000',
    marginCall: '50',
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Implement API call to save account settings
      console.log('Saving account settings:', settings);
      toast({
        title: 'Settings Saved',
        description: 'Your account settings have been updated successfully.',
      });
      onClose();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
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
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Settings className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <DialogTitle>Account Settings</DialogTitle>
              <p className="text-sm text-zinc-400 mt-1">
                {account.name} ({account.id})
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Trade Notifications</Label>
                <p className="text-sm text-zinc-400">
                  Receive notifications for trades and orders
                </p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) =>
                  setSettings(prev => ({ ...prev, notifications: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Trading</Label>
                <p className="text-sm text-zinc-400">
                  Allow automatic trade execution
                </p>
              </div>
              <Switch
                checked={settings.autoTrade}
                onCheckedChange={(checked) =>
                  setSettings(prev => ({ ...prev, autoTrade: checked }))
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Risk Limit ($)</Label>
              <Input
                type="number"
                value={settings.riskLimit}
                onChange={(e) =>
                  setSettings(prev => ({ ...prev, riskLimit: e.target.value }))
                }
                className="bg-zinc-800 border-none"
              />
              <p className="text-sm text-zinc-400">
                Maximum risk amount per trade
              </p>
            </div>

            <div className="space-y-2">
              <Label>Margin Call Level (%)</Label>
              <Input
                type="number"
                value={settings.marginCall}
                onChange={(e) =>
                  setSettings(prev => ({ ...prev, marginCall: e.target.value }))
                }
                className="bg-zinc-800 border-none"
              />
              <p className="text-sm text-zinc-400">
                Margin call warning threshold
              </p>
            </div>
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
              className="flex-1 bg-blue-500 hover:bg-blue-600"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}