"use strict";

var User = require("../models/user.model");
var Magazine = require("../models/magazine.model");
var Book = require("../models/book.model");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../services/jwt");

function login(req, res) {
  var params = req.body;

  if (params.carnetCui || params.name) {
    if (params.password) {
      User.findOne(
        { $or: [{ carnetCui: params.carnetCui }, { name: params.name }] },
        (err, check) => {
          if (err) {
            res.status(500).send({ message: "Error general" });
          } else if (check) {
            bcrypt.compare(
              params.password,
              check.password,
              (err, passworOk) => {
                if (err) {
                  res.status(500).send({ message: "Error al comparar" });
                } else if (passworOk) {
                  if (params.gettoken == "true") {
                    res.send({
                      token: jwt.createToken(check),
                      user: {
                        role: check.role,
                        name: check.name,
                      },
                    });
                  } else {
                    res.send({
                      message: "Error en el servidor al generar autenticación",
                    });
                  }
                } else {
                  res.send({ message: "Contraseña incorrecta" });
                }
              }
            );
          } else {
            res.send({ message: "Datos de usuario incorrectos" });
          }
        }
      );
    } else {
      res.send({ message: "Ingresa tu contraseña" });
    }
  } else {
    res.send({ message: "Ingresa tu nombre carnet o CUI" });
  }
}

function listBooks(req, res) {
  Book.find({}, (err, books) => {
    if (err) {
      res.status(500).send({ message: "Error general" });
    } else if (books) {
      res.send({ data: books });
    } else {
      res.status(418).send({ message: "No hay registros" });
    }
  });
}

function listBooks(req, res) {
  Book.find({}, (err, books) => {
    if (err) {
      res.status(500).send({ message: "Error general" });
    } else if (books) {
      res.send({ data: books });
    } else {
      res.status(418).send({ message: "No hay registros" });
    }
  });
}

function listMagazines(req, res) {
  Magazine.find({}, (err, magazines) => {
    if (err) {
      res.status(500).send({ message: "Error general" });
    } else if (magazines) {
      res.send({ data: magazines });
    } else {
      res.status(418).send({ message: "No hay registros" });
    }
  });
}

module.exports = {
  login,
  listBooks,
  listMagazines,
};
