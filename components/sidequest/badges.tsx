import { BadgeCheck, Cloud, CloudRain, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

export function VerifiedBadge({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-success px-2.5 py-1 text-xs font-semibold text-success-foreground',
        className,
      )}
    >
      <BadgeCheck className="size-3.5" aria-hidden="true" />
      {compact ? 'Verified' : 'Verified Organizer'}
    </span>
  )
}

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground',
        className,
      )}
    >
      {children}
    </span>
  )
}

const weatherIcons = { Sunny: Sun, Cloudy: Cloud, Rain: CloudRain } as const

export function WeatherBadge({
  condition,
  high,
  className,
}: {
  condition: keyof typeof weatherIcons
  high: number
  className?: string
}) {
  const Icon = weatherIcons[condition]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-highlight/25 px-2.5 py-1 text-xs font-semibold text-foreground',
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {high}°C · {condition}
    </span>
  )
}
