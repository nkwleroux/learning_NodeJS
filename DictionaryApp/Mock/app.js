const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("./public"));

//Not necessary
app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./public/frontPage.html"));
  // res.status(200).send("Home page");
});

app.get("/about", (req, res) => {
  res.status(200).send("About page");
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Page not found</h1>");
});

app.listen(5000, () => {
  console.log("server is listening to port 5000");
});