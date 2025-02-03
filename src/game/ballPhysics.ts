import Component, { ComponentType } from '@/engine/components/component'
import Entity from '@/engine/entity'
import Transform, { TransformType } from '@/engine/components/transform'
import Graphics from '@/engine/services/graphics'
import Ball from '@/game/ball'
import ServiceLocator from '@/engine/services/serviceLocator'
import Physics, { PhysicsType } from '@/engine/components/physics'
import { getRandomInt } from '@/engine/math/mathUtils'

export const BallPhysicsType: ComponentType = Symbol('ballPhysics')

class BallPhysics extends Component {
    private speed = 550
    private transform: Transform | undefined
    private physics: Physics | undefined
    private graphics: Graphics | undefined

    constructor(entity: Entity) {
        super(entity, 'ballPhysics')
        entity.onEvent('collisionEnter', (other) =>
            this.handleCollision(other as Entity))
    }

    initialize() {
        super.initialize()
        this.graphics = ServiceLocator.getGraphics()
        this.transform = this.entity.getComponent<Transform>(TransformType)
        this.physics = this.entity.getComponent<Physics>(PhysicsType)
        if (this.physics) {
            this.physics.velocity.x = getRandomInt(-this.speed, this.speed)
            this.physics.velocity.y = -this.speed
            this.physics.velocity = this.physics.velocity
                .normalize().multiply(this.speed)
        }
    }

    update() {
        this.clampToScreen()
    }

    private handleCollision(other: Entity) {
        if (!this.physics) {
            return
        }

        if (other.name === 'paddle') {
            const paddlePhysics = other.getComponent<Physics>(PhysicsType)
            if (!paddlePhysics) {
                return
            }

            const paddleInfluence = 0.5
            this.physics.velocity.x += paddlePhysics.velocity.x * paddleInfluence
        }

        this.physics.velocity.y = -this.physics.velocity.y
        this.physics.velocity = this.physics.velocity
            .normalize()
            .multiply(this.speed)
    }

    private clampToScreen() {
        if (!this.transform || !this.graphics || !this.physics) {
            return
        }

        const ball = this.entity as Ball

        const isOffScreenLeft = this.transform.position.x < 0
        if (isOffScreenLeft) {
            this.transform.position.x = 0
            this.physics.velocity.x = -this.physics.velocity.x
        }

        const isOffScreenTop = this.transform.position.y < 0
        if (isOffScreenTop) {
            this.transform.position.y = 0
            this.physics.velocity.y = -this.physics.velocity.y
        }

        const isOffScreenRight = this.transform.position.x + ball.width > this.graphics.width
        if (isOffScreenRight) {
            this.transform.position.x = this.graphics.width - ball.width
            this.physics.velocity.x = -this.physics.velocity.x
        }

        const isOffScreenBottom = this.transform.position.y + ball.height > this.graphics.height
        if (isOffScreenBottom) {
            const events = ServiceLocator.getEvents()
            events.emit('ballOffScreen')
        }
    }
}

export default BallPhysics
