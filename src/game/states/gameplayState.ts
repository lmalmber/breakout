import Scene from '@/engine/scene'
import Ball from '@/game/ball'
import GameState from '@/game/states/gameState'
import ServiceLocator from '@/engine/services/serviceLocator'
import GameLoseState from '@/game/states/gameLoseState'
import BlockContainer from '@/game/blockContainer'
import GameWinState from '@/game/states/gameWinState'

class GameplayState extends GameState {
    private ball: Ball
    private isGameOver = false
    private isGameComplete = false

    constructor(scene: Scene) {
        super(scene)

        this.ball = new Ball(scene)
        scene.addEntity(this.ball)

        const events = ServiceLocator.getEvents()
        events.on('ballOffScreen', () => this.isGameOver = true)
        events.on('lastBlockHit', () => this.isGameComplete = true)
    }

    update() {
        if (this.isGameOver) {
            return new GameLoseState(this.scene)
        } else if (this.isGameComplete) {
            return new GameWinState(this.scene)
        }
    }

    enter() {
        const blockContainer =
            this.scene.getEntityByName<BlockContainer>('blockContainer')
        if (blockContainer) {
            blockContainer.resetBlocks()
        }
    }

    exit() {
        this.ball.deactivate()
    }
}

export default GameplayState
