import Transform, { TransformType } from '@/engine/components/transform'
import Scene from '@/engine/scene'
import Entity from '@/engine/entity'
import PaddleInput, { PaddleInputType } from '@/game/paddleInput'
import PaddleGraphics, { PaddleGraphicsType } from '@/game/paddleGraphics'
import BoxCollider, { BoxColliderType } from '@/engine/components/boxCollider'
import Vector2 from '@/engine/math/vector2'
import ServiceLocator from '@/engine/services/serviceLocator'
import Physics, { PhysicsType } from '@/engine/components/physics'
import { windowPadding } from '@/game/constants/window'

class Paddle extends Entity {
    private size = new Vector2(100, 15)

    constructor(scene: Scene) {
        super(scene, 'paddle')
        this.addComponent(TransformType, new Transform(this))
        this.addComponent(PhysicsType, new Physics(this))
        this.addComponent(BoxColliderType, new BoxCollider(this, this.size))
        this.addComponent(PaddleInputType, new PaddleInput(this))
        this.addComponent(PaddleGraphicsType, new PaddleGraphics(this, this.size))
    }

    initialize() {
        super.initialize()
        const graphics = ServiceLocator.getGraphics()
        const transform = this.getComponent<Transform>(TransformType)
        if (transform) {
            transform.position.x = graphics.width / 2 - this.size.x / 2
            transform.position.y = graphics.height - windowPadding - this.size.y
        }
    }
}

export default Paddle
