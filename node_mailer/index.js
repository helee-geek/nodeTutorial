const express = require("express");
const app = express();
const appRoute = require("./routes/route.js");
app.use(express.json());

app.use("/api", appRoute);

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
