import Scene from '@/engine/scene'
import ServiceLocator from '@/engine/services/serviceLocator'
import Transform, { TransformType } from '@/engine/components/transform'
import Text, { TextType } from '@/engine/components/text'
import Entity from '@/engine/entity'
import { colors } from '@/game/constants/colors'

class HeadingText extends Entity {
    constructor(scene: Scene, text: string) {
        super(scene, 'headingText')
        this.addComponent(TransformType, new Transform(this))
        this.addComponent(TextType, new Text(this, text.toUpperCase(),
            '42px', colors.text))
    }

    initialize() {
        super.initialize()
        const graphics = ServiceLocator.getGraphics()
        const transform = this.getComponent<Transform>(TransformType)
        if (transform) {
            transform.position.x = graphics.width / 2
            transform.position.y = 280
        }
    }
}

export default HeadingText
