class Graphics {
    readonly canvas: HTMLCanvasElement
    readonly context: CanvasRenderingContext2D
    readonly width: number
    readonly height: number
    private backgroundColor = '#fff'

    constructor() {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement | null
        if (!canvas) {
            throw new Error('Canvas not found')
        }

        const context = canvas.getContext('2d')
        if (!context) {
            throw new Error('2d context not supported')
        }

        this.canvas = canvas
        this.context = context
        this.width = this.canvas.width
        this.height = this.canvas.height
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.width, this.height)
        this.context.fillStyle = this.backgroundColor
        this.context.fillRect(0, 0, this.width, this.height)
    }

    drawRect(x: number, y: number, width: number, height: number, color: string) {
        this.context.fillStyle = color
        this.context.fillRect(x, y, width, height)
    }

    setBackgroundColor(color: string) {
        this.backgroundColor = color
    }
}

export default Graphics
