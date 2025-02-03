export function getRandomInt(x: number, y: number) {
    const min = Math.ceil(Math.min(x, y))
    const max = Math.floor(Math.max(x, y))
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomFloat(x: number, y: number) {
    return Math.random() * (y - x) + x
}

export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max)
}
