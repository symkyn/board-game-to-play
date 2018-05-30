import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import GameSummary from './components/GameSummary';
import Header from './components/Header';

class App extends Component {

  state={
    games: []
  }

  componentWillMount() {
    axios.get('http://localhost:3002/games')
      .then(response => {
        this.setState({
          games: [
            ...response.data,
          ],
        })
      })
      .catch(err => console.warn(err));
  
    }

  render() {
    const gamesList = this.state.games.map((c,i) => (
      <GameSummary 
          title={c.title}
          minPC={c.minPlayerCount}
          maxPC={c.maxPlayerCount}
          minPT={c.minPlayTime}
          maxPT={c.maxPlayTime}
          owner={c.owner}
          plays={c.plays}
          designer={c.designer}
          removeItem={e => {e.stopPropagation(); this.deleteGame(i)}}
          index={i}
          votes={c.voteArray}
          key={`game-${i}`}
          />
    ))

    return (
      <div className="App">
        <Header />
        <form></form>
        <ul className='games-list'>
          {gamesList}
        </ul>
      </div>
      
    );
  }

  deleteGame(i) {
    axios.delete(`http://localhost:3002/games` + i)
      .then(results => (
        this.setState({
          games: results.data
        })
      ))
      .catch(err => console.log(err));
  }
}

export default App;
