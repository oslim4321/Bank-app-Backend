const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId, // user id would be here'
      ref: 'User',  // pointing at user model
      required: true
    },
    accountNumber: { // we would create account number for the user when he successgully bcreate an account
      type: Number, 
      required: true,
      unique: true
    },
    // accountType: {
    //   type: String,
    //   required: true,
    //   enum: ['checking', 'savings']
      
    // },
    balance: {
      type: Number,
      default: 0
    }
  });

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
  