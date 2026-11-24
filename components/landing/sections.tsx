import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  MessageSquareText,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
  Wand2,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { EventCard } from '@/components/sidequest/event-card'
import { events, testimonials } from '@/lib/data'
import { cn } from '@/lib/utils'

function SectionHeading({ eyebrow, title, description, center }: { eyebrow: string; title: string; description?: string; center?: boolean }) {
  return (
    <div className={cn('flex max-w-2xl flex-col gap-3', center && 'mx-auto items-center text-center')}>
      <span className="text-sm font-extrabold tracking-wide text-cta uppercase">{eyebrow}</span>
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="text-lg text-pretty text-muted-foreground">{description}</p>}
    </div>
  )
}

const steps = [
  {
    icon: MessageSquareText,
    title: 'Say the vibe',
    body: 'Type it like you would text a friend: "outdoorsy Saturday, cheap food, home by 10."',
    color: 'bg-highlight text-highlight-foreground',
  },
  {
    icon: ShieldCheck,
    title: 'We do the digging',
    body: 'Our AI scans thousands of local listings, checks every organizer, and matches your budget and ride.',
    color: 'bg-cta text-cta-foreground',
  },
  {
    icon: CalendarCheck,
    title: 'Go have fun',
    body: 'Get a full Saturday + Sunday timeline. Save it, share it with friends, or drop it into your calendar.',
    color: 'bg-primary text-primary-foreground',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading center eyebrow="How it works" title="Three steps. Zero group-chat chaos." />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <span className={cn('grid size-12 place-items-center rounded-2xl', s.color)}>
                  <s.icon className="size-6" aria-hidden="true" />
                </span>
                <span className="text-5xl font-extrabold text-muted" aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function FeaturedEvents() {
  return (
    <section id="events" className="scroll-mt-20 bg-card py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="This weekend near you" title="Featured sidequests" description="Hand-checked, teen-friendly, and mostly free." />
          <Link href="/home" className={buttonVariants({ variant: 'outline', size: 'pill' })}>
            See all events
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 6).map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </div>
    </section>
  )
}

const organizerPerks = [
  { icon: Target, title: 'Reach the right age group', body: 'Show up for 15–24s who match your vibe, budget and neighborhood.' },
  { icon: Wand2, title: 'AI writes your listing', body: 'Drop a title and we draft the description, tags and target age.' },
  { icon: BarChart3, title: 'Know what works', body: 'Track views, saves and RSVPs week over week.' },
]

export function ForOrganizers() {
  return (
    <section id="organizers" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 overflow-hidden rounded-[2rem] bg-primary p-8 text-primary-foreground sm:p-12 lg:grid-cols-2 dark:bg-secondary dark:text-secondary-foreground">
          <div className="flex flex-col items-start gap-5">
            <span className="text-sm font-extrabold tracking-wide text-highlight uppercase">For organizers</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Your event, in front of the people who actually want to go.
            </h2>
            <p className="text-lg opacity-80">
              Libraries, rec centers, cafés, nonprofits and clubs use Sidequest to fill spots with young people —
              safely. Every organizer is verified before going live.
            </p>
            <Link href="/signup?role=organizer" className={buttonVariants({ variant: 'highlight', size: 'xl' })}>
              List your event free
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          </div>
          <ul className="flex flex-col gap-4">
            {organizerPerks.map((p) => (
              <li key={p.title} className="flex gap-4 rounded-2xl bg-white/10 p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-highlight text-highlight-foreground">
                  <p.icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-bold">{p.title}</h3>
                  <p className="text-sm opacity-80">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function Testimonials() {
  return (
    <section id="stories" className="scroll-mt-20 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading center eyebrow="Stories" title="Weekends people actually remember" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className={cn(
                'flex flex-col gap-5 rounded-3xl border border-border p-6 shadow-soft',
                i === 1 ? 'bg-highlight text-highlight-foreground' : 'bg-card',
              )}
            >
              <Quote className="size-8 text-cta" aria-hidden="true" />
              <blockquote className="flex-1 text-lg leading-relaxed font-medium">{t.quote}</blockquote>
              <figcaption>
                <p className="font-bold">{t.name}</p>
                <p className={cn('text-sm', i === 1 ? 'opacity-80' : 'text-muted-foreground')}>{t.detail}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FinalCta() {
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 rounded-[2rem] border border-border bg-card p-10 text-center shadow-soft sm:p-16">
          <Sparkles className="size-10 text-cta" aria-hidden="true" />
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-5xl">This weekend is already loading.</h2>
          <p className="max-w-lg text-lg text-muted-foreground">Join free in under a minute. No spam — just one Thursday email with your picks.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/signup" className={buttonVariants({ variant: 'cta', size: 'xl' })}>
              Sign up free
            </Link>
            <Link href="/login" className={buttonVariants({ variant: 'outline', size: 'xl' })}>
              Log in
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
