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

//Mongoose schema for pokemon data with fields for name and imageURL
const genSchema = new Schema({
  name: String,
  imageURL: String,
});

const Gen1 = mongoose.model('Gen1', genSchema);

module.exports = {
  Gen1,
};
