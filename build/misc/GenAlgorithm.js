import CanvasUtil from '../utilities/CanvasUtil.js';
import Agent from './Agent.js';
import { rgbToColorName, rgbToHex } from '../utilities/ColorUtils.js';
export default class GenAlgorithm {
    static targetColor = {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
    };
    static secondaryColor = {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
    };
    textHex = '';
    colorName = '';
    colorAgents = [];
    static numberOfAgents = 0;
    shouldAnimate = false;
    animationEnded = true;
    shouldOrder = false;
    useOptimizedMutation = false;
    generation = 0;
    static settings;
    constructor(settings) {
        GenAlgorithm.settings = settings;
        GenAlgorithm.numberOfAgents = settings.populationSize;
        for (let i = 0; i < settings.populationSize; i++) {
            this.colorAgents.push(new Agent(i, { red: Math.random() * 255, green: Math.random() * 255, blue: Math.random() * 255 }, { width: window.innerWidth * 0.5, height: window.innerHeight * 0.9 }));
        }
        this.textHex = `#${((1 << 24) + (GenAlgorithm.targetColor.r << 16) + (GenAlgorithm.targetColor.g << 8) + GenAlgorithm.targetColor.b).toString(16).slice(1).toUpperCase()}`;
        GenAlgorithm.secondaryColor = this.getContrastingColor(GenAlgorithm.targetColor);
        this.colorName = rgbToColorName(GenAlgorithm.targetColor.r, GenAlgorithm.targetColor.g, GenAlgorithm.targetColor.b);
    }
    setTargetColor(color) {
        GenAlgorithm.targetColor = color;
        this.textHex = `#${((1 << 24) + (GenAlgorithm.targetColor.r << 16) + (GenAlgorithm.targetColor.g << 8) + GenAlgorithm.targetColor.b).toString(16).slice(1).toUpperCase()}`;
        GenAlgorithm.secondaryColor = this.getContrastingColor(GenAlgorithm.targetColor);
        this.colorName = rgbToColorName(GenAlgorithm.targetColor.r, GenAlgorithm.targetColor.g, GenAlgorithm.targetColor.b);
    }
    update(deltaTime) {
    }
    shuffleAgents() {
        this.colorAgents.sort(() => Math.random() - 0.5);
        this.colorAgents.forEach((agent, index) => {
            agent.reposition(0, index, false);
        });
    }
    nextGen() {
        this.animationEnded = false;
        this.generation += 1;
        const firstOrder = 400 * (this.shouldAnimate ? 1 : 0);
        const selection = 400 * (this.shouldAnimate ? 1 : 0);
        const lastOrder = 300 * (this.shouldAnimate ? 1 : 0);
        if (this.shouldAnimate) {
            this.shuffleAgents();
        }
        this.colorAgents.sort((a, b) => b.index - a.index);
        this.colorAgents = this.colorAgents.sort(() => Math.random() - 0.5);
        this.colorAgents.forEach((agent) => {
            agent.calculateFitness();
        });
        if (this.shouldOrder) {
            this.colorAgents.sort((a, b) => b.fitness - a.fitness);
        }
        else {
            this.colorAgents = this.colorAgents.sort(() => Math.random() - 0.5);
        }
        this.colorAgents.forEach((agent, index) => {
            agent.index = index;
            agent.reposition(400, index, this.shouldAnimate);
        });
        setTimeout(() => {
            const elitismAgents = [];
            const mutatedAgents = [];
            setTimeout(() => {
                if (GenAlgorithm.settings.selectionMethod === 'roulette') {
                    const elitismCount = Math.floor((this.colorAgents.length * GenAlgorithm.settings.elitismPercentage) / 100);
                    for (let i = 0; i < elitismCount; i++) {
                        const foundAgent = this.colorAgents[i];
                        if (this.shouldAnimate) {
                            elitismAgents.push(new Agent(foundAgent.index, foundAgent.genome, { width: window.innerWidth * 0.5, height: window.innerHeight * 0.9 }));
                        }
                        else {
                            elitismAgents.push(new Agent(i, foundAgent.genome, { width: window.innerWidth * 0.5, height: window.innerHeight * 0.9 }));
                        }
                    }
                    const totalFitness = this.colorAgents.reduce((sum, agent) => sum + agent.fitness, 0);
                    const selectionPool = this.colorAgents.slice(elitismAgents.length);
                    for (let i = 0; i < GenAlgorithm.settings.populationSize - elitismAgents.length; i++) {
                        const randomValue = Math.random() * totalFitness;
                        let cumulativeFitness = 0;
                        let selected = false;
                        for (const agent of selectionPool) {
                            cumulativeFitness += agent.fitness;
                            if (cumulativeFitness >= randomValue) {
                                if (this.shouldAnimate) {
                                    mutatedAgents.push(new Agent(agent.index, agent.genome, { width: window.innerWidth * 0.5, height: window.innerHeight * 0.9 }));
                                }
                                else {
                                    mutatedAgents.push(new Agent(mutatedAgents.length, agent.genome, { width: window.innerWidth * 0.5, height: window.innerHeight * 0.9 }));
                                }
                                selected = true;
                                break;
                            }
                        }
                        if (!selected) {
                            const fallback = selectionPool[Math.floor(Math.random() * selectionPool.length)];
                            mutatedAgents.push(new Agent(fallback.index, fallback.genome, { width: window.innerWidth * 0.5, height: window.innerHeight * 0.9 }));
                        }
                    }
                }
                const averageFitness = (this.colorAgents.reduce((sum, agent) => sum + agent.fitness, 0) / this.colorAgents.length);
                if (this.useOptimizedMutation) {
                    GenAlgorithm.settings.mutationStrength = Math.max(0, 255 - (averageFitness / 765) * 255) / 2;
                }
                console.log(this.generation, averageFitness, GenAlgorithm.settings.mutationStrength);
                mutatedAgents.forEach((agent) => {
                    agent.mutate();
                });
                const newGeneration = [];
                newGeneration.push(...elitismAgents);
                newGeneration.push(...mutatedAgents);
                this.colorAgents = newGeneration;
                setTimeout(() => {
                    this.colorAgents.sort((a, b) => b.index - a.index);
                    this.colorAgents = this.colorAgents.sort(() => Math.random() - 0.5);
                    this.colorAgents.forEach((agent) => {
                        agent.calculateFitness();
                    });
                    if (this.shouldOrder) {
                        this.colorAgents.sort((a, b) => b.fitness - a.fitness);
                    }
                    else {
                        this.colorAgents = this.colorAgents.sort(() => Math.random() - 0.5);
                    }
                    this.colorAgents.forEach((agent, index) => {
                        agent.index = index;
                        agent.reposition(100, index, this.shouldAnimate);
                    });
                    this.animationEnded = true;
                }, lastOrder);
            }, selection);
        }, firstOrder);
    }
    renderTarget(canvas) {
        CanvasUtil.fillRectangleWithGradient(canvas, canvas.width * 0.55, canvas.height * 0.03, canvas.width * 0.2, canvas.height * 0.94, [
            {
                red: 25, green: 25, blue: 25, opacity: 1, stop: 0,
            },
            {
                red: GenAlgorithm.targetColor.r, green: GenAlgorithm.targetColor.g, blue: GenAlgorithm.targetColor.b, opacity: 1, stop: 0.1,
            },
        ], 180, 10);
        CanvasUtil.writeText(canvas, this.textHex, canvas.width * 0.66, canvas.height * 0.31, 'center', 'arial', 50, rgbToHex(GenAlgorithm.secondaryColor.r, GenAlgorithm.secondaryColor.g, GenAlgorithm.secondaryColor.b), 500);
        CanvasUtil.writeText(canvas, this.colorName, canvas.width * 0.66, canvas.height * 0.34, 'center', 'arial', 20, rgbToHex(GenAlgorithm.secondaryColor.r, GenAlgorithm.secondaryColor.g, GenAlgorithm.secondaryColor.b), 500);
        CanvasUtil.drawRectangle(canvas, canvas.width * 0.03, canvas.height * 0.03, canvas.width * 0.72, canvas.height * 0.94, GenAlgorithm.targetColor.r, GenAlgorithm.targetColor.g, GenAlgorithm.targetColor.b, 1, 4, 10);
        CanvasUtil.fillRectangle(canvas, canvas.width * 0.74, canvas.height * 0.03, canvas.width * 0.23, canvas.height * 0.94, GenAlgorithm.targetColor.r, GenAlgorithm.targetColor.g, GenAlgorithm.targetColor.b, 1, 10);
        CanvasUtil.drawRectangle(canvas, canvas.width * 0.74, canvas.height * 0.03, canvas.width * 0.23, canvas.height * 0.94, GenAlgorithm.targetColor.r, GenAlgorithm.targetColor.g, GenAlgorithm.targetColor.b, 1, 4, 10);
        CanvasUtil.fillRectangle(canvas, canvas.width * 0.76, canvas.height * 0.05, canvas.width * 0.2, canvas.height * 0.9, GenAlgorithm.targetColor.r - 15, GenAlgorithm.targetColor.g - 15, GenAlgorithm.targetColor.b - 15, 1, 10);
        CanvasUtil.fillRectangle(canvas, canvas.width * 0.58, canvas.height * 0.55, canvas.width * 0.22, canvas.height * 0.4, GenAlgorithm.targetColor.r - 15, GenAlgorithm.targetColor.g - 15, GenAlgorithm.targetColor.b - 15, 1, 10);
    }
    getContrastingColor({ r, g, b }) {
        const brightness = r * 0.299 + g * 0.587 + b * 0.114;
        const factor = brightness > 186 ? 0.7 : 2.5;
        const newR = Math.min(255, Math.round(r * factor));
        const newG = Math.min(255, Math.round(g * factor));
        const newB = Math.min(255, Math.round(b * factor));
        return { r: newR, g: newG, b: newB };
    }
}
//# sourceMappingURL=GenAlgorithm.js.map