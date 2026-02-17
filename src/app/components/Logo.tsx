interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`bg-[#FAC06E] p-3 flex items-center gap-3 shadow-md rounded-[15px] ${className}`}>
      <div className="w-8 h-8 border-2 border-[#2B4468] rounded-md flex items-center justify-center">
        <span className="material-symbols-outlined text-[#2B4468] text-xl font-bold">mosque</span>
      </div>
      <span className="font-['Archivo_Black'] text-base uppercase tracking-tight text-[#2B4468]">
        ALMAQDISI PROJECT
      </span>
    </div>
  );
}
