require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const port = 8000;

const prismicH = require('@prismicio/helpers');
const { client } = require('./prismic.configuration');

app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
  };
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('pages/home');
});
app.get('/about', (req, res) => {
  res.render('pages/about');
});
app.get('/detail/:id', (req, res) => {
  res.render('pages/detail');
});
app.get('/collections', (req, res) => {
  res.render('pages/collections');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
