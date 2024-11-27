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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  account: z.string().min(1, 'Please select an account or enter a token'),
  token: z.string().optional(),
  multiplierType: z.string(),
  multiplierValue: z.number().min(0.01, 'Value must be greater than 0'),
});

const MOCK_ACCOUNTS = [
  { value: 'acc1', label: 'Main Trading Account' },
  { value: 'acc2', label: 'Demo Account' },
  { value: 'acc3', label: 'Test Account' },
];

const MULTIPLIER_TYPES = [
  { value: 'quantity', label: 'Quantity Multiplier' },
  { value: 'risk', label: 'Risk Multiplier' },
  { value: 'position', label: 'Position Size Multiplier' },
];

interface AddAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (account: any) => void;
}

export function AddAccountDialog({ isOpen, onClose, onAdd }: AddAccountDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: '',
      token: '',
      multiplierType: 'quantity',
      multiplierValue: 1,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const account = {
        id: Date.now().toString(),
        name: MOCK_ACCOUNTS.find(acc => acc.value === data.account)?.label || data.token,
        multiplierType: MULTIPLIER_TYPES.find(type => type.value === data.multiplierType)?.label,
        multiplierValue: data.multiplierValue,
      };
      
      onAdd(account);
      toast({
        title: 'Account Added',
        description: 'The account has been successfully added to the alert.',
      });
      onClose();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to add account. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Add Account</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between bg-zinc-800 border-none text-white hover:bg-zinc-700"
                      >
                        {field.value
                          ? MOCK_ACCOUNTS.find((account) => account.value === field.value)?.label
                          : "Select account..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 bg-zinc-800 border-zinc-700">
                      <Command>
                        <CommandInput placeholder="Search accounts..." />
                        <CommandEmpty>No account found.</CommandEmpty>
                        <CommandGroup>
                          {MOCK_ACCOUNTS.map((account) => (
                            <CommandItem
                              key={account.value}
                              value={account.value}
                              onSelect={() => {
                                form.setValue("account", account.value);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === account.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {account.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter account token"
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
              name="multiplierType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Multiplier Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-zinc-800 border-none">
                        <SelectValue placeholder="Select multiplier type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MULTIPLIER_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
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
              name="multiplierValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Multiplier Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      className="bg-zinc-800 border-none"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent border-zinc-700 hover:bg-zinc-800"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-blue-500 hover:bg-blue-600"
                disabled={isLoading}
              >
                {isLoading ? 'Adding...' : 'Add Account'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}