import Scene from '@/engine/scene'
import Graphics from '@/engine/services/graphics'
import Input from '@/engine/services/input'
import ServiceLocator from '@/engine/services/serviceLocator'
import EventBus from '@/engine/utils/eventBus'

class Game {
    private timeLastFrame = 0
    private scene = new Scene()
    private graphics = new Graphics()
    private input = new Input()

    constructor() {
        ServiceLocator.setGraphics(this.graphics)
        ServiceLocator.setInput(this.input)
        ServiceLocator.setEvents(new EventBus())
    }

    start(scene: Scene) {
        this.scene = scene
        this.scene.initialize()
        requestAnimationFrame(this.run.bind(this))
    }

    private run(timeThisFrame: number) {
        const deltaTime = (timeThisFrame - this.timeLastFrame) / 1000
        this.timeLastFrame = timeThisFrame

        this.graphics.clearCanvas()
        this.scene.update(deltaTime)
        this.scene.draw(this.graphics)
        this.input.clearState()

        requestAnimationFrame(this.run.bind(this))
    }
}

export default Game
