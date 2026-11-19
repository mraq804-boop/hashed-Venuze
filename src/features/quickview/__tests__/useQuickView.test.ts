import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useQuickView } from '../useQuickView'

const push = vi.fn()
const replace = vi.fn()
const back = vi.fn()
let params = new URLSearchParams()
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push, replace, back }),
  usePathname: () => '/search',
  useSearchParams: () => params,
}))

describe('useQuickView', () => {
  beforeEach(() => {
    push.mockReset()
    replace.mockReset()
    back.mockReset()
    params = new URLSearchParams('city=London')
  })

  it('goes back in history when the modal was opened in the app', () => {
    const { result } = renderHook(() => useQuickView())
    act(() => result.current.open('v1'))
    expect(push).toHaveBeenCalledWith('/search?city=London&venue=v1', { scroll: false })
    act(() => result.current.close())
    expect(back).toHaveBeenCalledTimes(1)
    expect(replace).not.toHaveBeenCalled()
  })

  it('replaces the URL when the modal came from a shared link', () => {
    params = new URLSearchParams('city=London&venue=v1')
    const { result } = renderHook(() => useQuickView())
    act(() => result.current.close())
    expect(replace).toHaveBeenCalledWith('/search?city=London', { scroll: false })
    expect(back).not.toHaveBeenCalled()
  })
})
