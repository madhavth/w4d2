const express = require('express');

const app = express();
const path = require('path');
const url = require('url');
const Item = require('./data/item');
const items = require('./data/list_items');




const session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const itemsMap = items.reduce((map, obj)=> {
    map[obj.name] = obj;
    return map;
}, new Map());


function addItemToCart(item,cart) {
    if(!cart[item.name]) {
        cart[item.name] = item;
    }

    cart[item.name].quantity += 1;
}


function getTotal(cart) {
    let total = 0;
    for(let key in cart) {
        const item = cart[key];
        total += item.quantity * item.price;
    }
    return total;
}


app.use(express.static(`${__dirname}`));
app.use(express.urlencoded({extended: true}));
app.use('/css', express.static(path.join(`${__dirname}`, 'views', 'css')));
app.use('/js',express.static(path.join(__dirname, 'views', 'js')));

app.use(session({
    secret: 'my secret value',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(`${__dirname}`, 'views'));

app.get('/', (req, res) => {
    res.render('shop', {
       'products': items 
    });
});

app.post('/addToCart', (req,res)=> {
    const name = req.body.name;
    
    if(!req.session.cart) {
        req.session.cart = {};
    }

    addItemToCart(itemsMap[name], req.session.cart);
    
    let count = 0;
    for(let i in itemsMap) {
        if(itemsMap[i].quantity !== 0) {
            count++;
        }
    }

    console.log(count);
    // res.send(`${count}`);
    res.send({
        no_of_items: count
    });
});

app.get('/cart', (req, res)=> {
    res.render('cart', {
        items: req.session.cart,
        total: getTotal(req.session.cart)
    });
});


app.listen(3000);