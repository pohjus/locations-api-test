const express = require("express");

let database = [
  { id: 1, latitude: 60, longitude: 70 },
  { id: 2, latitude: 40, longitude: 80 },
];

const app = express();
app.use(express.static("public"));

const port = process.env.PORT || 8080;

app.get("/api/locations", function (req, res) {
  var str = JSON.stringify(database, null, 2); // spacing level = 2
  res.contentType("application/json");
  res.send(str);
});

const server = app.listen(port, () => {
  console.log(`Demo app listening at http://localhost:${port}`);
});
