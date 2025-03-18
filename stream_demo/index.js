// YOUTUBE EXAMPLE.....
// file compressed


// const express = require("express");
// const app = express();
// const fs = require("fs");
// const status = require("express-status-monitor");
// const zlib = require("zlib");
// const port = 8000;

// app.use(status());

// // app.get("/", (req, res) => {
// //   fs.readFile("./sample.txt", (err, data) => {
// //     res.end(data);
// //   });
// // });

// // stream read (sample.txt) --> Zipper --> fs Write Stream
// fs.createReadStream("./sample.txt").pipe(
//   zlib.createGzip().pipe(fs.createWriteStream("./sample.zip"))
// );
// app.get("/", (req, res) => {
//   const stream = fs.createReadStream("./sample.txt", "utf-8");
//   stream.on("data", (chunk) => res.write(chunk));
//   stream.on("end", () => res.end());
// });

// app.listen(port, () => {
//   console.log(`App is Listening on port ${port}`);
// });


// TUTORIAL...............
// Readable Stream


// const express = require("express");
// const app = express();
// const fs = require("fs");
// const port = 8000;

// let data = "";
// app.get("/read", (req, res) => {
//   const readerStream = fs.createReadStream("./sample.txt", "utf-8");
//   readerStream.on("data", (chunk) => {
//     data += chunk;
//   });

//   readerStream.on("end", () => {
//     console.log(data);
//     res.end(data)
//   });

//   readerStream.on("error", function (err) {
//     console.log(err.stack);
//   });
// });

// app.listen(port, () => {
//   console.log(`App is Listening on port ${port}`);
// });

// Writable Stream


// const express = require("express");
// const app = express();
// const fs = require("fs");
// const port = 8000;

// let data = `Tutorials Point is giving self learning content
// to teach the world in simple and easy way!!!!!`;

// app.get("/write", (req, res) => {
//   const writeSream = fs.createWriteStream("./output.txt");
//   writeSream.write(data, "utf8");

//   writeSream.end();

//   writeSream.on("finish", function () {
//     console.log("Write completed.");
//   });

//   writeSream.on("error", function (err) {
//     console.log(err.stack);
//   });
// });

// app.listen(port, () => {
//   console.log(`App is Listening on port ${port}`);
// });

// Piping the Streams


const express = require("express");
const app = express();
const fs = require("fs");
const port = 8000;
app.get("/pipe", (req, res) => {
  const readerStream = fs.createReadStream("./sample.txt");
  const writerSream = fs.createWriteStream("./output.txt");

  readerStream.pipe(writerSream);

  console.log("ENDED");
});

app.listen(port, () => {
  console.log(`App is Listening on port ${port}`);
});

