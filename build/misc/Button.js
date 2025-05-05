import CanvasUtil from '../utilities/CanvasUtil.js';
import MouseListener from '../utilities/MouseListener.js';
import { rgbToHex } from '../utilities/ColorUtils.js';
export default class Button {
    color;
    text = '';
    pressed = false;
    isHover = false;
    isHolding = false;
    position = { x: 0, y: 0 };
    dimensions = { width: 0, height: 0 };
    constructor(color, text, posX, posY, width, height) {
        this.color = color;
        this.text = text;
        this.position = { x: posX, y: posY };
        [this.dimensions.width, this.dimensions.height] = [width, height];
    }
    setColor(color) {
        this.color = color;
    }
    processInput() {
        if (this.isHolding && MouseListener.mouseUp) {
            this.pressed = !this.pressed;
        }
        this.isHover = MouseListener.mouseHover(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        this.isHolding = MouseListener.isButtonDown(0) && this.isHover;
        return this.pressed;
    }
    render(canvas, targetColor, secondaryColor) {
        CanvasUtil.fillRectangle(canvas, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height, this.color.r, this.color.g, this.color.b, 1, 10);
        CanvasUtil.drawRectangle(canvas, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height, this.color.r, this.color.g, this.color.b, 1, 10, 10);
        if (this.isHover) {
            CanvasUtil.fillRectangle(canvas, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height, 255, 255, 255, 0.4, 12);
        }
        if (this.isHolding) {
            CanvasUtil.fillRectangle(canvas, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height, 255, 255, 255, 0.3, 12);
        }
        if (this.pressed) {
            CanvasUtil.fillRectangle(canvas, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height, targetColor.r, targetColor.g, targetColor.b, 1, 12);
            CanvasUtil.fillRectangle(canvas, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height, 255, 255, 255, 0.4, 12);
        }
        const textColor = rgbToHex(secondaryColor.r * 0.5, secondaryColor.g * 0.5, secondaryColor.b * 0.5);
        CanvasUtil.writeText(canvas, this.text, this.position.x + this.dimensions.width / 2, this.position.y + window.innerHeight * 0.027, 'center', 'arial', 20, textColor);
    }
}
//# sourceMappingURL=Button.js.map