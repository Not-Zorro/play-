require('dotenv').config()
const express = require("express"); const app = express();
const path = require('path'); app.use(express.static(path.join(__dirname, 'public')));

const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const database = require("knex")(config)

const bodyParser = require("body-parser");
app.use(bodyParser.json()); app.use(bodyParser.urlencoded({extended: true}));

var indexRouter = require('./routes/index');

app.use('/', indexRouter);

app.set("port", process.env.PORT || 3000);
app.listen(app.get('port')); console.log(`Running on port ${app.get('port')}`);

module.exports = app;
