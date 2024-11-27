'use client';

import { useState } from 'react';
import { AlertsHeader } from '@/components/alerts/alerts-header';
import { AlertsPanel } from '@/components/alerts/alerts-panel';
import { AlertsJsonPreview } from '@/components/alerts/alerts-json-preview';
import { AppLayout } from '@/components/layout/app-layout';

export default function AlertsPage() {
  const [generatedJson, setGeneratedJson] = useState<string>('');

  return (
    <AppLayout>
      <div className="space-y-6">
        <AlertsHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AlertsPanel onJsonGenerate={setGeneratedJson} />
          <AlertsJsonPreview json={generatedJson} />
        </div>
      </div>
    </AppLayout>
  );
}