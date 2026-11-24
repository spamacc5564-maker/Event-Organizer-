import Image from 'next/image'
import Link from 'next/link'
import { Bike, Bus, Car, Clock, Footprints, MapPin } from 'lucide-react'
import { formatPrice, transitLabels, type SidequestEvent, type TransitMode } from '@/lib/data'
import { cn } from '@/lib/utils'
import { VerifiedBadge } from './badges'
import { SaveButton } from './save-button'

export const transitIcons: Record<TransitMode, typeof Bus> = {
  walk: Footprints,
  bus: Bus,
  bike: Bike,
  car: Car,
}

export function EventCard({ event, className, priority }: { event: SidequestEvent; className?: string; priority?: boolean }) {
  const TransitIcon = transitIcons[event.transit.mode]
  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift',
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={event.image || '/placeholder.svg'}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-3 top-3 flex items-start justify-between">
          <span className="rounded-full bg-card/95 px-3 py-1 text-xs font-bold text-foreground shadow-soft backdrop-blur">
            {event.date}
          </span>
          <SaveButton eventTitle={event.title} className="relative z-10" />
        </div>
        <span
          className={cn(
            'absolute bottom-3 left-3 rounded-full px-3 py-1 text-sm font-extrabold shadow-soft',
            event.price === 0 ? 'bg-highlight text-highlight-foreground' : 'bg-card text-foreground',
          )}
        >
          {formatPrice(event.price)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base leading-snug font-bold">
            <Link href={`/events/${event.id}`} className="after:absolute after:inset-0 focus-visible:outline-none">
              {event.title}
            </Link>
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{event.summary}</p>
        </div>
        <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-medium text-muted-foreground">
          <li className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden="true" />
            {event.start}
          </li>
          <li className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" aria-hidden="true" />
            {event.distanceKm} km
          </li>
          <li className="inline-flex items-center gap-1">
            <TransitIcon className="size-3.5" aria-hidden="true" />
            {event.transit.minutes} min {transitLabels[event.transit.mode]}
          </li>
        </ul>
        {event.organizer.verified && <VerifiedBadge className="self-start" />}
      </div>
    </article>
  )
}
