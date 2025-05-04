import CanvasUtil from '../utilities/CanvasUtil.js';
export default class Agent {
    index;
    red;
    green;
    blue;
    position = { x: window.innerWidth * 0.07, y: window.innerHeight * 0.12 };
    fitness;
    constructor(index, red, green, blue, numPerRow, gridSize) {
        this.index = index;
        [this.red, this.green, this.blue] = [red, green, blue];
        this.position.x += (index % numPerRow) * (gridSize.width / numPerRow);
        this.position.y += Math.floor(index / numPerRow) * (gridSize.height / 10);
    }
    processInput() {
    }
    update() {
    }
    render(canvas) {
        CanvasUtil.fillRectangle(canvas, this.position.x, this.position.y, 30, 30, this.red, this.green, this.blue, 1, 5);
    }
}
//# sourceMappingURL=Agent.js.map