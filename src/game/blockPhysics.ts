import Component, { ComponentType } from '@/engine/components/component'
import Entity from '@/engine/entity'
import ServiceLocator from '@/engine/services/serviceLocator'

export const BlockPhysicsType: ComponentType = Symbol('blockPhysics')

class BlockPhysics extends Component {
    constructor(entity: Entity) {
        super(entity, 'blockPhysics')
        entity.onEvent('collisionEnter', () => this.handleCollision())
    }

    handleCollision() {
        this.entity.deactivate()

        const activeBlocks =
            this.entity.scene.getEntitiesByName('block')
                .filter((block) => block.isActive)

        if (activeBlocks.length === 0) {
            const events = ServiceLocator.getEvents()
            events.emit('lastBlockHit')
        }
    }
}

export default BlockPhysics
