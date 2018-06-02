import React, { Component } from 'react';
import axios from 'axios';
import './Vote.css';


class Vote extends Component {
    constructor(props){
        super(props)

        this.state={
            vote: 1,
            index: this.props.index
        }
    }

    render(){
        return(
            <form onSubmit={e => this.submitChange(this.state.index, this.state.vote)}>
                <input 
                        type='number' 
                        min='1'
                        max='10'
                        value={this.state.vote}
                        onChange={e => this.valueChange(e)}
                    
                     />
                <button>Vote!</button>
            </form>
        )
    }

    valueChange(e) {
        this.setState({
            vote: e.target.value
        })
    }


submitChange(index, newVote) {
    const vote = {
        vote: newVote
    };
    const gameIndex = index;
    console.log(newVote)
    console.log(gameIndex)
      axios.patch('http://localhost:3002/games/vote/' + gameIndex, vote)
          .then(response => console.log(response)
        )
          .catch(err => console.warn(err))
    
      this.setState({
          vote: 1
      })
    }
}
export default Vote;