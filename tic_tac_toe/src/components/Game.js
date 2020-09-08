import React from 'react';
import Board from './Board';

const Game = () => {
    const handleClick = (msg) => {
        console.log(msg);
    };

    const jumpTo = () => {

    };

    const renderMoves = () => {
    };

    return (
        <Board onClick={handleClick} />
    );
};
export default Game;
