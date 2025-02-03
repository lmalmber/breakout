import { describe, it, expect } from 'vitest'
import { generateId } from '@/engine/utils/id'

describe('generateId', () => {
    it('generates unique ids', () => {
        const ids = new Set<string>()

        for (let i = 0; i < 100; i++) {
            ids.add(generateId())
        }

        expect(ids.size).toBe(100)
    })
})
