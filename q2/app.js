const express = require('express');
const get8BallResponse = require('./data/response_8_ball');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/js', express.static(path.join(__dirname, 'views', 'js')));

app.get('/8ball', (req, res)=> {
    res.send({
        'my_response': get8BallResponse()
    });
});

app.get('/', (req, res) => {
    res.render('form');
});


app.listen(3000);