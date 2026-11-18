import type { Metadata } from 'next'
import { Suspense } from 'react'
import { TopBar } from '@/components/layout/TopBar'
import { SearchView } from '@/components/search/SearchView'

export const metadata: Metadata = { title: 'Search venues' }

export default function SearchPage() {
  return (
    <>
      <Suspense fallback={<div className="h-[88px] border-b border-line bg-surface" />}>
        <TopBar variant="solid" showCompactSearch />
      </Suspense>
      <main>
        <Suspense fallback={<div className="min-h-[calc(100dvh-88px)]" />}>
          <SearchView />
        </Suspense>
      </main>
    </>
  )
}
