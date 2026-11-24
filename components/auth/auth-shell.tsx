import Image from 'next/image'
import { BadgeCheck } from 'lucide-react'
import { Logo } from '@/components/sidequest/logo'
import { ThemeToggle } from '@/components/sidequest/theme-toggle'

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="flex flex-col px-4 py-6 sm:px-10">
        <div className="flex items-center justify-between">
          <Logo />
          <ThemeToggle />
        </div>
        <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-8 py-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          {children}
        </main>
      </div>
      <div className="relative hidden p-4 lg:block">
        <div className="relative h-full overflow-hidden rounded-[2rem]">
          <Image src="/images/skate.png" alt="" fill sizes="50vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
          <div className="absolute inset-x-8 bottom-8 flex flex-col gap-4 text-white">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur">
              <BadgeCheck className="size-4" aria-hidden="true" />
              Every organizer verified
            </span>
            <p className="text-3xl leading-tight font-extrabold text-balance">
              Less scrolling. More skate jams, open mics and late-night tacos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
