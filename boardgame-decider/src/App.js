import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import GameSummary from './components/GameSummary';
import Header from './components/Header';
import AddGameForm from './components/AddGameForm';

class App extends Component {

  state={
    games: [],
    makeNewGame: false
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
          minPlayerCount={c.minPlayerCount}
          maxPlayerCount={c.maxPlayerCount}
          minPlayTime={c.minPlayTime}
          maxPlayTime={c.maxPlayTime}
          owner={c.owner}
          plays={c.plays}
          designer={c.designer}
          removeItem={e => {e.stopPropagation(); this.deleteGame(i)}}
          index={i}
          voteArray={c.voteArray}
          averageVote={c.averageVote}
          addPlay={e => {e.stopPropagation(); this.addPlay(i)}}
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

        {
          (!this.state.makeNewGame) &&
          <span className='add-game-span'>
            <button 
                onClick={() => this.makeNewGame()}> 
                Add New Game
              </button>
          </span>
        }

        {
          (this.state.makeNewGame) &&
          <span className='add-game-span'>
            <AddGameForm 
                onSubmit={(e,ng) => this.handleSubmit(e,ng)}
              />
          </span>

        }
      </div>
      
    );
  }

  deleteGame(i) {
    axios.delete(`http://localhost:3002/games` + i)
      .then(results => (
        this.setState({
          games: this.state.games.filter((c, index) => index !== 1)
        })
      ))
      .catch(err => console.log(err));
  }

  makeNewGame() {
    this.setState({
      makeNewGame: true
    })
  }

  handleSubmit(e, newGame) {
    e.preventDefault();

    return axios.post('http://localhost:3002/games', newGame)
      .then(response => {
        const games = [
          ...this.state.games,
          response.data,
        ];

        this.setState({
          games,
          makeNewGame: false
        });
      })
      .catch(err => {
      console.warn('Cannot add new game');
      console.info(err);
    })
     
    this.setState({
      makeNewGame: false
    })
  }

  addPlay(i) {
    axios.patch(`http://localhost:3002/addplay:` + i)
      .then(results => this.games[i].plays += 1)
      .catch(err => console.log(err))
  }

}

export default App;
