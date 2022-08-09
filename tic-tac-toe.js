/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
const prompt = require('prompt-sync')({sigint: true});
const assert = require('assert');

// The board object used to save the current status of a gameplay
let board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    board[position] = mark;
}

// TODO: print the game board as described at the top of this code skeleton
// Will not be tested in Part 1
function printBoard() {
    console.log(
        '\n' + ' ' + board[1] + ' | ' + board[2] + ' | ' + board[3] + '\n' +
        ' ---------\n' +
        '\n' + ' ' + board[4] + ' | ' + board[5] + ' | ' + board[6] + '\n' +
        ' ---------\n' +
        '\n' + ' ' + board[7] + ' | ' + board[8] + ' | ' + board[9] + '\n');
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
// position is an input String
function validateMove(position) {
    const checkInput = (input) => { // Used nested function
        let x;
// Returns a Boolean value that indicates whether a value is the reserved value NaN
        if (isNaN(input)){
            return false;
        }
// Converts a string to a floating-point number
        x = parseFloat(input);
        return (x | 0) === x;
    }
    return (checkInput(position) && board[position] === ' ')
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3],[4, 5, 6],[7, 8, 9],
    [1, 4, 7],[2, 5, 8],[3, 6, 9],
    [1, 5, 9],[3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    let i, j, countMark
    for (i = 0; i < winCombinations.length; i++){
        countMark = 0;
        for (j = 0; j < winCombinations[i].length; j++){
            if (board[winCombinations[i][j]] === player){
                countMark++;
            }
            if (countMark === 3){
                return true;
            }
        }
    }
    return false
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    for (let i = 1; i <= Object.keys(board).length; i++){
        if (board[i] === ' '){
            return false;
        }
    }
    return true;
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    let input = prompt(player + '\'s turn, input: ');
    if (validateMove(input) === true) {
        markBoard(input, player);
        printBoard();
        if (checkWin(player) === true) {
            console.log(player + ' is the Winner!!!');
            return;
        }
        else if (checkFull() === true) {
            console.log('The Game is Tie');
            return;
        }
        if (player === 'X') {
            playTurn('O');
        } else {
            playTurn('X');
        }
    } else {
        console.log('Incorrect input, try again');
        playTurn(player);
    }
}

// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let winnerIdentified = false
let currentTurnPlayer = 'X'

while (!winnerIdentified){
    playTurn(currentTurnPlayer);
    // feel free to add logic here if needed, e.g. announcing winner or tie
}


// Bonus Point: Implement the feature for the user to restart the game after a tie or game over