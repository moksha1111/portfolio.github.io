var mongoose = require('mongoose');
var logger = require('../controllers/logger');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function(){
  logger.info('Connected');
});

// Models

require("../models/Category");
require("../models/Drug");
require("../models/Crew");
require("../models/Session");
