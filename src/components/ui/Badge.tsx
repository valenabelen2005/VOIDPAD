import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  variant?: 'cyan' | 'violet' | 'muted'
  className?: string
}

const variants = {
  cyan: 'bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20',
  violet: 'bg-[#7c3aed]/15 text-[#a78bfa] border border-[#7c3aed]/25',
  muted: 'bg-white/5 text-[#8888a0] border border-white/10',
}

export function Badge({ children, variant = 'muted', className }: Props) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  )
}
