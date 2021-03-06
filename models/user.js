const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Invalid Email'],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true,
  },
});
const User = mongoose.model('Usermodel', UserSchema);
const getUserById = (id, callback) => {
  User.findById(id, callback);
};
const getUserByEmail = (email, callback) => {
  const query = { email };
  User.findOne(query, callback);
};

const addUser = (newUser, callback) => {
  const user = Object.assign(newUser);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (error, hash) => {
      if (error) throw error;
      user.password = hash;
      user.save(callback);
    });
  });
};

const comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};


module.exports = {
  User,
  getUserById,
  getUserByEmail,
  addUser,
  comparePassword,
};
