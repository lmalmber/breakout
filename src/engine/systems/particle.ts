import Entity from '@/engine/entity'
import Vector2 from '@/engine/math/vector2'
import Scene from '@/engine/scene'
import Transform, { TransformType } from '@/engine/components/transform'

type UpdateHook = (deltaTime: number, particle: Particle) => void
type ParticleLifetime = number | 'infinite'

export interface ParticleConfig {
    position?: Vector2
    lifetime?: ParticleLifetime
    size?: number
    color?: string
    updateHook?: UpdateHook
}

class Particle extends Entity {
    lifetime: ParticleLifetime = 1
    size = 1
    color = 'white'
    updateHook: UpdateHook | null = null
    inUse = false
    next: Particle | null = null

    constructor(scene: Scene, config?: ParticleConfig) {
        super(scene, 'particle')
        this.addComponent(TransformType, new Transform(this))
        this.configure(config)
    }

    configure(config: ParticleConfig = {}) {
        const transform = this.getComponent<Transform>(TransformType)
        if (transform) {
            transform.position = Object.assign(new Vector2(), config.position)
        }

        this.lifetime = config.lifetime ?? 1
        this.size = config.size ?? 1
        this.color = config.color ?? 'white'
        this.updateHook = config.updateHook ?? null
    }

    update(deltaTime: number) {
        if (!this.inUse) {
            return
        }

        if (this.updateHook) {
            this.updateHook(deltaTime, this)
        }

        if (this.lifetime === 'infinite') {
            return
        }

        this.lifetime -= deltaTime

        if (this.lifetime <= 0) {
            this.inUse = false
            return true
        }
    }
}

export default Particle
