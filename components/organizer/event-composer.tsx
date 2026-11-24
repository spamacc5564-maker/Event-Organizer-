'use client'

import { useState } from 'react'
import { Loader2, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const draft =
  "Grab some gloves and your crew — we're clearing litter along the Don Valley trail before the snow hits. No experience needed, all supplies provided, and you'll earn 3 verified volunteer hours. Hot chocolate at the finish line."

export function EventComposer() {
  const [title, setTitle] = useState('Winter Trail Cleanup')
  const [description, setDescription] = useState('')
  const [writing, setWriting] = useState(false)

  function generate() {
    setWriting(true)
    setDescription('')
    let i = 0
    const id = setInterval(() => {
      i += 6
      setDescription(draft.slice(0, i))
      if (i >= draft.length) {
        clearInterval(id)
        setWriting(false)
      }
    }, 30)
  }

  return (
    <form
      className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft"
      onSubmit={(e) => {
        e.preventDefault()
        toast.success('Submitted for review', { description: 'Verified organizers usually go live within an hour.' })
      }}
    >
      <h2 className="text-lg font-extrabold">Post an event</h2>
      <div className="flex flex-col gap-2">
        <Label htmlFor="ev-title">Title</Label>
        <Input id="ev-title" value={title} onChange={(e) => setTitle(e.target.value)} required className="h-11 rounded-xl" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="ev-date">Date</Label>
          <Input id="ev-date" type="date" defaultValue="2026-12-06" required className="h-11 rounded-xl" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="ev-price">Price ($)</Label>
          <Input id="ev-price" type="number" min={0} defaultValue={0} required className="h-11 rounded-xl" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="ev-desc">Description</Label>
          <Button type="button" variant="ghost" size="sm" onClick={generate} disabled={writing || !title.trim()} className="font-bold text-cta">
            {writing ? <Loader2 className="size-3.5 animate-spin" aria-hidden="true" /> : <Sparkles className="size-3.5" aria-hidden="true" />}
            Write with AI
          </Button>
        </div>
        <Textarea
          id="ev-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          placeholder="What should teens know? Tap 'Write with AI' for a draft."
          className="rounded-xl"
          aria-busy={writing}
        />
      </div>
      <Button type="submit" variant="cta" size="xl" disabled={writing}>
        Submit for review
      </Button>
    </form>
  )
}
