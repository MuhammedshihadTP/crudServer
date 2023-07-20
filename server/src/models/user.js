const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
   
  },
  password: {
    type: String,
   
  },
  image: {
    type: String,
  },
  address: {
    type: String,
  },
});

const user = mongoose.model('User', userSchema);

module.exports = user;