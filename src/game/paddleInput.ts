import Component, { ComponentType } from '@/engine/components/component'
import Entity from '@/engine/entity'
import Input from '@/engine/services/input'
import ServiceLocator from '@/engine/services/serviceLocator'
import Transform, { TransformType } from '@/engine/components/transform'
import PaddleGraphics, { PaddleGraphicsType } from '@/game/paddleGraphics'
import Graphics from '@/engine/services/graphics'
import { windowPadding } from '@/game/constants/window'
import Physics, { PhysicsType } from '@/engine/components/physics'

export const PaddleInputType: ComponentType = Symbol('paddleInput')

class PaddleInput extends Component {
    private speed = 500
    private input: Input | undefined
    private graphics: Graphics | undefined
    private physics: Physics | undefined
    private transform: Transform | undefined
    private paddleGraphics: PaddleGraphics | undefined

    constructor(entity: Entity) {
        super(entity, 'paddleInput')
    }

    initialize() {
        super.initialize()
        this.input = ServiceLocator.getInput()
        this.graphics = ServiceLocator.getGraphics()
        this.physics = this.entity.getComponent<Physics>(PhysicsType)
        this.transform = this.entity.getComponent<Transform>(TransformType)
        this.paddleGraphics = this.entity.getComponent<PaddleGraphics>(PaddleGraphicsType)
    }

    update() {
        this.handleMovement()
        this.clampToScreen()
    }

    private handleMovement() {
        if (!this.transform || !this.input || !this.physics) {
            return
        }

        const isMovingLeft =
            this.input.isKeyHeldDown('ArrowLeft') ||
            this.input.isKeyHeldDown('a')

        const isMovingRight =
            this.input.isKeyHeldDown('ArrowRight') ||
            this.input.isKeyHeldDown('d')

        if (isMovingLeft) {
            this.physics.velocity.x = -this.speed
        } else if (isMovingRight) {
            this.physics.velocity.x = this.speed
        } else {
            this.physics.velocity.x = 0
        }
    }

    private clampToScreen() {
        if (!this.transform || !this.paddleGraphics || !this.graphics) {
            return
        }

        const isOffScreenLeft = this.transform.position.x < 0 + windowPadding
        if (isOffScreenLeft) {
            this.transform.position.x = 0 + windowPadding
        }

        const isOffScreenRight = this.transform.position.x >
            this.graphics.width - windowPadding - this.paddleGraphics.size.x
        if (isOffScreenRight) {
            this.transform.position.x = this.graphics.width -
                windowPadding - this.paddleGraphics.size.x
        }
    }
}

export default PaddleInput
