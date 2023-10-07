const mongoose = require('mongoose');
require('dotenv').config();

const mongoString = process.env.DATABASE_URL;

const { MongoClient, ServerApiVersion } = require('mongodb');
//Put custom uri info here
const uri = mongoString;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
    name: String,
    imageURL: String
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;