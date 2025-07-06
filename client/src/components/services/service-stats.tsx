import { useServiceStats } from '@/hooks/use-services';
import { StatsSkeleton } from '@/components/ui/loading-skeleton';
import { Server, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export function ServiceStats() {
  const { data: stats, isLoading, error } = useServiceStats();

  if (isLoading) {
    return <StatsSkeleton />;
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-red-400 text-sm">Failed to load statistics</div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const statsData = [
    {
      title: 'Total Services',
      value: stats.total,
      icon: Server,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      title: 'Online',
      value: stats.online,
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      title: 'Degraded',
      value: stats.degraded,
      icon: AlertTriangle,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
    },
    {
      title: 'Offline',
      value: stats.offline,
      icon: XCircle,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
              <p className={`text-2xl font-bold mt-1 ${stat.color === 'text-blue-400' ? 'text-white' : stat.color}`}>
                {stat.value}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
