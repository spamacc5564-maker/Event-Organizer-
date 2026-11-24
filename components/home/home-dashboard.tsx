'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ArrowUp, CloudSun, SearchX, Sparkles } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { EventCard } from '@/components/sidequest/event-card'
import { FilterChip } from '@/components/sidequest/filter-chip'
import { EmptyState, EventCardSkeleton } from '@/components/sidequest/states'
import { events, weather, type SidequestEvent } from '@/lib/data'
import { cn } from '@/lib/utils'
import { AgentProgress, agentSteps } from './agent-progress'

const filters: { id: string; label: string; test: (e: SidequestEvent) => boolean }[] = [
  { id: 'free', label: 'Free', test: (e) => e.price === 0 },
  { id: 'under20', label: 'Under $20', test: (e) => e.price < 20 },
  { id: 'indoor', label: 'Indoor', test: (e) => e.indoor },
  { id: 'outdoor', label: 'Outdoor', test: (e) => !e.indoor },
  { id: 'friends', label: 'With friends', test: (e) => e.friendly },
  { id: 'nearby', label: 'Under 2 km', test: (e) => e.distanceKm < 2 },
]

const suggestions = [
  'Something active Saturday, chill Sunday, under $40, with friends',
  'Free stuff only, I need volunteer hours',
  'Rainy day ideas near downtown',
]

export function HomeDashboard() {
  const [prompt, setPrompt] = useState('')
  const [step, setStep] = useState<number | null>(null)
  const [active, setActive] = useState<string[]>([])

  const running = step !== null && step < agentSteps.length

  useEffect(() => {
    if (step === null || step >= agentSteps.length) return
    const id = setTimeout(() => setStep((s) => (s === null ? s : s + 1)), 850)
    return () => clearTimeout(id)
  }, [step])

  const visible = useMemo(
    () => events.filter((e) => active.every((id) => filters.find((f) => f.id === id)?.test(e))),
    [active],
  )

  function submit(value = prompt) {
    if (!value.trim() || running) return
    setPrompt(value)
    setStep(0)
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10">
      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-5 rounded-[2rem] bg-primary p-6 text-primary-foreground sm:p-8 dark:bg-secondary dark:text-secondary-foreground">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold text-highlight">Hey Maya</p>
            <h1 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              What do you want to do this weekend?
            </h1>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              submit()
            }}
            className="flex items-end gap-2 rounded-2xl bg-card p-2 text-card-foreground shadow-lift"
          >
            <label htmlFor="weekend-prompt" className="sr-only">
              Describe your ideal weekend
            </label>
            <textarea
              id="weekend-prompt"
              rows={2}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  if (e.nativeEvent.isComposing || e.keyCode === 229) return
                  e.preventDefault()
                  submit()
                }
              }}
              placeholder="Something active Saturday, chill Sunday, under $40, with my friends…"
              className="min-h-14 flex-1 resize-none bg-transparent px-3 py-2.5 text-base placeholder:text-muted-foreground focus:outline-none"
            />
            <Button type="submit" variant="cta" size="icon-lg" className="size-12 shrink-0 rounded-xl" disabled={!prompt.trim() || running} aria-label="Plan my weekend">
              <ArrowUp className="size-5" aria-hidden="true" />
            </Button>
          </form>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => submit(s)}
                disabled={running}
                className="rounded-full bg-white/10 px-3 py-1.5 text-left text-xs font-semibold transition-colors hover:bg-white/20 disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <aside aria-label="Weekend weather" className="flex flex-col gap-4 rounded-[2rem] border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold">Weekend forecast</h2>
            <CloudSun className="size-5 text-muted-foreground" aria-hidden="true" />
          </div>
          <ul className="flex flex-col gap-3">
            {weather.map((w) => (
              <li key={w.day} className={cn('flex items-center gap-4 rounded-2xl p-4', w.condition === 'Sunny' ? 'bg-highlight/30' : 'bg-muted')}>
                <span className="text-3xl font-extrabold">{w.high}°</span>
                <div className="flex-1">
                  <p className="font-bold">
                    {w.day} · {w.condition}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Low {w.low}° · {w.precip}% rain
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground">Sunday looks gray — we added indoor backups to your plan.</p>
        </aside>
      </section>

      {step !== null && (
        <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <AgentProgress current={step} />
          <div className="flex flex-col justify-center gap-4 rounded-3xl border-2 border-dashed border-border p-6">
            <p className="text-sm font-bold text-muted-foreground uppercase">You asked</p>
            <p className="text-xl font-bold text-pretty">{`"${prompt}"`}</p>
            {running ? (
              <p className="text-sm text-muted-foreground">Hang tight, this usually takes about 5 seconds.</p>
            ) : (
              <Link href="/plan" className={cn(buttonVariants({ variant: 'cta', size: 'xl' }), 'self-start')}>
                View my weekend plan
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            )}
          </div>
        </section>
      )}

      <section aria-labelledby="picks-heading" className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 id="picks-heading" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
            <Sparkles className="size-5 text-cta" aria-hidden="true" />
            AI-picked for you
          </h2>
          <p className="text-sm text-muted-foreground">Based on Sports, Music, $40 budget and transit + bike.</p>
        </div>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filters">
          {filters.map((f) => (
            <FilterChip
              key={f.id}
              label={f.label}
              selected={active.includes(f.id)}
              onToggle={() => setActive((a) => (a.includes(f.id) ? a.filter((x) => x !== f.id) : [...a, f.id]))}
            />
          ))}
        </div>

        {running ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3" aria-busy="true">
            {Array.from({ length: 6 }, (_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : visible.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((e, i) => (
              <EventCard key={e.id} event={e} priority={i < 3} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<SearchX className="size-6" aria-hidden="true" />}
            title="No sidequests match those filters"
            description="Try removing a filter or two — or ask the planner above for something more specific."
            action={
              <Button variant="outline" size="pill" onClick={() => setActive([])}>
                Clear filters
              </Button>
            }
          />
        )}
      </section>
    </div>
  )
}
