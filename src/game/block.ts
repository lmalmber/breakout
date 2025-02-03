import Scene from '@/engine/scene'
import Entity from '@/engine/entity'
import Transform, { TransformType } from '@/engine/components/transform'
import BlockGraphics, { BlockGraphicsType } from '@/game/blockGraphics'
import Vector2 from '@/engine/math/vector2'
import BoxCollider, { BoxColliderType } from '@/engine/components/boxCollider'
import BlockPhysics, { BlockPhysicsType } from '@/game/blockPhysics'

class Block extends Entity {
    constructor(scene: Scene, size: Vector2, color: string) {
        super(scene, 'block')
        this.addComponent(TransformType, new Transform(this))
        this.addComponent(BlockGraphicsType, new BlockGraphics(this, size, color))
        this.addComponent(BoxColliderType, new BoxCollider(this, new Vector2(size.x, size.y)))
        this.addComponent(BlockPhysicsType, new BlockPhysics(this))
    }
}

export default Block
