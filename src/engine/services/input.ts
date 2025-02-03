class Input {
    private keysDown = new Set<string>()
    private keysPressedThisFrame = new Set<string>()

    constructor() {
        document.addEventListener('keydown', e => this.handleKeyDown(e))
        document.addEventListener('keyup', e => this.handleKeyUp(e))
    }

    clearState() {
        this.keysPressedThisFrame.clear()
    }

    isKeyPressedThisFrame(key: string) {
        return this.keysPressedThisFrame.has(key)
    }

    isKeyHeldDown(key: string) {
        return this.keysDown.has(key)
    }

    private handleKeyDown(e: KeyboardEvent) {
        if (!this.keysDown.has(e.key)) {
            this.keysPressedThisFrame.add(e.key)
        }
        this.keysDown.add(e.key)
    }

    private handleKeyUp(e: KeyboardEvent) {
        this.keysDown.delete(e.key)
    }
}

export default Input
