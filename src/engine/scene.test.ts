import { describe, it, expect } from 'vitest'
import Scene from '@/engine/scene'
import Entity from '@/engine/entity'

class TestScene extends Scene { }
class TestEntity extends Entity { }

describe('Scene', () => {
    it('adds entities', () => {
        const scene = new TestScene()
        const entity = new TestEntity(scene, 'test')

        scene.addEntity(entity)

        expect(scene.getEntity(entity)).toBe(entity)
    })

    it('removes entities', () => {
        const scene = new TestScene()
        const entity = new TestEntity(scene, 'test')
        scene.addEntity(entity)

        scene.removeEntity(entity)

        expect(scene.getEntity(entity)).toBeUndefined()
    })

    it('gets an entity by name', () => {
        const scene = new TestScene()
        const entity = new TestEntity(scene, 'test')
        scene.addEntity(entity)

        expect(scene.getEntityByName(entity.name)).toBe(entity)
    })

    it('gets multiple entities by name', () => {
        const scene = new TestScene()
        const entity1 = new TestEntity(scene, 'test')
        const entity2 = new TestEntity(scene, 'test')
        scene.addEntity(entity1)
        scene.addEntity(entity2)

        expect(scene.getEntitiesByName(entity1.name)).toContain(entity1)
        expect(scene.getEntitiesByName(entity1.name)).toContain(entity2)
    })

    it('gets all entities', () => {
        const scene = new TestScene()
        const entity1 = new TestEntity(scene, 'test1')
        const entity2 = new TestEntity(scene, 'test2')

        scene.addEntity(entity1)
        scene.addEntity(entity2)
        const entities = scene.getAllEntities()

        expect(entities).toContain(entity1)
        expect(entities).toContain(entity2)
    })
})
