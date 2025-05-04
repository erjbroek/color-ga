import { Game } from '../GameLoop.js';
import CanvasUtil from './CanvasUtil.js';
import KeyListener from './KeyListener.js';
import MouseListener from './MouseListener.js';
import Start from '../scenes/Start.js';
export default class ColorGa extends Game {
    canvas;
    keyListener;
    mouseListener;
    currentScene;
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.keyListener = new KeyListener();
        this.mouseListener = new MouseListener(canvas);
        CanvasUtil.setCanvas(this.canvas);
        window.addEventListener('resize', () => this.onWindowResize(), false);
        this.currentScene = new Start();
    }
    onWindowResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    processInput() {
        this.currentScene.processInput(this.keyListener);
    }
    update(elapsed) {
        const nextScene = this.currentScene.update(elapsed);
        if (nextScene !== null)
            this.currentScene = nextScene;
        return true;
    }
    render() {
        CanvasUtil.clearCanvas(this.canvas);
        CanvasUtil.fillCanvas(this.canvas, 'black');
        this.currentScene.render(this.canvas);
        const context = this.canvas.getContext('2d');
        context.font = '20px System-ui White';
        if (KeyListener.isKeyDown('ControlLeft')) {
            CanvasUtil.writeText(this.canvas, `X - ${(MouseListener.mouseCoordinates.x / window.innerWidth).toFixed(3)}`, window.innerWidth / 20, window.innerHeight / 1.02, 'left', 'system-ui', 20, 'white');
            CanvasUtil.writeText(this.canvas, `Y - ${(MouseListener.mouseCoordinates.x / window.innerWidth).toFixed(3)}`, window.innerWidth / 10, window.innerHeight / 1.02, 'left', 'system-ui', 20, 'white');
        }
    }
}
//# sourceMappingURL=ColorGa.js.map