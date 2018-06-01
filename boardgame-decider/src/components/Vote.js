import React, { Component } from 'react';
import './Vote.css';
import axios from 'axios';

class Vote extends Component {
    constructor(props){
        super(props)

        this.state={
            vote: 0,
            index: this.props.children
        }
    }

    render(){
        return(
            <form onSubmit={e => this.submitChange(e)}>
                <input 
                        type='number' 
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

    submitChange(e) {
        e.preventDefault();

        const gameIndex = this.state.index;
        const newVote = this.state.vote;
        console.log(newVote)
        // console.log(this.state.index)
        axios.patch(`http://localhost3002/vote:` + gameIndex, newVote)
            .then(response => console.log(response))
            .catch(err => console.warn(err))

        this.setState({
            vote: 0
        })
    }
}

export default Vote;