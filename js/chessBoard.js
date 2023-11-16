import startPices from './pieces.js';

class GameLogic {
  constructor() {
    this.board = [];
    this.initializedBoard();
  }

  initializedBoard() {
    for (let i = 0; i < 64; i++) {
      const square = new Square(i, startPices[i]);
      this.board.push(square);
    }
  }
}

class Square {
  constructor(id, pieceHtml) {
    this.id = id;
    this.pieceHtml = pieceHtml;
  }
}

export default GameLogic;
