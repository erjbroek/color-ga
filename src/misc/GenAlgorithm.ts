import CanvasUtil from '../utilities/CanvasUtil.js';
import Agent from './Agent.js';
import { rgbToColorName, hexToRgb, rgbToHex } from '../utilities/ColorUtils.js';

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

  public static settings: {
    MurationRate: number,
    MutationStrength: number,
    PopulationSize: number,
    SelectionMethod: 'tournament' | 'roulette' | 'rank',
    ElitismPercentage: number;
  };

  public constructor(
    settings:
    {
      MurationRate: number,
      MutationStrength: number,
      PopulationSize: number,
      SelectionMethod: 'tournament' | 'roulette' | 'rank',
      CrossoverPercentage: number,
      ElitismPercentage: number;
    },
  ) {
    // initialises settings
    GenAlgorithm.settings = settings;

    // initialises new population
    GenAlgorithm.numberOfAgents = settings.PopulationSize;
    for (let i: number = 0; i < settings.PopulationSize; i++) {
      this.colorAgents.push(new Agent(i, { red: Math.random() * 255, green: Math.random() * 255, blue: Math.random() * 255 }, { width: window.innerWidth * 0.5, height: window.innerHeight * 0.9 }));
    }

    // uses target color as color for the other screen elements
    this.textHex = `#${((1 << 24) + (GenAlgorithm.targetColor.r << 16) + (GenAlgorithm.targetColor.g << 8) + GenAlgorithm.targetColor.b).toString(16).slice(1).toUpperCase()}`;
    GenAlgorithm.secondaryColor = this.getContrastingColor(GenAlgorithm.targetColor);
    this.colorName = rgbToColorName(GenAlgorithm.targetColor.r, GenAlgorithm.targetColor.g, GenAlgorithm.targetColor.b);
  }

  public setTargetColor(color: { r: number; g: number; b: number }) {
    GenAlgorithm.targetColor = color;
    this.textHex = `#${((1 << 24) + (GenAlgorithm.targetColor.r << 16) + (GenAlgorithm.targetColor.g << 8) + GenAlgorithm.targetColor.b).toString(16).slice(1).toUpperCase()}`;
    GenAlgorithm.secondaryColor = this.getContrastingColor(GenAlgorithm.targetColor);
    this.colorName = rgbToColorName(GenAlgorithm.targetColor.r, GenAlgorithm.targetColor.g, GenAlgorithm.targetColor.b);
  }

  /**
   *
   * @param deltaTime
   */
  public update(deltaTime: number) {

  }

  public shuffleAgents() {
    this.colorAgents.sort(() => Math.random() - 0.5);
    this.colorAgents.forEach((agent, index) => {
      agent.reposition(0, index, false);
    });
  }

  /**
   *
   */
  public nextGen() {
    // these are the timings used for the animation
    const firstOrder: number = 700;
    const selection: number = 500;
    const lastOrder: number = 300;

    this.shuffleAgents();

    // calculates fitness and ranks them
    this.colorAgents.forEach((agent: Agent) => {
      agent.calculateFitness();
    });
    this.colorAgents.sort((a, b) => b.fitness - a.fitness);
    this.colorAgents.forEach((agent: Agent, index: number) => {
      agent.reposition(700, index, true);
      agent.index = index;
    });

    // player selection based on fitness
    setTimeout(() => {
      const elitismAgents: Agent[] = [];
      const mutatedAgents: Agent[] = [];
      setTimeout(() => {
        // roulette selection method
        if (GenAlgorithm.settings.SelectionMethod === 'roulette') {
          // elitism agents
          const elitismCount = Math.floor((this.colorAgents.length * GenAlgorithm.settings.ElitismPercentage) / 100);
          for (let i = 0; i < elitismCount; i++) {
            const foundAgent = this.colorAgents[i];
            elitismAgents.push(new Agent(foundAgent.index, foundAgent.genome, { width: window.innerWidth * 0.5, height: window.innerHeight * 0.9 }));
          }

          // the rest of the agents
          const totalFitness = this.colorAgents.reduce((sum, agent) => sum + agent.fitness, 0);
          const selectionPool = this.colorAgents.slice(elitismAgents.length);
          for (let i = 0; i < GenAlgorithm.settings.PopulationSize - elitismAgents.length; i++) {
            const randomValue = Math.random() * totalFitness;
            let cumulativeFitness = 0;
            let selected = false;

            for (const agent of selectionPool) {
              cumulativeFitness += agent.fitness;
              if (cumulativeFitness >= randomValue) {
                mutatedAgents.push(new Agent(agent.index, agent.genome, { width: window.innerWidth * 0.5, height: window.innerHeight * 0.9 }));
                selected = true;
                break;
              }
            }

            // if the selection couldnt find an agent
            if (!selected) {
              const fallback = selectionPool[Math.floor(Math.random() * selectionPool.length)];
              mutatedAgents.push(new Agent(fallback.index, fallback.genome, { width: window.innerWidth * 0.5, height: window.innerHeight * 0.9 }));
            }
          }
        }

        // mutating players outisde of elitism
        mutatedAgents.forEach((agent: Agent) => {
          agent.mutate();
        });

        // saving agents into next generation
        const newGeneration: Agent[] = [];
        newGeneration.push(...elitismAgents);
        newGeneration.push(...mutatedAgents);
        this.colorAgents = newGeneration;

        // order the agents again
        setTimeout(() => {
          this.colorAgents.sort((a, b) => b.index - a.index);

          this.colorAgents = this.colorAgents.sort(() => Math.random() - 0.5);
          this.colorAgents.forEach((agent: Agent) => {
            agent.calculateFitness();
          });
          this.colorAgents.sort((a, b) => b.fitness - a.fitness);

          this.colorAgents.forEach((agent: Agent, index: number) => {
            agent.index = index;
            agent.reposition(200, index, true);
          });
        }, lastOrder);
      }, selection);
    }, firstOrder);
  }

  public renderTarget(canvas: HTMLCanvasElement) {
    CanvasUtil.fillRectangleWithGradient(
      canvas,
      canvas.width * 0.55,
      canvas.height * 0.03,
      canvas.width * 0.2,
      canvas.height * 0.94,
      [
        {
          red: 25, green: 25, blue: 25, opacity: 1, stop: 0,
        },
        {
          red: GenAlgorithm.targetColor.r, green: GenAlgorithm.targetColor.g, blue: GenAlgorithm.targetColor.b, opacity: 1, stop: 0.1,
        },
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
