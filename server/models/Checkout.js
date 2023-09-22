var mongoose = require('mongoose');

var checkoutSchema = new mongoose.Schema({
  fullName: {
    type: String,
    typo: "This field is required."
  },
  phoneNumber: {
    type: Number,
    typo: "This field is required."
  },
  streetAddress: {
    type: String,
    typo: "This field is required."
  },
  buildingOrFloor: {
    type: String,
    typo: "This field is required."
  },
  paymentMethod: {
    type: String,
    typo: "This field is required."
  },
  comment: {
    type: String,
    typo: "This field is required."
  },
  email: {
    type: String,
    typo: "This field is required."
  },
  productDetail: {
    type: Array,
    typo: "This field is required."
  }
});

module.exports = mongoose.model('Checkout', checkoutSchema, 'Checkout')

