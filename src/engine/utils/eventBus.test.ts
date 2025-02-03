import { vitest, describe, it, expect } from 'vitest'
import EventBus from '@/engine/utils/eventBus'

describe('EventBus', () => {
    it('emits events to registered callbacks', () => {
        const eventBus = new EventBus()
        const callback = vitest.fn()

        eventBus.on('test', callback)
        eventBus.emit('test')

        expect(callback).toHaveBeenCalled()
    })

    it('passes an argument to event callbacks', () => {
        const eventBus = new EventBus()
        const callback = vitest.fn()

        eventBus.on('test', callback)
        eventBus.emit('test', 'hello')

        expect(callback).toHaveBeenCalledWith('hello')
    })

    it('registers multiple callbacks for the same event', () => {
        const eventBus = new EventBus()
        const callback1 = vitest.fn()
        const callback2 = vitest.fn()

        eventBus.on('test', callback1)
        eventBus.on('test', callback2)
        eventBus.emit('test')

        expect(callback1).toHaveBeenCalled()
        expect(callback2).toHaveBeenCalled()
    })

    it('does not fail when emitting an event with no listeners', () => {
        const eventBus = new EventBus()
        expect(() => eventBus.emit('test')).not.toThrow()
    })
})
