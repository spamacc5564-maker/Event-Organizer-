import Link from 'next/link'
import { Compass } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({ className, href = '/' }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      className={cn('inline-flex items-center gap-2 font-extrabold tracking-tight text-foreground', className)}
    >
      <span className="relative grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
        <Compass className="size-5" aria-hidden="true" />
        <span className="absolute -top-0.5 -right-0.5 size-3 rounded-full border-2 border-background bg-cta" />
      </span>
      <span className="text-lg">Sidequest</span>
    </Link>
  )
}
