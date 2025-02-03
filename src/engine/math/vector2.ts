class Vector2 {
    constructor(public x = 0, public y = 0) { }

    add(vec2: Vector2) {
        return new Vector2(this.x + vec2.x, this.y + vec2.y)
    }

    subtract(vec2: Vector2) {
        return new Vector2(this.x - vec2.x, this.y - vec2.y)
    }

    multiply(scalar: number) {
        return new Vector2(this.x * scalar, this.y * scalar)
    }

    divide(scalar: number) {
        return new Vector2(this.x / scalar, this.y / scalar)
    }

    normalize() {
        const length = this.length()
        if (length === 0) return new Vector2(0, 0)
        return new Vector2(this.x / length, this.y / length)
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
}

export default Vector2
