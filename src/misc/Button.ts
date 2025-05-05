import CanvasUtil from '../utilities/CanvasUtil.js';
import MouseListener from '../utilities/MouseListener.js';
import { hexToRgb, rgbToHex } from '../utilities/ColorUtils.js';

export default class Button {
  private color: { r: number, g:number, b:number };

  private text: string = '';

  public pressed: boolean = false;

  private isHover: boolean = false;

  private isHolding: boolean = false;

  private type: string = '';

  private position: { x: number, y: number } = { x: 0, y: 0 };

  private dimensions: { width: number, height: number } = { width: 0, height: 0 };

  public constructor(color: { r: number, g:number, b:number }, text: string, posX: number, posY: number, width: number, height: number, type: string) {
    this.color = color;
    this.text = text;
    this.position = { x: posX, y: posY };
    [this.dimensions.width, this.dimensions.height] = [width, height];
    this.type = type;
  }

  public setColor(color: { r: number, g:number, b:number }) {
    this.color = color;
  }

  /**
   * @returns boolean indicating if button has been pressed
   */
  public processInput(): boolean {
    if (this.type === 'click') {
      this.pressed = false;
    }
    if (this.type === 'toggle') {
      if (this.isHolding && MouseListener.mouseUp) {
        this.pressed = !this.pressed;
      }
    } else if (this.isHolding && MouseListener.mouseUp) {
      this.pressed = true;
    }
    this.isHover = MouseListener.mouseHover(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    this.isHolding = MouseListener.isButtonDown(0) && this.isHover;

    return this.pressed;
  }

  /**
   * Renders the button on the canvas with its current state and colors.
   *
   * @param canvas - The canvas element to render on.
   * @param targetColor - The color to display when the button is pressed.
   * @param targetColor.r - The red component of the target color (0-255).
   * @param targetColor.g - The green component of the target color (0-255).
   * @param targetColor.b - The blue component of the target color (0-255).
   * @param secondaryColor - The secondary color used for text rendering.
   * @param secondaryColor.r - The red component of the secondary color (0-255).
   * @param secondaryColor.g - The green component of the secondary color (0-255).
   * @param secondaryColor.b - The blue component of the secondary color (0-255).
   */
  public render(canvas: HTMLCanvasElement, targetColor: { r: number; g: number; b: number }, secondaryColor: { r: number; g: number; b: number }) {
    CanvasUtil.fillRectangle(canvas, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height, this.color.r, this.color.g, this.color.b, 1, 10);
    CanvasUtil.drawRectangle(canvas, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height, this.color.r, this.color.g, this.color.b, 1, 10, 10);
    if (this.isHover) {
      CanvasUtil.fillRectangle(canvas, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height, 255, 255, 255, 0.4, 12);
    }
    if (this.isHolding) {
      CanvasUtil.fillRectangle(canvas, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height, 255, 255, 255, 0.3, 12);
    }
    if (this.pressed) {
      CanvasUtil.fillRectangle(canvas, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height, targetColor.r, targetColor.g, targetColor.b, 1, 12);
      CanvasUtil.fillRectangle(canvas, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height, 255, 255, 255, 0.4, 12);
    }

    const textColor = rgbToHex(secondaryColor.r * 0.5, secondaryColor.g * 0.5, secondaryColor.b * 0.5);
    CanvasUtil.writeText(canvas, this.text, this.position.x + this.dimensions.width / 2, this.position.y + window.innerHeight * 0.027, 'center', 'arial', 20, textColor);
  }
}
