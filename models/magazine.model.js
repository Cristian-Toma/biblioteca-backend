'use strict'

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const MagazineSchema = Schema({
    author : String,
    title : String,
    edition : String,
    keyWords : String,
    description : String,
    themes : String,
    copies : String,
    avaible : String,
    actualFrecuency : String,
    published : String
});


module.exports = Mongoose.model('magazine',MagazineSchema);