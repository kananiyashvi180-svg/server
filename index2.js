const express = require("express");
const app = express();

app.use(express.json()); // middleware

// In-memory users array
const users = [
  { id: 1, name: "nandini", role: "student", age: 20 },
  { id: 2, name: "veena", role: "teacher", age: 25 },
  { id: 3, name: "kajal", role: "student", age: 20 },
  { id: 4, name: "maya", role: "professor", age: 30 }
];

// Root route
app.get("/", (req, res) => {
  res.status(200).send("Server Running Successfully");
});


// GET all users
app.get("/users", (req, res) => {
  res.status(200).json(users);
});


// GET user by ID
app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});


// POST - Add new user
app.post("/users", (req, res) => {

  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    role: req.body.role,
    age: req.body.age
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: newUser
  });
});


// PUT - Replace user completely
app.put("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    id: userId,
    name: req.body.name,
    role: req.body.role
  };

  res.status(200).json({
    message: "User updated successfully",
    user: users[index]
  });
});


// DELETE user
app.delete("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const deletedUser = users.splice(index, 1);

  res.status(200).json({
    message: "User deleted successfully",
    user: deletedUser
  });
});


// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
