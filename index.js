const express = require("express");

const app = express();

const users = [
    { id: 1, name: "Arjun", role: "student" },
    { id: 2, name: "Priyesha", role: "mentor" },
    { id: 3, name: "Yashvi", role: "teacher" },
    { id: 4, name: "Navya", role: "student2" },
];

app.get("/", (req, res) => {
    res.send("Express server is running");
});

app.get("/route_2", (req, res) => {
    res.send("Express server is running on route 2");
});

app.get("/users", (req, res) => {
    res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});