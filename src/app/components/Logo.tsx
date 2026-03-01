interface LogoProps {
  className?: string;
  size?: 'sm' | 'md';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  return (
    <div className={`bg-[#FAC06E] px-3 py-2.5 flex items-center gap-3 shadow-md rounded-[12px] overflow-hidden ${className}`}>
      <div className="w-8 h-8 bg-[#2B4468] rounded-[8px] flex items-center justify-center flex-shrink-0">
        <span className="material-symbols-outlined text-white text-lg" style={{ fontSize: '18px' }}>mosque</span>
      </div>
      <span className="font-['Archivo_Black'] uppercase tracking-tight text-[#2B4468] whitespace-nowrap overflow-hidden text-ellipsis text-[12px]">
        ALMAQDISI PROJECT
      </span>
    </div>
  );
}