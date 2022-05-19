const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const gameInfoSchema = new mongoose.Schema({
  totalScore: {
    type: Number,
    required: false,
    default: 0
  },
  totalGames: {
    type: Number,
    required: false,
    default: 0
  },
  totalWins: {
    type: Number,
    required: false,
    default: 0
  },
  totalLosses: {
    type: Number,
    required: false,
    default: 0
  },
  totalDraws: {
    type: Number,
    required: false,
    default: 0
  }
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    lowercase: true,
    maxLength: [20, 'Username can only be up to 20 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'password required'],
    minlength: [5, 'Password must be at least 5 characters'],
  },
  gameInfo: {
    type: gameInfoSchema,
    required: false,
    default: () => ({})
  }
});

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);  
    next();
})

userSchema.plugin(uniqueValidator);

const User = mongoose.model('user', userSchema);

module.exports = { User };
