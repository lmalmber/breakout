import Entity from '@/engine/entity'
import BoxCollider, { BoxColliderType } from '@/engine/components/boxCollider'

class CollisionSystem {
    private previousCollisions = new Set<string>()

    update(entities: Entity[]) {
        const currentCollisions = new Set<string>()

        for (let i = 0; i < entities.length; i++) {
            const entityA = entities[i]
            if (!entityA.isActive) {
                continue
            }

            const colliderA = entityA.getComponent<BoxCollider>(BoxColliderType)
            if (!colliderA) {
                continue
            }

            for (let j = i + 1; j < entities.length; j++) {
                const entityB = entities[j]
                if (!entityB.isActive) {
                    continue
                }

                const colliderB = entityB.getComponent<BoxCollider>(BoxColliderType)
                if (!colliderB) {
                    continue
                }

                if (colliderA.intersects(colliderB)) {
                    const collisionKey = this.getCollisionKey(entityA, entityB)
                    currentCollisions.add(collisionKey)

                    if (!this.previousCollisions.has(collisionKey)) {
                        colliderA.onCollisionEnter(entityB)
                        colliderB.onCollisionEnter(entityA)
                    }
                }
            }
        }

        this.previousCollisions = currentCollisions
    }

    private getCollisionKey(entityA: Entity, entityB: Entity) {
        return [entityA.id, entityB.id].sort().join(':')
    }
}

export default CollisionSystem
