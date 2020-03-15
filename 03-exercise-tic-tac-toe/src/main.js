const displayController = (
    function() {

        const render = function() {

            const _array = gameBoard.getArray();

            const gameBoardInterface = document.querySelector('game-board');
            while (gameBoardInterface.firstChild) {
                gameBoardInterface.removeChild(gameBoardInterface.lastChild);
            }

            for (let row = 0; row < _array.length; row++) {
                for (let column = 0; column < _array[row].length; column++) {
                    const cell = document.createElement('div');
                    cell.setAttribute('class', 'cell');
                    cell.setAttribute('row', row);
                    cell.setAttribute('column', column);
                    cell.addEventListener('click', function(event) {
                        const _row = event.target.getAttribute('row');
                        const _column = event.target.getAttribute('column');
                        const currentPlayer = gameBoard.getCurrentPlayer();
                        gameBoard.registerMove(currentPlayer, _row, _column);
                        event.target.style.backgroundColor = currentPlayer.color;
                    })
                    gameBoardInterface.appendChild(cell);
                }
                const cellBreak = document.createElement('br');
                gameBoardInterface.appendChild(cellBreak);
            }
        }
        return { render };
    }
)();

const gameBoard = (
    function() {
        const MAX_PLAYERS = 2;
        const POS_MOVES_ID = -1;

        let playersList = [];
        let currentPlayer;

        let _array = [
            [-1, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1]
        ];

        const registerPlayer = function(player) {
            if (playersList.length < MAX_PLAYERS) {
                player.id = playersList.push(player) - 1;
            }
            if (playersList.length == MAX_PLAYERS) {
                // Choose a random player to make the first move
                currentPlayer = playersList[Math.floor(Math.random() * MAX_PLAYERS)];
            }
        };

        const registerMove = function(player, row, column) {
            if (player.id !== currentPlayer.id) {
                console.log('Wait for your turn: ' + player.getName());
                return;
            }
            _array[row][column] = player.id;
            if (checkIfWinner(currentPlayer)) {
                console.log(currentPlayer.getName() + ' won!!');
                reset();
                displayController.render();
            } else {
                const nextPlayerId = currentPlayer.id == MAX_PLAYERS - 1 ? 0 : currentPlayer.id + 1;
                currentPlayer = playersList[nextPlayerId];
                console.log('Next player: ' + currentPlayer.getName());
                console.log('Possible moves: ' + JSON.stringify(getIndicesForId(POS_MOVES_ID)));
            }
        };

        const checkIfWinner = function(currentPlayer) {
            const winPossibilities = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],    // Row wins
                [0, 3, 6], [1, 4, 7], [2, 5, 8],    // Column wins
                [0, 4, 8], [2, 4, 6]                // Diagonal wins
            ];

            const flat_array = _array.flat(1);
            // Check all possible winning combinations
            for (i = 0; i < flat_array.length-1; i++) {
                if (
                    flat_array[winPossibilities[i][0]] === currentPlayer.id &&
                    flat_array[winPossibilities[i][1]] === currentPlayer.id &&
                    flat_array[winPossibilities[i][2]] === currentPlayer.id
                ) {
                    return true; 
                }
            } 
            return false;
        };

        const getIndicesForId = function(id) {
            const indices = [];
            for (row = 0; row < _array.length; row++) {
                for (column = 0; column <_array[row].length; column++) {
                    if (_array[row][column] === id) {
                        indices.push([row, column]);
                    }
                }
            }
            return indices;
        };

        const getArray = function() {
            return _array;
        };

        const getCurrentPlayer = function() {
            return currentPlayer;
        }

        const reset = function() {
            _array = [
                [-1, -1, -1],
                [-1, -1, -1],
                [-1, -1, -1]
            ];
        };

        return { registerPlayer, getArray, reset, registerMove, getCurrentPlayer };
    }
)();

const Player = function(name, color) {
    const getName  = function() {
        return name;
    }
    const id = -1;
    return { getName, id , color };
};


gameBoard.reset();

playerZero = Player('Player Zero', 'green');
playerOne = Player('Player One', 'red');

gameBoard.registerPlayer(playerZero);
gameBoard.registerPlayer(playerOne);

displayController.render();
