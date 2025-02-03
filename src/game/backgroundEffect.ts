import Entity from '@/engine/entity'
import Vector2 from '@/engine/math/vector2'
import Scene from '@/engine/scene'
import ParticleSystem from '@/engine/systems/particleSystem'
import ServiceLocator from '@/engine/services/serviceLocator'
import { getRandomInt, getRandomFloat, clamp } from '@/engine/math/mathUtils'
import { colors } from '@/game/constants/colors'

class BackgroundEffect extends Entity {
    constructor(scene: Scene) {
        super(scene, 'backgroundEffect')
    }

    initialize() {
        super.initialize()

        const graphics = ServiceLocator.getGraphics()
        const particleSystem = this.scene.getEntityByName<ParticleSystem>('particleSystem')
        if (!graphics || !particleSystem) {
            throw new Error('Failed to create background effect')
        }

        for (let i = 0; i < 500; i++) {
            const x = getRandomInt(0, graphics.width)
            const y = getRandomInt(0, graphics.height)
            particleSystem.spawnParticle({
                position: new Vector2(x, y),
                lifetime: 'infinite',
                size: getRandomInt(1, 3),
                color: colors.particles,
                updateHook: (deltaTime, particle) => {
                    particle.size += getRandomFloat(-5, 5) * deltaTime
                    particle.size = clamp(particle.size, 1, 3)
                }
            })
        }
    }
}

export default BackgroundEffect
