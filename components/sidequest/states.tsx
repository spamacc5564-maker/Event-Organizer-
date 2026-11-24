import { TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export function EventCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card" aria-hidden="true">
      <div className="shimmer aspect-[4/3]" />
      <div className="flex flex-col gap-3 p-4">
        <div className="shimmer h-4 w-3/4 rounded-full" />
        <div className="shimmer h-3 w-full rounded-full" />
        <div className="shimmer h-3 w-2/3 rounded-full" />
        <div className="mt-2 flex gap-3">
          <div className="shimmer h-3 w-14 rounded-full" />
          <div className="shimmer h-3 w-14 rounded-full" />
          <div className="shimmer h-3 w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-border bg-card/50 px-6 py-12 text-center',
        className,
      )}
    >
      <div className="grid size-14 place-items-center rounded-2xl bg-highlight/30 text-foreground">{icon}</div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  )
}

export function StatCard({
  label,
  value,
  change,
  trend,
  icon,
}: {
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ReactNode
}) {
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-muted-foreground">{label}</span>
        <span className="grid size-9 place-items-center rounded-xl bg-secondary text-secondary-foreground">{icon}</span>
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="text-3xl font-extrabold tracking-tight">{value}</span>
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold',
            trend === 'up' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground',
          )}
        >
          <TrendIcon className="size-3" aria-hidden="true" />
          {change}
        </span>
      </div>
    </div>
  )
}
