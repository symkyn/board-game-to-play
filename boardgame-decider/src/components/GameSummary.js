import React from 'react';  
import './GameSummary.css';
import Vote from './Vote';

const GameSummary = ({title, minPC, maxPC, minPT, maxPT, owner, plays, designer, removeItem, index, votes}) => (
    <li className='game-summary'>
        <h3>{title}</h3>
        <ul>
            <li className='game-info'>Player Count: {minPC}-{maxPC}</li>
            <li className='game-info'>Play Time: {minPT}-{maxPT}</li>
            <li className='game-info'>Designer: {designer}</li>
            <li className='game-info'>vote: {votes}</li>
        </ul>
        <Vote index />
        <br />
        <div className='bottom-div'>
        <button className='edit-button'> edit </button>
        <div className='owner-info'>Owner: {owner} || Plays: {plays}</div>
        <button 
                className='delete-button'
                onClick={removeItem}
            > delete </button>
        </div>
    </li>
)


export default GameSummary;