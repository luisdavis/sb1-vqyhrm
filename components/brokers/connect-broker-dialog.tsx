'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ConnectBrokerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  broker: {
    name: string;
    logo: string;
  };
}

export function ConnectBrokerDialog({
  isOpen,
  onClose,
  broker,
}: ConnectBrokerDialogProps) {
  const router = useRouter();

  const handleEnvironmentSelect = (environment: 'live' | 'demo') => {
    // Here you would typically navigate to the broker-specific connection flow
    router.push(`/brokers/connect/${broker.name.toLowerCase()}/${environment}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Image
                src={broker.logo}
                alt={broker.name}
                width={24}
                height={24}
              />
            </div>
            <DialogTitle>Connect to {broker.name}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button
            variant="outline"
            className="h-32 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 flex flex-col items-center justify-center gap-4"
            onClick={() => handleEnvironmentSelect('demo')}
          >
            <Image
              src={broker.logo}
              alt={`${broker.name} Demo`}
              width={48}
              height={48}
              className="opacity-80"
            />
            <div className="text-center">
              <p className="font-medium">{broker.name}</p>
              <p className="text-sm text-zinc-400">Demo</p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-32 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 flex flex-col items-center justify-center gap-4"
            onClick={() => handleEnvironmentSelect('live')}
          >
            <Image
              src={broker.logo}
              alt={`${broker.name} Live`}
              width={48}
              height={48}
              className="opacity-80"
            />
            <div className="text-center">
              <p className="font-medium">{broker.name}</p>
              <p className="text-sm text-zinc-400">Live</p>
            </div>
          </Button>
        </div>

        <p className="text-sm text-zinc-400 mt-4">
          Select an environment to connect your {broker.name} account.
          Demo accounts are perfect for testing, while live accounts are for real trading.
        </p>
      </DialogContent>
    </Dialog>
  );
}