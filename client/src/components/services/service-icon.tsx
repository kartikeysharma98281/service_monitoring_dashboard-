import { ServiceType } from '@shared/schema';
import { 
  Server, 
  Database, 
  Zap, 
  Cloud, 
  ListEnd,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceIconProps {
  type: string;
  status: string;
  className?: string;
}

export function ServiceIcon({ type, status, className }: ServiceIconProps) {
  const getIcon = () => {
    switch (type) {
      case ServiceType.API:
        return Server;
      case ServiceType.DATABASE:
        return Database;
      case ServiceType.CACHE:
        return Zap;
      case ServiceType.EXTERNAL:
        return Cloud;
      case ServiceType.QUEUE:
        return ListEnd;
      default:
        return Activity;
    }
  };

  const getIconStyles = () => {
    switch (status) {
      case 'Online':
        return 'text-blue-400 bg-blue-400/10';
      case 'Degraded':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'Offline':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const Icon = getIcon();

  return (
    <div className={cn(
      "w-10 h-10 rounded-lg flex items-center justify-center",
      getIconStyles(),
      className
    )}>
      <Icon className="w-5 h-5" />
    </div>
  );
}
