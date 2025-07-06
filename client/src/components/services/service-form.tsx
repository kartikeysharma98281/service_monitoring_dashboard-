import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Service, ServiceType } from '@/lib/msw/data';
import { InsertService } from '@/hooks/use-services';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { X, Check } from 'lucide-react';

type FormData = InsertService;

interface ServiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InsertService) => Promise<void>;
  editingService?: Service;
  isLoading?: boolean;
}

export function ServiceForm({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editingService,
  isLoading = false
}: ServiceFormProps) {
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    defaultValues: {
      name: editingService?.name || '',
      type: editingService?.type || '',
      description: editingService?.description || '',
      healthCheckUrl: editingService?.healthCheckUrl || '',
    },
  });

  const handleSubmit = async (data: FormData) => {
    try {
      await onSubmit(data);
      toast({
        title: editingService ? 'Service updated' : 'Service created',
        description: `${data.name} has been ${editingService ? 'updated' : 'created'} successfully.`,
      });
      form.reset();
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${editingService ? 'update' : 'create'} service. Please try again.`,
        variant: 'destructive',
      });
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-white">
            {editingService ? 'Edit Service' : 'Add New Service'}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-300">Service Name</Label>
            <Input
              id="name"
              {...form.register('name')}
              className="bg-gray-900 border-gray-600 text-white"
              placeholder="Enter service name"
            />
            {form.formState.errors.name && (
              <p className="text-red-400 text-sm mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="type" className="text-gray-300">Service Type</Label>
            <Select 
              value={form.watch('type')} 
              onValueChange={(value) => form.setValue('type', value)}
            >
              <SelectTrigger className="bg-gray-900 border-gray-600 text-white">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="API" className="text-white">API</SelectItem>
                <SelectItem value="Database" className="text-white">Database</SelectItem>
                <SelectItem value="Cache" className="text-white">Cache</SelectItem>
                <SelectItem value="External" className="text-white">External</SelectItem>
                <SelectItem value="Queue" className="text-white">Queue</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.type && (
              <p className="text-red-400 text-sm mt-1">{form.formState.errors.type.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Textarea
              id="description"
              {...form.register('description')}
              className="bg-gray-900 border-gray-600 text-white"
              placeholder="Enter service description"
              rows={3}
            />
            {form.formState.errors.description && (
              <p className="text-red-400 text-sm mt-1">{form.formState.errors.description.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="healthCheckUrl" className="text-gray-300">Health Check URL</Label>
            <Input
              id="healthCheckUrl"
              {...form.register('healthCheckUrl')}
              className="bg-gray-900 border-gray-600 text-white"
              placeholder="https://api.example.com/health"
              type="url"
            />
            {form.formState.errors.healthCheckUrl && (
              <p className="text-red-400 text-sm mt-1">{form.formState.errors.healthCheckUrl.message}</p>
            )}
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>{editingService ? 'Update' : 'Add'} Service</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
