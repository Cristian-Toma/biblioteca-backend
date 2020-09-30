'use strict'

const jwt = require("jwt-simple");
const moment = require("moment");
const key =  'RrJm789lp?¿Q@e';

exports.createToken = (user) => {
  const payload = {
    sub: user._id,
    name: user.name,
    username: user.username,
    role: user.role,
    lat: moment().unix(),
    exp: moment().add(10 , 'hours').unix(),
  };
  return jwt.encode(payload, key);
};