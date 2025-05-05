import CanvasUtil from '../utilities/CanvasUtil.js';
export default class Agent {
    index;
    red;
    green;
    blue;
    position = { x: window.innerWidth * 0.04, y: window.innerHeight * 0.05 };
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
    update() {
    }
    render(canvas) {
        CanvasUtil.fillRectangle(canvas, this.position.x, this.position.y, this.shape.width, this.shape.height, this.red, this.green, this.blue, 1, 6);
    }
}
//# sourceMappingURL=Agent.js.map