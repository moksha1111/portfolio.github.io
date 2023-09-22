var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  name: {
    type: String,
    typo: "This field is required."
  },
  image: {
    type: String,
    typo: "This field is required."
  },
});

module.exports = mongoose.model('Category', categorySchema)

