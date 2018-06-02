const axios = require('axios');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const boardGames = [
    {
        title: 'Brass',
        minPlayerCount: 3,
        maxPlayerCount: 4,
        minPlayTime: 90,
        maxPlayTime: 120,
        owner: 'symkyn',
        plays: 20,
        designer: 'Martin Walace',
        voteArray: [10,6],
        averageVote: 0
    },
    {
        title: 'Lignum',
        minPlayerCount: 2,
        maxPlayerCount: 4,
        minPlayTime: 60,
        maxPlayTime: 120,
        owner: 'symkyn',
        plays: 0,
        designer: 'Alexander Huemer',
        voteArray: [10,7],
        averageVote: 0
    },
    {
        title: 'Agra',
        minPlayerCount: 2,
        maxPlayerCount: 4,
        minPlayTime: 90,
        maxPlayTime: 120,
        owner: 'symkyn',
        plays: 0,
        designer: 'Michael Keller',
        voteArray: [10,8],
        averageVote: 0
    },
    {
        title: 'Arkwright',
        minPlayerCount: 2,
        maxPlayerCount: 4,
        minPlayTime: 120,
        maxPlayTime: 240,
        owner: 'symkyn',
        plays: 1,
        designer: 'Stefan Risthaus',
        voteArray: [9],
        averageVote: 0
    }
]

for(i=0; i<boardGames.length; i++){
    const length = boardGames[i].voteArray.length;
    boardGames[i].averageVote = boardGames[i].voteArray.reduce((number,cv) => cv + number) / length;
}

let boardGamesFromBGG = []

axios.get('https://www.boardgamegeek.com/xmlapi2?user=symkyn')
    .then(response => console.log(response))
    .catch(err => console.warn(err))
    
console.log(boardGamesFromBGG)

app.use(cors());
app.use(bodyParser.json());


app.get('/games', (req, res) => {
    const gameList = boardGames; 
    res.send(gameList);

});

app.delete('/games:id', (req, res) => {
    const { id } = req.params;
    const returnGames = boardGames.splice(id,1);
    res.send(returnGames);
});

app.patch(('/games/vote/:id'), (req, res) => {
    const { id } = req.params;
    const newVote = Number(req.body.vote);
    boardGames[id].voteArray.push(newVote);
    res.send(boardGames);
    for(i=0; i<boardGames.length; i++){
        const length = boardGames[i].voteArray.length;
        boardGames[i].averageVote = boardGames[i].voteArray.reduce((number,cv) => cv + number) / length;
    }
});

app.patch(('/games/addPlay/:id'), (req, res) => {
    const { id } = req.params;
    const addValue = req.body;
    boardGames[id].plays++;
    res.status(200).send(boardGames);
});

app.post(('/games'), (req, res) => {
    const newGame = req.body;
    boardGames.push({...newGame, voteArray: [], averageVote: 0});
    res.send(newGame);
});

app.listen(3002, () => {
    console.log('Server listening at port localhost:3002');
});

