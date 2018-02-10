const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/footballhippie');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    
    title: String,
    excerpt: String,
    story: String,
    articleImage: String,
    
});

const articleData = mongoose.model("article", articleSchema);

module.exports = articleData