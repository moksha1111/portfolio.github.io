var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  session: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Session', sessionSchema, 'Session')
