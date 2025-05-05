import MouseListener from '../utilities/MouseListener.js';

export default class Button {
  private color: string = '';

  public pressed: boolean = false;

  private isHover: boolean = false;

  private isHolding: boolean = false;

  private position: { x: number, y: number } = { x: 0, y: 0 };

  private dimensions: { width: number, height: number } = { width: 0, height: 0 };

  public constructor(color: string, posX: number, posY: number, width: number, height: number) {
    this.color = color;
    [this.position.x, this.position.y] = [posX, posY];
    [this.dimensions.width, this.dimensions.height] = [width, height]
  }

  public setColor(color: 'string') {
    this.color = color;
  }

  public processInput(): boolean {
    this.isHover = MouseListener.mouseHover(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);

    return false;
  }

  public render(canvas: HTMLCanvasElement) {
    
  }
}
