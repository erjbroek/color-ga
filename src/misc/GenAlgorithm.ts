import CanvasUtil from '../utilities/CanvasUtil.js';
import Agent from './Agent.js';
import { rgbToColorName } from '../utilities/ColorUtils.js';
import { hexToRgb, rgbToHex } from '../utilities/ColorUtils.js';

export default class GenAlgorithm {
  public static targetColor: { r: number; g: number; b: number } = {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };

  public static secondaryColor: { r: number; g: number; b: number } = {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };

  private textHex: string = '';

  private colorName: string = '';

  public colorAgents: Agent[] = [];

  public static numberOfAgents: number = 0;

  public constructor(numberOfAgents: number) {
    GenAlgorithm.numberOfAgents = numberOfAgents;
    for (let i: number = 0; i < numberOfAgents; i++) {
      this.colorAgents.push(new Agent(i, Math.random() * 255, Math.random() * 255, Math.random() * 255, { width: window.innerWidth * 0.5, height: window.innerHeight * 0.9 }, GenAlgorithm.numberOfAgents));
    }

    this.textHex = `#${((1 << 24) + (GenAlgorithm.targetColor.r << 16) + (GenAlgorithm.targetColor.g << 8) + GenAlgorithm.targetColor.b).toString(16).slice(1).toUpperCase()}`;
    GenAlgorithm.secondaryColor = this.getContrastingColor(GenAlgorithm.targetColor)
    this.colorName = rgbToColorName(GenAlgorithm.targetColor.r, GenAlgorithm.targetColor.g, GenAlgorithm.targetColor.b);
  }

  public setTargetColor(color: { r: number; g: number; b: number }) {
    GenAlgorithm.targetColor = color;
    this.textHex = `#${((1 << 24) + (GenAlgorithm.targetColor.r << 16) + (GenAlgorithm.targetColor.g << 8) + GenAlgorithm.targetColor.b).toString(16).slice(1).toUpperCase()}`;
    GenAlgorithm.secondaryColor = this.getContrastingColor(GenAlgorithm.targetColor)
    this.colorName = rgbToColorName(GenAlgorithm.targetColor.r, GenAlgorithm.targetColor.g, GenAlgorithm.targetColor.b);
  }

  public update(deltaTime: number) {

  }

  public nextGen() {
    this.colorAgents.forEach((agent: Agent) => {
      agent.calculateFitness();
    });

    this.colorAgents.sort((a, b) => a.fitness - b.fitness);

    this.colorAgents.forEach((agent: Agent, index: number) => {
      agent.index = index;
      agent.reposition(agent.index)
    });
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
        { red: GenAlgorithm.targetColor.r, green: GenAlgorithm.targetColor.g, blue: GenAlgorithm.targetColor.b, opacity: 1, stop: 0.1 },
      ],
      180,
      10,
    );

    CanvasUtil.writeText(canvas, this.textHex, canvas.width * 0.66, canvas.height * 0.31, 'center', 'arial', 50, rgbToHex(GenAlgorithm.secondaryColor.r, GenAlgorithm.secondaryColor.g, GenAlgorithm.secondaryColor.b), 500);
    CanvasUtil.writeText(canvas, this.colorName, canvas.width * 0.66, canvas.height * 0.34, 'center', 'arial', 20, rgbToHex(GenAlgorithm.secondaryColor.r, GenAlgorithm.secondaryColor.g, GenAlgorithm.secondaryColor.b), 500);

    CanvasUtil.drawRectangle(canvas, canvas.width * 0.03, canvas.height * 0.03, canvas.width * 0.72, canvas.height * 0.94, GenAlgorithm.targetColor.r, GenAlgorithm.targetColor.g, GenAlgorithm.targetColor.b, 1, 4, 10);
    CanvasUtil.fillRectangle(canvas, canvas.width * 0.74, canvas.height * 0.03, canvas.width * 0.23, canvas.height * 0.94, GenAlgorithm.targetColor.r, GenAlgorithm.targetColor.g, GenAlgorithm.targetColor.b, 1, 10);
    CanvasUtil.drawRectangle(canvas, canvas.width * 0.74, canvas.height * 0.03, canvas.width * 0.23, canvas.height * 0.94, GenAlgorithm.targetColor.r, GenAlgorithm.targetColor.g, GenAlgorithm.targetColor.b, 1, 4, 10);

    CanvasUtil.fillRectangle(canvas, canvas.width * 0.76, canvas.height * 0.05, canvas.width * 0.2, canvas.height * 0.9, GenAlgorithm.targetColor.r - 15, GenAlgorithm.targetColor.g - 15, GenAlgorithm.targetColor.b - 15, 1, 10);
    CanvasUtil.fillRectangle(canvas, canvas.width * 0.58, canvas.height * 0.55, canvas.width * 0.22, canvas.height * 0.4, GenAlgorithm.targetColor.r - 15, GenAlgorithm.targetColor.g - 15, GenAlgorithm.targetColor.b - 15, 1, 10);
  }

  private getContrastingColor({ r, g, b }: { r: number, g: number, b: number }) {
    const brightness = r * 0.299 + g * 0.587 + b * 0.114;
    const factor = brightness > 186 ? 0.7 : 2.5;

    const newR = Math.min(255, Math.round(r * factor));
    const newG = Math.min(255, Math.round(g * factor));
    const newB = Math.min(255, Math.round(b * factor));

    return { r: newR, g: newG, b: newB };
  }
}
