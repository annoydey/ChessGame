const board = document.querySelector("#board")
const player = document.querySelector("#Player")
const info = document.querySelector("#info-display")

const width = 8
let currentPlayer = 'white';

const Pieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook,
]

function createBoard(){
    Pieces.forEach((Piece, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        
        if (Piece) {
            const pieceElement = document.createElement('span')
            pieceElement.innerHTML = Piece
            pieceElement.setAttribute('draggable', true)
            pieceElement.classList.add(i < 16 ? 'black' : 'white')
            square.appendChild(pieceElement)
        }

        square.setAttribute('square-id', i)
        const row = Math.floor((63 - i) / 8) + 1
        if (row % 2 === 0){
            square.classList.add(i % 2 === 0 ? "beige" : "green")
        }else{
            square.classList.add(i % 2 === 0 ? "green" : "beige")
        }

        board.append(square)
    })
    player.textContent = `Current Player: ${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}`;
}

createBoard()


const allTiles = document.querySelectorAll(".square")

allTiles.forEach(square => {
    square.addEventListener('dragstart', startDrag)
    square.addEventListener('dragover', overDrag)
    square.addEventListener('drop', dropDrag)
})

let startPositionId 
let draggedElement

function startDrag(e) {
    if (e.target.classList.contains(currentPlayer)) {
        startPositionId = e.target.parentNode.getAttribute('square-id');
        draggedElement = e.target;
    } else {
        e.preventDefault();
    }
}

function overDrag (e) {
   e.preventDefault()
}

function isPawnMoveValid(start, end, player) {
    const sRow = Math.floor(start / 8);
    const eRow = Math.floor(end / 8);
    const sCol = start % 8;
    const eCol = end % 8;

    if (player === 'white') {
        if (sRow === 6 && eRow === 4 && sCol === eCol) {
            return true; 
        }
        if (eRow === sRow - 1 && sCol === eCol) {
            return true; 
        }
    } else if (player === 'black') {
        if (sRow === 1 && eRow === 3 && sCol === eCol) {
            return true; 
        }
        if (eRow === sRow + 1 && sCol === eCol) {
            return true; 
        }
    }
    return false;
}

function dropDrag(e) {
    e.stopPropagation();
    const targetSquare = e.target;
    const endPositionId = targetSquare.classList.contains('square') ? targetSquare.getAttribute('square-id') : targetSquare.parentNode.getAttribute('square-id');

    if (isPawnMoveValid(parseInt(startPositionId), parseInt(endPositionId), currentPlayer)) {
        if (targetSquare.classList.contains('square') && !targetSquare.hasChildNodes()) {
            targetSquare.appendChild(draggedElement);

            currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
            player.textContent = `Current Player: ${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}`;
        }
    } else {
        document.querySelector(`[square-id='${startPositionId}']`).appendChild(draggedElement);
    }
}


// I have implemented only the pawn movement 
