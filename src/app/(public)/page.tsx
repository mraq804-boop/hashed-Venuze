import { TopBar } from '@/components/layout/TopBar'

export default function Home() {
  return (
    <>
      <TopBar variant="solid" showCompactSearch />
      <main className="h-[150vh] p-10 text-2xl font-semibold text-brand-500">Venuze</main>
    </>
  )
}
