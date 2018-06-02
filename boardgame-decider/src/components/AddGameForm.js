import React, { Component } from 'react';
import './AddGameForm.css';

class AddGameForm extends Component {
    inputs = [
            {
                label: 'Title',
                property: 'title'
            },
            {
                label: 'Minimum Player Count',
                property: 'minPlayerCount'
            },
            {
                label: 'Maximum Player Count',
                property: 'maxPlayerCount'
            },
            {
                label: 'Minimum Play Time',
                property: 'minPlayTime'
            },
            {
                label: 'Maximum Play Time',
                property: 'maxPlayTime'
            },
            {
                label: 'Designer',
                property: 'designer'
            },
            {
                label: 'Owner',
                property: 'owner'
            },
            {
                label: 'Plays',
                property: 'plays'
            }
    ]

    constructor(props) {
        super(props)

        this.state = {
            title: '',
            minPlayerCount: '',
            maxPlayerCount: '',
            minPlayTime: '',
            maxPlayTime: '',
            designer: '',
            owner: '',
            plays: ''
        }
    }

    render() {
        const inputs = this.inputs
            .map((input, i) => (
                <div key={`new-game-form ${i}`}>
                <lable>
                    {input.label}:
                    <input 
                            type='text'
                            value={this.state[input.property]}
                            onChange={e => this.handleChange(e, input.property)}
                            name={input.property}
                        />
                </lable>
                </div>
            ))

        return(
            <form name='add-games-form'>
                {inputs}
                <button
                    className='new-game-submit'
                    type='submit'
                    onClick={e =>this.handleSubmit(e)}>
                    Submit
                </button>
            </form>

        )
    }

    handleChange(event, name) {
        const value = event.target.value;
        this.setState({ [name]: value });
      }

    handleSubmit(e) {
        e.preventDefault();
        const { title, minPlayerCount, maxPlayerCount, minPlayTime, maxPlayTime, designer, owner, plays } = this.state;
        const newGame = { title, minPlayerCount, maxPlayerCount, minPlayTime, maxPlayTime, designer, owner, plays };

       
        this.props.onSubmit(e, newGame)
        
        
    }  
}

export default AddGameForm;
