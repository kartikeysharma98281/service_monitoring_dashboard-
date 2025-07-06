import { ServiceType } from '@/lib/msw/data';
import { cn } from '@/lib/utils';

interface TypeBadgeProps {
  type: string;
  className?: string;
}

export function TypeBadge({ type, className }: TypeBadgeProps) {
  const getTypeStyles = () => {
    switch (type) {
      case ServiceType.API:
        return 'bg-blue-900 text-blue-300';
      case ServiceType.DATABASE:
        return 'bg-green-900 text-green-300';
      case ServiceType.CACHE:
        return 'bg-red-900 text-red-300';
      case ServiceType.EXTERNAL:
        return 'bg-purple-900 text-purple-300';
      case ServiceType.QUEUE:
        return 'bg-orange-900 text-orange-300';
      default:
        return 'bg-gray-900 text-gray-300';
    }
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      getTypeStyles(),
      className
    )}>
      {type}
    </span>
  );
}
