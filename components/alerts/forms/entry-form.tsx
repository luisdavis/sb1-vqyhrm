'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { DollarSign, Plus } from 'lucide-react';
import { useState } from 'react';

const formSchema = z.object({
  platform: z.number(),
  acct_id: z.string(),
  acct_secret: z.string(),
  sym: z.string(),
  tf: z.string(),
  id: z.number(),
  dir: z.number(),
  risk_t: z.string(),
  risk_v: z.number(),
  ep: z.number(),
  tp1_abs: z.number(),
  tp2_abs: z.number(),
  tp3_abs: z.number(),
  tp1_on: z.boolean(),
  tp2_on: z.boolean(),
  tp3_on: z.boolean(),
  type: z.string(),
});

const PLATFORMS = [
  { value: 1, label: 'BrokerA' },
  { value: 2, label: 'BrokerB' },
];

const TIMEFRAMES = [
  { value: '1m', label: '1 Minute' },
  { value: '5m', label: '5 Minutes' },
  { value: '15m', label: '15 Minutes' },
  { value: '1h', label: '1 Hour' },
  { value: '4h', label: '4 Hours' },
  { value: '1d', label: 'Daily' },
];

const TRADE_TYPES = [
  { value: 'market', label: 'Market' },
  { value: 'limit', label: 'Limit' },
  { value: 'stop', label: 'Stop' },
];

interface EntryFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}

export function EntryForm({ onSubmit }: EntryFormProps) {
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: 1,
      acct_id: '',
      acct_secret: '',
      sym: '',
      tf: '1h',
      id: 0,
      dir: 1,
      risk_t: 'fixed',
      risk_v: 0,
      ep: 0,
      tp1_abs: 0,
      tp2_abs: 0,
      tp3_abs: 0,
      tp1_on: false,
      tp2_on: false,
      tp3_on: false,
      type: 'market',
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-zinc-800 border-none">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PLATFORMS.map((platform) => (
                        <SelectItem key={platform.value} value={platform.value.toString()}>
                          {platform.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sym"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symbol</FormLabel>
                  <FormControl>
                    <Input placeholder="EURUSD" className="bg-zinc-800 border-none" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="acct_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Account ID" className="bg-zinc-800 border-none" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acct_secret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Secret</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Account Secret"
                      className="bg-zinc-800 border-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="tf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timeframe</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-zinc-800 border-none">
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TIMEFRAMES.map((tf) => (
                        <SelectItem key={tf.value} value={tf.value}>
                          {tf.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dir"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Direction</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-zinc-800 border-none">
                        <SelectValue placeholder="Select direction" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Buy/Long</SelectItem>
                      <SelectItem value="-1">Sell/Short</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trade Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-zinc-800 border-none">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRADE_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="risk_t"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Risk Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-zinc-800 border-none">
                        <SelectValue placeholder="Select risk type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                      <SelectItem value="%">Percentage</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="risk_v"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Risk Value</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                      <Input
                        type="number"
                        placeholder="0"
                        className="bg-zinc-800 border-none pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Take Profit Levels</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tp1_abs"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Take Profit 1</FormLabel>
                      <FormField
                        control={form.control}
                        name="tp1_on"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                        <Input
                          type="number"
                          placeholder="0"
                          className="bg-zinc-800 border-none pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tp2_abs"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Take Profit 2</FormLabel>
                      <FormField
                        control={form.control}
                        name="tp2_on"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                        <Input
                          type="number"
                          placeholder="0"
                          className="bg-zinc-800 border-none pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tp3_abs"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Take Profit 3</FormLabel>
                      <FormField
                        control={form.control}
                        name="tp3_on"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                        <Input
                          type="number"
                          placeholder="0"
                          className="bg-zinc-800 border-none pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">Generate Alert</Button>
        </form>
      </Form>
    </>
  );
}