const express = require("express");
const mung = require("express-mung");

const locationrouter = require("./routes/locations.js");

const app = express();
app.use(express.static("public"));

app.use(mung.json((body, req, res) => JSON.stringify(body, null, 2)));

app.use("/api/locations", locationrouter);

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(`Demo app listening at http://localhost:${port}/api/locations`);
});
