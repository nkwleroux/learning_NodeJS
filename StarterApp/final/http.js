//HTTP tutorial

const http = require("http");
const { readFileSync } = require("fs");

//get files
//const homePage = readFileSync('./homepage.html')
const homePage = readFileSync("./navbar-app/index.html");
const homeStyles = readFileSync("./navbar-app/styles.css");
const homeLogo = readFileSync("./navbar-app/logo.svg");
const homeLogic = readFileSync("./navbar-app/browser-app.js");

//poorly written (not scaleable)
const server = http
  .createServer((req, res) => {
    const url = req.url;

    console.log(url);
    //home page
    if (url === "/") {
      //"text/html" for html input
      //"text/plain" for text input
      res.writeHead(200, { "content-type": "text/html" }); //https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      res.write(homePage);
      res.end();
    }
    //about page
    else if (url === "/about") {
      res.writeHead(200, { "content-type": "text/html" });
      res.write("<h1>About page</h1>");
      res.end();
    }
    //styles
    //"text/css" for css files
    else if (url === "/styles.css") {
      res.writeHead(200, { "content-type": "text/css" });
      res.write(homeStyles);
      res.end();
    }
    //Logo
    //"image/svg+xml" for images 
    else if (url === "/logo.svg") {
      res.writeHead(200, { "content-type": "image/svg+xml" });
      res.write(homeLogo);
      res.end();
    }
    //logic
    //"text/javascript" for other java script files
    else if (url === "/browser-app.js") {
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
  })
  .listen(5000); //port
