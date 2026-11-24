'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Monitor, Moon, Sun } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { FilterChip } from '@/components/sidequest/filter-chip'
import { interests, type Category } from '@/lib/data'
import { cn } from '@/lib/utils'

const notificationOptions = [
  { id: 'thursday', label: 'Thursday weekend drop', description: 'Your AI-built plan every Thursday at 5 PM.', default: true },
  { id: 'friends', label: 'Friend invites', description: 'When someone adds you to their plan.', default: true },
  { id: 'reminders', label: 'Event reminders', description: '2 hours before anything in your plan.', default: true },
  { id: 'weather', label: 'Weather swaps', description: 'Suggest indoor backups if rain is forecast.', default: false },
]

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-b border-border py-8 first:pt-0 last:border-0 md:grid-cols-[240px_1fr]">
      <div>
        <h2 className="font-extrabold">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  )
}

export function SettingsForm() {
  const { theme, setTheme } = useTheme()
  const [picked, setPicked] = useState<Category[]>(['sports', 'music', 'food'])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        toast.success('Settings saved')
      }}
      className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
    >
      <Section title="Profile" description="How you show up to friends.">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="s-name">First name</Label>
            <Input id="s-name" defaultValue="Maya" className="h-11 rounded-xl" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="s-area">Neighborhood</Label>
            <Input id="s-area" defaultValue="Leslieville" className="h-11 rounded-xl" />
          </div>
        </div>
      </Section>

      <Section title="Interests" description="Used to rank your AI picks.">
        <div className="flex flex-wrap gap-2">
          {interests.map((i) => (
            <FilterChip
              key={i.id}
              label={i.label}
              selected={picked.includes(i.id)}
              onToggle={() => setPicked((p) => (p.includes(i.id) ? p.filter((x) => x !== i.id) : [...p, i.id]))}
            />
          ))}
        </div>
      </Section>

      <Section title="Notifications" description="We keep it light. Promise.">
        {notificationOptions.map((n) => (
          <div key={n.id} className="flex items-start justify-between gap-4">
            <div>
              <Label htmlFor={`n-${n.id}`} className="font-bold">
                {n.label}
              </Label>
              <p className="text-sm text-muted-foreground">{n.description}</p>
            </div>
            <Switch id={`n-${n.id}`} defaultChecked={n.default} />
          </div>
        ))}
      </Section>

      <Section title="Appearance" description="Easy on the eyes at 1 AM.">
        <div role="radiogroup" aria-label="Theme" className="grid grid-cols-3 gap-3">
          {[
            { id: 'light', label: 'Light', icon: Sun },
            { id: 'dark', label: 'Dark', icon: Moon },
            { id: 'system', label: 'System', icon: Monitor },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={theme === t.id}
              onClick={() => setTheme(t.id)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-sm font-bold transition-colors',
                theme === t.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40',
              )}
            >
              <t.icon className="size-5" aria-hidden="true" />
              {t.label}
            </button>
          ))}
        </div>
      </Section>

      <div className="flex justify-end pt-2">
        <Button type="submit" variant="cta" size="xl">
          Save changes
        </Button>
      </div>
    </form>
  )
}
