'use client'

import { useState } from 'react'
import { Check, Heart, Plus, Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/data'
import { cn } from '@/lib/utils'

export function EventActions({ title, price, going, spotsLeft }: { title: string; price: number; going: number; spotsLeft?: number }) {
  const [inPlan, setInPlan] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <section className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-lift">
      <div className="flex items-end justify-between">
        <span className="text-4xl font-extrabold">{formatPrice(price)}</span>
        <span className="text-sm font-semibold text-muted-foreground">{going} going</span>
      </div>
      {spotsLeft !== undefined && (
        <p className="rounded-xl bg-cta/10 px-3 py-2 text-sm font-bold text-cta">Only {spotsLeft} spots left</p>
      )}
      <Button
        variant={inPlan ? 'outline' : 'cta'}
        size="xl"
        className="w-full"
        onClick={() => {
          setInPlan(!inPlan)
          toast.success(inPlan ? 'Removed from your plan' : 'Added to your weekend plan', { description: title })
        }}
      >
        {inPlan ? <Check className="size-5" aria-hidden="true" /> : <Plus className="size-5" aria-hidden="true" />}
        {inPlan ? 'In your plan' : 'Add to plan'}
      </Button>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="pill"
          aria-pressed={saved}
          onClick={() => {
            setSaved(!saved)
            toast.success(saved ? 'Removed from saved' : 'Saved')
          }}
        >
          <Heart className={cn('size-4', saved && 'fill-cta text-cta')} aria-hidden="true" />
          {saved ? 'Saved' : 'Save'}
        </Button>
        <Button variant="outline" size="pill" onClick={() => toast.success('Link copied', { description: 'Send it to your friends.' })}>
          <Share2 className="size-4" aria-hidden="true" />
          Share
        </Button>
      </div>
    </section>
  )
}
