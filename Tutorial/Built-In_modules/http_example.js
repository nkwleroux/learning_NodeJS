const http = require("http");
const fs = require("fs");
const filePath = "./Built-In_modules/content/big.txt";

http
  .createServer(function (req, res) {
    //Wrong way of doing this
    // const text = fs.readFileSync(filePath,'utf-8')
    // res.end(text)

    console.log(filePath);
    //correct way
    const fileStream = fs.createReadStream(filePath, "utf-8");
    fileStream.on("open", () => {
      fileStream.pipe(res);
    });
    fileStream.on("error", (err) => {
      res.end(err);
    });
  })
  .listen(5000);
