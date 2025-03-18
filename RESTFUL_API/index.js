const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const port = 8000;

app.get("/", (req, res) => {
  res.send("Root page");
});
app.get("/users", (req, res) => {
  let userList = users.map((user) => `<li>${user.first_name}</li>`).join("");

  res.send(userList);
});

app.use(express.urlencoded({ extended: true }));

// RESTFULL API
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let user = users.find((user) => user.id === id);

  res.json(user);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success", id: users.length });
  });
});

app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;

  // Find the user index
  const userIndex = users.findIndex((user) => user.id === id);

  // Update the user by merging the existing user with the new data
  users[userIndex] = { ...users[userIndex], ...body };

  // Write the updated users array back to the file
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    return res.json({ status: "Success", user: users[userIndex] });
  });
});

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const userIndex = users.findIndex((user) => user.id === id);

  // If user not found
  if (userIndex === -1) {
    return res.status(404).json({ status: "Error", message: "User not found" });
  }

  // Remove the user from the array
  const deletedUser = users[userIndex];
  users.splice(userIndex, 1);

  // Write the updated users array back to the file
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "Error", message: "Failed to delete user" });
    }
    return res.json({ status: "Success", deletedUser });
  });
});

app.listen(port, () => {
  console.log(`Server is starting at port ${port}`);
});