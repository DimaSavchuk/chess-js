class Render {
  constructor(gameLogic) {
    this.gameLogic = gameLogic;
  }

  renderBoard() {
    const gameBoard = document.querySelector('#board');
    gameBoard.innerHTML = '';

    this.gameLogic.board.forEach(square => {
      const squareElement = document.createElement('div');
      squareElement.classList.add('square');
      squareElement.innerHTML = square.pieceHtml;

      squareElement.firstChild?.setAttribute('draggable', true);

      squareElement.setAttribute('square-id', square.id);

      const row = Math.floor((63 - square.id) / 8) + 1;
      if (row % 2 === 0) {
        squareElement.classList.add(
          square.id % 2 === 0 ? 'white-square' : 'dark-square'
        );
      } else {
        squareElement.classList.add(
          square.id % 2 === 0 ? 'dark-square' : 'white-square'
        );
      }

      if (square.id <= 15) {
        squareElement.firstChild.firstChild.classList.add('black-chess');
      }

      if (square.id >= 48) {
        squareElement.firstChild.firstChild.classList.add('white-chess');
      }

      gameBoard.append(squareElement);
    });
  }
}

export default Render;
