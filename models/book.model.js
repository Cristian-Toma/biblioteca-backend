'use strict'

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const BookSchema = Schema({
    author : String,
    title : String,
    edition : String,
    keyWords : String,
    description : String,
    themes : String,
    copies : String,
    avaible : String,
});


module.exports = Mongoose.model('book',BookSchema);