import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner} from '../helper';

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXisNext] = useState(true); // X is the first player to play the game
    const winner = calculateWinner(board); // winner is also updated? 

    const handleClick = (i) => {
        const boardCopy = [...board]; // why copy the board? and need deep copy.
        if(winner || boardCopy[i]) return;
        // Put an X or O in the clicked square
        boardCopy[i] = xIsNext? 'X': 'O'; 
        // set states
        setBoard(boardCopy);
        setXisNext(!xIsNext);
    };

    const jumpTo = () => {

    };

    const renderMoves = () => {
    };

    return (
        <Board squares={board} clickHandler={handleClick} />
    );
};
export default Game;
