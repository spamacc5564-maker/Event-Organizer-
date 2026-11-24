'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Bike,
  Bus,
  Car,
  Code2,
  Footprints,
  Gamepad2,
  HandHeart,
  Music,
  Palette,
  Trees,
  Trophy,
  UtensilsCrossed,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { FilterChip } from '@/components/sidequest/filter-chip'
import { interests, type Category, type TransitMode } from '@/lib/data'
import { cn } from '@/lib/utils'

const interestIcons: Record<Category, typeof Music> = {
  sports: Trophy,
  music: Music,
  art: Palette,
  gaming: Gamepad2,
  volunteering: HandHeart,
  outdoors: Trees,
  tech: Code2,
  food: UtensilsCrossed,
}

const transport: { id: TransitMode; label: string; icon: typeof Bus }[] = [
  { id: 'walk', label: 'Walking', icon: Footprints },
  { id: 'bus', label: 'Transit', icon: Bus },
  { id: 'bike', label: 'Bike', icon: Bike },
  { id: 'car', label: 'Car / rides', icon: Car },
]

const ageRanges = ['15–17', '18–20', '21–24']

const stepTitles = [
  { title: 'What are you into?', subtitle: 'Pick as many as you like. We use these to rank your picks.' },
  { title: 'Budget & getting around', subtitle: 'We only show what fits your wallet and your ride.' },
  { title: 'A little about you', subtitle: 'Helps us show age-appropriate events close to home.' },
]

export function OnboardingFlow() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<Category[]>(['sports', 'music'])
  const [budget, setBudget] = useState(40)
  const [modes, setModes] = useState<TransitMode[]>(['bus', 'bike'])
  const [age, setAge] = useState('15–17')
  const [area, setArea] = useState('')

  const toggle = <T,>(list: T[], value: T) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  const canContinue = step === 0 ? picked.length > 0 : step === 1 ? modes.length > 0 : area.trim().length > 0

  function next() {
    if (step < 2) return setStep(step + 1)
    toast.success('Profile ready', { description: 'Your first weekend plan is cooking.' })
    router.push('/home')
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm font-semibold text-muted-foreground">
          <span>
            Step {step + 1} of 3
          </span>
          <span>{Math.round(((step + 1) / 3) * 100)}%</span>
        </div>
        <div
          className="flex gap-2"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={3}
          aria-valuenow={step + 1}
          aria-label="Onboarding progress"
        >
          {[0, 1, 2].map((i) => (
            <span key={i} className={cn('h-2 flex-1 rounded-full transition-colors', i <= step ? 'bg-cta' : 'bg-muted')} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{stepTitles[step].title}</h1>
        <p className="text-muted-foreground">{stepTitles[step].subtitle}</p>
      </div>

      {step === 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {interests.map((i) => {
            const Icon = interestIcons[i.id]
            const selected = picked.includes(i.id)
            return (
              <button
                key={i.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setPicked(toggle(picked, i.id))}
                className={cn(
                  'flex flex-col items-start gap-6 rounded-2xl border-2 p-4 text-left font-bold transition-all focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                  selected ? 'border-primary bg-primary text-primary-foreground shadow-lift' : 'border-border bg-card hover:border-primary/40',
                )}
              >
                <span
                  className={cn(
                    'grid size-11 place-items-center rounded-xl',
                    selected ? 'bg-highlight text-highlight-foreground' : 'bg-secondary text-secondary-foreground',
                  )}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                {i.label}
              </button>
            )
          })}
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-end justify-between">
              <Label htmlFor="budget" className="text-base font-bold">
                Weekend budget
              </Label>
              <span className="text-3xl font-extrabold">{budget === 0 ? 'Free only' : `$${budget}`}</span>
            </div>
            <Slider
              id="budget"
              value={[budget]}
              min={0}
              max={150}
              step={5}
              onValueChange={(v) => setBudget(Array.isArray(v) ? v[0] : v)}
              aria-label="Weekend budget in dollars"
              className="[&_[data-slot=slider-thumb]]:size-6 [&_[data-slot=slider-track]]:h-2.5"
            />
            <div className="flex justify-between text-xs font-semibold text-muted-foreground">
              <span>Free</span>
              <span>$75</span>
              <span>$150+</span>
            </div>
          </div>
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-base font-bold">How do you get around?</legend>
            <div className="flex flex-wrap gap-3">
              {transport.map((t) => (
                <FilterChip
                  key={t.id}
                  size="lg"
                  label={t.label}
                  selected={modes.includes(t.id)}
                  onToggle={() => setModes(toggle(modes, t.id))}
                  icon={<t.icon className="size-4" aria-hidden="true" />}
                />
              ))}
            </div>
          </fieldset>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-8">
          <fieldset>
            <legend className="mb-3 text-base font-bold">Age range</legend>
            <div className="grid grid-cols-3 gap-3">
              {ageRanges.map((a) => (
                <button
                  key={a}
                  type="button"
                  aria-pressed={age === a}
                  onClick={() => setAge(a)}
                  className={cn(
                    'h-14 rounded-2xl border-2 text-lg font-extrabold transition-all focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                    age === a ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:border-primary/40',
                  )}
                >
                  {a}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="flex flex-col gap-2">
            <Label htmlFor="area" className="text-base font-bold">
              Neighborhood or postal code
            </Label>
            <Input
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="e.g. Leslieville or M4M 2B5"
              autoComplete="postal-code"
              className="h-14 rounded-2xl px-5 text-base"
            />
            <p className="text-sm text-muted-foreground">We never share your exact location with organizers.</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 border-t border-border pt-6">
        <Button variant="ghost" size="pill" onClick={() => setStep(step - 1)} disabled={step === 0} className="font-semibold">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back
        </Button>
        <Button variant="cta" size="xl" onClick={next} disabled={!canContinue}>
          {step === 2 ? 'Build my first plan' : 'Continue'}
          <ArrowRight className="size-5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
