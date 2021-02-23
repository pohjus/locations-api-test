const express = require("express");
const mung = require("express-mung");

const locationrouter = require("./routes/locations.js");

const app = express();

app.use(express.static("public"));

app.use(express.json());

const validate = (loc) => {
  if (!loc) return false;
  if (!loc.hasOwnProperty("latitude") || !loc.hasOwnProperty("longitude"))
    return false;

  if (isNaN(Number(loc.latitude)) || isNaN(Number(loc.longitude))) return false;

  return (
    loc.latitude >= -90 &&
    loc.latitude <= 90 &&
    loc.longitude >= -180 &&
    loc.longitude <= 180
  );
};

/*
app.use((req, res, next) => {
  if (req.method === "POST") {
    let location = req.body;
    if (!validate(location)) {
      res.status(400).end();
    } else {
      next();
    }
  } else {
    next();
  }
});
*/

app.use(
  mung.json((body, req, res) => {
    return JSON.stringify(body, null, 2);
  })
);

app.use(
  mung.headers((req, res) => {
    res.contentType("application/json");
  })
);

app.use("/api/locations", locationrouter);

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(`Demo app listening at http://localhost:${port}/api/locations`);
});
