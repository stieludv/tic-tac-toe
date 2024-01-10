


// gameboard (height, width)
// this returns the initial grid
const Gameboard = (board = [], marker) => {

    // Return a fresh board if no input is given
    if (board == [] || typeof(board) !== typeof([])) {
        return [
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
        ];
    }

    // Add marker to position (grid, marker, pos)
    const addMarker = (marker) => {
        console.log(marker);
    }  

    if (typeof(marker) === typeof("")) {
        if (marker.toLowerCase() === "x" || marker.toLowerCase() === "o") {
            console.log(marker);
        }
    } 

}


const Game = () => {


    // Did someone win? (grid) 
    const checkForWin = () => {

    }
}



// Update display



// Play round
// (grid, marker (x or o), position)
// addMarkerToPos(grid, marker, pos)
// didSomeoneWin(grid)
