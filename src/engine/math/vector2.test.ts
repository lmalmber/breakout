import { describe, it, expect } from 'vitest'
import Vector2 from '@/engine/math/vector2'

describe('Vector2', () => {
    it('adds two vectors', () => {
        const vec1 = new Vector2(1, 2)
        const vec2 = new Vector2(3, 4)
        expect(vec1.add(vec2)).toEqual(new Vector2(4, 6))
    })

    it('subtracts two vectors', () => {
        const vec1 = new Vector2(1, 2)
        const vec2 = new Vector2(3, 4)
        expect(vec1.subtract(vec2)).toEqual(new Vector2(-2, -2))
    })

    it('multiplies a vector by a scalar', () => {
        const vec = new Vector2(1, 2)
        expect(vec.multiply(2)).toEqual(new Vector2(2, 4))
    })

    it('normalizes a vector', () => {
        const vec = new Vector2(3, 4)
        expect(vec.normalize()).toEqual(new Vector2(0.6, 0.8))
    })

    it('normalizes a zero vector', () => {
        const vec = new Vector2()
        expect(vec.normalize()).toEqual(new Vector2(0, 0))
    })

    it('returns the length of a vector', () => {
        const vec = new Vector2(3, 4)
        expect(vec.length()).toBe(5)
    })
})
