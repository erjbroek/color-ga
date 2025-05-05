import GenAlgorithm from '../misc/GenAlgorithm.js';
import CanvasUtil from '../utilities/CanvasUtil.js';
import Scene from './Scene.js';
import Button from '../misc/Button.js';
export default class Start extends Scene {
    algoritm = new GenAlgorithm(10000);
    manualButton = new Button(GenAlgorithm.secondaryColor, 'Manual evo', window.innerWidth * 0.78, window.innerHeight * 0.1, window.innerWidth * 0.07, window.innerHeight * 0.04, "toggle");
    autoButton = new Button(GenAlgorithm.secondaryColor, 'auto evo', window.innerWidth * 0.87, window.innerHeight * 0.1, window.innerWidth * 0.07, window.innerHeight * 0.04, "toggle");
    endGenerationButton = new Button(GenAlgorithm.secondaryColor, 'End Generation', window.innerWidth * 0.59, window.innerHeight * 0.9, window.innerWidth * 0.07, window.innerHeight * 0.04, "click");
    constructor() {
        super();
    }
    processInput(keyListener) {
        if (this.manualButton.processInput()) {
            this.autoButton.pressed = !this.manualButton.pressed;
        }
        if (this.autoButton.processInput()) {
            this.manualButton.pressed = !this.autoButton.pressed;
        }
        if (this.endGenerationButton.processInput()) {
            this.algoritm.nextGen();
        }
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
        this.manualButton.render(canvas, GenAlgorithm.targetColor, GenAlgorithm.secondaryColor);
        this.autoButton.render(canvas, GenAlgorithm.targetColor, GenAlgorithm.secondaryColor);
        this.endGenerationButton.render(canvas, GenAlgorithm.targetColor, GenAlgorithm.secondaryColor);
    }
}
//# sourceMappingURL=Start.js.map