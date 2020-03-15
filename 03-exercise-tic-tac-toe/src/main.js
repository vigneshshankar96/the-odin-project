const gameBoard = (
    function() {
        const MAX_PLAYERS = 2;
        const POS_MOVES_ID = -1;

        let playersList = [];
        let currentPlayer;

        const _array = [
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
            isCurrentPlayerWinner = decideIfCurrentPlayerIsWinner();
            if (!isCurrentPlayerWinner) {
                const nextPlayerId = currentPlayer.id == MAX_PLAYERS - 1 ? 0 : currentPlayer.id + 1;
                currentPlayer = playersList[nextPlayerId];
                console.log('Next player: ' + currentPlayer.getName());
                console.log('Possible moves: ' + JSON.stringify(getIndicesForId(POS_MOVES_ID)));
            }
        };

        const decideIfCurrentPlayerIsWinner = function() {
            const indices = getIndicesForId(currentPlayer.id);
            console.group('Current Player: ' + currentPlayer.getName());
                console.log('ID: ' + currentPlayer.id);
                console.log('Board: '+ JSON.stringify(gameBoard.getArray()));;
                console.log('Found indices: ' + JSON.stringify(indices));
            console.groupEnd();
            return false;
        };

        const getIndicesForId = function(id) {
            const indices = [];
            for (row = 0; row <_array.length; row++) {
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

        const reset = function() {
            playersList = [];
        };

        return { registerPlayer,getArray, reset, registerMove };
    }
)();

const displayController = (
    function() {
        return {};
    }
)();

const Player = function(name) {
    const getName  = function() {
        return name;
    }
    const id = -1;
    return { getName, id };
};

gameBoard.reset();

playerZero = Player('Player Zero');
playerOne = Player('Player One');

gameBoard.registerPlayer(playerZero);
gameBoard.registerPlayer(playerOne);

gameBoard.registerMove(playerZero, 0, 0);
gameBoard.registerMove(playerOne, 1, 1);
gameBoard.registerMove(playerZero, 0, 1);
gameBoard.registerMove(playerOne, 1, 0);
