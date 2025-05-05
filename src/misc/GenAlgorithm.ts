import CanvasUtil from '../utilities/CanvasUtil.js';
import Agent from './Agent.js';
import { rgbToColorName } from '../utilities/ColorUtils.js';

export default class GenAlgorithm {
  public targetColor: { r: number; g: number; b: number } = {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };

  public colorAgents: Agent[] = [];

  private numberOfAgents: number = 0;

  public constructor(numberOfAgents: number) {
    this.numberOfAgents = numberOfAgents;
    for (let i: number = 0; i < numberOfAgents; i++) {
      this.colorAgents.push(new Agent(i, Math.random() * 255, Math.random() * 255, Math.random() * 255, { width: window.innerWidth * 0.5, height: window.innerHeight * 0.9 }, this.numberOfAgents));
    }
  }

  public setTargetColor(color: { r: number; g: number; b: number }) {
    this.targetColor = color;
  }

  public update(deltaTime: number) {

  }

  public renderTarget(canvas: HTMLCanvasElement) {
    CanvasUtil.fillRectangleWithGradient(
      canvas,
      canvas.width * 0.55,
      canvas.height * 0.03,
      canvas.width * 0.2,
      canvas.height * 0.94,
      [
        { red: 25, green: 25, blue: 25, opacity: 1, stop: 0 },
        { red: this.targetColor.r, green: this.targetColor.g, blue: this.targetColor.b, opacity: 1, stop: 0.1 },
      ],
      180,
      10,
    );

    const hexColor = `#${((1 << 24) + (this.targetColor.r << 16) + (this.targetColor.g << 8) + this.targetColor.b).toString(16).slice(1).toUpperCase()}`;
    const textColor = this.getContrastingColor(this.targetColor, canvas);
    const colorName = rgbToColorName(this.targetColor.r, this.targetColor.g, this.targetColor.b);

    CanvasUtil.writeText(canvas, hexColor, canvas.width * 0.66, canvas.height * 0.31, 'center', 'arial', 50, textColor, 500);
    CanvasUtil.writeText(canvas, colorName, canvas.width * 0.66, canvas.height * 0.34, 'center', 'arial', 20, textColor, 500);
    // CanvasUtil.writeTextOutline(canvas, hexColor, canvas.width * 0.66, canvas.height * 0.31, 'center', 'arial', 50, 'black', 0.2);
    // CanvasUtil.writeTextOutline(canvas, colorName, canvas.width * 0.66, canvas.height * 0.34, 'center', 'arial', 20, 'black', 0.1);

    CanvasUtil.drawRectangle(canvas, canvas.width * 0.03, canvas.height * 0.03, canvas.width * 0.72, canvas.height * 0.94, this.targetColor.r, this.targetColor.g, this.targetColor.b, 1, 4, 10);
    CanvasUtil.fillRectangle(canvas, canvas.width * 0.74, canvas.height * 0.03, canvas.width * 0.23, canvas.height * 0.94, this.targetColor.r, this.targetColor.g, this.targetColor.b, 1, 10);
    CanvasUtil.drawRectangle(canvas, canvas.width * 0.74, canvas.height * 0.03, canvas.width * 0.23, canvas.height * 0.94, this.targetColor.r, this.targetColor.g, this.targetColor.b, 1, 4, 10);

    CanvasUtil.fillRectangle(canvas, canvas.width * 0.76, canvas.height * 0.05, canvas.width * 0.2, canvas.height * 0.9, this.targetColor.r - 15, this.targetColor.g - 15, this.targetColor.b - 15, 1, 10);
    CanvasUtil.fillRectangle(canvas, canvas.width * 0.58, canvas.height * 0.55, canvas.width * 0.22, canvas.height * 0.4, this.targetColor.r - 15, this.targetColor.g - 15, this.targetColor.b - 15, 1, 10);
  }

  private getContrastingColor({ r, g, b }: { r: number, g: number, b: number }, canvas: HTMLCanvasElement) {
    const brightness = r * 0.299 + g * 0.587 + b * 0.114;
    const factor = brightness > 186 ? 0.7 : 2.5;

    const newR = Math.min(255, Math.round(r * factor));
    const newG = Math.min(255, Math.round(g * factor));
    const newB = Math.min(255, Math.round(b * factor));

    return `rgb(${newR}, ${newG}, ${newB})`;
  }
}
