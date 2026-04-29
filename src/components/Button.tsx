import { type ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'outline'

interface Props {
  href?: string
  onClick?: () => void
  variant?: Variant
  children: ReactNode
  external?: boolean
  className?: string
  disabled?: boolean
}

export default function Button({
  href,
  onClick,
  variant = 'ghost',
  children,
  external,
  className = '',
  disabled,
}: Props) {
  const base =
    'inline-flex items-center gap-2 px-4 py-2 rounded-pill text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 select-none'

  const variants: Record<Variant, string> = {
    primary: 'bg-accent text-bg hover:opacity-90 active:scale-[0.98]',
    ghost:   'text-ink-2 hover:text-ink hover:bg-border/60 active:scale-[0.98]',
    outline: 'border border-border text-ink-2 hover:border-ink-3 hover:text-ink active:scale-[0.98]',
  }

  const cls = `${base} ${variants[variant]} ${disabled ? 'opacity-40 pointer-events-none' : ''} ${className}`
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  if (href) return <a href={href} className={cls} {...ext}>{children}</a>
  return <button onClick={onClick} className={cls} disabled={disabled}>{children}</button>
}
