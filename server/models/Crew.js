var mongoose = require('mongoose');

var crewSchema = new mongoose.Schema({
  name: {
    type: String,
    typo: "This field is required."
  },
  position: {
    type: String,
    typo: "This field is required."
  },
  brief: {
    type: String,
    typo: "This field is required."
  },
  information: {
    type: String,
    typo: "This field is required."
  },
  image: {
    type: String,
    typo: "This field is required."
  }
});


module.exports = mongoose.model('Crew', crewSchema, 'Crew')

