import { ServiceStats } from '@/components/services/service-stats';
import { ServiceTable } from '@/components/services/service-table';
import { ChartLine, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <ChartLine className="text-blue-400 w-8 h-8" />
              <h1 className="text-xl font-semibold text-white">MonitoCorp</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6 ml-8">
              <a href="#" className="text-blue-400 border-b-2 border-blue-400 pb-4 -mb-4 px-1">
                Dashboard
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors pb-4 -mb-4 px-1">
                Analytics
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors pb-4 -mb-4 px-1">
                Settings
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-400 text-sm hidden md:block">John Doe</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <ServiceStats />
        <ServiceTable />
      </main>
    </div>
  );
}
