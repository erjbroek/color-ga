import GenAlgorithm from '../misc/GenAlgorithm.js';
import CanvasUtil from '../utilities/CanvasUtil.js';
import KeyListener from '../utilities/KeyListener.js';
import Agent from '../misc/Agent.js';
import Scene from './Scene.js';

export default class Start extends Scene {
  private algoritm: GenAlgorithm = new GenAlgorithm(400);

  public constructor() {
    super();
  }

  /**
   * Processes player input858
   * 3
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
    CanvasUtil.fillRectangle(canvas, canvas.width * 0.03, canvas.height * 0.03, canvas.width * 0.52, canvas.height * 0.94, 255, 255, 255, 0.1, 2);
    this.algoritm.colorAgents.forEach((agent: Agent) => {
      agent.render(canvas);
    });
    this.algoritm.renderTarget(canvas);
  }
}
