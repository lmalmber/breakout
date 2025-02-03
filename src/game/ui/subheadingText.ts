import Scene from '@/engine/scene'
import ServiceLocator from '@/engine/services/serviceLocator'
import Transform, { TransformType } from '@/engine/components/transform'
import Text, { TextType } from '@/engine/components/text'
import Entity from '@/engine/entity'
import Timer from '@/engine/utils/timer'
import { colors } from '@/game/constants/colors'

class SubheadingText extends Entity {
    private blinkTimer: Timer

    constructor(scene: Scene, text: string) {
        super(scene, 'subheadingText')
        this.addComponent(TransformType, new Transform(this))
        this.addComponent(TextType, new Text(this, text, '18px', colors.text))
        this.blinkTimer = new Timer(0.8, () => this.handleBlink())
    }

    initialize() {
        super.initialize()
        const graphics = ServiceLocator.getGraphics()
        const transform = this.getComponent<Transform>(TransformType)
        if (transform) {
            transform.position.x = graphics.width / 2
            transform.position.y = 350
        }
    }

    update(deltaTime: number) {
        super.update(deltaTime)
        this.blinkTimer.update(deltaTime)
    }

    private handleBlink() {
        const text = this.getComponent<Text>(TextType)
        if (!text) {
            return
        }

        if (text.color === colors.text) {
            text.color = colors.background
        } else {
            text.color = colors.text
        }
    }
}

export default SubheadingText
