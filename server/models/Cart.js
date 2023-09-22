var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
  email: {
    type: String,
    typo: "This field is required."
  },
  product: {
    type: String,
    typo: "This field is required."
  },
  productQuantity: {
    type: Number,
    typo: "This field is required."
  },
});

module.exports = mongoose.model('Cart', cartSchema, 'Cart')

