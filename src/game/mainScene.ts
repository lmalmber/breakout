import Scene from '@/engine/scene'
import Paddle from '@/game/paddle'
import TitleState from '@/game/states/titleState'
import GameState from '@/game/states/gameState'
import BlockContainer from '@/game/blockContainer'
import ServiceLocator from '@/engine/services/serviceLocator'
import { colors } from '@/game/constants/colors'
import ParticleSystem from '@/engine/systems/particleSystem'
import BackgroundEffect from '@/game/backgroundEffect'

class MainScene extends Scene {
    private state: GameState

    constructor() {
        super()
        this.state = new TitleState(this)
        this.addEntity(new ParticleSystem(this, 1000))
        this.addEntity(new BackgroundEffect(this))
        this.addEntity(new Paddle(this))
        this.addEntity(new BlockContainer(this))
    }

    initialize() {
        super.initialize()
        const graphics = ServiceLocator.getGraphics()
        graphics.setBackgroundColor(colors.background)
    }

    update(deltaTime: number) {
        super.update(deltaTime)

        const nextState = this.state.update(deltaTime)
        if (nextState) {
            this.state.exit()
            this.state = nextState
            this.state.enter(this)
        }
    }
}

export default MainScene
