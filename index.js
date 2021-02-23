const express = require("express");

const app = express();
app.use(express.static("public"));

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
