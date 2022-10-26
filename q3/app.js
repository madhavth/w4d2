const express = require('express');

const app = express();
const path = require('path');
const url = require('url');
const Item = require('./data/item');
const items = require('./data/list_items');
const cartDetails = require('./util/helper');



const session = require('express-session');
const { parentPort } = require('worker_threads');

app.use(express.json());

app.use(express.urlencoded({ extended: false }));


app.use(express.static(`${__dirname}`));
app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(`${__dirname}`, 'views', 'css')));
app.use('/js', express.static(path.join(__dirname, 'views', 'js')));

app.use(session({
    secret: 'my secret value',
    resave: true,
    saveUninitialized: true
}));


app.use((req, res, next) => {

    if (!req.session.cart) {
        req.session.cart = new Map();
    }

    const { numOfItems, totalPrice } = cartDetails(req);

    res.locals.no_of_items = numOfItems;
    res.locals.total = totalPrice;

    next();
});


app.set('view engine', 'ejs');
app.set('views', path.join(`${__dirname}`, 'views'));


app.get('/', (req, res) => {
    res.render('shop', {
        'products': items
    });
});


app.post('/addToCart', (req, res) => {

    if (req.session.cart[req.body.name]) {
        req.session.cart[req.body.name].quantity += 1;
    } else {
        req.session.cart[req.body.name] = {
            quantity: 1,
            price: req.body.price,
        };
    }

    const { numOfItems, totalPrice } = cartDetails(req);

    res.status(200).send({
        num_of_items: numOfItems
    });
});


app.get('/cart', (req, res) => {
    res.render('cart', {
        items: req.session.cart,
    });
});


app.listen(3000);