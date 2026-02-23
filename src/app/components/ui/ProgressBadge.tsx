import { cn } from './utils';

type ProgressBadgeType = 'new-update' | 'urgent' | 'deadline-near' | 'supported' | 'target-reached';

interface ProgressBadgeProps {
  type: ProgressBadgeType;
  className?: string;
  children?: React.ReactNode;
}

const badgeConfig: Record<ProgressBadgeType, { color: string; defaultLabel: string }> = {
  'new-update': {
    color: 'bg-accent text-primary border-accent',
    defaultLabel: 'Update Baru',
  },
  urgent: {
    color: 'bg-red-600 text-white',
    defaultLabel: 'Urgent',
  },
  'deadline-near': {
    color: 'bg-orange-500 text-white',
    defaultLabel: 'Deadline Dekat',
  },
  supported: {
    color: 'bg-accent text-primary',
    defaultLabel: 'Kamu mendukung ini',
  },
  'target-reached': {
    color: 'bg-green-600 text-white',
    defaultLabel: 'Target Tercapai',
  },
};

export function ProgressBadge({ type, className, children }: ProgressBadgeProps) {
  const config = badgeConfig[type];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold',
        config.color,
        className
      )}
    >
      {children || config.defaultLabel}
    </span>
  );
}
