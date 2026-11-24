import type { Metadata } from 'next'
import { SettingsForm } from '@/components/settings/settings-form'

export const metadata: Metadata = { title: 'Settings' }

export default function SettingsPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Settings</h1>
        <p className="text-muted-foreground">Tune your picks, notifications and look.</p>
      </header>
      <SettingsForm />
    </div>
  )
}
