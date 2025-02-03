import { vitest, describe, it, expect } from 'vitest'
import Timer from '@/engine/utils/timer'

describe('Timer', () => {
    it('calls a callback after a certain interval', () => {
        const callback = vitest.fn()
        const timer = new Timer(1000, callback)

        timer.update(500)
        expect(callback).not.toHaveBeenCalled()

        timer.update(500)
        expect(callback).toHaveBeenCalledTimes(1)
    })

    it('calls a callback multiple times if not one-off', () => {
        const callback = vitest.fn()
        const timer = new Timer(1000, callback)

        timer.update(1000)
        expect(callback).toHaveBeenCalledTimes(1)

        timer.update(1000)
        expect(callback).toHaveBeenCalledTimes(2)
    })

    it('does not call a callback after the first time if one-off', () => {
        const callback = vitest.fn()
        const timer = new Timer(1000, callback, true)

        timer.update(1000)
        expect(callback).toHaveBeenCalledTimes(1)

        timer.update(1000)
        expect(callback).toHaveBeenCalledTimes(1)
    })
})
