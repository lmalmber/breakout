import GameState from '@/game/states/gameState'
import Scene from '@/engine/scene'
import ServiceLocator from '@/engine/services/serviceLocator'
import Input from '@/engine/services/input'
import GameplayState from '@/game/states/gameplayState'
import HeadingText from '@/game/ui/headingText'
import SubheadingText from '@/game/ui/subheadingText'
import Entity from '@/engine/entity'

class GameLoseState extends GameState {
    private title: Entity
    private prompt: Entity
    private input: Input

    constructor(scene: Scene) {
        super(scene)
        this.input = ServiceLocator.getInput()

        this.title = new HeadingText(scene, 'Game Over')
        scene.addEntity(this.title)

        this.prompt = new SubheadingText(scene, 'Press Space to Try Again')
        scene.addEntity(this.prompt)
    }

    update() {
        const spaceKey = ' '
        if (this.input.isKeyPressedThisFrame(spaceKey)) {
            return new GameplayState(this.scene)
        }
    }

    exit() {
        this.title.deactivate()
        this.prompt.deactivate()
    }
}

export default GameLoseState
