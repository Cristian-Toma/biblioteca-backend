"use strict";

var express = require("express");
var userController = require("../controllers/user.controller");
var api = express.Router();
var mdAuth = require("../middlewares/authenticated");

api.post("/login", userController.login);
api.post("/lisBook", userController.listBooks, mdAuth.ensureAuth);
api.post("/listMagazine", userController.listMagazines, mdAuth.ensureAuth);

module.exports = api;
