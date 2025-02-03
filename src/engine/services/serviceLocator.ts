/* eslint-disable @typescript-eslint/no-extraneous-class */

import Input from '@/engine/services/input'
import EventBus from '@/engine/utils/eventBus'
import Graphics from '@/engine/services/graphics'

class ServiceLocator {
    private static _graphics: Graphics
    private static _input: Input
    private static _events: EventBus

    static setGraphics(graphics: Graphics) {
        ServiceLocator._graphics = graphics
    }

    static getGraphics(): Graphics {
        return ServiceLocator._graphics
    }

    static setInput(input: Input) {
        ServiceLocator._input = input
    }

    static getInput(): Input {
        return ServiceLocator._input
    }

    static setEvents(events: EventBus) {
        ServiceLocator._events = events
    }

    static getEvents(): EventBus {
        return ServiceLocator._events
    }
}

export default ServiceLocator
