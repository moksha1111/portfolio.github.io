var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: false
  }
});

module.exports = mongoose.model('Users', usersSchema, 'Users')
