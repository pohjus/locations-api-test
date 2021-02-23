const express = require("express");
const locationrouter = express.Router();
const { body, validationResult } = require("express-validator");

const app = express();

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

locationrouter.post(
  "/",
  body("latitude").isFloat({ min: -90.0, max: 90.0 }),
  body("longitude").isFloat({ min: -180.0, max: 180.0 }),
  (req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let location = database.save(req.body);
    let fullUrl =
      req.protocol + "://" + req.get("host") + req.originalUrl + location.id;
    res.location(fullUrl).status(201).json(location);
  }
);

module.exports = locationrouter;
