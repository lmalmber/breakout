import { describe, it, expect } from 'vitest'
import Entity from '@/engine/entity'
import Component from '@/engine/components/component'
import Scene from '@/engine/scene'

class TestScene extends Scene { }
class TestEntity extends Entity { }
class TestComponent extends Component { }
const TestComponentType = Symbol('TestComponent')

describe('Entity', () => {
    it('has a name', () => {
        const scene = new TestScene()
        const entity = new TestEntity(scene, 'test')
        expect(entity.name).toBe('test')
    })

    it('adds components', () => {
        const scene = new TestScene()
        const entity = new TestEntity(scene, 'test')
        const component = new TestComponent(entity, 'transform')

        entity.addComponent(TestComponentType, component)

        expect(entity.getComponent(TestComponentType)).toBe(component)
    })

    it('removes components', () => {
        const scene = new TestScene()
        const entity = new TestEntity(scene, 'test')
        const component = new TestComponent(entity, 'transform')

        entity.addComponent(TestComponentType, component)
        entity.removeComponent(TestComponentType)

        expect(entity.getComponent(TestComponentType)).toBeUndefined()
    })

    it('activates and deactivates', () => {
        const scene = new TestScene()
        const entity = new TestEntity(scene, 'test')

        entity.deactivate()
        expect(entity.isActive).toBe(false)

        entity.activate()
        expect(entity.isActive).toBe(true)
    })
})
