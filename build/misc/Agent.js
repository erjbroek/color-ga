import CanvasUtil from '../utilities/CanvasUtil.js';
import GenAlgorithm from './GenAlgorithm.js';
export default class Agent {
    index;
    red;
    green;
    blue;
    position = { x: window.innerWidth * 0.04, y: window.innerHeight * 0.05 };
    gridSize = 0;
    shape = { width: 0, height: 0 };
    fitness;
    constructor(index, red, green, blue, gridSize, totalNumAgents) {
        this.index = index;
        [this.red, this.green, this.blue] = [red, green, blue];
        const gridSide = Math.ceil(Math.sqrt(totalNumAgents));
        this.shape.width = gridSize.width / gridSide;
        this.shape.height = gridSize.height / gridSide;
        this.position.x += (index % gridSide) * this.shape.width;
        this.position.y += Math.floor(index / gridSide) * this.shape.height;
    }
    processInput() {
    }
    reposition(position) {
        this.position = { x: window.innerWidth * 0.04, y: window.innerHeight * 0.05 };
        const gridSide = Math.ceil(Math.sqrt(GenAlgorithm.numberOfAgents));
        this.position.x += (this.index % gridSide) * this.shape.width;
        this.position.y += Math.floor(this.index / gridSide) * this.shape.height;
    }
    calculateFitness() {
        this.fitness =
            Math.abs(GenAlgorithm.targetColor.r - this.red) +
                Math.abs(GenAlgorithm.targetColor.g - this.green) +
                Math.abs(GenAlgorithm.targetColor.b - this.blue);
    }
    update() {
    }
    render(canvas) {
        CanvasUtil.fillRectangle(canvas, this.position.x, this.position.y, this.shape.width, this.shape.height, this.red, this.green, this.blue, 1);
    }
}
//# sourceMappingURL=Agent.js.map