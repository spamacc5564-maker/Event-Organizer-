'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FilterChip({
  label,
  selected,
  onToggle,
  icon,
  size = 'md',
}: {
  label: string
  selected: boolean
  onToggle: () => void
  icon?: React.ReactNode
  size?: 'md' | 'lg'
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={cn(
        'inline-flex shrink-0 items-center gap-2 rounded-full border font-semibold transition-all focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
        size === 'md' ? 'h-9 px-4 text-sm' : 'h-12 px-5 text-base',
        selected
          ? 'border-primary bg-primary text-primary-foreground shadow-soft'
          : 'border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary',
      )}
    >
      {selected ? <Check className="size-4" aria-hidden="true" /> : icon}
      {label}
    </button>
  )
}
