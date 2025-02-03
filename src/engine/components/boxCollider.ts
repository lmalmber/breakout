import Component, { ComponentType } from '@/engine/components/component'
import Transform, { TransformType } from '@/engine/components/transform'
import Entity from '@/engine/entity'
import Vector2 from '@/engine/math/vector2'

export const BoxColliderType: ComponentType = Symbol('boxCollider')

class BoxCollider extends Component {
    private size: Vector2

    constructor(entity: Entity, size: Vector2) {
        super(entity, 'boxCollider')
        this.size = structuredClone(size)
    }

    intersects(other: BoxCollider) {
        const transform = this.entity.getComponent<Transform>(TransformType)
        const otherTransform = other.entity.getComponent<Transform>(TransformType)
        if (!transform || !otherTransform) {
            return false
        }

        return !(
            transform.position.x + this.size.x < otherTransform.position.x ||
            transform.position.x > otherTransform.position.x + other.size.x ||
            transform.position.y + this.size.y < otherTransform.position.y ||
            transform.position.y > otherTransform.position.y + other.size.y
        )
    }

    onCollisionEnter(other: Entity) {
        this.entity.emitEvent('collisionEnter', other)
    }
}

export default BoxCollider
