const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/static', express.static(path.join(__dirname, 'node_modules')));

app.use(express.urlencoded({ extended: true }));

const products = ['banana', 'cebollas', 'lechuga', 'tomate', 'papas', 'pimenton'];
let cart = [];

// Ruta raíz
app.get('/', (req, res) => {
  res.render('home', { products, cart });
});

app.post('/add-to-cart', (req, res) => {
  const { product } = req.body;
  cart.push(product);
  res.redirect('/');
});

app.post('/clear-cart', (req, res) => {
  cart = [];
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
