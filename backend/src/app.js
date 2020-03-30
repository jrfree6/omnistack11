/**
 * Autor: Jurandir
 */

 /**
  * driver: sql puro : select * from table
  * query builder: construida : table('users').select('*').where('')
  */
 

const express = require("express");
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

// app.listen(3333);

module.exports = app;

