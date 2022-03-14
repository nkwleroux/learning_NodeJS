//create test file
// const { readFileSync,writeFileSync } = require("fs");
// for (let i = 0; i < 100; i++) {
//   writeFileSync("./Built-In_modules/content/big.txt", `hello world ${i}\n`, { flag: "a" });
// }

const { createReadStream } = require("fs");

const stream = createReadStream("./Built-In_modules/content/big.txt", {
  highWaterMark: 90000,
  encoding: 'utf-8'
});

stream.on("data", (result, err) => {
  console.log(result);
  console.log(err)
});

