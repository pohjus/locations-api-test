const express = require("express");
const locationrouter = express.Router();

const database = require("../database/crudrepository.js");

locationrouter.get("/", function (req, res) {
  res.json(database.findAll());
});

locationrouter.get("/:id([0-9]+)", function (req, res) {
  let location = database.findById(Number(req.params.id));
  if (location) {
    res.json(location);
  } else {
    res.status(404).send();
  }
});

locationrouter.delete("/:id([0-9]+)", function (req, res) {
  let result = database.deleteById(req.params.id);
  if (result) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = locationrouter;
