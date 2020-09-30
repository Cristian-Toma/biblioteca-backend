"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var userRoutes = require("./routes/user.routes");
var adminRoutes = require("./routes/admin.routes");
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

module.exports = app;
