import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useCampaign } from '@/context/CampaignContext';
import { Plus, Trash2 } from 'lucide-react';
import { Campaign } from '@/types/campaign';

type FormValues = Omit<Campaign, 'id' | 'createdAt' | 'updatedAt' | 'applications' | 'votes' | 'status'>;

interface CreateCampaignFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const CreateCampaignForm: React.FC<CreateCampaignFormProps> = ({ onSuccess, onCancel }) => {
  const { createCampaign } = useCampaign();
  
  const { register, control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      shortDescription: '',
      votingEnabled: false,
      positions: [{ title: '', quota: 1, filled: 0, applicants: [] }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'positions'
  });

  const onSubmit = (data: FormValues) => {
    // Generate IDs for positions
    const positionsWithIds = data.positions.map(p => ({
      ...p,
      id: `pos-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      filled: 0,
      applicants: []
    }));

    createCampaign({
      ...data,
      positions: positionsWithIds,
      status: 'DRAFT'
    });
    onSuccess();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Campaign</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input 
              {...register('title', { required: 'Title is required' })} 
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="Campaign Title"
            />
            {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Voting Enabled</label>
            <div className="flex items-center space-x-2 mt-2">
              <input 
                type="checkbox" 
                {...register('votingEnabled')} 
                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-600">Enable voting for PIC selection</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Short Description</label>
          <input 
            {...register('shortDescription', { required: 'Short description is required' })} 
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="Brief summary for cards"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Full Description</label>
          <textarea 
            {...register('description', { required: 'Description is required' })} 
            rows={4}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="Detailed project explanation..."
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input 
              type="date" 
              {...register('startDate', { required: true })} 
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
           <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input 
              type="date" 
              {...register('endDate', { required: true })} 
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
           <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Deadline Apply</label>
            <input 
              type="date" 
              {...register('deadline', { required: true })} 
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* Position Builder */}
        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Positions Required</h3>
            <button 
              type="button" 
              onClick={() => append({ title: '', quota: 1, filled: 0, applicants: [] })}
              className="flex items-center space-x-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              <Plus size={16} />
              <span>Add Position</span>
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-start gap-4 bg-gray-50 p-4 rounded-md">
                <div className="flex-1 space-y-2">
                  <label className="text-xs font-medium text-gray-500">Role Name</label>
                  <input 
                    {...register(`positions.${index}.title` as const, { required: true })} 
                    className="w-full px-3 py-2 border rounded-md bg-white"
                    placeholder="e.g. Project Manager"
                  />
                </div>
                <div className="w-24 space-y-2">
                  <label className="text-xs font-medium text-gray-500">Quota</label>
                  <input 
                    type="number" 
                    min="1"
                    {...register(`positions.${index}.quota` as const, { required: true, min: 1 })} 
                    className="w-full px-3 py-2 border rounded-md bg-white"
                  />
                </div>
                <button 
                  type="button" 
                  onClick={() => remove(index)}
                  className="mt-8 text-red-500 hover:text-red-700"
                  disabled={fields.length === 1}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button 
            type="button" 
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 font-medium shadow-sm"
          >
            Create Campaign
          </button>
        </div>

      </form>
    </div>
  );
};
