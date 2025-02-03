import Scene from '@/engine/scene'
import Entity from '@/engine/entity'
import Transform, { TransformType } from '@/engine/components/transform'
import ServiceLocator from '@/engine/services/serviceLocator'
import Block from '@/game/block'
import Vector2 from '@/engine/math/vector2'
import { colors } from '@/game/constants/colors'
import { windowPadding } from '@/game/constants/window'

class BlockContainer extends Entity {
    private rows = 5
    private columns = 8
    private blockMarginX = 10
    private blockMarginY = 10
    private blockHeight = 20

    constructor(scene: Scene) {
        super(scene, 'blockContainer')
        this.addComponent(TransformType, new Transform(this))
        const blocks = this.createBlocks(scene)
        blocks.forEach(block => this.scene.addEntity(block))
    }

    resetBlocks() {
        this.scene.getEntitiesByName('block').forEach(block => block.activate())
    }

    private createBlocks(scene: Scene) {
        const graphics = ServiceLocator.getGraphics()
        const blockWidth = (graphics.width - (windowPadding * 2) -
            (this.blockMarginX * (this.columns - 1))) / this.columns

        const blocks: Block[] = []
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                const block = new Block(scene, new Vector2(blockWidth, this.blockHeight),
                    colors.blocks[row])
                const transform = block.getComponent<Transform>(TransformType)
                if (transform) {
                    transform.position.x = windowPadding +
                        (column * blockWidth) + (column * this.blockMarginX)
                    transform.position.y = windowPadding +
                        (row * this.blockHeight) + (row * this.blockMarginY)
                }
                blocks.push(block)
            }
        }

        return blocks
    }
}

export default BlockContainer
