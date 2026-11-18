import type { CategoryId, City, FeaturedTab, Occasion, VenueType } from './types'

export const CATEGORIES: readonly { id: CategoryId; label: string; icon: string }[] = [
  { id: 'all', label: 'All Spaces', icon: '/images/categories/all.svg' },
  { id: 'photo-studio', label: 'Photo Studio', icon: '/images/categories/photo-studio.svg' },
  { id: 'film-studio', label: 'Film Studio', icon: '/images/categories/film-studio.svg' },
  { id: 'warehouse', label: 'Warehouse', icon: '/images/categories/warehouse.svg' },
  { id: 'gallery', label: 'Gallery', icon: '/images/categories/gallery.svg' },
  { id: 'restaurant', label: 'Restaurant', icon: '/images/categories/restaurant.svg' },
  { id: 'apartment', label: 'Apartment', icon: '/images/categories/apartment.svg' },
  { id: 'office-space', label: 'Office Space', icon: '/images/categories/office-space.svg' },
  { id: 'venue', label: 'Venue', icon: '/images/categories/venue.svg' },
  { id: 'private-party', label: 'Private Party', icon: '/images/categories/private-party.svg' },
  { id: 'meeting', label: 'Meeting', icon: '/images/categories/meeting.svg' },
]

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id)

export const VENUE_TYPES: readonly VenueType[] = [
  'Office Space',
  'Meeting',
  'Private Party',
  'Villa',
  'Bar',
  'Loft',
  'Apartment',
  'Ballroom',
  'Restaurant',
  'Studio',
  'House',
  'Gallery',
]

export const OCCASIONS: readonly Occasion[] = [
  'Wedding',
  'Reception',
  'Ceremony',
  'Engagement',
  'Birthday',
  'Babyshower',
  'Concert/Performance',
  'Brand Launch',
  'Fashion Show',
  'Corporate Event',
  'Conference',
  'Pop-up',
]

export const FEATURED_TABS: readonly FeaturedTab[] = [
  'Rooftop',
  'Gallery',
  'Restaurant',
  'Outdoor',
  'Studio',
  'Terrace',
  'Ballroom',
]

export const CITIES: readonly { id: City; label: string }[] = [
  { id: 'Dubai', label: 'Dubai, UAE' },
  { id: 'London', label: 'London, UK' },
  { id: 'New York', label: 'New York, USA' },
]

export const SORT_OPTIONS = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'capacity-desc', label: 'Capacity: largest' },
] as const
