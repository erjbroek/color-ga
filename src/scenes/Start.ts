import GenAlgorithm from '../misc/GenAlgorithm.js';
import CanvasUtil from '../utilities/CanvasUtil.js';
import KeyListener from '../utilities/KeyListener.js';
import Agent from '../misc/Agent.js';
import Scene from './Scene.js';
import Button from '../misc/Button.js';

export default class Start extends Scene {
  private algoritm: GenAlgorithm = new GenAlgorithm(10000);

  private manualButton: Button = new Button(GenAlgorithm.secondaryColor, 'Manual evo', window.innerWidth * 0.78, window.innerHeight * 0.1, window.innerWidth * 0.07, window.innerHeight * 0.04, "toggle")

  private autoButton: Button = new Button(GenAlgorithm.secondaryColor, 'auto evo', window.innerWidth * 0.87, window.innerHeight * 0.1, window.innerWidth * 0.07, window.innerHeight * 0.04, "toggle")

  private endGenerationButton: Button = new Button(GenAlgorithm.secondaryColor, 'End Generation', window.innerWidth * 0.59, window.innerHeight * 0.9, window.innerWidth * 0.07, window.innerHeight * 0.04, "click")

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
    if (this.manualButton.processInput()) {
      this.autoButton.pressed = !this.manualButton.pressed;
    }
    if (this.autoButton.processInput()) {
      this.manualButton.pressed = !this.autoButton.pressed;
    }

    if (this.endGenerationButton.processInput()) {
      this.algoritm.nextGen()
    }
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
    this.manualButton.render(canvas, GenAlgorithm.targetColor, GenAlgorithm.secondaryColor);
    this.autoButton.render(canvas, GenAlgorithm.targetColor, GenAlgorithm.secondaryColor);
    this.endGenerationButton.render(canvas, GenAlgorithm.targetColor, GenAlgorithm.secondaryColor)
  }
}
