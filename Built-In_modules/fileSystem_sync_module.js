// creates 2 variables that imports fs
const { readFileSync, writeFileSync } = require("fs");

const first = readFileSync("./content/first.txt", "utf-8");
const second = readFileSync("./content/second.txt", "utf-8");

// flag: "a" appends the data to the file without overwritting it. 
writeFileSync(
  "./content/result-sync.txt",
  `Template string ${first} and ${second}`,
  { flag: "a" }
);
