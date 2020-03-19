
const displayController = (
    function() {
        const gameBoardDOM = document.querySelector('game-board');
        const gameStatusDOM = document.querySelector('game-status-display');
        const resetButtonDOM = document.querySelector('#reset-button');

        const disableInterface = function() {
            gameBoardDOM.classList.add('disable-click');
        };

        const enableInterface = function() {
            gameBoardDOM.classList.remove('disable-click');
        };

        const updateStatusDisplay = function(text) {
            gameStatusDOM.innerText = text;
        };

        const render = function() {
            while (gameBoardDOM.firstChild) {
                gameBoardDOM.removeChild(gameBoardDOM.lastChild);
            }
            for (let row = 0; row < gameBoard.getState().length; row++) {
                for (let column = 0; column < gameBoard.getState()[row].length; column++) {
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
                    });
                    gameBoardDOM.appendChild(cell);
                };
                const cellBreak = document.createElement('br');
                gameBoardDOM.appendChild(cellBreak);
            };
            resetButtonDOM.addEventListener('click', function(event) {
                gameBoard.reset();
                reset();
            })
        }

        const reset = function() {
            enableInterface();
            updateStatusDisplay(
                gameBoard.getCurrentPlayer().getName() + '\'s turn'
            );
            render();
        }

        return { render, disableInterface, updateStatusDisplay, reset };
    }
)();

const gameBoard = (
    function() {
        const MAX_PLAYERS = 2;
        const POS_MOVES_ID = -1;

        let playersList = [];
        let currentPlayer;
        let _state = [
            [-1, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1]
        ];

        const registerPlayer = function(player) {
            if (playersList.length < MAX_PLAYERS) {
                player.id = playersList.push(player) - 1;
            };
        };

        const assignRandomCurrentPlayer = function() {
            currentPlayer = playersList[Math.floor(Math.random() * playersList.length)];
        };

        const registerMove = function(player, row, column) {
            _state[row][column] = player.id;
            if (checkIfWinner(currentPlayer)) {
                displayController.disableInterface();
                displayController.updateStatusDisplay(
                    currentPlayer.getName() + ' won!'
                );
                assignRandomCurrentPlayer();
            } else if (!getIndicesForId(POS_MOVES_ID).length) {
                displayController.disableInterface();
                displayController.updateStatusDisplay(
                    'It\'s a tie'
                );
                assignRandomCurrentPlayer();
            } else {
                const nextPlayerId = currentPlayer.id == MAX_PLAYERS - 1 ? 0 : currentPlayer.id + 1;
                currentPlayer = playersList[nextPlayerId];
                displayController.updateStatusDisplay(
                    currentPlayer.getName() + '\'s turn'
                );
            }
        };

        const checkIfWinner = function(player) {
            const winPossibilities = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],    // Row wins
                [0, 3, 6], [1, 4, 7], [2, 5, 8],    // Column wins
                [0, 4, 8], [2, 4, 6]                // Diagonal wins
            ];
            const flat_array = _state.flat(1);
            for (i = 0; i < flat_array.length-1; i++) {
                if (
                    flat_array[winPossibilities[i][0]] === player.id &&
                    flat_array[winPossibilities[i][1]] === player.id &&
                    flat_array[winPossibilities[i][2]] === player.id
                ) {
                    return true; 
                };
            };
            return false;
        };

        const getIndicesForId = function(id) {
            const indices = [];
            for (row = 0; row < _state.length; row++) {
                for (column = 0; column < _state[row].length; column++) {
                    if (_state[row][column] === id) {
                        indices.push([row, column]);
                    };
                };
            };
            return indices;
        };

        const checkIfValidMove = function(row, column) {
            const cell_as_string = JSON.stringify([row, column]);
            return getIndicesForId(POS_MOVES_ID).some(function(cell) {
                return JSON.stringify(cell) === cell_as_string;
            });
        };

        const getState = function() {
            return _state;
        };

        const getCurrentPlayer = function() {
            return currentPlayer;
        };

        const reset = function() {
            _state = [
                [-1, -1, -1],
                [-1, -1, -1],
                [-1, -1, -1]
            ];
            assignRandomCurrentPlayer();
        };

        return { registerPlayer, getState, reset, registerMove, getCurrentPlayer, checkIfValidMove };
    }
)();

const Player = function(name, color) {
    const getName  = function() {
        return name;
    };
    const id = -1;
    return { getName, id , color };
};

playerZero = Player('Player Zero', 'green');
playerOne = Player('Player One', 'red');

gameBoard.registerPlayer(playerZero);
gameBoard.registerPlayer(playerOne);

gameBoard.reset();
displayController.reset();
