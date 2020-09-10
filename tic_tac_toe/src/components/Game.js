import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner} from '../helper';

const styles = {
    width: '200px',
    margin: '20px auto',
};

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]); // time travel of the board
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisNext] = useState(true); // X is the first player to play the game
    const winner = calculateWinner(history[stepNumber]); // winner is also updated? 

    const handleClick = (i) => {
        const timeInHistory = history.slice(0, stepNumber + 1);
        const current = timeInHistory[stepNumber];
        const squares = [...current]; // keep the previous state immutable
        if(winner || squares[i]) return;
        // Put an X or O in the clicked square
        squares[i] = xIsNext? 'X': 'O'; 
        // set states
        setHistory([...timeInHistory, squares]); // add the current state
        setStepNumber(stepNumber + 1);
        setXisNext(!xIsNext);
    };

    const jumpTo = (step) => {
        // Code here is very tricky. We didn't set history yet, since 
        // the history will be updated in handleClick.
        setStepNumber(step); 
        setXisNext(step % 2===0);
    };

    const renderMoves = () => (
        history.map((_board, move) => { 
            const destination = move ? `Go to move #${move}`: `Go to start`; 
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{destination}</button> 
                </li>
            );
        })
    );

    return (
        <React.Fragment>
            <Board squares={history[stepNumber]} clickHandler={handleClick} />
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
