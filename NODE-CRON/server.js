const express = require("express");
const app = express();
const port = 5000;
app.use(express.json());
// require("./schesular1.js")
// require("./schesular2.js")
require("./schesular3.js")

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
