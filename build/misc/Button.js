import MouseListener from '../utilities/MouseListener.js';
export default class Button {
    color = '';
    pressed = false;
    isHover = false;
    isHolding = false;
    position = { x: 0, y: 0 };
    dimensions = { width: 0, height: 0 };
    constructor(color, posX, posY, width, height) {
        this.color = color;
        [this.position.x, this.position.y] = [posX, posY];
        [this.dimensions.width, this.dimensions.height] = [width, height];
    }
    setColor(color) {
        this.color = color;
    }
    processInput() {
        this.isHover = MouseListener.mouseHover(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        return false;
    }
    render(canvas) {
    }
}
//# sourceMappingURL=Button.js.map