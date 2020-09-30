'use strict'

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const UserSchema = Schema({
    carnetCui : String,
    name : String,
    lastname : String,
    password : String,
    role: String,
    users : [{ type: Schema.Types.ObjectId, ref: 'user'}],
    books : [{ type: Schema.Types.ObjectId, ref: 'book'}],
    magazines : [{ type: Schema.Types.ObjectId, ref: 'magazine'}]
});


module.exports = Mongoose.model('user',UserSchema);