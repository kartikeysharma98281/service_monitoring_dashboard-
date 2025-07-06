import { useQuery } from '@tanstack/react-query';
import { Service } from '@/lib/msw/data';
import { apiRequest } from '@/lib/queryClient';

export function useServiceDetails(id: number) {
  return useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/services/${id}`);
      return response.json() as Promise<Service>;
    },
    enabled: !!id,
    staleTime: 5000,
  });
}
