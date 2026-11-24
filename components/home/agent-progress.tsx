import { Check, CloudSun, Loader2, MapPinned, Search, ShieldCheck, Sparkles, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'

export const agentSteps = [
  { label: 'Searching local events', detail: '2,418 listings within 10 km', icon: Search },
  { label: 'Checking weather', detail: 'Sat sunny 9°C · Sun cloudy 6°C', icon: CloudSun },
  { label: 'Calculating travel time', detail: 'Transit + bike routes from Leslieville', icon: MapPinned },
  { label: 'Filtering by budget', detail: '186 events fit under $40', icon: Wallet },
  { label: 'Verifying organizers', detail: '7 hosts confirmed and safety-checked', icon: ShieldCheck },
  { label: 'Building your plan', detail: 'Balancing active + chill across 2 days', icon: Sparkles },
]

export function AgentProgress({ current }: { current: number }) {
  const done = current >= agentSteps.length
  return (
    <section
      aria-live="polite"
      aria-label="Sidequest agent progress"
      className="rounded-3xl border border-border bg-card p-5 shadow-lift sm:p-6"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className={cn('grid size-10 place-items-center rounded-xl', done ? 'bg-success text-success-foreground' : 'bg-cta text-cta-foreground')}>
          {done ? <Check className="size-5" aria-hidden="true" /> : <Sparkles className="size-5 animate-pulse" aria-hidden="true" />}
        </span>
        <div>
          <h2 className="font-extrabold">{done ? 'Your weekend is ready' : 'Planning your weekend…'}</h2>
          <p className="text-sm text-muted-foreground">
            {done ? '7 events · 2 days · $20 total' : `Step ${Math.min(current + 1, agentSteps.length)} of ${agentSteps.length}`}
          </p>
        </div>
      </div>
      <ol className="flex flex-col">
        {agentSteps.map((s, i) => {
          const state = i < current ? 'done' : i === current ? 'active' : 'pending'
          return (
            <li key={s.label} className="relative flex gap-3 pb-4 last:pb-0">
              {i < agentSteps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn('absolute top-8 left-[15px] h-[calc(100%-28px)] w-0.5 rounded-full', state === 'done' ? 'bg-success-foreground/40' : 'bg-border')}
                />
              )}
              <span
                className={cn(
                  'relative z-10 grid size-8 shrink-0 place-items-center rounded-full transition-colors',
                  state === 'done' && 'bg-success text-success-foreground',
                  state === 'active' && 'bg-primary text-primary-foreground',
                  state === 'pending' && 'bg-muted text-muted-foreground',
                )}
              >
                {state === 'done' ? (
                  <Check className="size-4" aria-hidden="true" />
                ) : state === 'active' ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <s.icon className="size-4" aria-hidden="true" />
                )}
              </span>
              <div className={cn('pt-1 transition-opacity', state === 'pending' && 'opacity-50')}>
                <p className="text-sm font-bold">
                  {s.label}
                  <span className="sr-only">{state === 'done' ? ' — done' : state === 'active' ? ' — in progress' : ' — waiting'}</span>
                </p>
                {state !== 'pending' && <p className="text-xs text-muted-foreground">{s.detail}</p>}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
