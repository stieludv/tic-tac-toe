const gameboard = (() => {

    // Create the gameboard array
    const board = Array(9).fill("");
    // const board = [...Array(9).keys()];
    // const board = ["o", "x", "x", "x", "o", "o", "x", "o", "x"];
    // const board = ["o", "x", "x", "x", "o", "o", "", "o", "x"];


    // Add marker to position (grid, marker, pos)
    const addMarker = (marker, pos) => {
        // Is it a legit move (true/false)?
        if (typeof(marker) === typeof("") && typeof(pos) === typeof(0)) {
            if ((marker.toLowerCase() === "x" || marker.toLowerCase() === "o") && pos >= 0 && pos <= 8) {
                if (board[pos] === "") {
                    board[pos] = marker;
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
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
            if (_verifyMatchingMarkers(row)) {
                win = [true, row[0]];
            }
        })

        columns.forEach(column => {
            if (_verifyMatchingMarkers(column)) {
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
    const takeTurn = (input) => {
        /***
         * Input is the position.
         * The entire game should be playble only by calling takeTurn with input. (I think)
         */

        addMarker(whosTurn(), input);
        // Check if addMarker is true/false (accepted?)

        if (checkForWin()) {
            return `Player ${whosTurn} has won!`;
            // I could probably use the Player object better here an include total wins and playername 
        }
        if (checkForDraw()) {
            return `Tie! Nobody won...`;
            // Can I use scoreController to also display the total amount of rounds and ties here?
        }

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