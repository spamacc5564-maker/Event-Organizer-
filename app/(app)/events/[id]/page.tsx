import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, Clock, MapPin, Sparkles, Star, Users } from 'lucide-react'
import { Tag, VerifiedBadge } from '@/components/sidequest/badges'
import { transitIcons } from '@/components/sidequest/event-card'
import { EventActions } from '@/components/event/event-actions'
import { events, formatPrice, getEvent, transitLabels } from '@/lib/data'

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const event = getEvent(id)
  return { title: event?.title ?? 'Event', description: event?.summary }
}

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = getEvent(id)
  if (!event) notFound()
  const Transit = transitIcons[event.transit.mode]

  const facts = [
    { icon: CalendarDays, label: 'Date', value: event.date },
    { icon: Clock, label: 'Time', value: `${event.start} – ${event.end}` },
    { icon: MapPin, label: 'Distance', value: `${event.distanceKm} km away` },
    { icon: Transit, label: 'Getting there', value: `${event.transit.minutes} min ${transitLabels[event.transit.mode]}` },
    { icon: Users, label: 'Ages', value: event.ages },
  ]

  return (
    <article className="mx-auto flex max-w-6xl flex-col gap-8">
      <Link href="/home" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to picks
      </Link>

      <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] shadow-lift sm:aspect-[21/9]">
        <Image src={event.image || '/placeholder.svg'} alt={event.title} fill priority sizes="(min-width: 1280px) 1152px, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-x-5 bottom-5 flex flex-col gap-3 text-white sm:inset-x-8 sm:bottom-8">
          <div className="flex flex-wrap gap-2">
            {event.organizer.verified && <VerifiedBadge />}
            <span className="rounded-full bg-highlight px-3 py-1 text-xs font-extrabold text-highlight-foreground">{formatPrice(event.price)}</span>
          </div>
          <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">{event.title}</h1>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-8">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-4">
                <f.icon className="size-5 text-cta" aria-hidden="true" />
                <dt className="text-xs font-semibold text-muted-foreground">{f.label}</dt>
                <dd className="text-sm font-bold">{f.value}</dd>
              </div>
            ))}
          </dl>

          <section className="flex flex-col gap-3 rounded-3xl bg-highlight/25 p-6">
            <h2 className="flex items-center gap-2 font-extrabold">
              <Sparkles className="size-5 text-cta" aria-hidden="true" />
              Why Sidequest picked this
            </h2>
            <ul className="flex flex-wrap gap-2">
              {event.whyPicked.map((w) => (
                <li key={w} className="rounded-full bg-card px-3 py-1.5 text-sm font-semibold">
                  {w}
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-extrabold">About</h2>
            {event.description.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed text-pretty text-muted-foreground">
                {p}
              </p>
            ))}
            <div className="flex flex-wrap gap-2">
              {event.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-extrabold">Location</h2>
            <div className="overflow-hidden rounded-3xl border border-border">
              <iframe
                title={`Map of ${event.venue}`}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${event.lng - 0.01}%2C${event.lat - 0.006}%2C${event.lng + 0.01}%2C${event.lat + 0.006}&layer=mapnik&marker=${event.lat}%2C${event.lng}`}
                className="h-72 w-full"
                loading="lazy"
              />
              <div className="flex items-center gap-3 bg-card p-4">
                <MapPin className="size-5 shrink-0 text-cta" aria-hidden="true" />
                <div>
                  <p className="font-bold">{event.venue}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.address} · {event.neighborhood}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
          <EventActions title={event.title} price={event.price} going={event.going} spotsLeft={event.spotsLeft} />

          <section className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-sm font-bold text-muted-foreground uppercase">Organizer</h2>
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary font-extrabold text-primary-foreground">
                {event.organizer.initials}
              </span>
              <div className="min-w-0">
                <p className="font-bold">{event.organizer.name}</p>
                {event.organizer.verified && <VerifiedBadge compact className="mt-1" />}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{event.organizer.bio}</p>
            <dl className="grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
              <div>
                <dd className="inline-flex items-center gap-1 font-extrabold">
                  <Star className="size-4 fill-highlight text-highlight" aria-hidden="true" />
                  {event.organizer.rating}
                </dd>
                <dt className="text-xs text-muted-foreground">Rating</dt>
              </div>
              <div>
                <dd className="font-extrabold">{event.organizer.eventsHosted}</dd>
                <dt className="text-xs text-muted-foreground">Events</dt>
              </div>
              <div>
                <dd className="font-extrabold">{event.organizer.since}</dd>
                <dt className="text-xs text-muted-foreground">Since</dt>
              </div>
            </dl>
          </section>
        </aside>
      </div>
    </article>
  )
}
