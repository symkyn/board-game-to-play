import React from 'react';  
import './GameSummary.css';
import Vote from './Vote';
// import AverageVote from './AverageVote'

const GameSummary = ({title, minPlayerCount, maxPlayerCount, minPlayTime, 
                        maxPlayTime, owner, plays, designer, removeItem, index, 
                        voteArray, averageVote, addPlay, submitChange}) => (
    <li className='game-summary'>
        <h3>{title}</h3>
        <ul>
            <li className='game-info'>Player Count: {minPlayerCount}-{maxPlayerCount}</li>
            <li className='game-info'>Play Time: {minPlayTime}-{maxPlayTime}</li>
            <li className='game-info'>Designer: {designer}</li>
            <li className='game-info'>Average Votes: {averageVote}</li>
        </ul>
        <Vote
                submitChange={submitChange}
                index={index}
            />
        <br />
        <div className='bottom-div'>
        <button 
                className='add-play'
                onClick={addPlay}> 
                Add Play </button>
        <div className='owner-info'>Owner: {owner} || Plays: {plays}</div>
        <button 
                className='delete-button'
                onClick={removeItem}
            > delete </button>
        </div>
    </li>
)


export default GameSummary;