import CanvasUtil from '../utilities/CanvasUtil.js';
import KeyListener from '../utilities/KeyListener.js';
import Scene from './Scene.js';

export default class Start extends Scene {
  public constructor() {
    super();
  }

  /**
   * Processes player input
   *
   * @param keyListener - used to listen to the players keyboard inputs
   */
  public processInput(keyListener: KeyListener): void {

  }

  /**
   * Updates the scene based on the elapsed time.
   *
   * @param elapsed - The time elapsed since the last update.
   * @returns The current scene.
   */
  public update(elapsed: number): Scene {
    return this;
  }

  /**
   * Renders the items on the screen
   *
   * @param canvas is the canvas the items are rendered to
   */
  public render(canvas: HTMLCanvasElement): void {

  }
}
