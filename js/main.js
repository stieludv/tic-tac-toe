


// gameboard (height, width)
// this returns the initial grid
const gameboard = (() => {

    // Create the gameboard array
    const board = Array(9).fill("");

    // Add marker to position (grid, marker, pos)
    const addMarker = (marker, pos) => {
        // Is it a legit move?
        if (typeof(marker) === typeof("")) {
            if (marker.toLowerCase() === "x" || marker.toLowerCase() === "o") {
                console.log(marker);
            }
        }
        else {

        }
    }

    const _verifyMatchingMarkers = (args) => {
        // Returns true if all markers match
        args.forEach(marker => {
            // If any marker does not match the first one
            if (marker !== args[0]) {
                return false;
            }
        });

        return true;
    }

    // Did someone win? (grid) 
    const playerHasWon = () => {
        // Returns an array [win(true?), marker(X or O?)]

        // Check for diagonal win
        if (board[4] !== "") {
            // It will be either X or O in the middle
            // Check for positive diagonal win
            if (board[0] !== "" && board[8] !== "" && _verifyMatchingMarkers([board[0], board[4], board[8]])) {
                return [true, board[4]];
            }

            // Check for negative diagonal win
            if (board[0] !== "" && board[8] !== "" && _verifyMatchingMarkers([board[0], board[4], board[8]])) {
                return [true, board[4]];
            }
        }

        // Check wins in the rows and columns
        // Create arrays of every possible row and column combo
        // Check these arrays in _verifymatchingMarkers
        // If anyone is true a Player has won

        // Have all positions been checked and none is empty anymore?
        // Game draw?
        
    }

    const clear = () => {
        board = Array(9).fill("");
    }

    return {
        playerHasWon,
        addMarker,
        clear, 
    }
})();


const gameController = (() => {


    // Take a turn
    const takeTurn = () => {
        
    }



    return {

    }
})();


const Player = (playerName) => {
    // Players could keep track of their respective scores
    // This way scores could be saved, leadersboards, etc
    // Otherwise scoreController will only track and save scores across some game
    // Players could change between games, but the score would not in scoreController
    // Persistant storage?

    // Player does not have a "type".
    // X or O is decided on "side" by gameController
    // Thus a player could switch sides mid-game through gameController alone
    // Game controller knows whos turn it is, and what turn they are.

    let name = playerName;
    // Tracks overall wins (both as X and O)
    let wins = 0;

    // Could implement tracking of ties here too and respective wins as X and O

    const winIncrement = () => {
        wins++;
    }

    const setName = (name) => {
        name = name;
    }

    const getName = () => {
        return name;
    }

    const getWins = () => {
        return wins;
    }

    return {
        winIncrement,
        setName,
        getName,
        getWins,
    }
};


const scoreController = (() => {
    // Persistant storage?
    // See Player for more info.

    let round = 0;
    let ties = 0;
    let winX = 0;
    let winO = 0;

    const nextRound = () => {
        round++;
    }

    const tieIncrement = () => {
        ties++;
    }

    const resetScore = () => {
        round = 0;
        ties = 0;
    }

    const getScore = () => {
        return {
            "rounds": round,
            "ties": ties
        }
    }

    const winXIncrement = () => {
        winX++;
    }


    const winOIncrement = () => {
        winO++;
    }

    return {
        nextRound,
        tieIncrement,
        resetScore,
        winXIncrement,
        winOIncrement
    }
})();


const displayController = (() => {
    // Update display
})();

