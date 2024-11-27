'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Link2 } from 'lucide-react';

const formSchema = z.object({
  broker: z.string(),
  accountId: z.string().min(1, 'Account ID is required'),
  apiKey: z.string().min(1, 'API Key is required'),
  apiSecret: z.string().min(1, 'API Secret is required'),
});

interface AddAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const BROKERS = [
  { id: 'tradovate', name: 'Tradovate', logo: '/images/brokers/tradovate.png' },
  { id: 'tradelocker', name: 'TradeLocker', logo: '/images/brokers/tradelocker.png' },
  { id: 'dxtrade', name: 'DX Trade', logo: '/images/brokers/dxtrade.png' },
];

export function AddAccountDialog({ isOpen, onClose }: AddAccountDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      broker: '',
      accountId: '',
      apiKey: '',
      apiSecret: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Implement API call to connect account
      console.log('Connecting account:', data);
      toast({
        title: 'Account Connected',
        description: 'Your trading account has been successfully connected.',
      });
      onClose();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to connect account. Please check your credentials and try again.',
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
              <Link2 className="h-5 w-5 text-blue-500" />
            </div>
            <DialogTitle>Connect Trading Account</DialogTitle>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="broker"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Broker</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-zinc-800 border-none">
                        <SelectValue placeholder="Select broker" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BROKERS.map((broker) => (
                        <SelectItem
                          key={broker.id}
                          value={broker.id}
                          className="flex items-center gap-2"
                        >
                          <img
                            src={broker.logo}
                            alt={broker.name}
                            className="h-4 w-4"
                          />
                          {broker.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your account ID"
                      className="bg-zinc-800 border-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your API key"
                      className="bg-zinc-800 border-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apiSecret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Secret</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your API secret"
                      className="bg-zinc-800 border-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? 'Connecting...' : 'Connect Account'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}