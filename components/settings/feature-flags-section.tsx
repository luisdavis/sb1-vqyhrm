'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Construction } from 'lucide-react';
import { useFeatureFlags } from '@/store/use-feature-flags';
import { useComponentFlags } from '@/store/use-component-flags';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FEATURE_PAGES = [
  { path: '/statistics', label: 'Statistics' },
  { path: '/alerts', label: 'Alerts' },
  { path: '/strategies', label: 'Strategies' },
];

const FEATURE_COMPONENTS = [
  { id: 'trading-analytics', label: 'Trading Analytics', description: 'Advanced trading analytics and charts' },
  { id: 'performance-metrics', label: 'Performance Metrics', description: 'Detailed trading performance metrics' },
  { id: 'instrument-breakdown', label: 'Instrument Breakdown', description: 'Trading instrument distribution analysis' },
];

export function FeatureFlagsSection() {
  const { disabledPages, togglePageDisabled } = useFeatureFlags();
  const { disabledComponents, toggleComponentDisabled } = useComponentFlags();

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Construction className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <CardTitle className="text-xl text-white">Feature Management</CardTitle>
            <CardDescription>Control feature and component availability</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pages">
          <TabsList className="bg-zinc-800 border-none">
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
          </TabsList>

          <TabsContent value="pages" className="mt-4">
            <div className="space-y-4">
              {FEATURE_PAGES.map((page) => (
                <div key={page.path} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{page.label}</p>
                    <p className="text-sm text-zinc-400">{page.path}</p>
                  </div>
                  <Switch
                    checked={!disabledPages.includes(page.path)}
                    onCheckedChange={() => togglePageDisabled(page.path)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="components" className="mt-4">
            <div className="space-y-4">
              {FEATURE_COMPONENTS.map((component) => (
                <div key={component.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{component.label}</p>
                    <p className="text-sm text-zinc-400">{component.description}</p>
                  </div>
                  <Switch
                    checked={!disabledComponents.includes(component.id)}
                    onCheckedChange={() => toggleComponentDisabled(component.id)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}