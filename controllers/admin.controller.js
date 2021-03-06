"use strict";
var User = require("../models/user.model");
var Book = require("../models/book.model");
var Magazine = require("../models/magazine.model");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../services/jwt");

function saveUser(req, res) {
  var user = new User();
  var params = req.body;

  if (params.carnetCui && params.name && params.lastname && params.password) {
    User.findOne({ $or: [{ username: params.carnetCui }] }, (err, userFind) => {
      if (err) {
        res.status(500).send({ message: "Error general, intentelo mas tarde" });
      } else if (userFind) {
        res.send({ message: "usuario o correo ya utilizado" });
      } else {
        user.carnetCui = params.carnetCui;
        user.name = params.name;
        user.lastname = params.lastname;
        user.role = "USER";

        bcrypt.hash(params.password, null, null, (err, passwordHash) => {
          if (err) {
            res.status(500).send({ message: "Error al encriptar contraseña" });
          } else if (passwordHash) {
            user.password = passwordHash;

            user.save((err, userSaved) => {
              if (err) {
                res
                  .status(500)
                  .send({ message: "Error general al guardar usuario" });
              } else if (userSaved) {
                res.send({ user: userSaved });
              } else {
                res.status(404).send({ message: "Usuario no guardado" });
              }
            });
          } else {
            res.status(418).send({ message: "Error inesperado" });
          }
        });
      }
    });
  } else {
    res.send({ message: "Ingresa todos los datos" });
  }
}

function listUsers(req, res) {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send({ message: "Error general" });
    } else if (users) {
      res.send({ data: users });
    } else {
      res.status(418).send({ message: "No hay registros" });
    }
  });
}

function searchUser(req, res) {
  var params = req.body;

  if (params.search) {
    User.find({ $or: [{ carnetCui: params.search }] }, (err, userFind) => {
      if (err) {
        res.status(500).send({ message: "Error general" });
      } else if (userFind) {
        res.send({ user: userFind });
      } else {
        res.status(418).send({ message: "Sin registros" });
      }
    }).populate("books", "users", "magazines");
  } else {
    res.send({ message: "Ingrese el campo de busqueda" });
  }
}

function updateUser(req, res) {
  var userId = req.params.id;
  var update = req.body;

  User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
    if (err) {
      res.status(500).send({ message: "Error general al actualizar" });
    } else if (userUpdated) {
      res.send({ user: true });
    } else {
      res.status(404).send({ message: "No se ha podido actualizar" });
    }
  });
}

function removeUser(req, res) {
  var userId = req.params.id;

  User.findByIdAndRemove(userId, (err, userRemoved) => {
    if (err) {
      res.status(500).send({ message: "Error general al actualizar" });
    } else if (userRemoved) {
      res.send({
        message: "Se ha eliminado al siguiente usuario: ",
        user: true,
      });
    } else {
      res.status(404).send({ message: "No se ha podido eliminar" });
    }
  });
}

function saveBook(req, res) {
  var params = req.body;
  var book = new Book();

  if (
    params.author &&
    params.title &&
    params.edition &&
    params.keyWords &&
    params.description &&
    params.themes &&
    params.copies &&
    params.avaible
  ) {
    book.author = params.author;
    book.title = params.title;
    book.edition = params.edition;
    book.keyWords = params.keyWords;
    book.description = params.description;
    book.themes = params.themes;
    book.copies = params.copies;
    book.avaible = params.avaible;

    book.save((err, bookSaved) => {
      if (err) {
        res.status(500).send({ message: "Error general" });
      } else if (bookSaved) {
        res.send({ book: bookSaved });
      } else {
        res.status(418).send({ message: "Error al guardar" });
      }
    });
  } else {
    res.send({ message: "Ingrese todos los datos" });
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

function searchBook(req, res) {
  var params = req.body;

  if (params.search) {
    Book.find(
      {
        $or: [
          { author: params.search },
          { title: params.search },
          { edition: params.search },
        ],
      },
      (err, bookFind) => {
        if (err) {
          res.status(500).send({ message: "Error general" });
        } else if (bookFind) {
          res.send({ book: bookFind });
        } else {
          res.status(200).send({ message: "Sin registros" });
        }
      }
    );
  } else {
    res.status(200).send({ message: "Ingrese datos en la busqueda" });
  }
}

function updateBook(req, res) {
  var update = req.body;
  var bookId = req.params.id;

  Book.findByIdAndUpdate(bookId, update, { new: true }, (err, bookUpdated) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Error general al actualizar" });
    } else if (bookUpdated) {
      res.send({ book: true });
    } else {
      res.status(404).send({ message: "No se ha podido actualizar" });
    }
  });
}

