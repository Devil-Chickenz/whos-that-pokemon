const mongoose = require('mongoose');
require('dotenv').config();

const mongoString = process.env.DATABASE_URL;

const { MongoClient, ServerApiVersion } = require('mongodb');
//Put custom uri info here
const uri = mongoString;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to User Database');
});

const Schema = mongoose.Schema;

//Mongoose schema for User data with fields for username and password
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  highScore: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
};
