import CanvasUtil from '../utilities/CanvasUtil.js';
import Agent from './Agent.js';
export default class GenAlgorithm {
    targetColor = {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
    };
    colorAgents = [];
    numberOfAgents = 0;
    constructor(numberOfAgents) {
        this.numberOfAgents = numberOfAgents;
        for (let i = 0; i < numberOfAgents; i++) {
            this.colorAgents.push(new Agent(i, Math.random() * 255, Math.random() * 255, Math.random() * 255, { width: window.innerWidth * 0.5, height: window.innerHeight * 0.9 }, this.numberOfAgents));
        }
    }
    setTargetColor(color) {
        this.targetColor = color;
    }
    update(deltaTime) {
    }
    renderTarget(canvas) {
        CanvasUtil.fillRectangleWithGradient(canvas, canvas.width * 0.55, canvas.height * 0.03, canvas.width * 0.2, canvas.height * 0.94, [
            { red: 25, green: 25, blue: 25, opacity: 1, stop: 0 },
            { red: this.targetColor.r, green: this.targetColor.g, blue: this.targetColor.b, opacity: 1, stop: 0.1 }
        ], 180, 10);
        const hexColor = `#${((1 << 24) + (this.targetColor.r << 16) + (this.targetColor.g << 8) + this.targetColor.b).toString(16).slice(1).toUpperCase()}`;
        const textColor = this.getContrastingColor(this.targetColor);
        CanvasUtil.writeText(canvas, hexColor, canvas.width * 0.65, canvas.height * 0.32, 'center', 'system-ui', 50, textColor, 500);
        CanvasUtil.drawRectangle(canvas, canvas.width * 0.03, canvas.height * 0.03, canvas.width * 0.72, canvas.height * 0.94, this.targetColor.r, this.targetColor.g, this.targetColor.b, 1, 4, 10);
        CanvasUtil.fillRectangle(canvas, canvas.width * 0.74, canvas.height * 0.03, canvas.width * 0.23, canvas.height * 0.94, this.targetColor.r, this.targetColor.g, this.targetColor.b, 1, 10);
        CanvasUtil.drawRectangle(canvas, canvas.width * 0.74, canvas.height * 0.03, canvas.width * 0.23, canvas.height * 0.94, this.targetColor.r, this.targetColor.g, this.targetColor.b, 1, 4, 10);
        CanvasUtil.fillRectangle(canvas, canvas.width * 0.76, canvas.height * 0.05, canvas.width * 0.2, canvas.height * 0.9, this.targetColor.r - 15, this.targetColor.g - 15, this.targetColor.b - 15, 1, 10);
        CanvasUtil.fillRectangle(canvas, canvas.width * 0.58, canvas.height * 0.55, canvas.width * 0.22, canvas.height * 0.4, this.targetColor.r - 15, this.targetColor.g - 15, this.targetColor.b - 15, 1, 10);
    }
    getContrastingColor({ r, g, b }) {
        const brightness = r * 0.299 + g * 0.587 + b * 0.114;
        const factor = brightness > 186 ? 0.5 : 2;
        const newR = Math.min(255, Math.round(r * factor));
        const newG = Math.min(255, Math.round(g * factor));
        const newB = Math.min(255, Math.round(b * factor));
        return `rgb(${newR}, ${newG}, ${newB})`;
    }
}
//# sourceMappingURL=GenAlgorithm.js.map