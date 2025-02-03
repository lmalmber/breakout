import Scene from '@/engine/scene'
import Graphics from '@/engine/services/graphics'
import Component, { ComponentType } from '@/engine/components/component'
import EventBus from '@/engine/utils/eventBus'
import { generateId } from '@/engine/utils/id'

abstract class Entity {
    readonly id: string
    readonly name: string
    readonly scene: Scene
    private eventBus = new EventBus()
    private components = new Map<ComponentType, Component>
    private _isInitialized = false
    private _isActive = true

    constructor(scene: Scene, name: string) {
        this.id = generateId()
        this.name = name
        this.scene = scene
    }

    initialize() {
        if (!this.isInitialized) {
            this.components.forEach(component => component.initialize())
            this._isInitialized = true
        }
    }

    update(deltaTime: number) {
        if (this.isActive) {
            this.components.forEach(component => component.update(deltaTime))
        }
    }

    draw(graphics: Graphics) {
        if (this.isActive) {
            this.components.forEach(component => component.draw(graphics))
        }
    }

    addComponent(type: ComponentType, component: Component) {
        this.components.set(type, component)
    }

    removeComponent(type: ComponentType) {
        this.components.delete(type)
    }

    getComponent<T extends Component>(type: ComponentType) {
        return this.components.get(type) as T | undefined
    }

    emitEvent(event: string, payload: unknown) {
        this.eventBus.emit(event, payload)
    }

    onEvent(event: string, callback: (payload: unknown) => void) {
        this.eventBus.on(event, callback)
    }

    activate() {
        this._isActive = true
    }

    deactivate() {
        this._isActive = false
    }

    get isActive() {
        return this._isActive
    }

    get isInitialized() {
        return this._isInitialized
    }
}

export default Entity
