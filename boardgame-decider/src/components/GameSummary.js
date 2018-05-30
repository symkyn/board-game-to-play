import React from 'react';  
import './GameSummary.css';
import Vote from './Vote';
import AverageVote from './AverageVote'

const GameSummary = ({title, minPC, maxPC, minPT, maxPT, owner, plays, designer, removeItem, index, voteArray}) => (
    <li className='game-summary'>
        <h3>{title}</h3>
        <ul>
            <li className='game-info'>Player Count: {minPC}-{maxPC}</li>
            <li className='game-info'>Play Time: {minPT}-{maxPT}</li>
            <li className='game-info'>Designer: {designer}</li>
            {/* <li className='game-info'>Votes: {voteArray}</li>
            <li className='game-info'>Index: {index}</li>
            <AverageVote index /> */}
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