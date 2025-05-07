import { Game } from '../GameLoop.js';
import CanvasUtil from './CanvasUtil.js';
import KeyListener from './KeyListener.js';
import MouseListener from './MouseListener.js';
import Start from '../scenes/Start.js';
export default class ColorGa extends Game {
    static canvas;
    keyListener;
    mouseListener;
    currentScene;
    constructor(canvas) {
        super();
        ColorGa.canvas = canvas;
        ColorGa.canvas.height = window.innerHeight;
        ColorGa.canvas.width = window.innerWidth;
        this.keyListener = new KeyListener();
        this.mouseListener = new MouseListener(canvas);
        CanvasUtil.setCanvas(ColorGa.canvas);
        window.addEventListener('resize', () => this.onWindowResize(), false);
        this.currentScene = new Start();
    }
    onWindowResize() {
        ColorGa.canvas.width = window.innerWidth;
        ColorGa.canvas.height = window.innerHeight;
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
        CanvasUtil.clearCanvas(ColorGa.canvas);
        CanvasUtil.fillCanvas(ColorGa.canvas, 'black');
        this.currentScene.render(ColorGa.canvas);
        const context = ColorGa.canvas.getContext('2d');
        context.font = '20px System-ui White';
        if (KeyListener.isKeyDown('ControlLeft')) {
            CanvasUtil.writeText(ColorGa.canvas, `X - ${(MouseListener.mouseCoordinates.x / window.innerWidth).toFixed(3)}`, window.innerWidth / 20, window.innerHeight / 1.02, 'left', 'system-ui', 20, 'white');
            CanvasUtil.writeText(ColorGa.canvas, `Y - ${(MouseListener.mouseCoordinates.y / window.innerHeight).toFixed(3)}`, window.innerWidth / 10, window.innerHeight / 1.02, 'left', 'system-ui', 20, 'white');
        }
    }
}
//# sourceMappingURL=ColorGa.js.map