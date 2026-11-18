'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { GUEST_OPTIONS, dateLabel } from '@/features/search/options'
import { toQueryString, type SearchMode } from '@/features/search/params'
import { CITIES } from '@/features/venues/taxonomy'
import type { City } from '@/features/venues/types'
import { cn } from '@/lib/cn'
import { todayISO } from '@/lib/format'

function Field({ label, htmlFor, children, className }: { label: string; htmlFor: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn('relative flex flex-col gap-[5px] px-[5px]', className)}>
      <label htmlFor={htmlFor} className="text-sm text-[#808080]">
        {label}
      </label>
      <div className="relative flex h-6 items-center justify-between">
        {children}
        <img src="/images/icons/arrow-down.svg" alt="" width={24} height={24} className="pointer-events-none shrink-0" />
      </div>
    </div>
  )
}

const SELECT = 'absolute inset-0 w-full cursor-pointer appearance-none bg-transparent pr-8 text-base font-medium text-black outline-none'

export function HeroSearch() {
  const router = useRouter()
  const [mode, setMode] = useState<SearchMode>('venue')
  const [city, setCity] = useState<City | ''>('Dubai')
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState<number | ''>(10)
  const dateRef = useRef<HTMLInputElement>(null)

  function submit(e: FormEvent) {
    e.preventDefault()
    const qs = toQueryString({ city: city || undefined, date: date || undefined, guests: guests || undefined, mode })
    router.push(`/search${qs ? `?${qs}` : ''}`)
  }

  return (
    <form onSubmit={submit} className="relative mx-auto w-full max-w-[311px] md:max-w-[678px] lg:max-w-[1054px]">
      <fieldset className="relative z-10 mx-auto flex h-[55px] w-[264px] items-center justify-between rounded-btn bg-white px-2.5 shadow-float max-md:w-full max-md:rounded-b-none max-md:shadow-none md:-mb-[17px]">
        <legend className="sr-only">Search for</legend>
        {(
          [
            { id: 'venue', label: 'Venue', icon: '/images/icons/venue-white.svg' },
            { id: 'vendor', label: 'Vendors', icon: '/images/icons/vendors.svg' },
          ] as const
        ).map((opt) => {
          const active = mode === opt.id
          return (
            <label
              key={opt.id}
              className={cn(
                'flex h-10 flex-1 cursor-pointer items-center justify-center gap-[7px] rounded-btn text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-500',
                active ? 'bg-brand-500 text-white' : 'text-black hover:bg-surface-alt',
              )}
            >
              <input type="radio" name="mode" value={opt.id} checked={active} onChange={() => setMode(opt.id)} className="sr-only" />
              <img src={opt.icon} alt="" width={20} height={20} className={cn(!active && opt.id === 'venue' && 'invert', active && opt.id === 'vendor' && 'invert')} />
              {opt.label}
            </label>
          )
        })}
      </fieldset>

      <div className="flex flex-col gap-4 rounded-btn bg-white px-[18px] pt-4 pb-5 max-md:rounded-t-none md:h-[85px] md:flex-row md:items-center md:gap-0 md:px-[15px] md:pt-0 md:pb-0 lg:h-[100px]">
        <Field label="Where" htmlFor="hero-where" className="md:w-[140px] lg:w-[244px] lg:pl-[10px]">
          <span className="truncate text-base font-medium text-black">{CITIES.find((c) => c.id === city)?.label ?? 'Anywhere'}</span>
          <select id="hero-where" value={city} onChange={(e) => setCity(e.target.value as City | '')} className={cn(SELECT, 'opacity-0')}>
            <option value="">Anywhere</option>
            {CITIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
        <span className="h-px bg-[#e4e4e4] md:mx-auto md:h-10 md:w-px lg:hidden" />
        <Field label="When" htmlFor="hero-when" className="md:ml-6 md:w-[140px] lg:ml-16 lg:w-[258px]">
          <span className="text-base font-medium text-black">{dateLabel(date || undefined)}</span>
          <input
            ref={dateRef}
            id="hero-when"
            type="date"
            min={todayISO()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onClick={() => dateRef.current?.showPicker?.()}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </Field>
        <span className="h-px bg-[#e4e4e4] md:mx-auto md:h-10 md:w-px lg:hidden" />
        <Field label="Guests" htmlFor="hero-guests" className="md:ml-6 md:w-[140px] lg:ml-1.5 lg:w-[258px]">
          <span className="text-base font-medium text-black">{GUEST_OPTIONS.find((g) => g.min === guests)?.label ?? 'Any'}</span>
          <select
            id="hero-guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value ? Number(e.target.value) : '')}
            className={cn(SELECT, 'opacity-0')}
          >
            <option value="">Any</option>
            {GUEST_OPTIONS.map((g) => (
              <option key={g.min} value={g.min}>
                {g.label}
              </option>
            ))}
          </select>
        </Field>
        <button
          type="submit"
          className="mt-1 flex h-[50px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-btn bg-brand-500 text-xl font-semibold tracking-[-0.48px] text-white transition-colors hover:bg-brand-600 md:mt-0 md:ml-auto md:h-[61px] md:w-[147px] lg:text-2xl"
        >
          <Search className="size-6" strokeWidth={2.2} />
          Search
        </button>
      </div>
    </form>
  )
}
