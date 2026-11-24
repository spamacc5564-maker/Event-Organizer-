'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { analytics } from '@/lib/data'

const config = {
  views: { label: 'Views', color: 'var(--primary)' },
  saves: { label: 'Saves', color: 'var(--cta)' },
} satisfies ChartConfig

export function EngagementChart() {
  return (
    <ChartContainer config={config} className="aspect-auto h-64 w-full">
      <AreaChart data={analytics} margin={{ left: -16, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-views)" stopOpacity={0.35} />
            <stop offset="95%" stopColor="var(--color-views)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fillSaves" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-saves)" stopOpacity={0.35} />
            <stop offset="95%" stopColor="var(--color-saves)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} width={48} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area dataKey="views" type="monotone" stroke="var(--color-views)" strokeWidth={2.5} fill="url(#fillViews)" />
        <Area dataKey="saves" type="monotone" stroke="var(--color-saves)" strokeWidth={2.5} fill="url(#fillSaves)" />
      </AreaChart>
    </ChartContainer>
  )
}
