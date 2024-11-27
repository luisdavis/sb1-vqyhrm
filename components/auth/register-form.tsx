'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { User, Mail, Phone, Lock, AtSign } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

// Validation schema for the registration form
const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  username: z.string().min(3, 'Username must be at least 3 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      username: '',
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Registration successful",
          description: "Please login with your credentials.",
        });
        router.push('/');
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: Object.values(result).flat().join(', '),
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                    <Input
                      placeholder="First Name"
                      className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400"
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                    <Input
                      placeholder="Last Name"
                      className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400"
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                  <Input
                    placeholder="Email"
                    type="email"
                    className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400"
                    disabled={isLoading}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                  <Input
                    placeholder="Phone Number"
                    type="tel"
                    className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400"
                    disabled={isLoading}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <AtSign className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                  <Input
                    placeholder="Username"
                    className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400"
                    disabled={isLoading}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400"
                    disabled={isLoading}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                  <Input
                    type="password"
                    placeholder="Re-enter Password"
                    className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400"
                    disabled={isLoading}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Register'}
        </Button>
      </form>
    </Form>
  );
}