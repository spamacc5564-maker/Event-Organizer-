import type { Metadata } from 'next'
import { Bookmark, Eye, Ticket, Users } from 'lucide-react'
import { VerifiedBadge } from '@/components/sidequest/badges'
import { StatCard } from '@/components/sidequest/states'
import { EngagementChart } from '@/components/organizer/engagement-chart'
import { EventComposer } from '@/components/organizer/event-composer'
import { organizerEvents, organizerStats } from '@/lib/data'
import { cn } from '@/lib/utils'

export const metadata: Metadata = { title: 'Organizer Dashboard' }

const statIcons = [Eye, Bookmark, Ticket, Users]

const statusStyles: Record<string, string> = {
  Live: 'bg-success text-success-foreground',
  Draft: 'bg-highlight/40 text-highlight-foreground',
  Ended: 'bg-muted text-muted-foreground',
}

export default function OrganizerPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold text-muted-foreground">Organizer</p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Don Valley Green Team</h1>
        </div>
        <VerifiedBadge className="self-start sm:self-auto" />
      </header>

      <section aria-label="Stats" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {organizerStats.map((s, i) => {
          const Icon = statIcons[i]
          return <StatCard key={s.label} {...s} icon={<Icon className="size-4" aria-hidden="true" />} />
        })}
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-6">
          <section className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-extrabold">Engagement · last 8 weeks</h2>
              <div className="flex gap-4 text-xs font-semibold text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-primary" /> Views
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-cta" /> Saves
                </span>
              </div>
            </div>
            <EngagementChart />
          </section>

          <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <h2 className="p-6 pb-3 text-lg font-extrabold">Your events</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs font-semibold text-muted-foreground">
                    <th scope="col" className="px-6 py-3">Event</th>
                    <th scope="col" className="px-3 py-3">Status</th>
                    <th scope="col" className="px-3 py-3 text-right">Views</th>
                    <th scope="col" className="px-3 py-3 text-right">Saves</th>
                    <th scope="col" className="px-6 py-3 text-right">RSVPs</th>
                  </tr>
                </thead>
                <tbody>
                  {organizerEvents.map((e) => (
                    <tr key={e.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="px-6 py-4">
                        <p className="font-bold">{e.title}</p>
                        <p className="text-xs text-muted-foreground">{e.date}</p>
                      </td>
                      <td className="px-3 py-4">
                        <span className={cn('rounded-full px-2.5 py-1 text-xs font-bold', statusStyles[e.status])}>{e.status}</span>
                      </td>
                      <td className="px-3 py-4 text-right font-semibold tabular-nums">{e.views.toLocaleString()}</td>
                      <td className="px-3 py-4 text-right font-semibold tabular-nums">{e.saves.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right font-semibold tabular-nums">{e.rsvps}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <EventComposer />
        </aside>
      </div>
    </div>
  )
}
