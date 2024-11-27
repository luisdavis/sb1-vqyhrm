import { Sidebar } from '@/components/dashboard/sidebar';

export default function StrategiesPage() {
  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-white">Strategies</h1>
          {/* Add strategies UI here */}
        </div>
      </main>
    </div>
  );
}