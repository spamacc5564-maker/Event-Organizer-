'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { CalendarPlus, CloudRain, RefreshCw, Share2, Sparkles, Umbrella, Wallet } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { VerifiedBadge, WeatherBadge } from '@/components/sidequest/badges'
import { transitIcons } from '@/components/sidequest/event-card'
import { formatPrice, friends, getEvent, transitLabels, weather, weekendPlan, type SidequestEvent } from '@/lib/data'
import { cn } from '@/lib/utils'

const resolve = (ids: string[]) => ids.map(getEvent).filter((e): e is SidequestEvent => Boolean(e))

function TimelineItem({ event, last }: { event: SidequestEvent; last: boolean }) {
  const Transit = transitIcons[event.transit.mode]
  return (
    <li className="relative grid grid-cols-[64px_1fr] gap-4 sm:grid-cols-[80px_1fr]">
      <div className="flex flex-col items-end pt-4">
        <span className="text-sm font-extrabold">{event.start}</span>
        <span className="text-xs text-muted-foreground">{event.end}</span>
      </div>
      <div className="relative pb-6">
        <span aria-hidden="true" className="absolute top-5 -left-[11px] size-3 rounded-full border-2 border-background bg-cta ring-2 ring-cta/30" />
        {!last && <span aria-hidden="true" className="absolute top-8 bottom-0 -left-[6px] w-0.5 bg-border" />}
        <Link
          href={`/events/${event.id}`}
          className="ml-3 flex gap-4 rounded-2xl border border-border bg-card p-3 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
        >
          <div className="relative size-20 shrink-0 overflow-hidden rounded-xl sm:size-24">
            <Image src={event.image || '/placeholder.svg'} alt="" fill sizes="96px" className="object-cover" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1.5 py-0.5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="leading-snug font-bold">{event.title}</h3>
              <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-xs font-extrabold', event.price === 0 ? 'bg-highlight text-highlight-foreground' : 'bg-muted')}>
                {formatPrice(event.price)}
              </span>
            </div>
            <p className="truncate text-sm text-muted-foreground">{event.venue}</p>
            <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Transit className="size-3.5" aria-hidden="true" />
                {event.transit.minutes} min {transitLabels[event.transit.mode]}
              </span>
              {event.organizer.verified && <VerifiedBadge compact className="py-0.5" />}
            </div>
          </div>
        </Link>
      </div>
    </li>
  )
}

export function PlanView() {
  const [day, setDay] = useState<'Sat' | 'Sun'>('Sat')
  const sat = resolve(weekendPlan.saturday)
  const sun = resolve(weekendPlan.sunday)
  const backups = resolve(weekendPlan.backups)
  const all = [...sat, ...sun]
  const total = all.reduce((s, e) => s + e.price, 0)
  const list = day === 'Sat' ? sat : sun
  const w = weather.find((x) => x.day === day)!

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <header className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div className="flex flex-col gap-2">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-cta/15 px-3 py-1 text-xs font-bold text-cta">
            <Sparkles className="size-3.5" aria-hidden="true" />
            AI-built · Nov 28 – 29
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{weekendPlan.title}</h1>
          <p className="text-muted-foreground">{weekendPlan.vibe}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="pill" onClick={() => toast.success('Regenerating with the same vibe…')}>
            <RefreshCw className="size-4" aria-hidden="true" />
            Regenerate
          </Button>
          <Button variant="outline" size="pill" onClick={() => toast.success('Added 7 events to your calendar')}>
            <CalendarPlus className="size-4" aria-hidden="true" />
            Add to calendar
          </Button>
          <Button variant="cta" size="pill" onClick={() => toast.success('Invite link copied', { description: 'Send it to the group chat.' })}>
            <Share2 className="size-4" aria-hidden="true" />
            Share with friends
          </Button>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <section aria-label="Timeline" className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <div role="tablist" aria-label="Day" className="inline-flex rounded-full border border-border bg-card p-1">
              {(['Sat', 'Sun'] as const).map((d) => (
                <button
                  key={d}
                  role="tab"
                  type="button"
                  aria-selected={day === d}
                  onClick={() => setDay(d)}
                  className={cn(
                    'rounded-full px-5 py-2 text-sm font-bold transition-colors',
                    day === d ? 'bg-primary text-primary-foreground shadow-soft' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {d === 'Sat' ? 'Saturday' : 'Sunday'}
                </button>
              ))}
            </div>
            <WeatherBadge condition={w.condition} high={w.high} />
          </div>
          <ol role="tabpanel" aria-label={day === 'Sat' ? 'Saturday' : 'Sunday'} className="pl-1">
            {list.map((e, i) => (
              <TimelineItem key={e.id} event={e} last={i === list.length - 1} />
            ))}
          </ol>
        </section>

        <aside className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 rounded-3xl bg-primary p-6 text-primary-foreground dark:bg-secondary dark:text-secondary-foreground">
            <div className="flex items-center gap-2 text-sm font-bold opacity-80">
              <Wallet className="size-4" aria-hidden="true" />
              Weekend total
            </div>
            <p className="text-5xl font-extrabold">${total}</p>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-highlight" style={{ width: `${(total / 40) * 100}%` }} />
            </div>
            <p className="text-sm opacity-80">${40 - total} left of your $40 budget · {all.filter((e) => e.price === 0).length} free events</p>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-extrabold">Going with</h2>
            <div className="flex -space-x-2">
              {friends.map((f) => (
                <span key={f.name} className={cn('grid size-11 place-items-center rounded-full border-2 border-card text-sm font-extrabold', f.color)} title={f.name}>
                  {f.initials}
                  <span className="sr-only">{f.name}</span>
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Theo and Ines accepted. Dev hasn&apos;t replied yet.</p>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border-2 border-dashed border-border p-6">
            <div className="flex items-center gap-2">
              <Umbrella className="size-5 text-primary" aria-hidden="true" />
              <h2 className="font-extrabold">Rain backups</h2>
            </div>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <CloudRain className="size-4" aria-hidden="true" />
              30% chance Sunday. Swap in one tap.
            </p>
            <ul className="flex flex-col gap-2">
              {backups.map((b) => (
                <li key={b.id}>
                  <Link href={`/events/${b.id}`} className="flex items-center gap-3 rounded-xl p-2 hover:bg-muted">
                    <span className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                      <Image src={b.image || '/placeholder.svg'} alt="" fill sizes="48px" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold">{b.title}</span>
                      <span className="text-xs text-muted-foreground">
                        Indoor · {formatPrice(b.price)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
