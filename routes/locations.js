const express = require("express");
const locationrouter = express.Router();

const database = require("../database/crudrepository.js");

locationrouter.get("/", function (req, res) {
  res.json(database.findAll());
});

locationrouter.get("/:id([0-9]+)", (req, res) => {
  let location = database.findById(Number(req.params.id));
  if (location) {
    res.json(location);
  } else {
    res.status(404).send();
  }
});

locationrouter.delete("/:id([0-9]+)", (req, res) => {
  let result = database.deleteById(req.params.id);
  if (result) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

locationrouter.post("/", (req, res) => {
  let location = database.save(req.body);
  let fullUrl =
    req.protocol + "://" + req.get("host") + req.originalUrl + location.id;
  res.location(fullUrl).status(201).json(location);
});

module.exports = locationrouter;
