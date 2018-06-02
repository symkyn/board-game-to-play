import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import GameSummary from './components/GameSummary';
import Header from './components/Header';
import AddGameForm from './components/AddGameForm';
import Button from './components/Button'

class App extends Component {
  constructor(){
    super()

    this.state={
      games: [],
      makeNewGame: false,
      filter: false,
      filteredGameList: []
    }
  this.highestVoteTotal = this.highestVoteTotal.bind(this);
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
          submitChange={e => { this.submitChange(i)} }
          key={`game-${i}`}
          />
    ))

    const filteredGameList = this.state.filteredGameList.map((c,i) => (
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
          submitChange={e => {e.stopPropagation(); this.submitChange(i)} }
          key={`game-${i}`}
          />
    ))

    return (
      <div className="App">
        <Header />
        <div className='filters'>

        <Button
            className='filter-button'
            onClick={() => this.filterGameList()}>
          Games With Zero Plays
        </Button>

        <Button
            className='filter-button'
            onClick={() => this.fiveOrFewer()}>
          Five or Fewer Plays
        </Button>

        <Button
            className='filter-button'
            onClick={() => this.highestVoteTotal()}>
          Highest Vote Total
          </Button>

        <Button
            className='filter-button'
            onClick={() => this.clearFilter()}>
          Clear Filter
          </Button>

        </div>
    
        {
          (!this.state.filter) &&
        <ul className='games-list'>
          {gamesList}
        </ul>
        }

        {
          (this.state.filter) &&
          <ul className='filtered-game-list'>
            {filteredGameList}
          </ul>
        }

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

  filterGameList() {
    const newFilteredList = this.state.games.filter(value => value.plays === 0)
    this.setState({
      filteredGameList: newFilteredList,
      filter: true
    })
  }

  fiveOrFewer() {
    const newFilteredList = this.state.games.filter(value => value.plays <= 5)
    this.setState({
      filteredGameList: newFilteredList,
      filter: true
    })
  }

  clearFilter() {
    this.setState({
      filter: false
    })
  }

  highestVoteTotal() {
    let highestVote =this.state.games[0]
    const numGames = this.state.games.length
    const gamesArray = this.state.games
    for(var i = 1; i < numGames; i++) {
      if(highestVote.averageVote < gamesArray[i].averageVote){
        highestVote=gamesArray[i]
      }
    }
    this.setState({
      filteredGameList: [highestVote],
      filter: true
    })
  }

  deleteGame(i) {
    axios.delete(`http://localhost:3002/games` + i)
      .then(results => (
        this.setState({
          games: this.state.games.filter((c, index) => index !== i)
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
    const addValue = 1;
    axios.patch('http://localhost:3002/games/addPlay/' + i, addValue)
      .then(results => this.setState({
          games: results.data
      }))
      .catch(err => console.log(err))
  }

  // submitChange(i, newVote) {

  //   const gameIndex = i;
  //   console.log(newVote)
  //   // console.log(this.state.index)
  //   axios.patch(`http://localhost3002/games/vote/` + gameIndex, newVote)
  //       .then(response => this.setState({
  //         games: response.data
  //       }))
  //       .catch(err => console.warn(err))

  //   this.setState({
  //       vote: 0
  //   })
  // }

  // showZeroPlays(event) {
  //   event.stopPropagation();
    
  //   const newFilteredGamesList = this.state.games.filter(e => e.plays === 0);
  //   this.setState({
  //     filteredGameList: newFilteredGamesList,
  //     filter: true
  //   });
  // }

}

export default App;
