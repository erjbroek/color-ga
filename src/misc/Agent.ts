import CanvasUtil from '../utilities/CanvasUtil.js';
import GenAlgorithm from './GenAlgorithm.js';

export default class Agent {
  public index: number;

  private red: number;

  private green: number;

  private blue: number;

  public position: { x: number, y: number } = { x: window.innerWidth * 0.04, y: window.innerHeight * 0.05 };

  private gridSize: number = 0;

  private shape: { width: number, height: number } = { width: 0, height: 0 };

  public fitness: number;

  public constructor(index: number, red: number, green: number, blue: number, gridSize: { width: number, height: number }, totalNumAgents: number) {
    this.index = index;
    [this.red, this.green, this.blue] = [red, green, blue];

    const gridSide = Math.ceil(Math.sqrt(totalNumAgents));
    this.shape.width = gridSize.width / gridSide;
    this.shape.height = gridSize.height / gridSide;

    this.position.x += (index % gridSide) * this.shape.width;
    this.position.y += Math.floor(index / gridSide) * this.shape.height;
  }

  public processInput() {

  }

  public reposition(position: number) {
    this.position = { x: window.innerWidth * 0.04, y: window.innerHeight * 0.05 };

    const gridSide = Math.ceil(Math.sqrt(GenAlgorithm.numberOfAgents));
    this.position.x += (this.index % gridSide) * this.shape.width;
    this.position.y += Math.floor(this.index / gridSide) * this.shape.height;
  }

  public calculateFitness(): void {
    this.fitness =
                Math.abs(GenAlgorithm.targetColor.r - this.red) +
                Math.abs(GenAlgorithm.targetColor.g - this.green) +
                Math.abs(GenAlgorithm.targetColor.b - this.blue);
  }

  public update() {

  }

  public render(canvas: HTMLCanvasElement) {
    CanvasUtil.fillRectangle(canvas, this.position.x, this.position.y, this.shape.width, this.shape.height, this.red, this.green, this.blue, 1);
  }
}
