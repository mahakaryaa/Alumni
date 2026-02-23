import { cn } from './utils';

type StatusType = 'pending' | 'approved' | 'rejected' | 'completed' | 'draft' | 'active' | 'closed';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  showIcon?: boolean;
}

const statusConfig: Record<StatusType, { color: string; label: string; icon?: string }> = {
  pending: {
    color: 'bg-yellow-50 text-yellow-800 border-yellow-300',
    label: 'Menunggu',
    icon: '⏳',
  },
  approved: {
    color: 'bg-green-50 text-green-800 border-green-300',
    label: 'Disetujui',
    icon: '✓',
  },
  rejected: {
    color: 'bg-red-50 text-red-800 border-red-300',
    label: 'Ditolak',
    icon: '✕',
  },
  completed: {
    color: 'bg-blue-50 text-blue-800 border-blue-300',
    label: 'Selesai',
    icon: '✓',
  },
  draft: {
    color: 'bg-gray-50 text-gray-800 border-gray-300',
    label: 'Draft',
    icon: '📝',
  },
  active: {
    color: 'bg-blue-50 text-blue-800 border-blue-300',
    label: 'Aktif',
    icon: '●',
  },
  closed: {
    color: 'bg-gray-50 text-gray-800 border-gray-300',
    label: 'Ditutup',
    icon: '🔒',
  },
};

export function StatusBadge({ status, className, showIcon = true }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border',
        config.color,
        className
      )}
    >
      {showIcon && config.icon && <span>{config.icon}</span>}
      <span>{config.label}</span>
    </span>
  );
}

// Variant for larger badges
export function StatusBadgeLarge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border-2',
        config.color,
        className
      )}
    >
      {config.icon && <span className="text-lg">{config.icon}</span>}
      <span>{config.label}</span>
    </div>
  );
}
