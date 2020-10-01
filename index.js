"use strict";

var mongoose = require("mongoose");
var port = 3800;
var app = require("./app");
var mongodb = require("mongodb");

var Admin = require("./controllers/admin.controller");

mongodb.Promise = global.Promise;
mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost:27017/Bibliotec", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("conexion a la base de datos correcta");

    app.listen(port, () => {
      console.log("servidor express corriendo");
    });
  })
  .catch((err) => {
    console.log("Error al conectarse", err);
  });

Admin.saveAdmin();
