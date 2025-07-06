import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useVisibility } from './use-visibility';
import { Service, InsertService, UpdateService } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';

interface ServicesResponse {
  services: Service[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ServicesFilters {
  page?: number;
  limit?: number;
  status?: string;
  nameFilter?: string;
}

export function useServices(filters: ServicesFilters = {}) {
  const queryClient = useQueryClient();
  const isVisible = useVisibility();
  
  const { page = 1, limit = 10, status = '', nameFilter = '' } = filters;
  
  const queryKey = ['services', { page, limit, status, nameFilter }];
  
  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      if (status) params.append('status', status);
      if (nameFilter) params.append('name_like', nameFilter);
      
      const response = await apiRequest('GET', `/api/services?${params}`);
      return response.json() as Promise<ServicesResponse>;
    },
    refetchInterval: 15000,
    refetchOnWindowFocus: isVisible,
    staleTime: 10000,
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertService) => {
      const response = await apiRequest('POST', '/api/services', data);
      return response.json() as Promise<Service>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateService }) => {
      const response = await apiRequest('PUT', `/api/services/${id}`, data);
      return response.json() as Promise<Service>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/services/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });

  return {
    ...query,
    createService: createMutation.mutateAsync,
    updateService: updateMutation.mutateAsync,
    deleteService: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

export function useServiceStats() {
  const isVisible = useVisibility();
  
  return useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/stats');
      return response.json() as Promise<{
        total: number;
        online: number;
        degraded: number;
        offline: number;
      }>;
    },
    refetchInterval: 15000,
    refetchOnWindowFocus: isVisible,
    staleTime: 10000,
  });
}
