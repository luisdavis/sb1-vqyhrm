'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Link } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export function WebhookSection() {
  const { toast } = useToast();
  const webhookUrl = 'https://api.sigmaalgo.com/webhooks/alerts/your-unique-id';

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookUrl);
    toast({
      title: 'Webhook URL copied',
      description: 'The webhook URL has been copied to your clipboard.',
    });
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Link className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Webhook URL</h2>
          <p className="text-sm text-zinc-400">Use this URL in your TradingView alerts</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Input 
          value={webhookUrl}
          readOnly
          className="bg-zinc-800 border-none text-zinc-400"
        />
        <Button
          variant="outline"
          className="bg-zinc-800 border-none hover:bg-zinc-700 shrink-0"
          onClick={handleCopy}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
      </div>
    </div>
  );
}