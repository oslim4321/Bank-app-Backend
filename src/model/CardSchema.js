const mongoose = require('mongoose');


const cardSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cardNumber: {
    type: String,
    required: true,
    unique: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  securityCode: {
    type: String,
    required: true
  }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card

