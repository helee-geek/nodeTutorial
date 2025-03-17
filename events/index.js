const express = require("express");
const app = express();
const EventEmitter = require("events");
const event = new EventEmitter();

let count = 0;
event.on("countAPI", () => {
  count++;
  console.log("Event Called", count);
});

app.get("/", (req, res) => {
  res.send("Home API");
  event.emit("countAPI");
});

app.get("/about", (req, res) => {
  res.send("About API");
});

app.get("/search", (req, res) => {
  res.send("Search API");
});

app.listen(5000, () => {
  console.log("Server Listening on PORT 5000");
});
