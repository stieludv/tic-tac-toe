

// this returns the initial grid
const gameboard = (() => {

    // Create the gameboard array
    let board = Array(9).fill("");
    // const board = [...Array(9).keys()];
    // let board = ["o", "x", "x", "x", "o", "o", "x", "o", "x"];


    // Add marker to position (grid, marker, pos)
    const addMarker = (marker, pos) => {
        // Is it a legit move?
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
            if (board[2] !== "" && board[6] !== "" && _verifyMatchingMarkers([board[2], board[4], board[6]])) {
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

const player = (playerName) => {
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

const gameController = (() => {

    let playerX = player("Player1");
    let playerO = player("Player2");
    const players = [playerX, playerO];
    let winner = false;

    let turn = 0;

    const whosTurn = () => {
        // If turn is even or zero X goes
        if (turn % 2 === 0 || turn === 0) {
            return "x";
        }
        else {
            return "o";
        }
    };

    const getPlayers = () => {
        return players;
    };

    const play = (pos) => {
        // We already know marker because we have determined whosTurn
        // Take a turn (my research shows X starts according to most conventions)
        // That means X will always take turns on uneven turns (assuming we start with 0)

        const newPos = gameboard.addMarker(whosTurn(), pos);
        if (newPos !== false) {
            // Handle if it did not and when it can add new marker to board

            // Only increment turn if addMarker was successfull
            // Otherwise the wrong marker may be added on the next attempt
            turn++;
            _invokeCallbacks();
        }

        // Check the following too
        const gameStatus = gameboard.checkForWin();
        const gameDraw = gameboard.checkForDraw();

        console.log(gameboard.getBoard(), gameStatus, gameDraw);

        if (gameStatus !== false) {
            if (gameStatus[1] === "x") {
                playerX.winIncrement();
                winner = players[0];
            }
            if (gameStatus[1] === "o") {
                playerO.winIncrement();
                winner = players[1];
            }

            gameboard.clear();

            _invokeCallbacks();
            winner = false;
        }

        if (gameDraw === true) {
            // Draw
            winner = false;

            gameboard.clear();

            _invokeCallbacks();
            winner = false;
        }
    };

    const getWinner = () => {
        return winner;
    }

    const callbacks = [];

    const addCallback = (cb) => {
        // Add callbacks that will run after every event in gameController
        callbacks.push(cb);
    }

    const _invokeCallbacks = () => {
        // Invoke all registered callbacks
        callbacks.forEach((cb) => {
            cb(/* Pass any relevant data here */);
        });
    }

    return {
        whosTurn,
        play,
        getPlayers,
        addCallback,
        getWinner,
    }
})();

// Redundant for now - player tracks their own wins 
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
    const container = document.querySelector(".container");

    // Render HTML in DOM
    const renderGameboard = () => {
        // A bunch of button elements?
        if (gameboard.getBoard().length === 9) {
            const gameboardNode = document.createElement("div");
            gameboardNode.classList.add("gameboard");

            // Create buttons based on gameboard data
            const buttons = gameboard.getBoard().map((cellValue) => {
              const button = document.createElement("button");
              button.textContent = cellValue; // Set button text based on cell value
              return button;
            });
      
            // Append buttons to the gameboardNode
            buttons.forEach((button, index) => {
                button.setAttribute("data-cell", `${index}`);
                gameboardNode.appendChild(button);
            });
      
            // Append the gameboardNode to the container
            container.appendChild(gameboardNode);
        }
        else {
            console.error("Gameboard is not of correct size");
        }
    }


    const updateGameboard = () => {
        // map and check if gameboard has changed
        // If it has changed update gameboard var here
        // Update DOM
        const gameboardContainer = document.querySelector(".gameboard");

        // Remove all buttons
        gameboardContainer.remove();

        // Re-render all buttons
        displayController.renderGameboard();

        // Re-add event listeners
        listenForPlayEvent();
    }

    const renderPlayerInfo = () => {
        // A text element that will be positioned under players name?

        const container = document.querySelector(".container");

        const players = gameController .getPlayers().map((player) => {

            const playerInfoNode = document.createElement("div");
            playerInfoNode.classList.add("player-info");
            playerInfoNode.setAttribute("data-player", `${player.getName()}`);

            const playerNameText = document.createElement("h2");
            playerNameText.textContent = player.getName();
            playerInfoNode.appendChild(playerNameText);

            const playerNameScore = document.createElement("p");
            playerNameScore.textContent = player.getWins();
            playerInfoNode.appendChild(playerNameScore);
            
            return playerInfoNode;
        });
  
        players.forEach((player) => {
            container.appendChild(player);
        });
    }

    const renderWinnerDisplay = () => {
        // Render "Start game"
    }

    const updateWinnerDisplay = () => {
        // How should I know which player won here?
        // Perhaps I should check and compare each players wins 
    }

    // Update text in DOM
    const updatePlayerInfo = () => {
        const playerNodes = document.querySelectorAll("[data-player]");
        playerNodes.forEach((playerNode) => {
            playerNode.remove();
        })

        displayController.renderPlayerInfo();
    }

    return {
        renderGameboard,
        renderPlayerInfo,
        updatePlayerInfo,
        updateGameboard,
        updateWinnerDisplay,
        renderWinnerDisplay,
    }
})();

// Event handlers
// Check if the page has been loaded - run render methods
const handlePageLoad = (() => {
    window.onload = () => {
        // Render gameboard
        displayController.renderGameboard();
        displayController.renderPlayerInfo();
        displayController.renderWinnerDisplay();

        // After gameboard is rendered we can add event listeners on the rendered game
        listenForPlayEvent();
        
        // Add displayController cb functions to cb list in gameController
        gameController.addCallback(displayController.updateGameboard);
        gameController.addCallback(listenForPlayerWin);
    }
})();

// Check for potential input (player clicks on square of tic-tac-toe in DOM)
const listenForPlayEvent = () => {
    const displayButtons = document.querySelectorAll("[data-cell]");
    displayButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            gameController.play(Number(e.target.getAttribute("data-cell")));
        })
    })
};

const listenForPlayerWin = () => {
    const winner = gameController.getWinner();
    if (winner !== false) {
        console.log(winner.getName());
        displayController.updatePlayerInfo();
        displayController.updateWinnerDisplay();
        displayController.updateGameboard();
    }
};

// Check if player name is being edited 
const handlePlayerNameChange = (() => {

})();

// Check if reset button pressed


const gameEventListeners = (() => {
    // Include all event listeners in here?
})();