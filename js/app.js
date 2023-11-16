import GameLogic from './chessBoard.js';
import Render from './render.js';

const gameLogic = new GameLogic();
const chessRenderer = new Render(gameLogic);

chessRenderer.renderBoard();
