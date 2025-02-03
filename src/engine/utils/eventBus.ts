type EventCallback = (...args: unknown[]) => void

class EventBus {
    private events = new Map<string, EventCallback[]>()

    on(event: string, callback: EventCallback) {
        if (!this.events.has(event)) {
            this.events.set(event, [])
        }

        const existingEvent = this.events.get(event)
        if (existingEvent) {
            existingEvent.push(callback)
        }
    }

    emit(event: string, payload?: unknown) {
        this.events.get(event)?.forEach(callback => callback(payload))
    }
}

export default EventBus
