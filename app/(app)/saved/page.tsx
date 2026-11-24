import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Bookmark, CalendarRange } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { EventCard } from '@/components/sidequest/event-card'
import { EmptyState } from '@/components/sidequest/states'
import { events, savedPlans } from '@/lib/data'
import { cn } from '@/lib/utils'

export const metadata: Metadata = { title: 'Saved' }

export default function SavedPage() {
  const savedEvents = events.slice(2, 5)
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Saved</h1>
        <p className="text-muted-foreground">Plans you&apos;ve built and events you&apos;re eyeing.</p>
      </header>

      <section aria-labelledby="plans" className="flex flex-col gap-5">
        <h2 id="plans" className="flex items-center gap-2 text-xl font-extrabold">
          <CalendarRange className="size-5 text-cta" aria-hidden="true" />
          Weekend plans
        </h2>
        <ul className="grid gap-5 md:grid-cols-3">
          {savedPlans.map((p) => (
            <li key={p.id}>
              <Link href="/plan" className="group flex h-full flex-col gap-4 rounded-3xl border border-border bg-card p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift">
                <div className="grid h-36 grid-cols-3 gap-1.5 overflow-hidden rounded-2xl">
                  {p.images.map((src, i) => (
                    <div key={src} className={cn('relative', i === 0 && 'col-span-2 row-span-2')}>
                      <Image src={src || '/placeholder.svg'} alt="" fill sizes="200px" className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-1 flex-col gap-1 px-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-muted-foreground">{p.dates}</span>
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-xs font-bold',
                        p.status === 'Upcoming' ? 'bg-cta text-cta-foreground' : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {p.status}
                    </span>
                  </div>
                  <h3 className="font-bold">{p.title}</h3>
                  <p className="mt-auto pt-2 text-sm text-muted-foreground">
                    {p.events} events · {p.cost === 0 ? 'Free' : `$${p.cost} total`}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="events" className="flex flex-col gap-5">
        <h2 id="events" className="flex items-center gap-2 text-xl font-extrabold">
          <Bookmark className="size-5 text-cta" aria-hidden="true" />
          Saved events
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {savedEvents.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>

      <section aria-labelledby="past" className="flex flex-col gap-5">
        <h2 id="past" className="text-xl font-extrabold">
          Past RSVPs
        </h2>
        <EmptyState
          icon={<CalendarRange className="size-6" aria-hidden="true" />}
          title="No past RSVPs yet"
          description="When you RSVP to an event and it wraps up, it'll show up here so you can rate it."
          action={
            <Link href="/home" className={buttonVariants({ variant: 'cta', size: 'pill' })}>
              Find something this weekend
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          }
        />
      </section>
    </div>
  )
}
