import Entity from '@/engine/entity'
import Graphics from '@/engine/services/graphics'
import CollisionSystem from '@/engine/systems/collisionSystem'

class Scene {
    private entities: Entity[]
    private collisionSystem: CollisionSystem

    constructor() {
        this.entities = []
        this.collisionSystem = new CollisionSystem()
    }

    initialize() {
        this.entities.forEach(entity => entity.initialize())
    }

    update(deltaTime: number) {
        this.entities.forEach(entity => {
            if (!entity.isActive) {
                return
            }

            if (!entity.isInitialized) {
                entity.initialize()
            }

            entity.update(deltaTime)
        })

        this.collisionSystem.update(this.entities)
    }

    draw(graphics: Graphics) {
        this.entities.forEach(entity => {
            if (!entity.isActive) {
                return
            }

            entity.draw(graphics)
        })
    }

    addEntity(entity: Entity) {
        this.entities.push(entity)
    }

    removeEntity(entity: Entity) {
        this.entities = this.entities.filter(e => e.id !== entity.id)
    }

    getEntity<T extends Entity>(entity: T) {
        return this.entities.find(e => e.id === entity.id) as T | undefined
    }

    getEntityByName<T extends Entity>(name: string) {
        return this.entities.find(entity => entity.name === name) as T | undefined
    }

    getEntitiesByName<T extends Entity>(name: string) {
        return this.entities.filter(entity => entity.name === name) as T[]
    }

    getAllEntities() {
        return this.entities
    }
}

export default Scene
