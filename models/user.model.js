"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const UserSchema = Schema({
  carnetCui: String,
  name: String,
  lastname: String,
  password: String,
  role: String,
});

module.exports = Mongoose.model("user", UserSchema);
