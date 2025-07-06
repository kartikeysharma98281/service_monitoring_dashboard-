import { useEffect, useRef } from 'react';
import { useServiceEvents } from '@/hooks/use-service-events';
import { EventType } from '@/lib/msw/data';
import { CheckCircle, AlertTriangle, Wrench, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/loading-skeleton';

interface EventsListProps {
  serviceId: number;
}

export function EventsList({ serviceId }: EventsListProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useServiceEvents(serviceId);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case EventType.STATUS_CHANGE:
        return CheckCircle;
      case EventType.ALERT:
        return AlertTriangle;
      case EventType.MAINTENANCE:
        return Wrench;
      default:
        return AlertCircle;
    }
  };

  const getEventStyles = (eventType: string) => {
    switch (eventType) {
      case EventType.STATUS_CHANGE:
        return 'text-green-400 bg-green-400/10';
      case EventType.ALERT:
        return 'text-yellow-400 bg-yellow-400/10';
      case EventType.MAINTENANCE:
        return 'text-blue-400 bg-blue-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const eventTime = new Date(timestamp);
    const diff = now.getTime() - eventTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    return 'Just now';
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <div className="flex items-start space-x-3">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-4">Failed to load events</p>
        <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
          Retry
        </Button>
      </div>
    );
  }

  const allEvents = data?.pages.flatMap(page => page.events) || [];

  if (allEvents.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No events found for this service</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {allEvents.map((event) => {
        const Icon = getEventIcon(event.eventType);
        const styles = getEventStyles(event.eventType);
        
        return (
          <div key={event.id} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${styles}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-white font-medium">{event.title}</p>
                  <span className="text-gray-400 text-sm">
                    {formatTimestamp(event.timestamp)}
                  </span>
                </div>
                {event.description && (
                  <p className="text-gray-400 text-sm mt-1">{event.description}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
      
      {hasNextPage && (
        <div ref={loadMoreRef} className="flex items-center justify-center py-4">
          {isFetchingNextPage ? (
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-400 text-sm">Loading more events...</span>
            </div>
          ) : (
            <Button
              variant="ghost"
              onClick={() => fetchNextPage()}
              className="text-gray-400 hover:text-white"
            >
              Load more events
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
