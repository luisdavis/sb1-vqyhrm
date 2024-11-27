'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  platform: z.number(),
  acct_id: z.string(),
  acct_secret: z.string(),
  dir: z.number(),
});

interface CloseAllFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}

export function CloseAllForm({ onSubmit }: CloseAllFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: 1,
      acct_id: '',
      acct_secret: '',
      dir: 1,
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

        <Button type="submit" className="w-full">Generate Alert</Button>
      </form>
    </Form>
  );
}