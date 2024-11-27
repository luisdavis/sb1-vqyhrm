'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

interface AccountSettingsProps {
  accountId: string;
}

export function AccountSettings({ accountId }: AccountSettingsProps) {
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
    <Card className="bg-zinc-900 border-zinc-800 p-6 space-y-6">
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

      <Button
        className="w-full bg-blue-500 hover:bg-blue-600"
        onClick={handleSave}
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save Changes'}
      </Button>
    </Card>
  );
}