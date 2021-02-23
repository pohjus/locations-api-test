const express = require("express");
const locationrouter = express.Router();
const { body, validationResult } = require("express-validator");

const app = express();

const database = require("../database/crudrepository.js");

locationrouter.get("/", async (req, res) => {
  let locations = await database.findAll();
  res.send(locations);
});

locationrouter.get("/:id([0-9]+)", async (req, res) => {
  let location = await database.findById(Number(req.params.id));
  if (location) {
    res.json(location);
  } else {
    res.status(404).send();
  }
});

locationrouter.delete("/:id([0-9]+)", async (req, res) => {
  let result = await database.deleteById(req.params.id);
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
  async (req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let location = await database.save(req.body);
    let fullUrl =
      req.protocol + "://" + req.get("host") + req.originalUrl + location.id;
    res.location(fullUrl).status(201).json(location);
  }
);

locationrouter.put(
  "/:id([0-9]+)",
  body("latitude").isFloat({ min: -90.0, max: 90.0 }),
  body("longitude").isFloat({ min: -180.0, max: 180.0 }),
  async (req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let statusCode = await database.updateOrCreate(
      req.body,
      Number(req.params.id)
    );
    res.status(statusCode).end();
  }
);

locationrouter.patch(
  "/:id([0-9]+)",
  body("latitude").isFloat({ min: -90.0, max: 90.0 }).optional(),
  body("longitude").isFloat({ min: -180.0, max: 180.0 }).optional(),
  async (req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let statusCode = await database.update(req.body, Number(req.params.id));
    res.status(statusCode).end();
  }
);

module.exports = locationrouter;
