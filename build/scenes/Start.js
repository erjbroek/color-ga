import CanvasUtil from '../utilities/CanvasUtil.js';
import Agent from './Agent.js';
import Scene from './Scene.js';
export default class Start extends Scene {
    colorAgents = [];
    constructor() {
        super();
        for (let i = 0; i < 100; i++) {
            this.colorAgents.push(new Agent(i, Math.random() * 255, Math.random() * 255, Math.random() * 255, 10, { width: window.innerWidth * 0.7, height: window.innerHeight * 0.8 }));
        }
    }
    processInput(keyListener) {
    }
    update(elapsed) {
        return this;
    }
    render(canvas) {
        CanvasUtil.fillRectangle(canvas, canvas.width * 0.05, canvas.height * 0.1, canvas.width * 0.7, canvas.height * 0.8, 255, 255, 255, 0.1, 2);
        this.colorAgents.forEach((agent) => {
            agent.render(canvas);
        });
    }
}
//# sourceMappingURL=Start.js.map