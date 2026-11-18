import { Suspense } from 'react'
import { CategorySection } from '@/components/home/CategorySection'
import { FeaturedVenues } from '@/components/home/FeaturedVenues'
import { Hero } from '@/components/home/Hero'
import { VendorsSection } from '@/components/home/VendorsSection'
import { TopBar } from '@/components/layout/TopBar'

export default function Home() {
  return (
    <>
      <TopBar variant="overlay" />
      <main>
        <Hero />
        <CategorySection />
        <Suspense fallback={<div className="min-h-[800px] bg-night" />}>
          <FeaturedVenues />
        </Suspense>
        <VendorsSection />
      </main>
    </>
  )
}
