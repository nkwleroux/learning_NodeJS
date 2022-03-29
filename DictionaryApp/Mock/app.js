const express = require("express");
const path = require("path");
const app = express();
// var json2xls = require("json2xls");

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(json2xls.middleware);

var jsonParser = express.json();

app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./public/frontPage.html"));
});

app.post("/download", jsonParser, (req, res) => {
  console.log(req.body);
  // console.log(req.body.word);
  res.status(200).send(`${req.body.jsonData}`);
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Page not found</h1>");
});

app.listen(5000, () => {
  console.log("server is listening to port 5000");
});
