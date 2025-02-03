/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import Entity from '@/engine/entity'
import Graphics from '@/engine/services/graphics'

export type ComponentType = symbol

abstract class Component {
    readonly entity: Entity
    readonly name: string

    constructor(entity: Entity, name: string) {
        this.entity = entity
        this.name = name
    }

    initialize() { }
    update(_deltaTime: number) { }
    draw(_graphics: Graphics) { }
}

export default Component
