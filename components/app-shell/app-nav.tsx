'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bookmark, CalendarRange, Home, Megaphone, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

export const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/plan', label: 'My Plan', icon: CalendarRange },
  { href: '/saved', label: 'Saved', icon: Bookmark },
  { href: '/organizer', label: 'Organizer', icon: Megaphone },
  { href: '/settings', label: 'Settings', icon: Settings },
]

function useIsActive() {
  const pathname = usePathname()
  return (href: string) => pathname === href || pathname.startsWith(`${href}/`)
}

export function SidebarNav() {
  const isActive = useIsActive()
  return (
    <nav aria-label="App" className="flex flex-col gap-1">
      {navItems.map((item) => {
        const active = isActive(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors',
              active ? 'bg-primary text-primary-foreground shadow-soft' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <item.icon className="size-5" aria-hidden="true" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export function MobileNav() {
  const isActive = useIsActive()
  return (
    <nav
      aria-label="App"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg lg:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex flex-col items-center gap-1 py-2.5 text-[11px] font-bold transition-colors',
                  active ? 'text-cta' : 'text-muted-foreground',
                )}
              >
                <span className={cn('grid h-7 w-12 place-items-center rounded-full', active && 'bg-cta/15')}>
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
