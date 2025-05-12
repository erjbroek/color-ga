import GenAlgorithm from '../misc/GenAlgorithm.js';
import CanvasUtil from '../utilities/CanvasUtil.js';
import Scene from './Scene.js';
import Button from '../misc/Button.js';
export default class Start extends Scene {
    algoritm = new GenAlgorithm({
        mutationRate: 0.2, mutationStrength: 20, populationSize: 10000, selectionMethod: 'roulette', crossoverPercentage: 0.75, elitismPercentage: 0,
    });
    manualButton = new Button(GenAlgorithm.secondaryColor, 'Manual evo', window.innerWidth * 0.78, window.innerHeight * 0.1, window.innerWidth * 0.07, window.innerHeight * 0.04, 'toggle');
    autoButton = new Button(GenAlgorithm.secondaryColor, 'auto evo', window.innerWidth * 0.87, window.innerHeight * 0.1, window.innerWidth * 0.07, window.innerHeight * 0.04, 'toggle');
    endGenerationButton = new Button(GenAlgorithm.secondaryColor, 'End Generation', window.innerWidth * 0.78, window.innerHeight * 0.18, window.innerWidth * 0.07, window.innerHeight * 0.04, 'click');
    colorPickerColor = '#ff0000';
    constructor() {
        super();
        const colorPicker = document.getElementById('colorPicker');
        colorPicker.addEventListener('input', (event) => {
            this.colorPickerColor = colorPicker.value;
            console.log('Selected color:', this.colorPickerColor);
        });
    }
    processInput(keyListener) {
        if (this.manualButton.processInput()) {
            this.autoButton.pressed = !this.manualButton.pressed;
        }
        if (this.autoButton.processInput()) {
            this.manualButton.pressed = !this.autoButton.pressed;
        }
        if (this.manualButton.pressed) {
            if (this.endGenerationButton.processInput()) {
                if (this.algoritm.animationEnded) {
                    this.algoritm.nextGen();
                }
            }
        }
    }
    update(elapsed) {
        if (this.autoButton.pressed) {
            if (this.algoritm.animationEnded) {
                this.algoritm.nextGen();
            }
        }
        return this;
    }
    drawSomething(canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        ctx.fillStyle = this.colorPickerColor;
        ctx.fillRect(50, 50, 100, 100);
    }
    render(canvas) {
        CanvasUtil.fillRectangle(canvas, canvas.width * 0.03, canvas.height * 0.03, canvas.width * 0.52, canvas.height * 0.94, 255, 255, 255, 0.1, 2);
        this.algoritm.colorAgents.forEach((agent) => {
            agent.render(canvas);
        });
        this.algoritm.renderTarget(canvas);
        if (this.manualButton.pressed) {
            if (this.algoritm.animationEnded) {
                CanvasUtil.fillRectangle(canvas, canvas.width * 0.775, canvas.height * 0.085, canvas.width * 0.08, canvas.height * 0.15, 255, 255, 255, 0.1, 8);
                this.endGenerationButton.render(canvas, GenAlgorithm.targetColor, GenAlgorithm.secondaryColor);
            }
        }
        this.manualButton.render(canvas, GenAlgorithm.targetColor, GenAlgorithm.secondaryColor);
        this.autoButton.render(canvas, GenAlgorithm.targetColor, GenAlgorithm.secondaryColor);
        this.drawSomething(canvas);
    }
}
//# sourceMappingURL=Start.js.map