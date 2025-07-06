import { useParams } from 'wouter';
import { useServiceDetails } from '@/hooks/use-service-details';
import { EventsList } from '@/components/services/events-list';
import { ServiceIcon } from '@/components/services/service-icon';
import { StatusBadge } from '@/components/services/status-badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/loading-skeleton';
import { ArrowLeft, Activity, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'wouter';

export default function ServiceDetails() {
  const params = useParams();
  const serviceId = parseInt(params.id as string);
  const { data: service, isLoading, error } = useServiceDetails(serviceId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="px-6 py-6">
          <div className="flex items-center space-x-4 mb-6">
            <Skeleton className="w-8 h-8" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Skeleton className="w-12 h-12 rounded-lg" />
              <div>
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <Skeleton className="h-6 w-16 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="px-6 py-6">
          <div className="flex items-center space-x-4 mb-6">
            <Link href="/">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
            <p className="text-red-400 mb-4">Failed to load service details</p>
            <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const formatLastCheck = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    return new Date(date).toLocaleTimeString();
  };

  const getUptimePercentage = () => {
    // Mock uptime calculation - in real app this would come from the API
    const mockUptime = service.status === 'Online' ? 99.9 : 
                      service.status === 'Degraded' ? 98.5 : 95.2;
    return mockUptime;
  };

  const getResponseTime = () => {
    // Mock response time - in real app this would come from the API
    const mockResponseTime = service.status === 'Online' ? 45 : 
                            service.status === 'Degraded' ? 250 : 0;
    return mockResponseTime;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="px-6 py-6">
        {/* Back Button */}
        <div className="flex items-center space-x-4 mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Service Header */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <ServiceIcon type={service.type} status={service.status} className="w-12 h-12" />
            <div>
              <h1 className="text-2xl font-semibold text-white">{service.name}</h1>
              <p className="text-gray-400">{service.description}</p>
            </div>
          </div>

          {/* Service Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center space-x-2 mb-2">
                <StatusBadge status={service.status} />
              </div>
              <p className="text-gray-400 text-sm">Current Status</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-white font-medium">{getUptimePercentage()}%</span>
              </div>
              <p className="text-gray-400 text-sm">Uptime (30 days)</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-white font-medium">
                  {service.status === 'Offline' ? 'N/A' : `${getResponseTime()}ms`}
                </span>
              </div>
              <p className="text-gray-400 text-sm">Avg Response Time</p>
            </div>
          </div>

          {/* Service Info */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Service Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white">{service.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Check:</span>
                    <span className="text-white">{formatLastCheck(service.lastCheck)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created:</span>
                    <span className="text-white">{new Date(service.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              {service.healthCheckUrl && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Health Check</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">URL:</span>
                      <span className="text-white text-sm break-all">{service.healthCheckUrl}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Historical Events */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Historical Events
          </h2>
          <EventsList serviceId={service.id} />
        </div>
      </div>
    </div>
  );
}
