import Component, { ComponentType } from '@/engine/components/component'
import Vector2 from '@/engine/math/vector2'
import Entity from '@/engine/entity'
import Transform, { TransformType } from '@/engine/components/transform'

export const PhysicsType: ComponentType = Symbol('physics')

interface PhysicsConfig {
    velocity?: Vector2
    acceleration?: Vector2
    damping?: number
}

class Physics extends Component {
    velocity: Vector2
    acceleration: Vector2
    damping: number
    private transform: Transform | undefined

    constructor(entity: Entity, config?: PhysicsConfig) {
        super(entity, 'physics')
        this.velocity = structuredClone(config?.velocity) ?? new Vector2(0, 0)
        this.acceleration = structuredClone(config?.acceleration) ?? new Vector2(0, 0)
        this.damping = config?.damping ?? 1
    }

    initialize(): void {
        super.initialize()
        this.transform = this.entity.getComponent<Transform>(TransformType)
    }

    update(deltaTime: number): void {
        if (!this.transform) {
            return
        }

        this.velocity.x += this.acceleration.x * deltaTime
        this.velocity.y += this.acceleration.y * deltaTime

        this.velocity.x *= this.damping
        this.velocity.y *= this.damping

        this.transform.position.x += this.velocity.x * deltaTime
        this.transform.position.y += this.velocity.y * deltaTime
    }
}

export default Physics
