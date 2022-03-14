const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Home page");
  }else if (req.url === "/about") {
    res.write("about page");
    //blocking code
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 50; j++) {
      console.log(`${i} ${j}`);
      }
    }
  } else {
    res.end("Error page");
  }
});

server.listen(5000);
