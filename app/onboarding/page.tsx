import type { Metadata } from 'next'
import Link from 'next/link'
import { OnboardingFlow } from '@/components/onboarding/onboarding-flow'
import { Logo } from '@/components/sidequest/logo'

export const metadata: Metadata = { title: 'Set up your profile' }

export default function OnboardingPage() {
  return (
    <div className="min-h-dvh">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-4 py-6 sm:px-6">
        <Logo />
        <Link href="/home" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
          Skip for now
        </Link>
      </header>
      <main className="mx-auto max-w-3xl px-4 pt-4 pb-16 sm:px-6">
        <OnboardingFlow />
      </main>
    </div>
  )
}
