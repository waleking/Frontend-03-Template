export function calculateWinner(squares) {
    // The array lines means the winning condition.
    // The first 3 arrays in lines are the rows, the middle 3 arrays are the columns,
    // and the last two arrays are the diagnoals.
    const lines = [ 
        [0, 1, 2], // the first row 
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // the first column
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // one diagnoal 
        [2, 4, 6]  // the other diagnoal
    ];

    for(let line of lines){
        let [a, b, c] = line;
        if(squares[a] &&
            squares[a]===squares[b] &&
            squares[b]===squares[c]){
            return squares[a];
        }
    }
    return null;
};

// below are unit tests
const squares1 = [
    null, null, null,
    'X', 'X', 'O',
    null, null, null
];

const squares2 = [
    'X',   null,   'O',
    'X',   'X',    'O',
    null,  'O',    'X'
];

console.log(calculateWinner(squares1));
console.log(calculateWinner(squares2));
