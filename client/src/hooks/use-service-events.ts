import { useInfiniteQuery } from '@tanstack/react-query';
import { ServiceEvent } from '@/lib/msw/data';
import { apiRequest } from '@/lib/queryClient';

interface EventsResponse {
  events: ServiceEvent[];
  page: number;
  limit: number;
  hasMore: boolean;
}

export function useServiceEvents(serviceId: number, limit: number = 20) {
  return useInfiniteQuery({
    queryKey: ['service-events', serviceId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await apiRequest('GET', `/api/services/${serviceId}/events?page=${pageParam}&limit=${limit}`);
      return response.json() as Promise<EventsResponse>;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!serviceId,
  });
}
