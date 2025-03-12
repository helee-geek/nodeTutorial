const express = require("express");
const app = express();
const formidable = require("formidable");
const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  var form = new formidable.IncomingForm();

  form.parse(req);

  form.on("fileBegin", function (name, file) {
    file.filepath = path.join(__dirname, "uploads", file.originalFilename);
    console.log("Uploading file to:", file.filepath);
  });

  form.on("file", function (name, file) {
    console.log("Updated File" + file.name);
  });

  form.on("end", () => {
        console.log("Upload completed successfully!");
        res.sendFile(__dirname + "/index.html");
      });

});

app.listen(8000, () => {
  console.log("app is listening on port 8000");
});
