const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/footballhippie');

const Schema = mongoose.Schema;

const writerSchema = new Schema({
    username: String,
    password: String,
    email: String,
    firstname:String,
    lastname:String
});

const writerData = mongoose.model("writer", writerSchema);

module.exports = writerData;