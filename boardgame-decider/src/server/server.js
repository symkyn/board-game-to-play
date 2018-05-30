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
        voteArray: [2,3],
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
        voteArray: [1,7],
        averageVote: 0
    }
]

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

app.patch('/games:id'), (req, res) => {
    const { id } = req.params;
    const newVote = req.body;
    games[id][voteArray].push(newVote);
    res.send(games[id][voteArray])
}

app.listen(3002, () => {
    console.log('Server listening at port localhost:3002');
});

