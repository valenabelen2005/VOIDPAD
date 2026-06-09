import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
}

const variants: Record<Variant, string> = {
  primary: 'bg-[#00e5ff] text-[#0a0a0f] font-semibold hover:bg-[#00b8cc] active:scale-[0.98]',
  secondary: 'bg-[#7c3aed] text-white font-semibold hover:bg-[#5b21b6] active:scale-[0.98]',
  ghost: 'text-[#f0f0f5] hover:text-[#00e5ff] hover:bg-white/5',
  outline: 'border border-[#1e1e2e] text-[#f0f0f5] hover:border-[#00e5ff] hover:text-[#00e5ff]',
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3.5 text-base rounded-xl',
}

export function Button({ variant = 'primary', size = 'md', fullWidth, className, children, ...props }: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
