import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner} from '../helper';

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXisNext] = useState(true); // X is the first player to play the game
    const winner = calculateWinner(board);

    const handleClick = (msg) => {
        console.log(msg);
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
