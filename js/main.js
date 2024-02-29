


// gameboard (height, width)
// this returns the initial grid
const Gameboard = (function () {

    // Return an array with nine items
    return Array[9].fill("");


    const checkForWin = () => {
        // algorithm for checking win
         
    }

    // Add marker to position (grid, marker, pos)
    const addMarker = (marker, pos) => {
        console.log(marker);
    }

    if (typeof(marker) === typeof("")) {
        if (marker.toLowerCase() === "x" || marker.toLowerCase() === "o") {
            console.log(marker);
        }
    }

})();


const Game = () => {
    const board = Gameboard();

    // Take a turn
    const takeTurn = () => {
        
    }

    // Did someone win? (grid) 
    const checkGameStatus = () => {

        // Check for diagonal win
        if (board[4] !== "") {
            // It will be either X or O in the middle
            // Check for diagonal wins
        }

        // Check wins in the rows and columns

        // Have all positions been checked and none is empty anymore?
        // Game draw?
        
    }
}

const Player = ((name) => {

    let name = name; 
    let wins = 0;

    win = () => {
        wins++;
    }

    setName = (name) => {
        name = name;
    }
})();

const Score = (() => {
    let round = 0;
    let ties = 0;

    next = () => {
        round++;
    }

    tie = () => {
        ties++;
    }
})



// Update display



// Play round
// (grid, marker (x or o), position)
// addMarkerToPos(grid, marker, pos)
// didSomeoneWin(grid)
