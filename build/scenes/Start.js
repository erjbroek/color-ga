import GenAlgorithm from '../misc/GenAlgorithm.js';
import CanvasUtil from '../utilities/CanvasUtil.js';
import Scene from './Scene.js';
export default class Start extends Scene {
    algoritm = new GenAlgorithm(400);
    constructor() {
        super();
    }
    processInput(keyListener) {
    }
    update(elapsed) {
        return this;
    }
    render(canvas) {
        CanvasUtil.fillRectangle(canvas, canvas.width * 0.03, canvas.height * 0.03, canvas.width * 0.52, canvas.height * 0.94, 255, 255, 255, 0.1, 2);
        this.algoritm.colorAgents.forEach((agent) => {
            agent.render(canvas);
        });
        this.algoritm.renderTarget(canvas);
    }
}
//# sourceMappingURL=Start.js.map