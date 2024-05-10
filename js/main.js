


// gameboard (height, width)
// this returns the initial grid
const gameboard = (() => {

    // Create the gameboard array
    // const board = Array(9).fill("");
    // const board = [...Array(9).keys()];
    let board = ["o", "x", "x", "x", "o", "o", "x", "o", "x"];


    // Add marker to position (grid, marker, pos)
    const addMarker = (marker, pos) => {
        // Is it a legit move?
        if (typeof(marker) === typeof("") && typeof(pos) === typeof(0)) {
            if ((marker.toLowerCase() === "x" || marker.toLowerCase() === "o") && pos >= 0 && pos <= 8) {
                console.log(marker, pos);
                if (board[pos] === "") {
                    board[pos] = marker;
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        else {
            return false;
        }
    }


    const _verifyMatchingMarkers = (args) => {
        // Returns true if all markers match; else false
        return args.reduce((a, b) => {
            return (a === b) ? b : false;
        }) === false ? false : true;
    }


    // Did someone win? (grid) 
    const checkForWin = () => {
        // Returns an array [win(true?), marker(X or O?)]


        // Check for diagonal win
        if (board[4] !== "") {
            // It will be either X or O in the middle
            // Check for positive diagonal win
            if (board[0] !== "" && board[8] !== "" && _verifyMatchingMarkers([board[2], board[4], board[6]])) {
                return [true, board[4]];
            }

            // Check for negative diagonal win
            if (board[0] !== "" && board[8] !== "" && _verifyMatchingMarkers([board[0], board[4], board[8]])) {
                return [true, board[4]];
            }
        }

        // Check for wins in the rows and columns
        const rows = [];
        const columns = [];

        let win = false;

        for (let i = 0; i < 3; i++) {
            rows.push([
                board[0+(3*i)],
                board[1+(3*i)],
                board[2+(3*i)],
            ])

            columns.push([
                board[(3*1)-3+i],
                board[(3*2)-3+i],
                board[(3*3)-3+i],
            ])
        }

        rows.forEach(row => {
            if (_verifyMatchingMarkers(row) && row[0] !== "") {
                win = [true, row[0]];
            }
        })

        columns.forEach(column => {
            if (_verifyMatchingMarkers(column) && column[0] !== "") {
                win = [true, column[0]];
            }
        })

        return win;
    }

    const checkForDraw = () => {
        if (!board.includes("")) {
            return true;
        }
        else {
            return false;
        }
    }

    const getBoard = () => {
        return board;
    }

    const clear = () => {
        board = Array(9).fill("");
    }

    return {
        checkForWin,
        checkForDraw,
        addMarker,
        clear,
        getBoard,
    }
})();


const gameController = (() => {

    let playerX;
    let playerO;
    let turn = 0;

    const whosTurn = () => {
        // If turn is uneven X goes
        if (turn % 2 !== 0 || turn === 0) {
            return "x";
        }
        else {
            return "o";
        }
    }

    // Take a turn (my research shows X starts according to most conventions)
    // That means X will always take turns on uneven turns (assuming we start with 0)
    const takeTurn = () => {
        // What do I have to do in every turn?
        // I need to get player input (position)
        // I need to addMarker to gameboard with the position and marker from whosTurn
        // I need to checkForWin and checkForDraw

        // Only ask for input for whosTurn if player is of type Player
        // No input needed if player is AI

        // How do I get input to make the game playable in the console or in the UI?
    }



    return {
        whosTurn,
        takeTurn,
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

