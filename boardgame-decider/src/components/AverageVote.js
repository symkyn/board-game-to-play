import React, { Component } from 'react';
import './AverageVote.css';
import axios from 'axios';

class AverageVote extends Component {
    constructor(props){
        super(props)

        this.state={
            index: this.props.children.index,
            averageVotes:0, 
            games: this.props.children.voteArray
        }
    }

    // componentWillMount(){
    //     axios.get('http://localhost:3002/games')
    //         .then(response => {
    //             this.setState({
    //                 games: [ ...response.data,],
    //             })
    //         })
    //             .catch(err => console.warn(err));
            

        // const gameVotesArray = this.state.games[this.state.index].voteArray;
            
        // this.setState({
        //     averageVotes: this.findAverageVote(gameVotesArray)
        // })
    
    
    render(){
        // this.setState({
        //     averageVotes: this.findAverageVote(this.state.voteArray)
        // })
        console.log(this.state.index)
        return(
            <li>{this.state.voteArray}</li>
        )
        
    }

    findAverageVote(arr) {
        const totalVotes = arr.length;
        const arrayToReduce = arr;
        const sum = arrayToReduce.reduce((a,b) => a+b);
        return (sum / totalVotes);
    }
}

export default AverageVote;