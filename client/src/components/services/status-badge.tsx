import { ServiceStatus } from '@shared/schema';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case ServiceStatus.ONLINE:
        return 'text-green-400';
      case ServiceStatus.DEGRADED:
        return 'text-yellow-400';
      case ServiceStatus.OFFLINE:
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusDotStyles = () => {
    switch (status) {
      case ServiceStatus.ONLINE:
        return 'bg-green-400';
      case ServiceStatus.DEGRADED:
        return 'bg-yellow-400';
      case ServiceStatus.OFFLINE:
        return 'bg-red-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className={cn("w-2 h-2 rounded-full", getStatusDotStyles())} />
      <span className={cn("font-medium", getStatusStyles())}>
        {status}
      </span>
    </div>
  );
}
