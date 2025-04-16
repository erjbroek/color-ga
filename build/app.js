import { GameLoop } from './GameLoop.js';
import ColorGa from './utilities/Racer.js';
const gameCanvas = document.getElementById('game');
const game = new ColorGa(gameCanvas);
const gameLoop = new GameLoop(game, gameCanvas);
window.addEventListener('load', () => {
    gameLoop.start();
});
//# sourceMappingURL=app.js.map