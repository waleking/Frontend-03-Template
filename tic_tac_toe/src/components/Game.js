import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner} from '../helper';

const styles = {
    width: '200px',
    margin: '20px auto',
};

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

    const renderMoves = () => (
        <button onClick={()=>setBoard(Array(9).fill(null))}>
            Play Game!
        </button>
    );

    return (
        <React.Fragment>
            <Board squares={board} clickHandler={handleClick} />
            <div style={styles}>
                <p>
                    {winner? 
                        'Winner: '+ winner 
                        : 'Next Player: ' + (xIsNext? 'X': 'O')} 
                </p>
                {renderMoves()}
            </div>
        </React.Fragment>
    );
};
export default Game;
