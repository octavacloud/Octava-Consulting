import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 font-mono text-[11px] tracking-[2px] text-white/30 uppercase mb-6',
        className
      )}
    >
      <span className="w-6 h-px bg-white/20" />
      {children}
    </div>
  )
}
