const http = require('http');
const { readFileSync } = require("fs");

const homePage = readFileSync("./frontPage.html");
const homeStyles = readFileSync("./style.css");
const homeLogic = readFileSync("./api.js");

const server = http.createServer((req, res) => {
  const url = req.url;

  console.log(url);
  //home page
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homePage);
    res.end();
  } 
  //style
  else if (url === "/style.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(homeStyles);
    res.end();
  }
  //logic
  else if (url === "/api.js") {
    res.writeHead(200, { "content-type": "text/javascript" });
    res.write(homeLogic);
    res.end();
  } 
  //page not found
  else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>Page not found</h1>");
    res.end();
  }
});

server.listen(5000);
