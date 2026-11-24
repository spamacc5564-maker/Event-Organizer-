'use client'

import { Heart } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function SaveButton({ eventTitle, className }: { eventTitle: string; className?: string }) {
  const [saved, setSaved] = useState(false)

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${eventTitle} from saved` : `Save ${eventTitle}`}
      onClick={() => {
        setSaved((s) => !s)
        toast.success(saved ? 'Removed from saved' : 'Saved to your list', { description: eventTitle })
      }}
      className={cn(
        'grid size-9 place-items-center rounded-full bg-card/95 text-foreground shadow-soft backdrop-blur transition-transform hover:scale-105 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
        className,
      )}
    >
      <Heart className={cn('size-4', saved && 'fill-cta text-cta')} aria-hidden="true" />
    </button>
  )
}
