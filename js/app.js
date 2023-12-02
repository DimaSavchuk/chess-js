import GameLogic from './chessBoard.js';
import Render from './render.js';

const gameLogic = new GameLogic();
const chessRenderer = new Render(gameLogic);

//  НАДА ВИНЕСТИ

const playerDisplay = document.querySelector('#player');
let playerGo = 'black';
playerDisplay.textContent = 'black';

//  НАДА ВИНЕСТИ

chessRenderer.renderBoard();

const allSquares = document.querySelectorAll('.square');

allSquares.forEach(square => {
  square.addEventListener('dragstart', onDragStart);
  square.addEventListener('dragover', onDragOver);
  square.addEventListener('drop', onDragDrop);
});

let startPositionId;
let draggetElement;

function onDragStart(event) {
  startPositionId = event.target.parentNode.getAttribute('square-id');
  draggetElement = event.target;
  console.log('onDragStart startPositionId ->', startPositionId);
}

function onDragOver(event) {
  event.preventDefault();
}

function onDragDrop(event) {
  event.stopPropagation();
  console.log(event.target);

  const correctGo = draggetElement.firstChild.classList.contains(playerGo);
  const taken = event.target.classList.contains('piece');

  const valid = checkIfValid(event.target);

  const opponentGo = playerGo === 'white' ? 'black' : 'white';
  console.log('playerGo =>', playerGo);
  console.log('opponentGo =>', opponentGo);
  const takenByOpponent =
    event.target.firstChild?.classList.contains(opponentGo);

  if (correctGo) {
    if (takenByOpponent && valid) {
      event.target.parentNode.append(draggetElement);
      event.target.remove();
      changePlayer();
      return;
    }

    if (taken && !takenByOpponent) {
      alert('You can`t go here!');
      return;
    }

    if (valid) {
      event.target.append(draggetElement);
      changePlayer();
      return;
    }
  }
}

const width = 8;

function changePlayer() {
  if (playerGo == 'black') {
    revertIDs();
    playerGo = 'white';
    playerDisplay.textContent = 'white';
  } else {
    reverseIDs();
    playerGo = 'black';
    playerDisplay.textContent = 'black';
  }
}

function reverseIDs() {
  const allSquares = document.querySelectorAll('.square');
  allSquares.forEach((square, idx) =>
    square.setAttribute('square-id', width * (width - 1) - idx)
  );
}

function revertIDs() {
  const allSquares = document.querySelectorAll('.square');
  allSquares.forEach((square, idx) => square.setAttribute('square-id', idx));
}

function checkIfValid(target) {
  const targetID =
    Number(target.getAttribute('square-id')) ||
    Number(target.parentNode.getAttribute('square-id'));

  const startID = Number(startPositionId);
  const piece = draggetElement.id;

  console.log('startID -> ', startID);
  console.log('targetID -> ', targetID);
  console.log('piece -> ', piece);

  switch (piece) {
    case 'pawn':
      const starterRow = [8, 9, 10, 11, 12, 13, 14, 15];
      if (
        (starterRow.includes(startID) && startID + width * 2 === targetID) ||
        startID + width === targetID ||
        (startID + width - 1 === targetID &&
          document.querySelector(`[square-id="${startID + width - 1}"]`)
            .firstChild) ||
        (startID + width + 1 === targetID &&
          document.querySelector(`[square-id="${startID + width + 1}"]`)
            .firstChild)
      ) {
        return true;
      }
  }
}
