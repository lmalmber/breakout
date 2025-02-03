import Scene from '@/engine/scene'
import Entity from '@/engine/entity'
import Transform, { TransformType } from '@/engine/components/transform'
import BallGraphics, { BallGraphicsType } from '@/game/ballGraphics'
import BallPhysics, { BallPhysicsType } from '@/game/ballPhysics'
import BoxCollider, { BoxColliderType } from '@/engine/components/boxCollider'
import Vector2 from '@/engine/math/vector2'
import Physics, { PhysicsType } from '@/engine/components/physics'
import ServiceLocator from '@/engine/services/serviceLocator'

class Ball extends Entity {
    readonly width = 20
    readonly height = 20

    constructor(scene: Scene) {
        super(scene, 'ball')
        this.addComponent(TransformType, new Transform(this))
        this.addComponent(PhysicsType, new Physics(this))
        this.addComponent(BoxColliderType, new BoxCollider(this,
            new Vector2(this.width, this.height)))
        this.addComponent(BallGraphicsType, new BallGraphics(this,
            new Vector2(this.width, this.height)))
        this.addComponent(BallPhysicsType, new BallPhysics(this))
    }

    initialize() {
        super.initialize()
        const graphics = ServiceLocator.getGraphics()
        const transform = this.getComponent<Transform>(TransformType)
        if (transform && graphics) {
            transform.position.x = graphics.width / 2 - this.width / 2
            transform.position.y = graphics.height - this.height - 50
        }
    }
}

export default Ball
