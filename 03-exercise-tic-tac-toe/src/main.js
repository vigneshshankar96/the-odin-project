const gameBoard = (
    function() {
        let playersList = [];
        const MAX_PLAYERS = 2;
        let currentPlayer;
        let _array = [
            [-1, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1]
        ];

        const registerPlayer = function(player) {
            if (playersList.length < MAX_PLAYERS) {
                player.symbol = playersList.push(player) - 1;
            }
            if (playersList.length == MAX_PLAYERS) {
                // Choose a random player to make the first move
                currentPlayer = playersList[Math.floor(Math.random() * MAX_PLAYERS)];
            }
        }

        const registerMove = function(player, row, column) {
            _array[row][column] = player.symbol;
            isCurrentPlayerWinner = decideIfCurrentPlayerIsWinner();
            if (!isCurrentPlayerWinner) {
                const nextPlayerIndex = currentPlayer.symbol == MAX_PLAYERS - 1 ? 0 : currentPlayer.symbol + 1;
                currentPlayer = playersList[nextPlayerIndex];
                console.log('Next player ' + currentPlayer.getName())
            }
        }

        const decideIfCurrentPlayerIsWinner = function() {
            return false
        }

        const getArray = function() {
            return _array;
        }

        const reset = function() {
            playersList = [];
        }

        return {registerPlayer,getArray, reset, registerMove}
    }
)();

const displayController = (
    function() {
        return {}
    }
)();

const Player = function(name) {
    const getName  = function() {
        return name;
    }
    let symbol = -1;
    return {getName, symbol}
};

gameBoard.reset();

playerZero = Player('Player Zero');
playerOne = Player('Player One');

gameBoard.registerPlayer(playerZero);
gameBoard.registerPlayer(playerOne);

console.log('Game board array: ' + JSON.stringify(gameBoard.getArray()));

gameBoard.registerMove(playerZero, 0, 0);
gameBoard.registerMove(playerOne, 1, 1);
gameBoard.registerMove(playerZero, 0, 1);
gameBoard.registerMove(playerOne, 1, 0);

console.log('Game board array: ' + JSON.stringify(gameBoard.getArray()));
