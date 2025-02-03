import '@/style.css'
import Game from '@/engine/game'
import MainScene from '@/game/mainScene'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) {
    throw new Error('Failed to create app')
}

app.innerHTML = `
    <div>
        <canvas width="800" height="600" id="canvas" style="border: 1px solid"></canvas>
    </div>
`

const game = new Game()
game.start(new MainScene())
