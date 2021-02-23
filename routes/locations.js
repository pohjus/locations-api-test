const express = require("express");
const locationrouter = express.Router();

let database = [
  { id: 1, latitude: 60, longitude: 70 },
  { id: 2, latitude: 40, longitude: 80 },
];

locationrouter.get("/", function (req, res) {
  res.json(database);
});

locationrouter.get("/1", function (req, res) {
  res.json(database[0]);
});

module.exports = locationrouter;
