'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign } from 'lucide-react';

const formSchema = z.object({
  platform: z.number(),
  acct_id: z.string(),
  acct_secret: z.string(),
  id: z.number(),
  dir: z.number(),
  sl_abs: z.number(),
});

interface StopLossUpdateFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}

export function StopLossUpdateForm({ onSubmit }: StopLossUpdateFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: 1,
      acct_id: '',
      acct_secret: '',
      id: 0,
      dir: 1,
      sl_abs: 0,
    },
  });

  return (
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
                    <SelectItem value="1">BrokerA</SelectItem>
                    <SelectItem value="2">BrokerB</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trade ID</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Trade ID"
                    className="bg-zinc-800 border-none"
                    {...field}
                  />
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

        <div className="grid grid-cols-2 gap-4">
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
            name="sl_abs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Stop Loss</FormLabel>
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

        <Button type="submit" className="w-full">Generate Alert</Button>
      </form>
    </Form>
  );
}