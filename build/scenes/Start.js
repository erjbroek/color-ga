import GenAlgorithm from '../misc/GenAlgorithm.js';
import CanvasUtil from '../utilities/CanvasUtil.js';
import Scene from './Scene.js';
import Button from '../misc/Button.js';
export default class Start extends Scene {
    algoritm = new GenAlgorithm(400);
    manualButton = new Button(this.algoritm.secondaryColor, 'Manual evo', window.innerWidth * 0.78, window.innerHeight * 0.1, window.innerWidth * 0.07, window.innerHeight * 0.04);
    autoButton = new Button(this.algoritm.secondaryColor, 'auto evo', window.innerWidth * 0.87, window.innerHeight * 0.1, window.innerWidth * 0.07, window.innerHeight * 0.04);
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
        this.manualButton.render(canvas, this.algoritm.getColors().targetColor, this.algoritm.getColors().secondaryColor);
        this.autoButton.render(canvas, this.algoritm.getColors().targetColor, this.algoritm.getColors().secondaryColor);
    }
}
//# sourceMappingURL=Start.js.map