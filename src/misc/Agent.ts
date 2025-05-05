import CanvasUtil from '../utilities/CanvasUtil.js';

export default class Agent {
  public index: number;

  private red: number;

  private green: number;

  private blue: number;

  private position: { x: number, y: number } = { x: window.innerWidth * 0.04, y: window.innerHeight * 0.05 };

  private shape: { width: number, height: number } = { width: 0, height: 0 };

  private fitness: number;

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

  public update() {

  }

  public render(canvas: HTMLCanvasElement) {
    CanvasUtil.fillRectangle(canvas, this.position.x, this.position.y, this.shape.width, this.shape.height, this.red, this.green, this.blue, 1, 6);
  }
}
