import CanvasUtil from '../utilities/CanvasUtil.js';
import GenAlgorithm from './GenAlgorithm.js';
export default class Agent {
    index;
    genome;
    position = { x: window.innerWidth * 0.04, y: window.innerHeight * 0.05 };
    gridSize = 0;
    shape = { width: 0, height: 0 };
    fitness;
    constructor(index, genome, gridSize) {
        this.index = index;
        this.genome = {
            red: genome.red,
            green: genome.green,
            blue: genome.blue,
        };
        const gridSide = Math.ceil(Math.sqrt(GenAlgorithm.settings.PopulationSize));
        this.shape.width = gridSize.width / gridSide;
        this.shape.height = gridSize.height / gridSide;
        this.position.x += (index % gridSide) * this.shape.width;
        this.position.y += Math.floor(index / gridSide) * this.shape.height;
    }
    processInput() {
    }
    reposition() {
        this.position = { x: window.innerWidth * 0.04, y: window.innerHeight * 0.05 };
        const gridSide = Math.ceil(Math.sqrt(GenAlgorithm.numberOfAgents));
        this.position.x += (this.index % gridSide) * this.shape.width;
        this.position.y += Math.floor(this.index / gridSide) * this.shape.height;
    }
    calculateFitness() {
        this.fitness = 765
            - (Math.abs(GenAlgorithm.targetColor.r - this.genome.red)
                + Math.abs(GenAlgorithm.targetColor.g - this.genome.green)
                + Math.abs(GenAlgorithm.targetColor.b - this.genome.blue));
    }
    mutate() {
        [this.genome.red, this.genome.green, this.genome.blue].forEach(() => {
            if (Math.random() >= GenAlgorithm.settings.MurationRate) {
                this.genome.red += ((Math.random() * 2) - 1) * GenAlgorithm.settings.MutationStrength;
            }
        });
    }
    update() {
    }
    render(canvas) {
        CanvasUtil.fillRectangle(canvas, this.position.x, this.position.y, this.shape.width, this.shape.height, this.genome.red, this.genome.green, this.genome.blue, 1);
    }
}
//# sourceMappingURL=Agent.js.map