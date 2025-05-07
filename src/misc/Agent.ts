import CanvasUtil from '../utilities/CanvasUtil.js';
import GenAlgorithm from './GenAlgorithm.js';

export default class Agent {
  public index: number;

  public genome: { red: number, green: number, blue: number };

  public position: { x: number, y: number } = { x: window.innerWidth * 0.04, y: window.innerHeight * 0.05 };

  private gridSize: number = 0;

  private shape: { width: number, height: number } = { width: 0, height: 0 };

  public fitness: number;

  public constructor(index: number, genome: { red: number, green: number, blue: number }, gridSize: { width: number, height: number }) {
    this.index = index;
    this.genome = {
      red: genome.red,
      green: genome.green,
      blue: genome.blue,
    };

    const gridSide = Math.ceil(Math.sqrt(GenAlgorithm.settings.populationSize));
    this.shape.width = gridSize.width / gridSide;
    this.shape.height = gridSize.height / gridSide;

    this.position.x += (index % gridSide) * this.shape.width;
    this.position.y += Math.floor(index / gridSide) * this.shape.height;
  }

  /**
   * processes player input
   */
  public processInput() {

  }

  /**
   * Repositions the agent based on its index and grid size.
   */
  public reposition(duration: number, rank: number, shouldAnimate: boolean) {
    const gridSide = Math.ceil(Math.sqrt(GenAlgorithm.numberOfAgents));
    const targetPosition = {
      x: (rank % gridSide) * this.shape.width + window.innerWidth * 0.04,
      y: Math.floor(rank / gridSide) * this.shape.height + window.innerHeight * 0.05,
    };

    if (shouldAnimate) {
      const startTime = performance.now();
      const startX = this.position.x;
      const startY = this.position.y;
      const deltaX = targetPosition.x - startX;
      const deltaY = targetPosition.y - startY;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const t = Math.min(elapsed / duration, 1);

        this.position.x = startX + deltaX * t;
        this.position.y = startY + deltaY * t;

        if (t < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } else {
      this.position.x = targetPosition.x;
      this.position.y = targetPosition.y;
    }
  }

  /**
   * Calculates the fitness of the agent based on the difference between its genome and the target color.
   */
  public calculateFitness(): void {
    this.fitness = 765
    - (Math.abs(GenAlgorithm.targetColor.r - this.genome.red)
    + Math.abs(GenAlgorithm.targetColor.g - this.genome.green)
    + Math.abs(GenAlgorithm.targetColor.b - this.genome.blue));
  }

  /**
   * Mutates the genome of the agent by adjusting its color values based on the mutation rate and strength.
   */
  public mutate(): void {
    [this.genome.red, this.genome.green, this.genome.blue].forEach((_, index) => {
      if (Math.random() <= GenAlgorithm.settings.mutationRate) {
        const mutation = ((Math.random() * 2) - 1) * GenAlgorithm.settings.mutationStrength;
        if (index === 0) {
          this.genome.red = Math.min(255, Math.max(0, this.genome.red + mutation));
        } else if (index === 1) {
          this.genome.green = Math.min(255, Math.max(0, this.genome.green + mutation));
        } else if (index === 2) {
          this.genome.blue = Math.min(255, Math.max(0, this.genome.blue + mutation));
        }
      }
    });
  }

  /**
   * Updates the agent's state.
   */
  public update() {

  }

  /**
   * Renders the agent on the given canvas.
   *
   * @param canvas - The canvas element where the agent will be drawn.
   */
  public render(canvas: HTMLCanvasElement) {
    CanvasUtil.fillRectangle(canvas, this.position.x, this.position.y, this.shape.width, this.shape.height, this.genome.red, this.genome.green, this.genome.blue, 1);
  }
}
