const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const users = [
    { att: "80", id: 108890, total_sub: 14, name: "Arjun", bonus: 5 },
    { att: "90", id: 108891, total_sub: 12, name: "Priyesha", bonus: 3 },
    { att: "85", id: 108892, total_sub: 10, name: "Rahul", bonus: 4 },
    { att: "95", id: 108893, total_sub: 15, name: "Sneha", bonus: 6 },
    { att: "88", id: 108894, total_sub: 11, name: "Ananya", bonus: 4 }
];



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


app.post("/users", (req, res) => {

    const newUser = {
        id: users.length + 108890,
        name: req.body.name,
        att: req.body.att,
        total_sub: req.body.total_sub,
        bonus: req.body.bonus
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created",
        user: newUser
    });
});


app.put("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const index = users.findIndex(u => u.id === userId);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users[index] = {
        id: userId,
        name: req.body.name,
        att: req.body.att,
        total_sub: req.body.total_sub,
        bonus: req.body.bonus
    };

    res.status(200).json({
        message: "User replaced",
        user: users[index]
    });
});


app.patch("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (req.body.name !== undefined) user.name = req.body.name;
    if (req.body.att !== undefined) user.att = req.body.att;
    if (req.body.total_sub !== undefined) user.total_sub = req.body.total_sub;
    if (req.body.bonus !== undefined) user.bonus = req.body.bonus;

    res.status(200).json({
        message: "User updated partially (PATCH)",
        user: user
    });
});


app.delete("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const index = users.findIndex(u => u.id === userId);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(index, 1);

    res.status(200).json({ message: "User deleted" });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
