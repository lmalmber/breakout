import Entity from '@/engine/entity'
import Particle, { ParticleConfig } from '@/engine/systems/particle'
import Scene from '@/engine/scene'
import Graphics from '@/engine/services/graphics'
import Transform, { TransformType } from '@/engine/components/transform'

class ParticleSystem extends Entity {
    private maxParticles: number
    private particlePool: Particle[] = []
    private firstAvailable: Particle | null = null

    constructor(scene: Scene, maxParticles: number) {
        super(scene, 'particleSystem')
        this.maxParticles = maxParticles

        for (let i = 0; i < this.maxParticles; i++) {
            this.particlePool.push(new Particle(scene))
        }

        this.firstAvailable = this.particlePool[0]
        for (let i = 0; i < this.particlePool.length - 1; i++) {
            this.particlePool[i].next = this.particlePool[i + 1]
        }
        this.particlePool[this.maxParticles - 1].next = null
    }

    spawnParticle(config: ParticleConfig) {
        if (!this.firstAvailable) {
            return
        }

        const particle = this.firstAvailable
        this.firstAvailable = particle.next
        particle.next = null
        particle.configure(config)
        particle.inUse = true
    }

    update(deltaTime: number) {
        this.particlePool.forEach(particle => {
            if (!particle.inUse) {
                return
            }
            const isFinished = particle.update(deltaTime)
            if (isFinished) {
                particle.inUse = false
                particle.next = this.firstAvailable
                this.firstAvailable = particle
            }
        })
    }

    draw(graphics: Graphics) {
        this.particlePool.forEach(particle => {
            if (!particle.inUse) {
                return
            }

            const transform = particle.getComponent<Transform>(TransformType)
            if (!transform) {
                return
            }

            graphics.drawRect(transform.position.x, transform.position.y,
                particle.size, particle.size, particle.color)
        })
    }
}

export default ParticleSystem
