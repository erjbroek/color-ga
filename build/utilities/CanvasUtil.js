export default class CanvasUtil {
    static canvas;
    static ctx;
    static getCanvasContext(canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx === null)
            throw new Error('Canvas Rendering Context is null');
        return ctx;
    }
    static setCanvas(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        if (this.ctx === null)
            throw new Error('Canvas Rendering Context is null');
    }
    static getCanvas() {
        if (!this.canvas)
            throw new Error('Canvas is not set');
        return this.canvas;
    }
    static fillCanvas(canvas, colour = '#FF10F0') {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = colour;
        ctx.fill();
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    static loadNewImages(sources, folder) {
        const images = [];
        for (const source of sources) {
            images.push(CanvasUtil.loadNewImage(folder ? folder + source : source));
        }
        return images;
    }
    static drawImage(canvas, image, dx, dy, width = 0, height = 0, rotation = 0, opacity) {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        if (width === 0)
            width = image.width;
        if (height === 0)
            height = image.height;
        ctx.save();
        if (opacity !== undefined) {
            ctx.globalAlpha = opacity;
        }
        ctx.translate(dx + width / 2, dy + height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(image, -width / 2, -height / 2, width, height);
        ctx.restore();
    }
    static clearCanvas(canvas) {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    static writeText(canvas, text, xCoordinate, yCoordinate, alignment = 'center', fontFamily = 'sans-serif', fontSize = 20, color = 'red', fontWeight = 10) {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        const lines = text.split('<br>');
        let currentY = yCoordinate;
        for (const line of lines) {
            ctx.fillText(line, xCoordinate, currentY);
            currentY += fontSize;
        }
    }
    static writeTextOutline(canvas, text, xCoordinate, yCoordinate, alignment = 'center', fontFamily = 'sans-serif', fontSize = 20, color = 'red', outlineThickness = 0.1, fontWeight = 10) {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
        ctx.strokeStyle = color;
        ctx.lineWidth = outlineThickness;
        ctx.textAlign = alignment;
        const lines = text.split('<br>');
        let currentY = yCoordinate;
        for (const line of lines) {
            ctx.strokeText(line, xCoordinate, currentY);
            currentY += fontSize;
        }
    }
    static drawCircle(canvas, centerX, centerY, radius, red = 255, green = 255, blue = 255, opacity = 1) {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
    static drawRectangle(canvas, dx, dy, width, height, red = 255, green = 255, blue = 255, opacity = 1, lineWidth = 1, borderRadius = 0) {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
        ctx.lineWidth = lineWidth;
        ctx.moveTo(dx + borderRadius, dy);
        ctx.arcTo(dx + width, dy, dx + width, dy + height, borderRadius);
        ctx.arcTo(dx + width, dy + height, dx, dy + height, borderRadius);
        ctx.arcTo(dx, dy + height, dx, dy, borderRadius);
        ctx.arcTo(dx, dy, dx + borderRadius, dy, borderRadius);
        ctx.closePath();
        ctx.stroke();
    }
    static drawLine(canvas, x1, y1, x2, y2, red = 255, green = 255, blue = 255, opacity = 1, lineWidth = 1) {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    static drawFinishLine(canvas, x1, y1, x2, y2, squareSize = 10) {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        const deltaX = x2 - x1;
        const deltaY = y2 - y1;
        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angle = Math.atan2(deltaY, deltaX);
        ctx.save();
        ctx.translate(x1, y1);
        ctx.rotate(angle);
        for (let i = 0; i < length; i += squareSize) {
            for (let j = -1; j <= 1; j += 2) {
                ctx.fillStyle = ((i / squareSize) + (j + 1) / 2) % 2 === 0 ? 'black' : 'white';
                ctx.fillRect(i, j * (squareSize / 2), squareSize, squareSize);
            }
        }
        ctx.restore();
    }
    static fillCircle(canvas, centerX, centerY, radius, red = 255, green = 255, blue = 255, opacity = 1) {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fill();
    }
    static fillRectangle(canvas, dx, dy, width, height, red = 255, green = 255, blue = 255, opacity = 1, borderRadius = 0, rotation = 0) {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        ctx.save();
        const centerX = dx + width / 2;
        const centerY = dy + height / 2;
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation * (Math.PI / 180));
        ctx.translate(-centerX, -centerY);
        ctx.beginPath();
        ctx.moveTo(dx + borderRadius, dy);
        ctx.lineTo(dx + width - borderRadius, dy);
        ctx.arcTo(dx + width, dy, dx + width, dy + borderRadius, borderRadius);
        ctx.lineTo(dx + width, dy + height - borderRadius);
        ctx.arcTo(dx + width, dy + height, dx + width - borderRadius, dy + height, borderRadius);
        ctx.lineTo(dx + borderRadius, dy + height);
        ctx.arcTo(dx, dy + height, dx, dy + height - borderRadius, borderRadius);
        ctx.lineTo(dx, dy + borderRadius);
        ctx.arcTo(dx, dy, dx + borderRadius, dy, borderRadius);
        ctx.closePath();
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
        ctx.fill();
        ctx.restore();
    }
    static fillRectangleWithGradient(canvas, dx, dy, width, height, colors, angle = 0, borderRadius = 0) {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        ctx.beginPath();
        ctx.moveTo(dx + borderRadius, dy);
        ctx.lineTo(dx + width - borderRadius, dy);
        ctx.arcTo(dx + width, dy, dx + width, dy + borderRadius, borderRadius);
        ctx.lineTo(dx + width, dy + height - borderRadius);
        ctx.arcTo(dx + width, dy + height, dx + width - borderRadius, dy + height, borderRadius);
        ctx.lineTo(dx + borderRadius, dy + height);
        ctx.arcTo(dx, dy + height, dx, dy + height - borderRadius, borderRadius);
        ctx.lineTo(dx, dy + borderRadius);
        ctx.arcTo(dx, dy, dx + borderRadius, dy, borderRadius);
        ctx.closePath();
        const radians = angle * (Math.PI / 180);
        const x0 = dx + width / 2 + (width / 2) * Math.cos(radians);
        const y0 = dy + height / 2 - (height / 2) * Math.sin(radians);
        const x1 = dx + width / 2 - (width / 2) * Math.cos(radians);
        const y1 = dy + height / 2 + (height / 2) * Math.sin(radians);
        const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
        colors.forEach(({ red, green, blue, opacity, stop, }) => {
            const color = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
            gradient.addColorStop(stop, color);
        });
        ctx.fillStyle = gradient;
        ctx.fill();
    }
    static getPixelColor(canvas, x, y) {
        const context = canvas.getContext('2d', { willReadFrequently: true });
        if (context) {
            return context.getImageData(x, y, 1, 1);
        }
        throw new Error('Unable to get canvas context');
    }
    static rotateImage(canvas, image, degrees) {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((degrees * Math.PI) / 180);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
        ctx.restore();
    }
}
//# sourceMappingURL=CanvasUtil.js.map