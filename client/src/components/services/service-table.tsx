import { useState } from 'react';
import { useServices } from '@/hooks/use-services';
import { ServiceTableSkeleton } from '@/components/ui/loading-skeleton';
import { ServiceForm } from './service-form';
import { StatusBadge } from './status-badge';
import { TypeBadge } from './type-badge';
import { ServiceIcon } from './service-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Service, ServiceStatus } from '@shared/schema';
import { Plus, Search, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation } from 'wouter';

interface ServiceTableProps {
  onServiceSelect?: (service: Service) => void;
}

export function ServiceTable({ onServiceSelect }: ServiceTableProps) {
  const [, navigate] = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | undefined>();
  const { toast } = useToast();

  const {
    data,
    isLoading,
    error,
    createService,
    updateService,
    deleteService,
    isCreating,
    isUpdating,
    isDeleting,
  } = useServices({
    page: currentPage,
    limit: 10,
    status: statusFilter,
    nameFilter: searchQuery,
  });

  const handleServiceClick = (service: Service) => {
    if (onServiceSelect) {
      onServiceSelect(service);
    } else {
      navigate(`/service/${service.id}`);
    }
  };

  const handleEdit = (e: React.MouseEvent, service: Service) => {
    e.stopPropagation();
    setEditingService(service);
    setShowForm(true);
  };

  const handleDelete = async (e: React.MouseEvent, service: Service) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete ${service.name}?`)) {
      try {
        await deleteService(service.id);
        toast({
          title: 'Service deleted',
          description: `${service.name} has been deleted successfully.`,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete service. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleFormSubmit = async (formData: any) => {
    if (editingService) {
      await updateService({ id: editingService.id, data: formData });
    } else {
      await createService(formData);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingService(undefined);
  };

  const formatLastCheck = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return new Date(date).toLocaleDateString();
  };

  if (isLoading) {
    return <ServiceTableSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
        <p className="text-red-400 mb-4">Failed to load services</p>
        <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
          Retry
        </Button>
      </div>
    );
  }

  if (!data) return null;

  const { services, total, totalPages } = data;

  return (
    <>
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h2 className="text-xl font-semibold text-white">Live Service Monitor</h2>
              <p className="text-gray-400 text-sm mt-1">Real-time monitoring of all microservices</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Last updated: 2 seconds ago</span>
              </div>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-600 text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-gray-400 text-sm">Status:</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 bg-gray-900 border-gray-600 text-white">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="" className="text-white">All Statuses</SelectItem>
                  {Object.values(ServiceStatus).map((status) => (
                    <SelectItem key={status} value={status} className="text-white">
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-4 text-gray-400 font-medium">Service</th>
                <th className="text-left p-4 text-gray-400 font-medium">Type</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Last Check</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr
                  key={service.id}
                  onClick={() => handleServiceClick(service)}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors cursor-pointer"
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <ServiceIcon type={service.type} status={service.status} />
                      <div>
                        <div className="text-white font-medium">{service.name}</div>
                        <div className="text-gray-400 text-sm">{service.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <TypeBadge type={service.type} />
                  </td>
                  <td className="p-4">
                    <StatusBadge status={service.status} />
                  </td>
                  <td className="p-4">
                    <span className="text-gray-400 text-sm">
                      {formatLastCheck(service.lastCheck)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleEdit(e, service)}
                        className="text-gray-400 hover:text-blue-400"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleDelete(e, service)}
                        className="text-gray-400 hover:text-red-400"
                        disabled={isDeleting}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-gray-400 text-sm">
              Showing <span className="font-medium text-white">{(currentPage - 1) * 10 + 1}</span> to{' '}
              <span className="font-medium text-white">{Math.min(currentPage * 10, total)}</span> of{' '}
              <span className="font-medium text-white">{total}</span> services
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="text-gray-400 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="text-gray-400 hover:text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ServiceForm
        isOpen={showForm}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        editingService={editingService}
        isLoading={isCreating || isUpdating}
      />
    </>
  );
}
