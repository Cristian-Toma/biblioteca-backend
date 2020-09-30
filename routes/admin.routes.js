"use strict";

var express = require("express");
var adminController = require("../controllers/admin.controller");
var api = express.Router();
var mdAuth = require("../middlewares/authenticated");

api.post("/login", adminController.login);
api.post("/saveUser", adminController.saveUser);
api.get("/searchUser", mdAuth.ensureAuthAdmin, adminController.searchUser);
api.get("/listUsers", mdAuth.ensureAuthAdmin, adminController.listUsers);
api.put("/updateUser/:id", mdAuth.ensureAuthAdmin, adminController.updateUser);
api.delete(
  "/removeUser/:id",
  mdAuth.ensureAuthAdmin,
  adminController.removeUser
);
api.post("/saveBook", mdAuth.ensureAuthAdmin, adminController.saveBook);
api.get("/searchBook", mdAuth.ensureAuthAdmin, adminController.searchBook);
api.get("/listBook", mdAuth.ensureAuthAdmin, adminController.listBooks);
api.put("/updateBook/:id", mdAuth.ensureAuthAdmin, adminController.updateBook);
api.delete(
  "/removeBook/:id",
  mdAuth.ensureAuthAdmin,
  adminController.removeBook
);
api.post("/saveMagazine", mdAuth.ensureAuthAdmin, adminController.saveMagazine);
api.get(
  "/searchMagazine",
  mdAuth.ensureAuthAdmin,
  adminController.searchMagazine
);
api.get("/listMagazine", mdAuth.ensureAuthAdmin, adminController.listMagazines);
api.put(
  "/updateMagazine/:id",
  mdAuth.ensureAuthAdmin,
  adminController.updateMagazine
);
api.delete(
  "/removeMagazine/:id",
  mdAuth.ensureAuthAdmin,
  adminController.removeMagazine
);

module.exports = api;