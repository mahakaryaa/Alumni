/**
 * Admin Sidebar Component (REVISED)
 */

import { AdminUser } from '@/types/admin-revised';
import { getRoleBadgeColor, getRoleDisplayName } from '@/utils/adminPermissions';

interface AdminSidebarRevisedProps {
  currentUser: AdminUser;
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
  roles: AdminUser['role'][];
}

export function AdminSidebarRevised({
  currentUser,
  activePage,
  onNavigate,
  onLogout,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
}: AdminSidebarRevisedProps) {
  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      roles: ['pic', 'moderator', 'superadmin'],
    },
    {
      id: 'campaign-management',
      label: 'Campaigns',
      icon: 'campaign',
      roles: ['pic', 'moderator', 'superadmin'],
    },
    {
      id: 'financial-dashboard',
      label: 'Financial Dashboard',
      icon: 'account_balance',
      roles: ['superadmin'],
    },
    {
      id: 'donation-verification',
      label: 'Verifikasi Donasi',
      icon: 'verified',
      roles: ['superadmin'],
    },
    {
      id: 'wallet-management',
      label: 'Manajemen Dompet',
      icon: 'account_balance_wallet',
      roles: ['superadmin'],
    },
    {
      id: 'withdrawal-approval',
      label: 'Approval Penarikan',
      icon: 'approval',
      roles: ['moderator', 'superadmin'],
    },
    {
      id: 'pending-requests',
      label: 'Permintaan Join',
      icon: 'person_add',
      roles: ['pic', 'moderator', 'superadmin'],
    },
    {
      id: 'event-registration-approval',
      label: 'Pendaftaran Event',
      icon: 'event_available',
      roles: ['pic', 'moderator', 'superadmin'],
    },
    {
      id: 'alumni-data',
      label: 'Data Alumni',
      icon: 'school',
      roles: ['moderator', 'superadmin'],
    },
    {
      id: 'finance',
      label: 'Keuangan Project',
      icon: 'account_balance_wallet',
      roles: ['pic', 'superadmin'],
    },
    {
      id: 'content',
      label: 'Konten Project',
      icon: 'article',
      roles: ['pic', 'moderator', 'superadmin'],
    },
    {
      id: 'polling',
      label: 'Polling',
      icon: 'poll',
      roles: ['pic'],
    },
    {
      id: 'delegation',
      label: 'Delegasi PIC',
      icon: 'swap_horiz',
      roles: ['pic', 'superadmin'],
    },
    {
      id: 'project-closure',
      label: 'Tutup Project',
      icon: 'archive',
      roles: ['pic', 'superadmin'],
    },
    {
      id: 'activity-log',
      label: 'Activity Log',
      icon: 'history',
      roles: ['pic', 'moderator', 'superadmin'],
    },
  ];

  const visibleMenuItems = menuItems.filter(item => item.roles.includes(currentUser.role));

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-[#E5E7EB] flex-col z-30">
        {/* Logo/Header */}
        <div className="p-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#243D68] to-[#FAC06E] rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">admin_panel_settings</span>
            </div>
            <div>
              <h1 className="font-['Archivo_Black'] text-sm uppercase text-[#0E1B33]">
                AlMaqdisi
              </h1>
              <p className="text-xs text-[#6B7280]">Admin Panel</p>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 p-3 bg-[#F8F9FA] rounded-lg">
            <div className="w-10 h-10 bg-[#243D68] rounded-full flex items-center justify-center text-white font-semibold">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#0E1B33] truncate">
                {currentUser.name}
              </p>
              <p className={`text-xs px-2 py-0.5 rounded-full inline-block ${getRoleBadgeColor(currentUser.role)}`}>
                {getRoleDisplayName(currentUser.role)}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {visibleMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activePage === item.id
                    ? 'bg-[#243D68] text-white shadow-md'
                    : 'text-[#6B7280] hover:bg-[#F8F9FA] hover:text-[#243D68]'
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  {item.icon}
                </span>
                <span className="flex-1 text-left text-sm font-semibold">
                  {item.label}
                </span>
                {item.badge && item.badge > 0 && (
                  <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                    activePage === item.id
                      ? 'bg-white text-[#243D68]'
                      : 'bg-red-500 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-[#E5E7EB]">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            <span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar - TODO: Add mobile sidebar with overlay */}
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed left-0 top-0 h-screen w-80 max-w-[85vw] bg-white flex-col z-50 transform transition-transform duration-300 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo/Header */}
        <div className="p-6 border-b border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#243D68] to-[#FAC06E] rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-xl">admin_panel_settings</span>
              </div>
              <div>
                <h1 className="font-['Archivo_Black'] text-sm uppercase text-[#0E1B33]">
                  AlMaqdisi
                </h1>
                <p className="text-xs text-[#6B7280]">Admin Panel</p>
              </div>
            </div>
            {/* Close Button */}
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="w-10 h-10 flex items-center justify-center hover:bg-[#F8F9FA] rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-[#6B7280]">close</span>
            </button>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 p-3 bg-[#F8F9FA] rounded-lg">
            <div className="w-10 h-10 bg-[#243D68] rounded-full flex items-center justify-center text-white font-semibold">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#0E1B33] truncate">
                {currentUser.name}
              </p>
              <p className={`text-xs px-2 py-0.5 rounded-full inline-block ${getRoleBadgeColor(currentUser.role)}`}>
                {getRoleDisplayName(currentUser.role)}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {visibleMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activePage === item.id
                    ? 'bg-[#243D68] text-white shadow-md'
                    : 'text-[#6B7280] hover:bg-[#F8F9FA] hover:text-[#243D68]'
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  {item.icon}
                </span>
                <span className="flex-1 text-left text-sm font-semibold">
                  {item.label}
                </span>
                {item.badge && item.badge > 0 && (
                  <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                    activePage === item.id
                      ? 'bg-white text-[#243D68]'
                      : 'bg-red-500 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-[#E5E7EB]">
          <button
            onClick={() => {
              onLogout();
              setIsMobileSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            <span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}