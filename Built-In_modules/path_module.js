const path = require("path");

console.log(path.sep);

const filePath = path.join("/content", "test.txt");
console.log(filePath);

const baseName = path.basename(filePath);
console.log(baseName);

//absolute path
const absolutePath = path.resolve(__dirname, "content", "test.txt");
console.log(absolutePath);
