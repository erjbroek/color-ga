import CanvasUtil from '../utilities/CanvasUtil.js';

export default class Agent {
  public index: number;

  private red: number;

  private green: number;

  private blue: number;

  private position: { x: number, y: number } = { x: window.innerWidth * 0.07, y: window.innerHeight * 0.12}

  private fitness: number;

  public constructor(index: number, red: number, green: number, blue: number, numPerRow: number, gridSize: { width: number, height: number }) {
    this.index = index;
    [this.red, this.green, this.blue] = [red, green, blue];

    this.position.x += (index % numPerRow) * (gridSize.width / numPerRow);
    this.position.y += Math.floor(index / numPerRow) * (gridSize.height / 10);
  }

  public processInput() {

  }

  public update() {

  }

  public render(canvas: HTMLCanvasElement) {
    CanvasUtil.fillRectangle(canvas, this.position.x, this.position.y, 30, 30, this.red, this.green, this.blue, 1, 5);
  }
}
