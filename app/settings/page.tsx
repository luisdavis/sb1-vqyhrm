'use client';

import { UserInfoSection } from '@/components/settings/user-info-section';
import { SubscriptionSection } from '@/components/settings/subscription-section';
import { FeatureFlagsSection } from '@/components/settings/feature-flags-section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, CreditCard, Construction } from 'lucide-react';
import { AppLayout } from '@/components/layout/app-layout';

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
        
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="bg-zinc-900 border-b border-zinc-800">
            <TabsTrigger value="account" className="gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="subscription" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Subscription
            </TabsTrigger>
            <TabsTrigger value="features" className="gap-2">
              <Construction className="h-4 w-4" />
              Features
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="mt-6">
            <UserInfoSection />
          </TabsContent>
          
          <TabsContent value="subscription" className="mt-6">
            <SubscriptionSection />
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <FeatureFlagsSection />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}