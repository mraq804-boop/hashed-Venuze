import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { HeroSearch } from '../HeroSearch'

const push = vi.fn()
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }))

describe('HeroSearch', () => {
  beforeEach(() => push.mockReset())

  it('pushes a search URL with city and guests', async () => {
    render(<HeroSearch />)
    await userEvent.selectOptions(screen.getByLabelText('Where'), 'London')
    await userEvent.selectOptions(screen.getByLabelText('Guests'), '10')
    await userEvent.click(screen.getByRole('button', { name: /^search$/i }))
    expect(push).toHaveBeenCalledWith('/search?city=London&guests=10')
  })

  it('adds mode=vendor when Vendors is selected', async () => {
    render(<HeroSearch />)
    await userEvent.click(screen.getByRole('radio', { name: /vendors/i }))
    await userEvent.click(screen.getByRole('button', { name: /^search$/i }))
    expect(push.mock.calls[0][0]).toContain('mode=vendor')
  })
})
