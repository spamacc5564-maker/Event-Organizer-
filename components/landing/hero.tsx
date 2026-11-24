import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Sparkles, Sun } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-2 lg:pt-20">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground shadow-soft">
            <Sparkles className="size-3.5 text-cta" aria-hidden="true" />
            AI weekend planner for ages 15–24
          </span>
          <h1 className="text-5xl leading-[1.02] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Your weekend, planned in{' '}
            <span className="relative inline-block">
              <span className="relative z-10">30 seconds</span>
              <span aria-hidden="true" className="absolute inset-x-0 bottom-1 -z-0 h-4 -rotate-1 rounded-full bg-highlight sm:h-5" />
            </span>
          </h1>
          <p className="max-w-lg text-lg text-pretty text-muted-foreground">
            Tell Sidequest the vibe, your budget and how you&apos;re getting around. We&apos;ll find safe, local
            events from verified organizers and build your whole Saturday and Sunday.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/signup" className={buttonVariants({ variant: 'cta', size: 'xl' })}>
              Plan my weekend
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <Link href="/home" className={buttonVariants({ variant: 'outline', size: 'xl' })}>
              Try the demo
            </Link>
          </div>
          <dl className="flex flex-wrap gap-8 pt-2">
            {[
              ['2,400+', 'local events weekly'],
              ['100%', 'organizers screened'],
              ['$0', 'to use, always'],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="text-2xl font-extrabold">{value}</dd>
                <dd className="text-sm text-muted-foreground">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
            <Image
              src="/images/hero.png"
              alt="Friends laughing together at an outdoor evening festival"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -left-4 top-8 w-60 rounded-2xl border border-border bg-card p-4 shadow-lift sm:-left-10">
            <p className="text-xs font-bold tracking-wide text-muted-foreground uppercase">You asked for</p>
            <p className="mt-1 text-sm font-semibold">
              {'"Something active Saturday, chill Sunday, under $40, with my friends"'}
            </p>
          </div>

          <div className="absolute -right-3 bottom-24 flex items-center gap-3 rounded-2xl border border-border bg-card p-3 pr-4 shadow-lift sm:-right-8">
            <span className="grid size-10 place-items-center rounded-xl bg-highlight text-highlight-foreground">
              <Sun className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold">Sat · 9°C Sunny</p>
              <p className="text-xs text-muted-foreground">Perfect for the skate jam</p>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-card px-3 py-2 text-xs font-bold shadow-lift">
            <BadgeCheck className="size-4 text-success-foreground" aria-hidden="true" />
            7 events · $20 total · all verified
          </div>
        </div>
      </div>
    </section>
  )
}
