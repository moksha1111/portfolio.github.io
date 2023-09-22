var express = require("express");
var expressLayouts = require("express-ejs-layouts");
var cookieParser = require('cookie-parser');
var logger = require('./server/controllers/logger');

var app = express();
var port = process.env.PORT || 3333;

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/views');

app.use(expressLayouts);
app.set('layout', '../layouts/main');

var routes = require('./server/routes/routes.js');
app.use("/", routes);

app.listen(port, () => logger.info(`Listening on port ${port}`));
