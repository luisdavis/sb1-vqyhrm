'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EntryForm } from './forms/entry-form';
import { ClosePartialsForm } from './forms/close-partials-form';
import { StopLossUpdateForm } from './forms/stop-loss-update-form';
import { CloseAllForm } from './forms/close-all-form';
import { WebhookSection } from './webhook-section';
import { AdditionalAccounts } from './additional-accounts';

interface AlertsPanelProps {
  onJsonGenerate: (json: string) => void;
}

export function AlertsPanel({ onJsonGenerate }: AlertsPanelProps) {
  const [activeTab, setActiveTab] = useState('entry');

  const handleJsonGenerate = (type: string, data: any) => {
    const json = {
      [type]: {
        ...data,
      },
    };
    onJsonGenerate(JSON.stringify(json, null, 2));
  };

  return (
    <div className="space-y-6">
      <WebhookSection />

      <div className="bg-zinc-900 rounded-xl p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 bg-zinc-800">
            <TabsTrigger value="entry">Entry</TabsTrigger>
            <TabsTrigger value="partials">Close Partials</TabsTrigger>
            <TabsTrigger value="sl">SL Update</TabsTrigger>
            <TabsTrigger value="close">Close All</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="entry">
              <EntryForm onSubmit={(data) => handleJsonGenerate('Entry', data)} />
            </TabsContent>
            
            <TabsContent value="partials">
              <ClosePartialsForm onSubmit={(data) => handleJsonGenerate('ClosePartials', data)} />
            </TabsContent>
            
            <TabsContent value="sl">
              <StopLossUpdateForm onSubmit={(data) => handleJsonGenerate('SLUpdate', data)} />
            </TabsContent>
            
            <TabsContent value="close">
              <CloseAllForm onSubmit={(data) => handleJsonGenerate('CloseAll', data)} />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <AdditionalAccounts />
    </div>
  );
}