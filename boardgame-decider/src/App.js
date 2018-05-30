import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import GameSummary from './components/GameSummary'

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
          key={`game-${i}`}
          />
    ))

    return (
      <div className="App">
        <header className="App-header">
            Board Games!
        </header>
        <form></form>
        <ul>
          {gamesList}
        </ul>
      </div>
      
    );
  }
}

export default App;
