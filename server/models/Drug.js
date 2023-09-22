const { Int32, Long } = require('mongodb');
var mongoose = require('mongoose');

var drugSchema = new mongoose.Schema({
  name: {
    type: String,
    typo: "This field is required."
  },
  usage: {
    type: String,
    typo: "This field is required."
  },
  sideEffects: {
    type: Array,
    typo: "This field is required."
  },
  activeIngredients: {
    type: Array,
    typo: "This field is required."
  },
  price: {
    type: String,
    typo: "This field is required."
  },
  category: {
    type: String,
    enum: ["Proton Pump Inhibitor", "Analgesics", "Multivitamins", "Antibiotics", "Antipyretic", "Antifungals"],
    typo: "This field is required."
  },
  image: {
    type: String,
    typo: "This field is required."
  },
  quantity: {
    type: Number,
    typo: "This field is required."
  },
});

drugSchema.index({name: 'text', category: 'text'});

module.exports = mongoose.model('Drug', drugSchema)

