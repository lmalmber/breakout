import { describe, it, expect } from 'vitest'
import { getRandomFloat, getRandomInt, clamp } from '@/engine/math/mathUtils'

describe('getRandomInt', () => {
    it('gets a random integer between x and y', () => {
        for (let i = 0; i < 10; i++) {
            const randomInt = getRandomInt(0, 10)
            expect(randomInt).toBeGreaterThanOrEqual(0)
            expect(randomInt).toBeLessThanOrEqual(10)
        }
    })

    it('gets a random float between min and max', () => {
        const randomFloat = getRandomFloat(0, 10)
        expect(randomFloat).toBeGreaterThanOrEqual(0)
        expect(randomFloat).toBeLessThanOrEqual(10)
    })

    it('clamps a value between min and max', () => {
        const clampedValue = clamp(5, 0, 10)
        expect(clampedValue).toBe(5)

        const clampedValue2 = clamp(-5, 0, 10)
        expect(clampedValue2).toBe(0)

        const clampedValue3 = clamp(15, 0, 10)
        expect(clampedValue3).toBe(10)
    })
})
