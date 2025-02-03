type Callback = () => void

class Timer {
    private elapsedTime = 0
    private interval: number
    private callback: Callback
    private _isOneOff: boolean
    private _hasTriggered = false

    constructor(interval: number, callback: Callback, isOneOff = false) {
        this.interval = interval
        this.callback = callback
        this._isOneOff = isOneOff
    }

    update(deltaTime: number) {
        if (this.isOneOff && this.hasTriggered) {
            return
        }

        this.elapsedTime += deltaTime

        if (this.elapsedTime >= this.interval) {
            this.callback()
            this.elapsedTime = 0

            if (this._isOneOff) {
                this._hasTriggered = true
            }
        }
    }

    get isOneOff() {
        return this._isOneOff
    }

    get hasTriggered() {
        return this._hasTriggered
    }
}

export default Timer
