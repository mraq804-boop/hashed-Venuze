'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getFeaturedVenues, getVenueById, getVenues } from './service'
import type { FeaturedTab, VenueFilters } from './types'

export function useVenues(f: VenueFilters, opts: { simulateError?: boolean; enabled?: boolean } = {}) {
  const simulateError = opts.simulateError ?? false
  return useQuery({
    queryKey: ['venues', f, simulateError],
    queryFn: () => getVenues(f, { simulateError }),
    placeholderData: keepPreviousData,
    enabled: opts.enabled ?? true,
    ...(simulateError ? { retry: false } : {}),
  })
}

export function useFeaturedVenues(tab: FeaturedTab) {
  return useQuery({ queryKey: ['featured', tab], queryFn: () => getFeaturedVenues(tab) })
}

export function useVenue(id: string | null) {
  return useQuery({
    queryKey: ['venue', id],
    queryFn: () => getVenueById(id as string),
    enabled: Boolean(id),
  })
}
