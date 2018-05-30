import React, { Component } from 'react';
import './Vote.css';
import axios from 'axios';

class Vote extends Component {
    constructor(props){
        super(props)

        this.state={
            vote: 0,
            index: this.props.index
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
        const gameIndex = this.state.idex;
        const newVote = this.state.vote;
        console.log(this.state.vote)
        console.log(this.state.index)
        axios.patch(`http://localhost3002:${gameIndex}`, newVote)
            .then(response => console.log(response))
            .catch(err => console.warn(err))

        this.setState({
            vote: 0
        })
    }
}

export default Vote;