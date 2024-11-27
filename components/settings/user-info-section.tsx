'use client';

import { useState } from 'react';
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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ChangePasswordDialog } from './change-password-dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, User } from 'lucide-react';

const userInfoSchema = z.object({
  username: z.string(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
});

type UserInfoValues = z.infer<typeof userInfoSchema>;

export function UserInfoSection() {
  const { toast } = useToast();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserInfoValues>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      username: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
    },
  });

  const onSubmit = async (data: UserInfoValues) => {
    setIsLoading(true);
    try {
      // Implement API call to update user info
      console.log('Updating user info:', data);
      toast({
        title: 'Success',
        description: 'Your profile has been updated.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <User className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <CardTitle className="text-xl text-white">User Information</CardTitle>
            <CardDescription>Manage your account details and preferences</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled
                        className="bg-zinc-800/50 border-none text-zinc-400"
                      />
                      <div className="absolute right-3 top-2.5">
                        <Check className="h-5 w-5 text-zinc-500" />
                      </div>
                    </div>
                  </FormControl>
                  <p className="text-xs text-zinc-500">Your username is unique and cannot be changed.</p>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-zinc-800 border-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-zinc-800 border-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" className="bg-zinc-800 border-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" className="bg-zinc-800 border-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                className="bg-zinc-800 border-none hover:bg-zinc-700"
                onClick={() => setIsPasswordDialogOpen(true)}
              >
                Change Password
              </Button>

              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

      <ChangePasswordDialog
        isOpen={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
      />
    </Card>
  );
}