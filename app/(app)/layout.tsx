import { Bell } from 'lucide-react'
import { MobileNav, SidebarNav } from '@/components/app-shell/app-nav'
import { Logo } from '@/components/sidequest/logo'
import { ThemeToggle } from '@/components/sidequest/theme-toggle'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[248px_1fr]">
      <aside className="sticky top-0 hidden h-dvh flex-col gap-8 border-r border-border bg-sidebar p-5 lg:flex">
        <Logo href="/home" />
        <SidebarNav />
        <div className="mt-auto flex flex-col gap-3 rounded-2xl bg-highlight p-4 text-highlight-foreground">
          <p className="text-sm font-extrabold">Thursday drop</p>
          <p className="text-xs font-medium opacity-80">Your next weekend picks land in your inbox Thursday at 5 PM.</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/85 px-4 backdrop-blur-lg sm:px-6">
          <Logo href="/home" className="lg:hidden" />
          <p className="hidden text-sm font-semibold text-muted-foreground lg:block">Toronto · Weekend of Nov 28</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Notifications, 2 unread"
              className="relative grid size-10 place-items-center rounded-full border border-border bg-card hover:bg-muted"
            >
              <Bell className="size-4" aria-hidden="true" />
              <span className="absolute top-2 right-2.5 size-2 rounded-full bg-cta" />
            </button>
            <ThemeToggle />
            <span className="grid size-10 place-items-center rounded-full bg-cta text-sm font-extrabold text-cta-foreground" aria-label="Maya R.">
              MR
            </span>
          </div>
        </header>
        <main className="flex-1 px-4 pt-6 pb-28 sm:px-6 lg:px-10 lg:pb-12">{children}</main>
      </div>

      <MobileNav />
    </div>
  )
}
