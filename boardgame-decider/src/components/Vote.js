import React, { Component } from 'react';
import './Vote.css';

class Vote extends Component {
    constructor(props){
        super(props)

        this.state={
            vote: 0,
            index: props.index
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
        console.log(this.state.vote)
        console.log(this.state.index)
        this.setState({
            vote: 0
        })
    }
}

export default Vote;