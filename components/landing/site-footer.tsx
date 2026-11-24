import Link from 'next/link'
import { Logo } from '@/components/sidequest/logo'

const columns = [
  { title: 'Product', links: [['Plan a weekend', '/home'], ['Saved plans', '/saved'], ['Settings', '/settings']] },
  { title: 'Organizers', links: [['List an event', '/organizer'], ['Verification', '/organizer'], ['Analytics', '/organizer']] },
  { title: 'Company', links: [['Safety', '/#how-it-works'], ['Parents', '/#stories'], ['Contact', '/#organizers']] },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            The AI weekend planner for teens and young adults. Safe, local, and built for your budget.
          </p>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title} className="flex flex-col gap-3">
            <h2 className="text-sm font-bold">{c.title}</h2>
            {c.links.map(([label, href]) => (
              <Link key={label} href={href} className="text-sm text-muted-foreground hover:text-foreground">
                {label}
              </Link>
            ))}
          </nav>
        ))}
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground sm:px-6">
          © 2026 Sidequest. Made for weekends.
        </p>
      </div>
    </footer>
  )
}
