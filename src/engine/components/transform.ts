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
        this.position = Object.assign(new Vector2(), config?.position)
        this.rotation = config?.rotation ?? 0
        this.scale = Object.assign(new Vector2(1, 1), config?.scale)
    }
}

export default Transform
