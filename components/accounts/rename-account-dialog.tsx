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
import { useToast } from '@/components/ui/use-toast';
import { Pencil } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, 'Account name is required'),
});

interface Account {
  id: string;
  name: string;
  broker: string;
}

interface RenameAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  account?: Account | null;
}

export function RenameAccountDialog({ isOpen, onClose, account }: RenameAccountDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: account?.name || '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Implement API call to rename account
      console.log('Renaming account:', data);
      toast({
        title: 'Success',
        description: 'Account name has been updated.',
      });
      onClose();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update account name. Please try again.',
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
              <Pencil className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <DialogTitle>
                {account ? 'Rename Account' : 'Name Your Account'}
              </DialogTitle>
              {account && (
                <p className="text-sm text-zinc-400 mt-1">
                  {account.broker}
                </p>
              )}
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter account name"
                      className="bg-zinc-800 border-none"
                      {...field}
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
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}