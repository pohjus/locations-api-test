const express = require("express");
const mung = require("express-mung");

const locationrouter = require("./routes/locations.js");

const app = express();
app.use(express.static("public"));

app.use(express.json());

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
