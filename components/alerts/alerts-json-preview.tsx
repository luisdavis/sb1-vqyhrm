import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface AlertsJsonPreviewProps {
  json: string;
}

export function AlertsJsonPreview({ json }: AlertsJsonPreviewProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(json);
    toast({
      title: 'Copied to clipboard',
      description: 'The alert JSON has been copied to your clipboard.',
    });
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Generated Alert</h2>
        <Button
          variant="outline"
          size="sm"
          className="bg-zinc-800 border-none text-white hover:bg-zinc-700"
          onClick={handleCopy}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
      </div>

      <div className="bg-zinc-800 rounded-lg p-4">
        <pre className="text-sm text-zinc-300 whitespace-pre-wrap">
          {json || 'Configure alert settings to generate JSON'}
        </pre>
      </div>
    </div>
  );
}