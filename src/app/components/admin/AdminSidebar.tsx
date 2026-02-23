/**
 * Admin Sidebar Component
 * Navigation sidebar for admin panel with role-based menu
 */

import { AdminUser } from '@/types/admin';
import { getRoleDisplayName, getRoleBadgeColor, hasPermission } from '@/utils/adminAuth';
import { Logo } from '../Logo';

interface AdminSidebarProps {
  currentUser: AdminUser;
  activeMenu: string;
  onMenuChange: (menu: string) => void;
  onLogout: () => void;
}

export function AdminSidebar({ currentUser, activeMenu, onMenuChange, onLogout }: AdminSidebarProps) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      show: true,
    },
    {
      id: 'alumni',
      label: 'Data Alumni',
      icon: 'people',
      show: true,
    },
    {
      id: 'users',
      label: 'Manajemen User',
      icon: 'admin_panel_settings',
      show: hasPermission(currentUser, 'canViewAllUsers'),
    },
    {
      id: 'activity',
      label: 'Activity Log',
      icon: 'history',
      show: hasPermission(currentUser, 'canViewActivityLog'),
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[#2B4468] border-r border-[#2B4468] fixed inset-y-0 z-30 shadow-sm">
      {/* Decorative Background */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-5">
        <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-white rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Logo */}
        <div className="p-5">
          <Logo />
        </div>

        {/* Admin Badge */}
        <div className="px-5 pb-4">
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-white/80 text-xs mb-1">Logged in as:</p>
            <p className="text-white font-semibold text-sm mb-2">{currentUser.name}</p>
            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getRoleBadgeColor(currentUser.role)}`}>
              {getRoleDisplayName(currentUser.role)}
            </span>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 px-5">
          <div className="space-y-2">
            {menuItems.map(item => {
              if (!item.show) return null;
              
              return (
                <button
                  key={item.id}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all w-full ${
                    activeMenu === item.id
                      ? 'text-white bg-white/10 shadow-sm'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                  onClick={() => onMenuChange(item.id)}
                >
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  <span className="tracking-wide text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-5 pb-6">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            <span className="tracking-wide text-sm">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
