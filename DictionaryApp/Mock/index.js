// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB1gFGIvjbUrjS97OVtGSWzXtIogQ8GwHc",
//   authDomain: "dictionaryappjs.firebaseapp.com",
//   projectId: "dictionaryappjs",
//   storageBucket: "dictionaryappjs.appspot.com",
//   messagingSenderId: "272811608982",
//   appId: "1:272811608982:web:6ffa0109ff5be11481abb7",
//   measurementId: "G-5F6LKMDWQH"
// };

// // Initialize Firebase
// const firebaseapp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseapp);

//app backend
//Doesn't work
const express = require("express");
const path = require("path");
const app = express();

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
  res.status(404).send("<h1>Page not found</h1>");
});

app.listen(5000, () => {
  console.log("server is listening to port 5000");
});
