import Component, { ComponentType } from '@/engine/components/component'
import Entity from '@/engine/entity'
import Transform, { TransformType } from '@/engine/components/transform'
import Graphics from '@/engine/services/graphics'
import Vector2 from '@/engine/math/vector2'

export const BlockGraphicsType: ComponentType = Symbol('blockGraphics')

class BlockGraphics extends Component {
    private width: number
    private height: number
    private color: string
    private transform: Transform | undefined

    constructor(entity: Entity, size: Vector2, color: string) {
        super(entity, 'blockGraphics')
        this.width = size.x
        this.height = size.y
        this.color = color
    }

    initialize() {
        super.initialize()
        this.transform = this.entity.getComponent<Transform>(TransformType)
    }

    draw(graphics: Graphics) {
        if (!this.transform) {
            return
        }

        graphics.drawRect(this.transform.position.x, this.transform.position.y,
            this.width, this.height, this.color)
    }
}

export default BlockGraphics
