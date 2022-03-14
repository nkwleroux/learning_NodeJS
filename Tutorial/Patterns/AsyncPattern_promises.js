const { readFile, writeFile } = require("fs");
const util = require("util");
const readfilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile);

// const getText = (path) => {
//   return new Promise((resolve, reject) => {
//     readFile(path, "utf-8", (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };

// getText("./Built-In_modules/content/first.txt")
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

const start = async () => {
  try {
    const first = await readfilePromise(
      "./Built-In_modules/content/first.txt",
      "utf-8"
    );
    const second = await readfilePromise(
      "./Built-In_modules/content/second.txt",
      "utf-8"
    );
    await writeFilePromise(
      "./Built-In_modules/content/test.txt",
      `data: ${first} ${second}`
    );
    // const second = await getText("./Built-In_modules/content/second.txt");

    console.log(first, second);
  } catch (error) {
    console.log(error);
  }
};

start();
