import { Game } from '../GameLoop.js';
import CanvasUtil from './CanvasUtil.js';
import KeyListener from './KeyListener.js';
import Scene from '../scenes/Scene.js';
import MouseListener from './MouseListener.js';
import Start from '../scenes/Start.js';

export default class ColorGa extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: KeyListener;

  private mouseListener: MouseListener;

  private currentScene: Scene;

  public constructor(canvas: HTMLCanvasElement) {
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

  /**
   * Automatically adjusts scene size/aspect if window is resized
   */
  public onWindowResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput(): void {
    this.currentScene.processInput(this.keyListener);
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param elapsed time elapsed from the GameLoop
   * @returns true if the game should continue
   */
  public update(elapsed: number): boolean {
    const nextScene = this.currentScene.update(elapsed);

    if (nextScene !== null) this.currentScene = nextScene;
    return true;
  }

  /**
   * Render all the elements in the screen. Called from GameLoop
   */
  public render(): void {
    CanvasUtil.clearCanvas(this.canvas);
    CanvasUtil.fillCanvas(this.canvas, 'black');
    this.currentScene.render(this.canvas);
    const context = this.canvas.getContext('2d');
    context.font = '20px System-ui White';
    if (KeyListener.isKeyDown('ControlLeft')) {
      CanvasUtil.writeText(this.canvas, `X - ${(MouseListener.mouseCoordinates.x / window.innerWidth).toFixed(3)}`,  window.innerWidth / 20, window.innerHeight / 1.02, 'left', 'system-ui', 20, 'white')
      CanvasUtil.writeText(this.canvas, `Y - ${(MouseListener.mouseCoordinates.y / window.innerHeight).toFixed(3)}`,  window.innerWidth / 10, window.innerHeight / 1.02, 'left', 'system-ui', 20, 'white')
    }
  }
}
