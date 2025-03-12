// const http = require("http");
// const fs = require("fs");
// const myServer = http.createServer((req, res) => {
//   const log = `${Date.now()}: New Request received`;
//   fs.appendFile("log.txt", log, (err, data) => {
//   res.end("Hello from server");
//   });
// });

// myServer.listen(8000, console.log("Server started"));

const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  // console.log(req.url);

  const log = `${Date.now()}: ${req.url} New Request received\n`;

  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
      res.end("Error logging request");
      return;
    }

    switch (req.url) {
      case "/":
        res.end("Home Page");
        break;
      case "/about":
        res.end("This is About Us");
        break;
      default:
        res.end("404 Not Found");
        break;
    }
  });
});

myServer.listen(8080, () => console.log("Server started on port 8080"));
