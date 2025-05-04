import CanvasUtil from '../utilities/CanvasUtil.js';
import KeyListener from '../utilities/KeyListener.js';
import Agent from './Agent.js';
import Scene from './Scene.js';

export default class Start extends Scene {
  private colorAgents: Agent[] = [];

  public constructor() {
    super();
    for (let i: number = 0; i < 100; i++) {
      this.colorAgents.push(new Agent(i, Math.random() * 255, Math.random() * 255, Math.random() * 255, 10, { width: window.innerWidth * 0.7, height: window.innerHeight * 0.8 }));
    }
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
    CanvasUtil.fillRectangle(canvas, canvas.width * 0.05, canvas.height * 0.1, canvas.width * 0.7, canvas.height * 0.8, 255, 255, 255, 0.1, 2);
    this.colorAgents.forEach((agent) => {
      agent.render(canvas);
    });
  }
}
