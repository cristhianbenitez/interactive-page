/**
 * Module dependencies.
 */
require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const errorHandler = require('errorhandler');
const path = require('path');

const app = () => {
  // eslint-disable-next-line no-shadow
  const app = express();

  app.set('port', process.env.PORT || 8000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(errorHandler());

  return app;
};

module.exports = app;
