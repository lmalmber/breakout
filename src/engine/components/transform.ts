import Component, { ComponentType } from '@/engine/components/component'
import Vector2 from '@/engine/math/vector2'
import Entity from '@/engine/entity'

export const TransformType: ComponentType = Symbol('transform')

interface TransformConfig {
    position?: Vector2
    rotation?: number
    scale?: Vector2
}

class Transform extends Component {
    position: Vector2
    rotation: number
    scale: Vector2

    constructor(entity: Entity, config?: TransformConfig) {
        super(entity, 'transform')
        this.position = structuredClone(config?.position) ?? new Vector2(0, 0)
        this.rotation = config?.rotation ?? 0
        this.scale = structuredClone(config?.scale) ?? new Vector2(1, 1)
    }
}

export default Transform
