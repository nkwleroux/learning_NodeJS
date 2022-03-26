const express = require("express");
const path = require("path");
const app = express();

//setup static and middleware
//Removes the step of individually importing all files.
app.use(express.static("./public"));

//Not necessary
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./navbar-app/indext.html"));
  res.status(200).send("Home page");
});

app.get("/about", (req, res) => {
  res.status(200).send("About page");
});

app.all("*", (req, res) => {
  res.status(404).send("<h1> Resource not found </h1>");
});

app.listen(5000, () => {
  console.log("server is listening to port 5000");
});
