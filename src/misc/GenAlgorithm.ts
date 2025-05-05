import CanvasUtil from '../utilities/CanvasUtil.js';
import Agent from './Agent.js';

export default class GenAlgorithm {
  public targetColor: { r: number; g: number; b: number } = {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256)
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
      canvas.width * 0.3,
      canvas.height * 0.94,
      [
        { red: 25, green: 25, blue: 25, opacity: 1, stop: 0.1 },
        { red: this.targetColor.r, green: this.targetColor.g, blue: this.targetColor.b, opacity: 1, stop: 0.2 }
      ],
      180,
    );
    const hexColor = `#${((1 << 24) + (this.targetColor.r << 16) + (this.targetColor.g << 8) + this.targetColor.b).toString(16).slice(1).toUpperCase()}`;
    const textColor = this.getContrastingColor(this.targetColor);
    CanvasUtil.writeText(
      canvas,
      hexColor,
      canvas.width * 0.73,
      canvas.height * 0.5,
      'center',
      'system-ui',
      50,
      textColor,
      500,
    );
    CanvasUtil.drawRectangle(canvas, canvas.width * 0.03, canvas.height * 0.03, canvas.width * 0.82, canvas.height * 0.94, this.targetColor.r, this.targetColor.g, this.targetColor.b, 1, 4, 5)
  }

  private getContrastingColor({ r, g, b }: { r: number, g: number, b: number }) {
    const brightness = r * 0.299 + g * 0.587 + b * 0.114;
    const factor = brightness > 186 ? 0.7 : 1.3;

    const newR = Math.min(255, Math.round(r * factor));
    const newG = Math.min(255, Math.round(g * factor));
    const newB = Math.min(255, Math.round(b * factor));

    return `rgb(${newR}, ${newG}, ${newB})`;
  }
}
