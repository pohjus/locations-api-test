const express = require("express");
const locationrouter = express.Router();
const mung = require("express-mung");

let database = [
  { id: 1, latitude: 60, longitude: 70 },
  { id: 2, latitude: 40, longitude: 80 },
];

const app = express();
app.use(express.static("public"));

app.use(
  mung.json(function transform(body, req, res) {
    const str = JSON.stringify(body, null, 2);
    return str;
  })
);

app.use("/api/locations", locationrouter);

locationrouter.get("/", function (req, res) {
  res.json(database);
});

locationrouter.get("/1", function (req, res) {
  res.json(database[0]);
});

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(`Demo app listening at http://localhost:${port}/api/locations`);
});
