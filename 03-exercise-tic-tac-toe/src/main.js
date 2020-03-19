const displayController = (
    function() {

        const gameBoardDOM = document.querySelector('game-board');
        const gameStatus = document.querySelector('game-status-display');
        const restartButton = document.querySelector('#restart-button');

        const disableInterface = function() {
            gameBoardDOM.classList.add('disable-click');
        };

        const enableInterface = function() {
            gameBoardDOM.classList.remove('disable-click');
        };

        const updateStatusDisplay = function(text) {
            gameStatus.innerText = text;
        };

        const render = function() {

            const _array = gameBoard.getArray();

            while (gameBoardDOM.firstChild) {
                gameBoardDOM.removeChild(gameBoardDOM.lastChild);
            }

            for (let row = 0; row < _array.length; row++) {
                for (let column = 0; column < _array[row].length; column++) {
                    const cell = document.createElement('div');
                    cell.setAttribute('class', 'cell');
                    cell.setAttribute('row', row);
                    cell.setAttribute('column', column);
                    cell.addEventListener('click', function(event) {
                        const _row = parseInt(event.target.getAttribute('row'));
                        const _column = parseInt(event.target.getAttribute('column'));
                        if (gameBoard.checkIfValidMove(_row, _column)) {
                            const currentPlayer = gameBoard.getCurrentPlayer();
                            gameBoard.registerMove(currentPlayer, _row, _column);
                            event.target.style.backgroundColor = currentPlayer.color;
                        }
                    })
                    gameBoardDOM.appendChild(cell);
                }
                const cellBreak = document.createElement('br');
                gameBoardDOM.appendChild(cellBreak);
            };

            restartButton.addEventListener('click', function(event) {
                gameBoard.reset();
                enableInterface();
                updateStatusDisplay('');
                render();
            })
        }
        return { render, disableInterface, updateStatusDisplay };
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
                assignRandomCurrentPlayer();
            }
        };

        const assignRandomCurrentPlayer = function() {
            currentPlayer = playersList[Math.floor(Math.random() * MAX_PLAYERS)];
        };

        const registerMove = function(player, row, column) {
            _array[row][column] = player.id;
            if (checkIfWinner(currentPlayer)) {
                displayController.disableInterface();
                displayController.updateStatusDisplay(
                    currentPlayer.getName() + ' won!'
                );
                assignRandomCurrentPlayer();
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

        const checkIfValidMove = function(row, column) {
            move = [row, column];
            var move_as_string = JSON.stringify(move);
            return getIndicesForId(POS_MOVES_ID).some(function(ele) {
                return JSON.stringify(ele) === move_as_string;
            });
        };

        const getArray = function() {
            return _array;
        };

        const getCurrentPlayer = function() {
            return currentPlayer;
        };

        const reset = function() {
            _array = [
                [-1, -1, -1],
                [-1, -1, -1],
                [-1, -1, -1]
            ];
        };

        return { registerPlayer, getArray, reset, registerMove, getCurrentPlayer, checkIfValidMove };
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
