import Entity from '@/engine/entity'
import Component, { ComponentType } from '@/engine/components/component'
import Transform, { TransformType } from '@/engine/components/transform'
import Graphics from '@/engine/services/graphics'
import Vector2 from '@/engine/math/vector2'
import { colors } from '@/game/constants/colors'

export const BallGraphicsType: ComponentType = Symbol('ballGraphics')

class BallGraphics extends Component {
    private size: Vector2
    private transform: Transform | undefined

    constructor(entity: Entity, size: Vector2) {
        super(entity, 'ballGraphics')
        this.size = Object.assign(new Vector2(), size)
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
            this.size.x, this.size.y, colors.ball)
    }
}

export default BallGraphics
