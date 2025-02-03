import Transform, { TransformType } from '@/engine/components/transform'
import Graphics from '@/engine/services/graphics'
import Component, { ComponentType } from '@/engine/components/component'
import Entity from '@/engine/entity'

export const TextType: ComponentType = Symbol('text')

class Text extends Component {
    private text: string
    private fontSize: string
    private _color: string
    private transform: Transform | undefined

    constructor(entity: Entity, text: string, fontSize: string, color = 'white') {
        super(entity, 'text')
        this.text = text
        this.fontSize = fontSize
        this._color = color
    }

    initialize() {
        super.initialize()
        this.transform = this.entity.getComponent<Transform>(TransformType)
        if (!this.transform) {
            throw new Error('Text component requires a transform component')
        }
    }

    draw(graphics: Graphics) {
        if (!this.transform) {
            return
        }

        graphics.context.font = `${this.fontSize} Courier New`
        graphics.context.fillStyle = this._color
        graphics.context.textAlign = 'center'
        graphics.context.textBaseline = 'middle'
        graphics.context.fillText(this.text,
            this.transform.position.x, this.transform.position.y)
    }

    get color() {
        return this._color
    }

    set color(color: string) {
        this._color = color
    }
}

export default Text
