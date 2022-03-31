const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

const { writeFile } = require("fs");
const util = require("util");
const writeFilePromise = util.promisify(writeFile);

var json2xls = require("json2xls");

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(json2xls.middleware);

var jsonParser = express.json();

const filePath = path.resolve(__dirname, "./data/searchHistory.xlsx");
let tempData;

app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./public/index.html"));
});

app.post("/download", jsonParser, async (req, res) => {
  let data = JSON.stringify(req.body.data);
  tempData = req.body.data;

  await writeFilePromise(
    path.resolve(__dirname, "./data/searchHistory.json"),
    `${data}`,
    "utf-8"
  );

  var xls = json2xls(tempData);

  //not exactly what I want. Still need to optimalise and add error handling
  //The "then" argument is a function that is called when the promise is resolved.
  //Just that its not used correctly.
  await writeFilePromise(filePath, xls, "binary")
    .then(() => {
      res.status(200).send(`${data}`);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error");
    });
});

//!BUG - Phonetics column doesnt appear in excel sheet when = "" or undefined.
app.get("/download", async (req, res) => {
  res.status(200).xls("data.xlsx", tempData);
});

app.all("*", (req, res) => {
  res.status(404).sendFile(path.resolve(__dirname, "./public/404.html"));
});

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});
