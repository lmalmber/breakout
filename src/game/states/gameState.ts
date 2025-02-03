/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import Scene from '@/engine/scene'

abstract class GameState {
    protected scene: Scene

    constructor(scene: Scene) {
        this.scene = scene
    }

    enter(_scene: Scene) { }

    exit() { }

    update(_deltaTime: number): GameState | undefined {
        return undefined
    }
}

export default GameState
