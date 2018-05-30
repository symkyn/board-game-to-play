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
        designer: 'Martin Walace'
    },
    {
        title: 'Lignum',
        minPlayerCount: 2,
        maxPlayerCount: 4,
        minPlayTime: 60,
        maxPlayTime: 120,
        owner: 'symkyn',
        plays: 0,
        designer: 'Alexander Huemer'
    }
]

app.use(cors());
app.use(bodyParser.json());


app.get('/games', (req, res) => {
    const gameList = boardGames; 
    res.send(gameList);

});


app.listen(3002, () => {
    console.log('Server listening at port localhost:3002');
});