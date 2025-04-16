import Scene from './Scene.js';
export default class Start extends Scene {
    constructor() {
        super();
    }
    processInput(keyListener) {
        throw new Error('Method not implemented.');
    }
    update(elapsed) {
        console.log(`Elapsed time: ${elapsed}`);
        return this;
    }
    render(canvas) {
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=Start.js.map