function removeBook(req, res) {
  var bookId = req.params.id;

  Book.findByIdAndRemove(bookId, (err, bookRemoved) => {
    if (err) {
      res.status(500).send({ message: "Error general al actualizar" });
    } else if (bookRemoved) {
      res.send({
        book: true,
      });
    } else {
      res.status(404).send({ message: "No se ha podido eliminar" });
    }
  });
}

function saveMagazine(req, res) {
  var params = req.body;
  var magazine = new Magazine();

  if (
    params.author &&
    params.title &&
    params.edition &&
    params.keyWords &&
    params.description &&
    params.themes &&
    params.copies &&
    params.avaible &&
    params.actualFrecuency &&
    params.published
  ) {
    magazine.author = params.author;
    magazine.title = params.title;
    magazine.edition = params.edition;
    magazine.keyWords = params.keyWords;
    magazine.description = params.description;
    magazine.themes = params.themes;
    magazine.copies = params.copies;
    magazine.avaible = params.avaible;
    magazine.actualFrecuency = params.actualFrecuency;
    magazine.published = params.published;

    magazine.save((err, magazineSaved) => {
      if (err) {
        res.status(500).send({ message: "Error general" });
      } else if (magazineSaved) {
        res.send({ magazine: magazineSaved });
      } else {
        res.status(418).send({ message: "Error al guardar" });
      }
    });
  } else {
    res.send({ message: "Ingrese todos los datos" });
  }
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

function searchMagazine(req, res) {
  var params = req.body;

  if (params.search) {
    Book.find(
      {
        $or: [
          { author: params.search },
          { title: params.search },
          { edition: params.search },
        ],
      },
      (err, magazineFind) => {
        if (err) {
          res.status(500).send({ message: "Error general" });
        } else if (magazineFind) {
          res.send({ magazine: magazineFind });
        } else {
          res.status(200).send({ message: "Sin registros" });
        }
      }
    );
  } else {
    res.status(200).send({ message: "Ingrese datos en la busqueda" });
  }
}

function updateMagazine(req, res) {
  var update = req.body;
  var magazineId = req.params.id;

  Magazine.findByIdAndUpdate(
    magazineId,
    update,
    { new: true },
    (err, MagazineUpdated) => {
      if (err) {
        res.status(500).send({ message: "Error general al actualizar" });
      } else if (MagazineUpdated) {
        res.send({ magazine: true });
      } else {
        res.status(404).send({ message: "No se ha podido actualizar" });
      }
    }
  );
}

function removeMagazine(req, res) {
  var magazineId = req.params.id;

  Magazine.findByIdAndRemove(magazineId, (err, magazineRemoved) => {
    if (err) {
      res.status(500).send({ message: "Error general al actualizar" });
    } else if (magazineRemoved) {
      res.send({
        magazine: true,
      });
    } else {
      res.status(404).send({ message: "No se ha podido eliminar" });
    }
  });
}

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
                      user: check.role,
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

function saveAdmin(req, res) {
  var user = new User();

  User.findOne({ $or: [{ username: user.carnetCui }] }, (err, userFind) => {
    if (err) {
      console.log(err);
    } else if (userFind) {
      console.log("ADMIN ya creado");
    } else {
      user.carnetCui = "ADMIN";
      user.name = "ADMIN";
      user.lastname = "ADMIN";
      user.role = "ADMIN";

      bcrypt.hash(
        (user.password = "ADMIN"),
        null,
        null,
        (err, passwordHash) => {
          if (err) {
            res.status(500).send({ message: "Error al encriptar contraseña" });
          } else if (passwordHash) {
            user.password = passwordHash;

            user.save((err, userSaved) => {
              if (err) {
                return handleError(err);
              }
              if (userSaved) {
                console.log("ADMIN creado exitosamente");
              }
            });
          } else {
            res.status(418).send({ message: "Error inesperado" });
          }
        }
      );
    }
  });
}

module.exports = {
  saveBook,
  saveMagazine,
  saveUser,
  listBooks,
  listMagazines,
  listUsers,
  searchBook,
  searchMagazine,
  searchUser,
  updateUser,
  updateBook,
  updateMagazine,
  removeUser,
  removeBook,
  removeMagazine,
  login,
  saveAdmin,
};
