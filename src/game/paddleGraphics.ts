import Component, { ComponentType } from '@/engine/components/component'
import Entity from '@/engine/entity'
import Transform, { TransformType } from '@/engine/components/transform'
import Graphics from '@/engine/services/graphics'
import { colors } from '@/game/constants/colors'
import Vector2 from '@/engine/math/vector2'

export const PaddleGraphicsType: ComponentType = Symbol('paddleGraphics')

class PaddleGraphics extends Component {
    readonly size: Vector2
    private transform: Transform | undefined

    constructor(entity: Entity, size: Vector2) {
        super(entity, 'paddleGraphics')
        this.size = structuredClone(size)
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
            this.size.x, this.size.y, colors.paddle)
    }
}

export default PaddleGraphics
