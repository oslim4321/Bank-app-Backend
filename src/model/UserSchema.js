const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
      resident: {
        country: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        zip: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
  });


  userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    /* This <--- key word is pointing to the data of the user signing up */
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email }).select('token _id isAdmin password');
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user;
        }
        throw Error('Incorrect password')
    }
    throw Error('Incorrect Email')
}
   
  
const User = mongoose.model('User', userSchema);
module.exports = User;
  
  