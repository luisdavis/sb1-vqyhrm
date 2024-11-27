'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft } from 'lucide-react';

const RISK_MODES = [
  'Fixed Lot Size',
  'Percentage of Balance',
  'Risk per Trade',
];

const STOP_LOSS_OPTIONS = [
  'Copy Leader\'s Stop Loss',
  'Fixed Points',
  'ATR Multiple',
];

const TAKE_PROFIT_OPTIONS = [
  'Copy Leader\'s Take Profit',
  'Fixed Points',
  'Risk/Reward Ratio',
];

export function RiskSettingsDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-none text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-zinc-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-xl font-semibold">Risk Mode</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Select defaultValue="fixed">
              <SelectTrigger className="bg-zinc-800 border-none text-white">
                <SelectValue placeholder="Select risk mode" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-none">
                {RISK_MODES.map((mode) => (
                  <SelectItem key={mode} value={mode.toLowerCase().replace(/\s+/g, '-')}>
                    {mode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-zinc-400">Select the risk mode for the group.</p>
          </div>

          <div className="space-y-2">
            <Select defaultValue="copy-leader">
              <SelectTrigger className="bg-zinc-800 border-none text-white">
                <SelectValue placeholder="Select stop loss" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-none">
                {STOP_LOSS_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-zinc-400">Select the stop loss for the group.</p>
          </div>

          <div className="space-y-2">
            <Select defaultValue="copy-leader">
              <SelectTrigger className="bg-zinc-800 border-none text-white">
                <SelectValue placeholder="Select take profit" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-none">
                {TAKE_PROFIT_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-zinc-400">Select the take profit for the group.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Risk Per Trade</label>
            <Input
              type="number"
              defaultValue="0.5"
              className="bg-zinc-800 border-none text-white"
            />
            <p className="text-sm text-zinc-400">Set the risk per trade as a percentage or fixed amount.</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Max Trade Size</label>
              <span className="text-sm text-zinc-400">90%</span>
            </div>
            <Slider
              defaultValue={[90]}
              max={100}
              step={1}
              className="[&_[role=slider]]:bg-blue-500"
            />
            <p className="text-sm text-zinc-400">Cap the maximum size for each trade copied.</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Max Risk Exposure</label>
              <span className="text-sm text-zinc-400">100%</span>
            </div>
            <Slider
              defaultValue={[100]}
              max={100}
              step={1}
              className="[&_[role=slider]]:bg-blue-500"
            />
            <p className="text-sm text-zinc-400">Set an overall cap on risk exposure.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}