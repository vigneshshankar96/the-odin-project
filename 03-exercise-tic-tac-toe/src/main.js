const gameBoard = (
    function() {
        let activePlayers = [];
        const maxPlayers = 2;
        let currentPlayer;
        let winner = 0;
        let _array = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        const registerPlayer = function(player) {
            if (activePlayers.length < maxPlayers) {
                activePlayers.push(player);
                player.symbol = activePlayers.length;
            }
            if (activePlayers.length == maxPlayers) {
                currentPlayer = activePlayers[Math.floor(Math.random() * maxPlayers)];
            }
        }

        const registerMove = function(player, row, column) {
            _array[row][column] = player.symbol;
            winner = decideIfWinner(player);
            const currentPlayerIndex = currentPlayer.symbol + 1 < maxPlayers ? currentPlayer.symbol + 1: maxPlayers - currentPlayer.symbol;
            currentPlayer = activePlayers[currentPlayerIndex];
            console.log('Next player ' + currentPlayer.getName())
        }

        const decideIfWinner = function(player) {

        }

        const getArray = function() {
            return _array;
        }

        const reset = function() {
            activePlayers = [];
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

playerOne = Player('Player One');
playerTwo = Player('Player Two');

gameBoard.registerPlayer(playerOne);
gameBoard.registerPlayer(playerTwo);

console.log('Game board array: ' + JSON.stringify(gameBoard.getArray()));

gameBoard.registerMove(playerOne, 0, 0);
gameBoard.registerMove(playerTwo, 1, 1);
gameBoard.registerMove(playerOne, 0, 1);
gameBoard.registerMove(playerTwo, 1, 0);

console.log('Game board array: ' + JSON.stringify(gameBoard.getArray()));
