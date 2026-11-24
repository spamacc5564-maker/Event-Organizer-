import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Logo } from '@/components/sidequest/logo'
import { ThemeToggle } from '@/components/sidequest/theme-toggle'
import { cn } from '@/lib/utils'

const links = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#events', label: 'Events' },
  { href: '#organizers', label: 'For organizers' },
  { href: '#stories', label: 'Stories' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: 'ghost', size: 'pill' }), 'hidden font-semibold sm:inline-flex')}
          >
            Log in
          </Link>
          <Link href="/signup" className={buttonVariants({ variant: 'cta', size: 'pill' })}>
            Sign up free
          </Link>
        </div>
      </div>
    </header>
  )
}
