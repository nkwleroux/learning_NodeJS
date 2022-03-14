const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("welcome");
  } else if (req.url === "/about") {
    res.end("About page");
  } else {
      //Bad practice
    res.end(`
        <h1>Oops!</h1>
        <p>Page not found</p>
        <a href="/">back home</a>
        `);
  }
});

server.listen(5000);
