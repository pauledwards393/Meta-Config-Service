
// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');

// Express
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
require("./routes")(app);

// Start server
app.listen(config.port);