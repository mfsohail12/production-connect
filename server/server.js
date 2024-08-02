const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:8000"],
};

app.use(cors(corsOptions));
app.use(express.json());

const users = [
  {
    name: "kyle",
    password: "password123",
  },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const user = { name: req.body.name, password: req.body.password };
  users.push(user);
  res.status(201).send("user created");
});

app.listen(8080, () => {
  console.log("server started on port 8080");
});
