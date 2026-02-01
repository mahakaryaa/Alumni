/**
 * Polling Management Component (Placeholder)
 */

import { AdminUser } from '@/types/admin-revised';

interface PollingManagementProps {
  currentUser: AdminUser;
  projectId: string;
}

export function PollingManagement({ currentUser, projectId }: PollingManagementProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="font-['Archivo_Black'] text-2xl uppercase text-[#0E1B33] mb-6">
        Kelola Polling
      </h1>
      
      <div className="bg-white rounded-xl p-12 text-center border border-[#E5E7EB]">
        <span className="material-symbols-outlined text-6xl text-[#6B7280] mb-4 block">construction</span>
        <h2 className="font-semibold text-xl text-[#0E1B33] mb-2">Coming Soon</h2>
        <p className="text-[#6B7280]">
          Polling Management page is under construction
        </p>
      </div>
    </div>
  );
}
