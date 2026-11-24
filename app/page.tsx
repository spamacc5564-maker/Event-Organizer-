import { Hero } from '@/components/landing/hero'
import { FeaturedEvents, FinalCta, ForOrganizers, HowItWorks, Testimonials } from '@/components/landing/sections'
import { SiteFooter } from '@/components/landing/site-footer'
import { SiteHeader } from '@/components/landing/site-header'

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <HowItWorks />
        <FeaturedEvents />
        <ForOrganizers />
        <Testimonials />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
